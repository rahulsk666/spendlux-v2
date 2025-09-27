import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-4 p-4">
      {/* Content Area Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-52 w-full rounded" />
      </div>

      {/* Transaction Cards Skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-16 w-full rounded-full" />
        ))}
      </div>
    </div>
  );
}
