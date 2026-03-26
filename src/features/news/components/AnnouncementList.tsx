import { Filter } from 'lucide-react'
import { Announcement, NewsCategory } from '../types'

interface AnnouncementListProps {
  announcements: Announcement[]
  activeId: string
  onSelect: (id: string) => void
  currentCategory: string
  onCategoryChange: (cat: string) => void
}

export function AnnouncementList({ 
  announcements, 
  activeId, 
  onSelect, 
  currentCategory, 
  onCategoryChange 
}: AnnouncementListProps) {
  const categories: NewsCategory[] = ['Académique', 'Événements', 'Campus', 'Maintenance', 'Sport']

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Académique': return 'text-secondary'
      case 'Vie Étudiante': return 'text-tertiary-container'
      case 'Maintenance': return 'text-secondary'
      case 'Sport': return 'text-primary'
      default: return 'text-primary'
    }
  }

  return (
    <div className="w-full h-full flex flex-col bg-surface-container-low/30 overflow-hidden">
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-on-surface tracking-tighter">Annonces</h2>
          <button className="p-2.5 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-all border border-outline-variant/10">
            <Filter className="h-5 w-5" />
          </button>
        </div>
        
        {/* Horizontal Chips */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          <button 
            onClick={() => onCategoryChange('Toutes')}
            className={`px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-full whitespace-nowrap transition-all shadow-sm
              ${currentCategory === 'Toutes' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface-container-highest text-on-surface-variant hover:bg-secondary-container'}`}
          >
            Toutes
          </button>
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-full whitespace-nowrap transition-all
                ${currentCategory === cat ? 'bg-primary text-white' : 'bg-surface-container-highest text-on-surface-variant hover:bg-secondary-container'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-8 space-y-3">
        {announcements.map((item) => (
          <div 
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`
              p-6 rounded-[2rem] cursor-pointer transition-all duration-300 group
              ${activeId === item.id 
                ? 'bg-surface-container-lowest shadow-xl shadow-primary/5 border-l-8 border-primary' 
                : 'hover:bg-surface-container-high'
              }
            `}
          >
            <div className="flex justify-between items-start mb-3">
              <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${getCategoryColor(item.category)}`}>
                {item.category}
              </span>
              <span className="text-[9px] font-bold text-on-surface-variant opacity-40 uppercase tracking-widest">
                {item.timeAgo}
              </span>
            </div>
            <h3 className={`text-base font-black leading-snug mb-3 transition-colors ${activeId === item.id ? 'text-primary' : 'text-on-surface group-hover:text-primary'}`}>
              {item.title}
            </h3>
            <p className="text-xs text-on-surface-variant line-clamp-2 opacity-70 font-medium leading-relaxed">
              {item.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
