'use client'

import { useState } from 'react'
import { Newspaper, Bell, Search, Filter, Share2, Bookmark, ArrowRight } from 'lucide-react'
import { mockAnnouncements } from '@/features/news/mockData'
import { Announcement } from '@/features/news/types'

interface NewsClientPageProps {
  initialAnnouncements: Announcement[]
}

export default function NewsClientPage({ initialAnnouncements }: NewsClientPageProps) {
  const [activeTag, setActiveTag] = useState('Tous')
  const announcements = initialAnnouncements.length > 0 ? initialAnnouncements : mockAnnouncements

  const filteredAnnouncements = announcements.filter(a => 
    activeTag === 'Tous' || (a.tags && a.tags.includes(`#${activeTag}`)) || a.category === activeTag
  )

  const featured = announcements[0]

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-24">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 animate-in fade-in slide-in-from-top-6 duration-700">
        <div>
          <h2 className="text-4xl font-black font-headline text-primary tracking-tighter leading-tight">Campus News</h2>
          <p className="text-on-surface-variant text-lg font-medium opacity-70 mt-2">Restez informé de toute la vie universitaire.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant/40" />
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border border-outline-variant/10 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-medium" 
            />
          </div>
          <button className="p-4 rounded-2xl bg-white border border-outline-variant/10 text-primary hover:bg-surface-container-low transition-all">
            <Filter className="h-6 w-6" />
          </button>
        </div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="relative h-[600px] rounded-[3.5rem] overflow-hidden group shadow-2xl shadow-primary/10 animate-in fade-in zoom-in-95 duration-1000">
          <img 
            src={featured.image || "https://images.unsplash.com/photo-1523050853063-bd388f9f79b5?w=1600"} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
            alt="Featured news" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
          
          <div className="absolute bottom-12 left-12 right-12 flex flex-col items-start gap-6">
            <div className="flex gap-3">
              <span className="bg-primary px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
                À la une
              </span>
              <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-white">
                {featured.category}
              </span>
            </div>
            <h3 className="text-5xl font-black font-headline text-white tracking-tighter max-w-3xl leading-[1.1]">
              {featured.title}
            </h3>
            <p className="text-white/80 text-xl max-w-2xl font-medium leading-relaxed">
              {featured.summary}
            </p>
            <button className="mt-4 flex items-center gap-4 bg-white text-primary px-10 py-5 rounded-[2rem] text-[12px] font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-2xl">
              Lire l'article complet
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </section>
      )}

      {/* News Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-10">
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {['Tous', 'Académique', 'Événement', 'Vie Étudiante', 'Technique'].map(tag => (
              <button 
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap
                  ${activeTag === tag 
                    ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' 
                    : 'bg-white border border-outline-variant/10 text-on-surface-variant hover:border-primary/30'
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="space-y-8">
            {filteredAnnouncements.slice(1).map((news) => (
              <article key={news.id} className="bg-white rounded-[2.5rem] p-8 flex gap-8 border border-outline-variant/5 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all group cursor-pointer animate-in slide-in-from-bottom-6">
                <div className="w-48 h-48 rounded-3xl overflow-hidden shrink-0">
                  <img src={news.image || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={news.title} />
                </div>
                <div className="flex-1 flex flex-col justify-between py-2">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary/40 italic">{news.category}</span>
                      <span className="w-1.5 h-1.5 bg-outline-variant/30 rounded-full" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">{news.timeAgo}</span>
                    </div>
                    <h4 className="text-2xl font-black font-headline text-on-surface group-hover:text-primary transition-colors tracking-tighter leading-[1.2]">
                      {news.title}
                    </h4>
                    <p className="text-on-surface-variant/70 text-base line-clamp-2 leading-relaxed font-medium">
                      {news.summary}
                    </p>
                  </div>
                  <div className="flex items-center gap-6 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                      Lire la suite <ArrowRight className="h-4 w-4" />
                    </button>
                    <button className="p-2 rounded-xl hover:bg-surface-container-low transition-colors text-on-surface-variant/40 hover:text-primary">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-10">
          <div className="bg-surface-container-low p-10 rounded-[3rem] border border-outline-variant/10 shadow-inner">
            <h3 className="text-2xl font-black font-headline text-primary mb-8 flex items-center gap-4 tracking-tight">
              <Bell className="h-7 w-7" />
              Alertes Flash
            </h3>
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-6 bg-white rounded-2xl shadow-sm border-l-4 border-amber-500 group cursor-pointer hover:translate-x-1 transition-transform">
                  <p className="text-[9px] font-black uppercase tracking-widest text-amber-500 mb-2">URGENT • IL Y A 5 MIN</p>
                  <p className="text-sm font-bold text-on-surface tracking-tight group-hover:text-primary transition-colors">Maintenance réseau prévue ce soir à 22h dans les amphis.</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary to-primary-container p-10 rounded-[3rem] text-white flex flex-col justify-between h-[400px] shadow-2xl shadow-primary/30 relative overflow-hidden group">
            <Newspaper className="h-16 w-16 opacity-20 transition-transform group-hover:scale-110 duration-700" />
            <div className="relative z-10">
              <h4 className="text-2xl font-black font-headline mb-4 tracking-tighter leading-tight">Abonnez-vous à la Newsletter Campus</h4>
              <p className="text-sm opacity-70 leading-relaxed font-medium mb-8">Recevez le meilleur de CampusConnect directement dans votre boîte mail.</p>
              <div className="relative">
                <input type="email" placeholder="votre@email.com" className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-6 pr-12 text-sm placeholder:text-white/40 focus:bg-white/20 transition-all outline-none" />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-white text-primary">
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
