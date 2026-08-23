export default function ScenariosLoading() {
  return (
    <div className="space-y-6 animate-pulse" aria-label="Loading Disruption Simulator...">
      {/* Header Skeleton */}
      <div className="h-24 rounded-2xl bg-white border border-slate-200 p-6 flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-6 w-64 bg-slate-200 rounded-md" />
          <div className="h-4 w-96 bg-slate-100 rounded-md" />
        </div>
        <div className="h-8 w-40 bg-slate-100 rounded-lg" />
      </div>

      {/* Control Panel Skeleton */}
      <div className="h-48 rounded-2xl bg-white border border-slate-200 p-6" />

      {/* KPI Shock Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 rounded-2xl bg-white border border-slate-200 p-4" />
        ))}
      </div>
    </div>
  );
}
