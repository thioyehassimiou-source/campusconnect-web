interface AttendanceData {
  day: string
  value: number
  label: string
  isHighlight?: boolean
}

const data: AttendanceData[] = [
  { day: 'Lun', value: 60, label: '7.2k' },
  { day: 'Mar', value: 85, label: '10.4k' },
  { day: 'Mer', value: 95, label: '12k', isHighlight: true },
  { day: 'Jeu', value: 70, label: '8.8k' },
  { day: 'Ven', value: 90, label: '11.1k' },
  { day: 'Sam', value: 35, label: '4.2k' },
  { day: 'Dim', value: 25, label: '3.1k' },
]

export function AttendanceChart() {
  return (
    <div className="bg-surface-container-lowest p-8 rounded-[2rem] shadow-sm h-[450px] flex flex-col border border-outline-variant/5">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-xl font-black font-headline text-on-surface tracking-tight">Fréquentation du campus</h3>
          <p className="text-sm text-on-surface-variant font-medium">Trafic moyen hebdomadaire par bâtiment</p>
        </div>
        <select className="bg-surface-container-low border-none rounded-xl text-xs font-bold py-2 px-4 outline-none focus:ring-2 focus:ring-primary/10">
          <option>7 derniers jours</option>
          <option>30 derniers jours</option>
        </select>
      </div>
      
      <div className="flex-1 flex items-end justify-between gap-4 px-2">
        {data.map((item) => (
          <div key={item.day} className="flex-1 flex flex-col items-center gap-3 h-full justify-end">
            <div 
              className={`
                w-full rounded-t-xl transition-all duration-500 relative group
                ${item.isHighlight ? 'bg-primary' : 'bg-surface-container-high hover:bg-primary-container'}
              `}
              style={{ height: `${item.value}%` }}
            >
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                {item.label}
              </div>
            </div>
            <span className={`text-[10px] font-black uppercase tracking-wider ${item.isHighlight ? 'text-primary' : 'text-on-surface-variant'}`}>
              {item.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
