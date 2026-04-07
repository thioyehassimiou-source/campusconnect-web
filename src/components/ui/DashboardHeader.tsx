interface DashboardHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
}

export function DashboardHeader({ title, description, children }: DashboardHeaderProps) {
  return (
    <div className="sm:flex sm:items-center sm:justify-between mb-8">
      <div>
        <h1 className="text-3xl font-black text-on-surface tracking-tight">{title}</h1>
        {description && (
          <p className="mt-2 text-sm text-on-surface-variant">
            {description}
          </p>
        )}
      </div>
      {children && (
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          {children}
        </div>
      )}
    </div>
  )
}
