// features/post/components/PostListSkeleton.tsx
export default function PostListSkeleton() {
  return (
    <div className="space-y-4 md:space-y-5">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="rounded-lg md:rounded-xl bg-card border border-border p-4 md:p-5 lg:p-6 animate-pulse"
        >
          <div className="h-6 md:h-7 w-2/3 bg-surface rounded-lg" />
          <div className="mt-3 md:mt-4 space-y-2.5">
            <div className="h-4 bg-surface rounded-lg" />
            <div className="h-4 bg-surface rounded-lg" />
            <div className="h-4 w-5/6 bg-surface rounded-lg" />
          </div>
          <div className="mt-4 md:mt-5 flex gap-2">
            <div className="h-7 w-20 bg-surface rounded-full" />
            <div className="h-7 w-24 bg-surface rounded-full" />
          </div>
          <div className="mt-4 md:mt-5 h-10 bg-surface rounded-lg" />
        </div>
      ))}
    </div>
  );
}