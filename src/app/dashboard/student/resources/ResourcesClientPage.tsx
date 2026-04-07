'use client'

import { CourseFolder } from '@/features/resources/components/CourseFolder'
import { FileTable } from '@/features/resources/components/FileTable'
import { StorageCard } from '@/features/resources/components/StorageCard'

interface ResourcesClientPageProps {
  initialResources: any[]
}

export default function ResourcesClientPage({ initialResources }: ResourcesClientPageProps) {
  const files = initialResources.length > 0 
    ? initialResources.map(r => ({
        id: r.id,
        name: r.title,
        course: r.course?.title || 'Commun',
        category: 'Support de cours',
        addedAt: new Date(r.created_at).toLocaleDateString(),
        size: 'N/A',
        type: r.file_type || 'pdf'
      }))
    : []

  // Group by Course
  const courseGroups = initialResources.reduce((acc: any, curr) => {
    const courseName = curr.course?.title || 'Ressources Générales'
    if (!acc[courseName]) acc[courseName] = []
    acc[courseName].push(curr)
    return acc
  }, {})

  const folders = Object.keys(courseGroups).map(name => ({
    id: name,
    name,
    description: `Supports de cours et documents pour ${name}.`,
    documentCount: courseGroups[name].length,
    fileTypes: Array.from(new Set(courseGroups[name].map((r: any) => r.file_type || 'pdf'))) as any[]
  }))

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in duration-700 pb-20">
      {/* Editorial Header */}
      <header className="flex flex-col xl:flex-row xl:items-end justify-between mb-12 gap-8">
        <div>
          <h1 className="text-4xl font-black text-primary tracking-tighter mb-2 font-headline">
            Ressources Pédagogiques
          </h1>
          <p className="text-on-surface-variant font-medium text-lg opacity-80 leading-relaxed">
            Accédez à vos supports de cours, présentations et documents académiques.
          </p>
        </div>
        
        <div className="flex bg-surface-container-low p-1.5 rounded-2xl border border-outline-variant/10 shadow-inner w-fit">
          {['Semestre 1', 'Semestre 2 (Actuel)', 'Archives'].map((sem, idx) => (
            <button 
              key={sem}
              className={`
                px-6 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all
                ${idx === 1 
                  ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105 z-10' 
                  : 'text-on-surface-variant hover:bg-surface-container-high'
                }
              `}
            >
              {sem}
            </button>
          ))}
        </div>
      </header>

      {/* Bento Grid: Folders */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {folders.length > 0 ? (
          folders.map((folder) => (
            <CourseFolder 
              key={folder.id} 
              folder={folder as any} 
            />
          ))
        ) : (
          <p className="col-span-full text-center py-10 text-on-surface-variant/40 text-xs font-black uppercase tracking-widest">
            Aucun support de cours disponible pour le moment.
          </p>
        )}
      </section>

      {/* File Explorer View */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-black text-primary tracking-tighter font-headline">
            Fichiers Récents
          </h3>
          <button className="text-[10px] font-black text-primary uppercase tracking-[0.2em] border-b-2 border-primary/20 hover:border-primary transition-all pb-1">
            Voir tout l'historique
          </button>
        </div>
        <FileTable files={files} />
      </section>

      {/* Footer Info Section */}
      <StorageCard />
    </div>
  )
}
