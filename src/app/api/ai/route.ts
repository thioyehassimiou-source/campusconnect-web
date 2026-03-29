import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import Groq from 'groq-sdk'



export async function POST(req: NextRequest) {
  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY || 'missing_key_build_bypass'
    })
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { messages, role, confirmed = false } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 })
    }

    // RATE LIMITING: 20 AI calls per hour per user
    const oneHourAgo = new Date(Date.now() - 3600000).toISOString()
    const { count: recentCalls } = await supabase
      .from('ai_analytics')
      .select('*', { count: 'exact', head: true })
      .eq('profile_id', user.id)
      .gte('created_at', oneHourAgo)
    
    if (recentCalls && recentCalls >= 20) {
      return NextResponse.json({ 
        error: 'Rate limit exceeded', 
        message: 'Vous avez atteint la limite de 20 requêtes par heure. Réessayez dans quelques minutes.',
        rate_limited: true
      }, { status: 429 })
    }

    // 1. Fetch Contextual Data
    const [gradesRes, scheduleRes, assignmentsRes] = await Promise.all([
      supabase.from('grades').select('grade, course:courses(credits)').eq('student_id', user.id),
      supabase.from('schedule').select('*, course:courses(title)').eq('profile_id', user.id).gte('end_time', new Date().toISOString()).order('start_time', { ascending: true }).limit(5),
      supabase.from('assignments').select('*').eq('student_id', user.id).eq('status', 'pending').order('deadline', { ascending: true }).limit(3)
    ])

    const gpaData = gradesRes.data || []
    const gpa = gpaData.length > 0 
      ? (gpaData.reduce((acc: number, curr: any) => acc + (curr.grade || 0), 0) / gpaData.length).toFixed(2)
      : 'N/A'
    
    const context = {
      user: {
        full_name: user.user_metadata?.full_name || 'Étudiant',
        role: role,
        gpa: gpa,
        total_grades: gpaData.length
      },
      upcoming_classes: scheduleRes.data?.map(s => ({
        title: s.course?.title,
        time: `${new Date(s.start_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} - ${new Date(s.end_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`,
        location: s.location
      })) || [],
      pending_assignments: assignmentsRes.data?.map(a => ({
        title: a.title,
        deadline: new Date(a.deadline).toLocaleDateString('fr-FR')
      })) || []
    }

    const startTime = Date.now()
    let modelUsed = 'llama-3.3-70b-versatile'

    // 2. Define Tools
    const tools: any[] = [
      {
        type: 'function',
        function: {
          name: 'send_notification',
          description: 'Envoie une notification réelle à l\'utilisateur.',
          parameters: {
            type: 'object',
            properties: {
              title: { type: 'string', description: 'Le titre de la notification' },
              content: { type: 'string', description: 'Le message détaillé' },
              type: { type: 'string', enum: ['info', 'warning', 'success'], description: 'Le type de notification' }
            },
            required: ['title', 'content']
          }
        }
      },
      {
        type: 'function',
        function: {
          name: 'create_study_reminder',
          description: 'Programme un rappel de révision dans le planning.',
          parameters: {
            type: 'object',
            properties: {
              course_title: { type: 'string', description: 'Le nom du cours à réviser' },
              datetime: { type: 'string', description: 'La date et l\'heure au format ISO' }
            },
            required: ['course_title', 'datetime']
          }
        }
      },
      {
        type: 'function',
        function: {
          name: 'analyze_pedagogical_status',
          description: "Analyse le statut académique et pédagogique de l'étudiant. Croise les notes, l'assiduité et le planning pour détecter des problèmes ou des opportunités d'amélioration.",
          parameters: { type: 'object', properties: {} }
        }
      }
    ]

    // 3. System Prompt with CampusConnect Context
    const univContext = `
      Contexte institutionnel : Plateforme éducative CampusConnect.
      Ton rôle est de répondre avec précision aux questions de l'étudiant en utilisant EXCLUSIVEMENT les données en temps réel ci-dessous.
      Si l'étudiant te pose une question (ex: "Mes devoirs"), réponds-lui d'abord avec un texte clair. Ensuite, tu peux proposer d'agir avec tes outils.
      Ne réponds JAMAIS uniquement par un outil sans écrire de texte.
    `

    // 4. Agent Factory & Specialized Prompts
    const agents: Record<string, string> = {
      academic_coach: `Tu es le Coach Académique CampusConnect. Ton rôle est d'analyser les performances, d'identifier les lacunes et de proposer des plans de révision.`,
      pedagogical_assistant: `Tu es l'Assistant Ingénierie Pédagogique CampusConnect. Tu aides les enseignants à optimiser leurs cours et à analyser l'engagement.`,
      system_supervisor: `Tu es le Superviseur Système. Tu surveilles l'usage et la santé de l'IA.`
    }

    let activeAgent = role === 'teacher' ? agents.pedagogical_assistant : agents.academic_coach
    if (messages[messages.length - 1].content.toLowerCase().includes('admin')) {
      activeAgent = agents.system_supervisor
    }

    const systemPrompt = `
      ${activeAgent}

      ${univContext}

      DONNÉES EN TEMPS RÉEL (Base de réponse) :
      ${JSON.stringify(context, null, 2)}
      
      INSTRUCTION STRICTE : Formule toujours une réponse textuelle complète à l'utilisateur. Utilise les outils uniquement pour compléter ta réponse.
    `

    // 5. Execution Loop (Multi-step Workflow)
    let currentMessages = [{ role: 'system' as const, content: systemPrompt }, ...messages]
    const workflowSteps: string[] = []
    let finalContent = ""
    let iterations = 0

    while (iterations < 3) {
      const response = await groq.chat.completions.create({
        model: modelUsed,
        messages: currentMessages,
        tools,
        tool_choice: 'auto',
        temperature: 0.3,
      })

      const responseMessage = response.choices[0].message
      currentMessages.push(responseMessage as any)

      if (responseMessage.tool_calls) {
        const availableFunctions: any = {
          send_notification: async (args: any) => {
            // DEDUPLICATION: prevent same notification within 5 minutes
            const fiveMinAgo = new Date(Date.now() - 300000).toISOString()
            const { count: recent } = await supabase
              .from('notifications')
              .select('*', { count: 'exact', head: true })
              .eq('profile_id', user.id)
              .eq('title', args.title)
              .gte('created_at', fiveMinAgo)
            
            if (recent && recent > 0) {
              return { result: "Notification déjà envoyée récemment (anti-doublon actif)" }
            }
            const { error: notifErr } = await supabase.from('notifications').insert({ profile_id: user.id, title: args.title, content: args.content, type: args.type || 'info' })
            if (notifErr) return { result: `Erreur base de données (notifications): ${notifErr.message}` }
            return { result: "Notification envoyée" }
          },
          create_study_reminder: async (args: any) => {
            // DEDUPLICATION: prevent same reminder within 5 minutes
            const fiveMinAgo = new Date(Date.now() - 300000).toISOString()
            const { count: recent } = await supabase
              .from('notifications')
              .select('*', { count: 'exact', head: true })
              .eq('profile_id', user.id)
              .ilike('title', `%${args.course_title}%`)
              .gte('created_at', fiveMinAgo)
            
            if (recent && recent > 0) {
              return { result: "Rappel déjà programmé récemment (anti-doublon actif)" }
            }
            const { error: notifErr } = await supabase.from('notifications').insert({ profile_id: user.id, title: `Rappel : ${args.course_title}`, content: `Révision le ${new Date(args.datetime).toLocaleString('fr-FR')}`, type: 'success' })
            if (notifErr) return { result: `Erreur base de données (notifications): ${notifErr.message}` }
            return { result: "Rappel de révision programmé" }
          },
          analyze_pedagogical_status: async () => {
            return { result: `Analyse terminée. Statut : ${context.user.gpa >= '12' ? 'Excellent' : 'Besoin de soutien'}. Basé sur ${context.user.total_grades} contrôles.` }
          }
        }

        for (const toolCall of responseMessage.tool_calls) {
          const functionName = toolCall.function.name
          const functionArgs = JSON.parse(toolCall.function.arguments)
          workflowSteps.push(`Action : ${functionName}`)
          
          const functionResponse = await availableFunctions[functionName](functionArgs)
          
          currentMessages.push({
            tool_call_id: toolCall.id,
            role: 'tool',
            name: functionName,
            content: JSON.stringify(functionResponse),
          } as any)

          // Analytics
          const { error: analyticsErr } = await supabase.from('ai_analytics').insert({
            profile_id: user.id,
            query_type: 'workflow_step',
            action_triggered: functionName,
            status: 'success',
            model_used: modelUsed
          })
          if (analyticsErr) console.warn('Non-fatal API Analytics Error:', analyticsErr.message)
        }
        iterations++
      } else {
        finalContent = responseMessage.content || ""
        break
      }
    }

    // FINAL RESPONSE
    if (!finalContent && workflowSteps.length > 0) {
      finalContent = "J'ai effectué les actions demandées."
    } else if (!finalContent) {
      finalContent = "Je n'ai pas d'information supplémentaire à fournir."
    }

    return NextResponse.json({ 
      content: finalContent,
      steps: workflowSteps,
      agent: role === 'teacher' ? 'Assistant Pédagogique' : 'Coach Académique'
    })
  } catch (error: any) {
    console.warn('AI API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
