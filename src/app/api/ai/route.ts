import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import Groq from 'groq-sdk'



export async function POST(req: NextRequest) {
  const startTime = Date.now()
  const modelUsed = 'llama-3.3-70b-versatile'
  
  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY || 'missing_key_build_bypass'
    })
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { messages, role } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 })
    }

    // LIMIT MEMORY: Keep only the system prompt and last 6 messages for context
    const limitedMessages = messages.slice(-6)

    // 1. RATE LIMITING (Lean version)
    const oneHourAgo = new Date(Date.now() - 3600000).toISOString()
    const { count: recentCalls } = await supabase
      .from('ai_analytics')
      .select('*', { count: 'exact', head: true })
      .eq('profile_id', user.id)
      .gte('created_at', oneHourAgo)
    
    if (recentCalls && recentCalls >= 20) {
      return NextResponse.json({ 
        error: 'Rate limit exceeded', 
        message: 'Limite de 20 requêtes/heure atteinte.',
        rate_limited: true
      }, { status: 429 })
    }

    // 2. SELECTIVE & LEAN CONTEXT (Optimized for < 5s latency)
    const lastUserQuery = limitedMessages[limitedMessages.length - 1]?.content?.toLowerCase() || ""
    const now = new Date()
    
    // Parallel fetching of essential data only
    const [gradesRes, scheduleRes, assignmentsRes, notificationsRes] = await Promise.all([
      supabase.from('grades').select('grade, course:courses(title)').eq('student_id', user.id).limit(20),
      supabase.from('schedules').select('start_time, course:courses(title, code, location)').eq('profile_id', user.id).gte('end_time', now.toISOString()).order('start_time', { ascending: true }).limit(3),
      supabase.from('assignments').select('title, deadline, course:courses(title)').eq('student_id', user.id).eq('status', 'pending').order('deadline', { ascending: true }).limit(3),
      supabase.from('notifications').select('title, created_at').eq('profile_id', user.id).order('created_at', { ascending: false }).limit(2)
    ])

    const gpaData = gradesRes.data || []
    const gpa = gpaData.length > 0 
      ? (gpaData.reduce((acc: number, curr: any) => acc + (curr.grade || 0), 0) / gpaData.length).toFixed(2)
      : '0.00'
    
    const context = {
      time: now.toLocaleString('fr-FR', { timeZone: 'Africa/Conakry' }),
      student: { name: user.user_metadata?.full_name, gpa, role },
      upcoming_classes: scheduleRes.data?.map(s => ({ 
        title: (s.course as any)?.title || 'Cours', 
        time: new Date(s.start_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) 
      })),
      assignments: assignmentsRes.data?.map(a => ({ 
        title: a.title, 
        course: (a.course as any)?.title,
        due: new Date(a.deadline).toLocaleDateString('fr-FR') 
      })),
      recent_alerts: notificationsRes.data?.map(n => n.title)
    }

    // 2. MASTER SYSTEM PROMPT (Phase 2 - Strategic Rules)
    const agents: Record<string, string> = {
      coach: "Tu es un Coach Académique. Ton ton est motivant et tu utilises le 'tu'. Priorise l'organisation et la réussite.",
      admin: "Tu es un Assistant Administratif. Ton ton est formel et tu utilises le 'vous'. Sois précis sur les règlements.",
      teaching: "Tu es un Assistant Pédagogique. Aide l'enseignant à analyser l'engagement et les supports de cours."
    }

    let currentRole = role === 'teacher' ? agents.teaching : agents.coach
    if (lastUserQuery.includes('règlement') || lastUserQuery.includes('inscription') || lastUserQuery.includes('administration')) {
      currentRole = agents.admin
    }

    const systemPrompt = `
      # RÔLE & MISSION : COACH ACADÉMIQUE
      Tu es un partenaire académique intelligent et proactif pour les étudiants de l’Université de Labé.
      Ta mission est d’accompagner l’étudiant sur le LONG TERME pour améliorer ses performances, son organisation et sa réussite.

      # ANALYSE & IMPACT (V5)
      1. Détection Intelligente : Analyse les données situées dans (${JSON.stringify(context)}) pour détecter les points faibles, les retards potentiels ou les opportunités d'amélioration.
      2. Mesure d'Impact : Tes conseils doivent viser l'amélioration des notes, la régularité des révisions et l'optimisation de l'organisation.
      3. Feedback & Adaptation : Prends en compte les échanges précédents et les retours de l’étudiant pour ajuster ton comportement et tes suggestions.

      # RÈGLES DE CONFIANCE & CONTRÔLE
      - Explique TOUJOURS "Pourquoi" : "J'ai remarqué [TENDANCE], c'est pourquoi je te propose de [ACTION] pour améliorer [OBJECTIF]."
      - Score de Confiance (Confidence) : 
        - CONFIDENCE >= 0.6 : Propose directement l'action via le JSON structuré.
        - CONFIDENCE < 0.6 : Demande poliment confirmation par texte.
      - Non-intrusif : Propose, n'impose jamais. Respecte le confort de l'utilisateur.

      # FORMAT DE RÉPONSE
      - RÉPONSE SIMPLE : Texte clair, bienveillant et orienté résultat.
      - ACTION (JSON UNIQUEMENT) : 
        {
          "type": "action",
          "action": "NOM_ACTION",
          "confidence": 0.9,
          "data": { ... },
          "message": "Explication de l'impact : J'ai vu que [RAISON ACADÉMIQUE], je te propose donc [ACTION] pour [BÉNÉFICE MESURABLE]."
        }

      # RÈGLES D'OR
      - Langue : Français naturel. Pas d'hallucinations.
      - Contexte de conversation : ${JSON.stringify(limitedMessages.map(m => m.role + ": " + m.content.substring(0, 50)))}
    `

    const tools: any[] = [
      {
        type: 'function',
        function: {
          name: 'manage_study_flow',
          description: 'Action réelle : créer un rappel ou afficher les devoirs.',
          parameters: {
            type: 'object',
            properties: {
              action: { type: 'string', enum: ['create_reminder', 'list_assignments'] },
              subject: { type: 'string' },
              date: { type: 'string' },
              confidence: { type: 'number', description: 'Score entre 0 et 1' }
            },
            required: ['action', 'confidence']
          }
        }
      }
    ]

    let groqMessages = [{ role: 'system' as const, content: systemPrompt }, ...limitedMessages]
    let finalContent = ""
    let isActionJSON = false

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)

    try {
      const response = await groq.chat.completions.create({
        model: modelUsed,
        messages: groqMessages,
        tools,
        tool_choice: 'auto',
        temperature: 0.1,
        max_tokens: 512,
      }, { signal: controller.signal })

      const responseMessage = response.choices[0].message
      
      if (responseMessage.tool_calls) {
        const toolCall = responseMessage.tool_calls[0]
        const args = JSON.parse(toolCall.function.arguments)
        
        // GATING LOGIC: Only execute tool and return JSON if confidence >= 0.6
        if ((args.confidence || 0) >= 0.6) {
          isActionJSON = true
          if (args.action === 'create_reminder') {
            await supabase.from('notifications').insert({ profile_id: user.id, title: `Rappel : ${args.subject}`, content: `Prévu pour le ${new Date(args.date).toLocaleString()}`, type: 'success' })
          }
          
          finalContent = JSON.stringify({
            type: "action",
            action: args.action,
            confidence: args.confidence,
            data: args,
            message: responseMessage.content || `J'ai remarqué une priorité pour ${args.subject}, je te propose de valider cette action.`
          })
        } else {
          // Low confidence: transform tool call into a proactive question
          finalContent = `J'ai remarqué une opportunité pour ${args.subject || 'tes études'}. Souhaites-tu que j'organise cela pour toi ?`
        }
      } else {
        finalContent = responseMessage.content || ""
      }
    } catch (err: any) {
      if (err.name === 'AbortError' || err.message?.includes('timeout')) {
        return NextResponse.json({ content: "Je traite ta demande... vérifie ton tableau de bord dans un instant !", agent: 'Système' })
      }
      throw err
    } finally {
      clearTimeout(timeoutId)
    }

    if (!finalContent) finalContent = "Je m'excuse, je n'ai pas pu formuler une réponse. Peux-tu préciser ?"

    await supabase.from('ai_analytics').insert({
      profile_id: user.id,
      query_type: 'p4_response',
      model_used: modelUsed,
      status: 'success',
      latency_ms: Date.now() - startTime
    })

    return NextResponse.json({ 
      content: finalContent,
      agent: "Intelligent Partner v4",
      is_json: isActionJSON || (finalContent.startsWith('{') && finalContent.includes('"type":"action"'))
    })
  } catch (error: any) {
    console.error('PHASE 4 API ERROR:', error)
    return NextResponse.json({ error: "Service Partenaire temporairement interrompu." }, { status: 500 })
  }
}



