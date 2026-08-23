export default function IntelligenceLoading() {
  return (
    <div className="space-y-6 animate-pulse" aria-label="Loading Geopolitical Intelligence...">
      {/* Header Skeleton */}
      <div className="h-24 rounded-2xl bg-white border border-slate-200 p-6 flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-6 w-64 bg-slate-200 rounded-md" />
          <div className="h-4 w-96 bg-slate-100 rounded-md" />
        </div>
        <div className="h-8 w-40 bg-slate-100 rounded-lg" />
      </div>

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 rounded-2xl bg-white border border-slate-200 p-4 space-y-3">
            <div className="h-4 w-24 bg-slate-200 rounded-md" />
            <div className="h-8 w-32 bg-slate-300 rounded-md" />
            <div className="h-3 w-40 bg-slate-100 rounded-md" />
          </div>
        ))}
      </div>

      {/* Main Signal Feed & Panels Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 h-96 rounded-2xl bg-white border border-slate-200 p-6" />
        <div className="lg:col-span-4 h-96 rounded-2xl bg-white border border-slate-200 p-6" />
      </div>
    </div>
  );
}
