interface BuildingFiltersProps {
  buildings: string[]
  activeBuilding: string
  onSelect: (building: string) => void
}

export function BuildingFilters({ buildings, activeBuilding, onSelect }: BuildingFiltersProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
      <button 
        onClick={() => onSelect('all')}
        className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
          activeBuilding === 'all' 
            ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
            : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/10 font-medium hover:bg-surface-container-low'
        }`}
      >
        Tous les bâtiments
      </button>
      {buildings.map((building) => (
        <button
          key={building}
          onClick={() => onSelect(building)}
          className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
            activeBuilding === building
              ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
              : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/10 font-medium hover:bg-surface-container-low'
          }`}
        >
          {building}
        </button>
      ))}
    </div>
  )
}
