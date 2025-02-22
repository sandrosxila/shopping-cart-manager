import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = () => {
  return (
    <div className="flex flex-col space-y-3 max-w-[320px] max-h-[260px]">
      <Skeleton className="h-[125px] w-[320px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[300px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[225px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </div>
  );
};

type SkeletonCardsProps = {
  length: number;
};

export const SkeletonCards = ({ length }: SkeletonCardsProps) => (
  <>
    {Array.from({ length }).map((_, idx) => (
      <SkeletonCard key={idx}/>
    ))}
  </>
);
