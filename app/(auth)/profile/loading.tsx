import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="justify-self-center">
      <div className="rounded p-4 m-3">
        {/* Avatar */}
        <Skeleton className="w-44 h-44 rounded-full mx-auto" />

        {/* Name */}
        <div className="pt-4 text-center font-bold text-lg">
          <Skeleton className="h-6 w-[200px] mx-auto rounded" />
        </div>

        {/* Email */}
        <div className="pt-2 text-center text-[10px]">
          <Skeleton className="h-4 w-[150px] mx-auto rounded" />
        </div>

        {/* Logout Button */}
        <div className="mt-6 p-3 px-5 text-center bg-appbar-blue rounded-full">
          <Skeleton className="h-6 w-[60px] mx-auto rounded-full" />
        </div>
      </div>
    </div>
  );
}
