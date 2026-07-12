export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-[10px] bg-bg-elevated ${className}`}
    />
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative flex min-h-[70vh] items-center overflow-hidden bg-bg-elevated">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <Skeleton className="mx-auto mb-4 h-6 w-40" />
        <Skeleton className="mx-auto mb-4 h-14 w-3/4" />
        <Skeleton className="mx-auto mb-8 h-5 w-1/2" />
        <div className="flex justify-center gap-4">
          <Skeleton className="h-11 w-36" />
          <Skeleton className="h-11 w-36" />
        </div>
      </div>
    </div>
  );
}

export function SectionSkeleton({ rows = 1 }: { rows?: number }) {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Skeleton className="mx-auto mb-3 h-5 w-32" />
        <Skeleton className="mx-auto mb-8 h-10 w-2/3" />
        <div className={`grid gap-6 ${rows > 1 ? "sm:grid-cols-2 lg:grid-cols-3" : ""}`}>
          {Array.from({ length: rows || 1 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Skeleton className="mx-auto mb-3 h-5 w-32" />
        <Skeleton className="mx-auto mb-12 h-10 w-2/3" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3 rounded-[10px] border border-border-subtle p-6 text-center">
              <Skeleton className="mx-auto h-12 w-12 rounded-[10px]" />
              <Skeleton className="mx-auto h-8 w-24" />
              <Skeleton className="mx-auto h-4 w-32" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
