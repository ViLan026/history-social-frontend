// features/post/components/Feed.tsx
import CreatePostModal from "../../ui/components/CreatePostModal";
import PostList from "./PostList";

export default function Feed() {
    return (
        <div className="">
            <CreatePostModal />
            <PostList />
        </div>
    );
}
