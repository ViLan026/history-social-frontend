// features/post/components/Feed.tsx
import CreatePost from "./CreatePost";
import PostList from "./PostList";

export default function Feed() {
  return (
    <div className="space-y-4 md:space-y-5 lg:space-y-6">
      <CreatePost />
      <PostList />
    </div>
  );
}