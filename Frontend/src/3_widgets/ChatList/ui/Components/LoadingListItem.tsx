import { Skeleton } from "@/6_shared/ui/Skeleton/Skeleton";
import { HStack } from "@/6_shared/ui/Stack";

interface LoadingListItemProps {
}

const LoadingListItem = (props : LoadingListItemProps) => {
  const skeletonArr = Array.from({ length: 8 });
  return (
    <>
      {skeletonArr.map((_, index) => (
        <HStack gap="16" key={index}>
          <Skeleton width={40} height={40} border="100%" />
          <Skeleton width={200} height={40} />
        </HStack>
      ))}
    </>
  );
};

export default LoadingListItem;
