import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = ({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-4">
        {Array.from({ length: columns }).map((_, j) => (
          <Skeleton key={j} className="h-8 flex-1 bg-muted/50" />
        ))}
      </div>
    ))}
  </div>
);

export default LoadingSkeleton;
