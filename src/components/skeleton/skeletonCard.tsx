import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

function SkeletonCard() {
  return (
    <>
      {Array(6).fill(0).map((_, i) => (
        <div key={i} className="mb-4 flex h-auto flex-col gap-3 rounded-lg border-2 border-gray-200 p-6 font-supreme shadow-transparent transition-colors hover:border-blue-600 hover:bg-slate-50">
          <h3 className="text-2xl font-semibold"><Skeleton /></h3>
          <span><Skeleton /></span>
        </div>
      ))
      }
    </>
  )
}

export { SkeletonCard }
