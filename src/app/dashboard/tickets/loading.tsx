export default function TicketsLoading() {
  return (
    <div className="w-full h-full p-10 animate-pulse space-y-12">
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <div className="h-12 w-80 bg-surface-container-high rounded-2xl" />
          <div className="h-6 w-96 bg-surface-container-low rounded-xl" />
        </div>
        <div className="h-14 w-48 bg-primary/20 rounded-2xl" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-white rounded-[2.5rem] border border-outline-variant/10 shadow-sm" />
          ))}
        </div>
        <div className="space-y-8">
          <div className="h-96 bg-surface-container-low rounded-[3rem]" />
          <div className="h-64 bg-primary/5 rounded-[2.5rem]" />
        </div>
      </div>
    </div>
  )
}
