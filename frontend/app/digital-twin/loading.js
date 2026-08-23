export default function DigitalTwinLoading() {
  return (
    <div className="space-y-6 animate-pulse" aria-label="Loading Topological Digital Twin...">
      {/* Header Skeleton */}
      <div className="h-24 rounded-2xl bg-white border border-slate-200 p-6 flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-6 w-64 bg-slate-200 rounded-md" />
          <div className="h-4 w-96 bg-slate-100 rounded-md" />
        </div>
        <div className="h-8 w-40 bg-slate-100 rounded-lg" />
      </div>

      {/* Network Graph Skeleton */}
      <div className="h-96 rounded-2xl bg-slate-900 border border-slate-800 p-6" />

      {/* Controls & Metrics Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 h-48 rounded-2xl bg-white border border-slate-200" />
        <div className="lg:col-span-4 h-48 rounded-2xl bg-white border border-slate-200" />
      </div>
    </div>
  );
}
