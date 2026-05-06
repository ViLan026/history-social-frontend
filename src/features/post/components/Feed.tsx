import CreatePost from "./CreatePost";
import PostList from "./PostList";

export default function Feed() {
    return (
        <div className="space-y-6">
            <CreatePost />
            <PostList />
        </div>
    );
}
