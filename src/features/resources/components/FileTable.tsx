import { FileText, Presentation, Video, Layout, Eye, Download, PlayCircle as Play } from 'lucide-react'
import { ResourceFile, FileType } from '../types'

interface FileTableProps {
  files: ResourceFile[]
}

export function FileTable({ files }: FileTableProps) {
  const getFileIcon = (type: FileType) => {
    switch (type) {
      case 'pdf': return <FileText className="h-6 w-6 text-red-500" />
      case 'ppt': return <Presentation className="h-6 w-6 text-blue-500" />
      case 'mp4': return <Video className="h-6 w-6 text-orange-500" />
      case 'fig': return <Layout className="h-6 w-6 text-purple-500" />
      default: return <FileText className="h-6 w-6 text-slate-500" />
    }
  }

  return (
    <div className="bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/10 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low/50">
              <th className="px-8 py-5 text-[11px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-60">Nom du document</th>
              <th className="px-6 py-5 text-[11px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-60">Cours</th>
              <th className="px-6 py-5 text-[11px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-60">Date d'ajout</th>
              <th className="px-6 py-5 text-[11px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-60">Taille</th>
              <th className="px-8 py-5 text-[11px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-60 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {files.map((file) => (
              <tr key={file.id} className="hover:bg-surface-container-low/50 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-surface-container rounded-xl group-hover:bg-white transition-colors shadow-inner">
                      {getFileIcon(file.type)}
                    </div>
                    <div>
                      <p className="text-sm font-black text-primary tracking-tight">{file.name}</p>
                      <p className="text-[10px] font-bold text-on-surface-variant opacity-60 uppercase">{file.category}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <span className="px-3 py-1 bg-secondary-container/50 text-secondary text-[10px] font-black rounded-lg uppercase tracking-wider">
                    {file.course}
                  </span>
                </td>
                <td className="px-6 py-6 text-sm font-bold text-on-surface-variant opacity-80">{file.addedAt}</td>
                <td className="px-6 py-6 text-sm font-bold text-on-surface-variant opacity-80">{file.size}</td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2.5 text-outline hover:text-primary hover:bg-white rounded-xl transition-all shadow-sm hover:shadow" title="Visualiser en ligne">
                      {file.type === 'mp4' ? <Play className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                    <button className="p-2.5 text-outline hover:text-primary hover:bg-white rounded-xl transition-all shadow-sm hover:shadow" title="Télécharger">
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
