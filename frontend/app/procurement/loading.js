export default function ProcurementLoading() {
  return (
    <div className="space-y-6 animate-pulse" aria-label="Loading Adaptive Procurement...">
      {/* Header Skeleton */}
      <div className="h-24 rounded-2xl bg-white border border-slate-200 p-6 flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-6 w-64 bg-slate-200 rounded-md" />
          <div className="h-4 w-96 bg-slate-100 rounded-md" />
        </div>
        <div className="h-8 w-40 bg-slate-100 rounded-lg" />
      </div>

      {/* Control Panel Skeleton */}
      <div className="h-40 rounded-2xl bg-white border border-slate-200 p-6" />

      {/* Top Strategy Card Skeleton */}
      <div className="h-64 rounded-2xl bg-white border border-slate-200 p-6" />
    </div>
  );
}
