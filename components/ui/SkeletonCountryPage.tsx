
import { AnimatePresence, motion } from "framer-motion";
import Skeleton from "./Skeleton";

export default function SkeletonCountryCard() {
  return (
    <motion.div className="mt-16 px-7">
      <Skeleton className="w-full aspect-[4/3]" />
      <Skeleton className="w-[30%] h-8 mt-8" />

      <div className="flex flex-col space-y-4 mt-6">
        <Skeleton className="w-[40%] h-4" />
        <Skeleton className="w-[50%] h-4" />
        <Skeleton className="w-[32%] h-4" />
        <Skeleton className="w-[58%] h-4" />
        <Skeleton className="w-[35%] h-4" />
      </div>
      <div className="flex flex-col space-y-4 mt-12">
        <Skeleton className="w-[43%] h-4" />
        <Skeleton className="w-[32%] h-4" />
        <Skeleton className="w-[65%] h-4" />
      </div>

      <div className="flex flex-col mt-10">
        <Skeleton className="w-[40%] h-6" />
        <div className="flex space-x-3 mt-4">
          <Skeleton className="w-[30%] h-8" />
          <Skeleton className="w-[30%] h-8" />
          <Skeleton className="w-[30%] h-8" />
        </div>
      </div>
    </motion.div>
  )
}
