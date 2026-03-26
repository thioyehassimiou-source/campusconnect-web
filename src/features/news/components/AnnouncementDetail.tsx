import { Calendar, User, Share2, BookmarkPlus, Printer, ChevronRight } from 'lucide-react'
import { Announcement } from '../types'

interface AnnouncementDetailProps {
  announcement: Announcement
}

export function AnnouncementDetail({ announcement }: AnnouncementDetailProps) {
  if (!announcement) return null

  return (
    <div className="flex-1 h-full overflow-y-auto no-scrollbar bg-surface animate-in fade-in duration-700">
      <div className="max-w-5xl mx-auto py-16 px-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-3 mb-10 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">
          <a className="hover:text-primary transition-colors" href="#">Annonces</a>
          <ChevronRight className="h-4 w-4 opacity-50" />
          <a className="hover:text-primary transition-colors" href="#">{announcement.category}</a>
          <ChevronRight className="h-4 w-4 opacity-50" />
          <span className="text-on-surface">Détails</span>
        </nav>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
            <span className="w-fit px-5 py-1.5 bg-secondary-container text-primary text-[10px] font-black uppercase tracking-widest rounded-xl shadow-inner border border-primary/5">
              {announcement.category}
            </span>
            <span className="text-xs font-bold text-on-surface-variant flex items-center gap-3 opacity-60">
              <Calendar className="h-4.5 w-4.5 text-primary opacity-60" />
              Publié le {announcement.date}
            </span>
          </div>

          <h1 className="text-5xl font-black text-primary leading-[1.1] tracking-tighter mb-10 font-headline max-w-4xl">
            {announcement.title}
          </h1>

          <div className="flex flex-col md:flex-row md:items-center justify-between py-8 border-y border-outline-variant/10 gap-8">
            <div className="flex items-center gap-5">
              <div className="relative">
                <img 
                  src={announcement.author.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100'} 
                  alt={announcement.author.name} 
                  className="w-16 h-16 rounded-3xl object-cover ring-8 ring-surface-container-highest shadow-xl"
                />
              </div>
              <div className="space-y-1">
                <p className="text-base font-black text-on-surface tracking-tight">{announcement.author.name}</p>
                <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-50">
                  {announcement.author.role}
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              {[Share2, BookmarkPlus, Printer].map((Icon, idx) => (
                <button key={idx} className="w-12 h-12 flex items-center justify-center bg-surface-container-lowest border border-outline-variant/10 rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm hover:shadow-xl hover:shadow-primary/20 active:scale-95">
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {announcement.image && (
          <div className="relative w-full aspect-[21/9] rounded-[3rem] overflow-hidden mb-16 shadow-2xl shadow-primary/10 transition-transform hover:scale-[1.01] duration-700 group">
            <img 
              src={announcement.image} 
              alt={announcement.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent mix-blend-multiply" />
          </div>
        )}

        {/* Rich Text Body */}
        <article className="max-w-4xl">
          <p className="text-2xl text-on-surface font-body italic text-slate-500 leading-relaxed mb-12 border-l-8 border-primary/20 pl-8 py-2">
            "Le futur de notre institution commence aujourd'hui avec l'ouverture de l'AI-Hub, un espace dédié à la convergence des savoirs et à l'innovation technologique de pointe."
          </p>

          <div className="space-y-8 text-on-surface/80 leading-loose text-lg font-medium font-body">
            <p>
              Nous avons le plaisir de convier l'ensemble de la communauté universitaire à la cérémonie d'inauguration de notre tout nouveau centre de recherche dédié à l'Intelligence Artificielle. Ce projet d'envergure, fruit de deux années de collaboration étroite entre le corps professoral, nos partenaires industriels et les fonds publics, ouvre ses portes au cœur du Campus Est.
            </p>
            
            <h3 className="text-3xl font-black text-primary mt-12 mb-6 font-headline tracking-tight">Un espace de collaboration sans frontières</h3>
            <p>
              L'AI-Hub n'est pas simplement un bâtiment de plus. C'est un écosystème conçu pour briser les silos académiques. Avec plus de 2000m² d'espaces modulables, des serveurs de calcul haute performance et des zones de détente créative, il accueillera des chercheurs en informatique, en éthique, en sociologie et en ingénierie.
            </p>

            {/* Bento Stats Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
              <div className="bg-surface-container-low/50 p-8 rounded-[2rem] border-l-8 border-primary shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-[10px] font-black text-primary mb-6 uppercase tracking-widest">Chiffres clés</h4>
                <ul className="space-y-4 text-sm font-black text-on-surface/70 uppercase tracking-widest">
                  <li className="flex items-center gap-4"><span className="w-2 h-2 rounded-full bg-primary shadow-sm"></span> 12 Laboratoires</li>
                  <li className="flex items-center gap-4"><span className="w-2 h-2 rounded-full bg-primary shadow-sm"></span> 45 Chercheurs résidents</li>
                  <li className="flex items-center gap-4"><span className="w-2 h-2 rounded-full bg-primary shadow-sm"></span> 5 Licornes Partenaires</li>
                </ul>
              </div>
              <div className="bg-surface-container-low/50 p-8 rounded-[2rem] border-l-8 border-secondary shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-[10px] font-black text-secondary mb-6 uppercase tracking-widest">Programme</h4>
                <ul className="space-y-4 text-sm font-black text-on-surface/70 uppercase tracking-widest">
                  <li className="flex items-center gap-4"><span className="w-2 h-2 rounded-full bg-secondary shadow-sm"></span> 14h00 : Discours</li>
                  <li className="flex items-center gap-4"><span className="w-2 h-2 rounded-full bg-secondary shadow-sm"></span> 15h30 : Démonstrations</li>
                  <li className="flex items-center gap-4"><span className="w-2 h-2 rounded-full bg-secondary shadow-sm"></span> 17h00 : Cocktail</li>
                </ul>
              </div>
            </div>

            <p>
              L'accès à la cérémonie est libre pour tous les étudiants et membres du personnel munis de leur carte CampusConnect. Des sessions de visites guidées seront organisées toutes les demi-heures à partir de 14h30.
            </p>
            <p className="font-black text-primary mt-12 mb-20 underline underline-offset-[12px] decoration-4 decoration-primary/10 hover:decoration-primary transition-all cursor-pointer inline-block">
              Pour toute information complémentaire, merci de contacter le département de communication.
            </p>
          </div>
        </article>

        {/* Footer / Tags */}
        <footer className="pt-12 border-t border-outline-variant/10 flex flex-wrap gap-3 pb-20">
          {announcement.tags?.map(tag => (
            <span key={tag} className="px-5 py-2 bg-surface-container-low text-[10px] font-black text-on-surface-variant uppercase tracking-widest rounded-full hover:bg-primary hover:text-white transition-all cursor-pointer">
              {tag}
            </span>
          ))}
        </footer>
      </div>
    </div>
  )
}
