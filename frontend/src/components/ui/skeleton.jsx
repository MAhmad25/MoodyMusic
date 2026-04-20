import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
      return <div data-slot="skeleton" className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
}

export default function SkeletonTable() {
      return (
            <div className="flex w-full max-w-sm flex-col gap-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                        <div className="flex gap-4" key={index}>
                              <Skeleton className="h-4 flex-1" />
                              <Skeleton className="h-4 w-24" />
                              <Skeleton className="h-4 flex-1" />
                              <Skeleton className="h-4 w-24" />
                              <Skeleton className="h-4 flex-1" />
                              <Skeleton className="h-4 w-24" />
                              <Skeleton className="h-4 flex-1" />
                        </div>
                  ))}
            </div>
      );
}
