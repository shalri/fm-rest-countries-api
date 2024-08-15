import { cn } from "@/lib/utils";

export default function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("animate-pulse bg-gray-300 dark:bg-rc-dark-blue-dm", className)} {...props} />
  )
}
