import CreatePost from "../post/CreatePost";
import PostList from "../post/PostList";

export default function Feed() {
    return (
        <div className="space-y-6">
            <CreatePost />
            <PostList />
        </div>
    );
}
