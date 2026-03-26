import { Map, ArrowRight } from 'lucide-react'

export function MapPrompt() {
  return (
    <div className="mt-16 bg-primary rounded-[3rem] p-12 overflow-hidden relative shadow-2xl shadow-primary/30 group animate-in fade-in slide-in-from-bottom-12 duration-1000">
      <div className="relative z-10 max-w-2xl">
        <span className="bg-secondary-container text-primary px-5 py-2 rounded-full text-[10px] font-black tracking-widest mb-8 inline-block shadow-lg">
          ORIENTATION
        </span>
        <h3 className="text-4xl xl:text-5xl font-black text-white mb-5 font-headline tracking-tighter leading-tight transition-transform group-hover:translate-x-2 duration-500">
          Se repérer sur le campus
        </h3>
        <p className="text-white/70 text-lg mb-10 leading-relaxed font-medium">
          Utilisez notre carte interactive pour localiser précisément chaque bâtiment, salle de cours et service administratif. Planifiez votre itinéraire en un clic.
        </p>
        <button className="bg-white text-primary px-10 py-5 rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] flex items-center gap-4 hover:bg-secondary-container hover:scale-105 active:scale-95 transition-all shadow-xl">
          <Map className="h-5 w-5" />
          <span>Consulter le plan interactif</span>
          <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-transform" />
        </button>
      </div>

      {/* Abstract Background Visual */}
      <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 pointer-events-none transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmDF5yjBDDgIvAPbxdDeHfuEBBbK5qVACJK6QYlJOojCj7PRh-oBEz4_yG48jfvnHX167APkmlLK73b6YXa-Reoil6aGAerfcfnpx7U4T56SeWz02qdhOZv84wDzOXMDNf8JAlANZkg7-cbZFJ1pWXRlvrBG7RsYUias92yGwDYmjE0-MqKOOTazlu4YiWR_Xq0CHewr8-sFYjlHXIV76RILJWOrBC-2_lg-qWq3X4WNt8bx_qNhUyhUj8PgseJ0CM0Z8nEEDdf4I" 
          alt="Campus Map Overlay" 
          className="h-full w-full object-cover grayscale invert"
        />
      </div>
      
      {/* Decorative Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-transparent pointer-events-none" />
    </div>
  )
}
