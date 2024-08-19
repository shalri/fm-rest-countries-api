import Skeleton from "./Skeleton";

export default function SkeletonCountryCard() {
  return (
    <div className="mt-8 border-gray-600 bg-white dark:bg-rc-dark-blue-dm pb-16 mb-8 rounded-lg overflow-hidden md:w-[265px]">
      <Skeleton className="w-full aspect-[4/3]" />
      <Skeleton className="w-[30%] h-[18px] mt-8 ml-7" />

      <div className="flex flex-col space-y-4 mt-8 ml-7">
        <Skeleton className="w-[40%] h-4" />
        <Skeleton className="w-[50%] h-4" />
        <Skeleton className="w-[32%] h-4" />
      </div>
    </div>
  )
}

