import { Heart, FileText, Image as ImageIcon, FileCode } from 'lucide-react'
import { Conversation } from '../types'

interface ChatSidebarProps {
  conversation: Conversation
}

export function ChatSidebar({ conversation }: ChatSidebarProps) {
  return (
    <div className="w-80 flex flex-col bg-surface h-full overflow-y-auto custom-scrollbar border-l border-outline-variant/5">
      <div className="p-8 flex flex-col items-center border-b border-outline-variant/10 bg-surface-container-lowest/30">
        <div className="relative mb-6">
          <img 
            src={conversation.avatar} 
            alt={conversation.name} 
            className="w-28 h-28 rounded-[2rem] object-cover shadow-2xl shadow-primary/15 ring-4 ring-white" 
          />
        </div>
        <h2 className="text-xl font-black font-headline text-on-surface tracking-tight">{conversation.name}</h2>
        <p className="text-xs text-on-surface-variant font-black uppercase tracking-widest mt-1 mb-6 opacity-80">
          Directrice de Recherche - IA
        </p>
        <div className="flex gap-3 w-full">
          <button className="flex-1 bg-primary text-white text-[10px] font-black py-3 px-4 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all uppercase tracking-widest">
            Voir le profil
          </button>
          <button className="w-10 h-10 bg-surface-container-low flex items-center justify-center rounded-full text-on-surface-variant hover:text-error transition-colors shadow-sm ring-1 ring-black/5">
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-8 space-y-10">
        {/* About Section */}
        <section>
          <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-4 opacity-60">Bio & Spécialité</h4>
          <p className="text-xs leading-relaxed text-on-surface-variant font-medium">
            Experte en Machine Learning et Éthique de l'IA. Supervisée par le département académique de CampusConnect depuis 2018.
          </p>
        </section>

        {/* Shared Files */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-60">Fichiers partagés</h4>
            <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Voir tout</button>
          </div>
          <div className="space-y-4">
            <FileItem icon={<FileText className="h-4 w-4" />} name="Cahier_des_charges.docx" date="15 Oct 2023" color="blue" />
            <FileItem icon={<FileCode className="h-4 w-4" />} name="Diagramme_Architecture.png" date="12 Oct 2023" color="purple" />
            <FileItem icon={<FileText className="h-4 w-4" />} name="Cours_IA_Semaine1.pdf" date="08 Oct 2023" color="red" />
          </div>
        </section>

        {/* Media Section */}
        <section>
          <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-5 opacity-60">Médias partagés</h4>
          <div className="grid grid-cols-3 gap-2 px-0.5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-square bg-slate-100 rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-all border border-black/5 shadow-sm group">
                <img 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  src={`https://picsum.photos/200/200?random=${i + 10}`} 
                  alt="Shared media" 
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function FileItem({ icon, name, date, color }: { icon: any, name: string, date: string, color: string }) {
  const colors: any = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600'
  }
  return (
    <div className="flex items-center gap-4 group cursor-pointer hover:translate-x-1 transition-transform">
      <div className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all group-hover:ring-2 ring-white ${colors[color]}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-black truncate text-on-surface tracking-tight group-hover:text-primary transition-colors">{name}</p>
        <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest opacity-60">{date}</p>
      </div>
    </div>
  )
}
