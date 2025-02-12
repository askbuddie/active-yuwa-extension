import { usePosts } from "../hooks/posts";
import { useSettings } from "../hooks/settings";

export const Posts: React.FC = () => {

    const [] = useSettings();

    const [posts] = usePosts();


    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-lg font-roboto font-semibold">Posts</h2>


            {Array.from(posts ?? []).map(post => {
                return (
                    <div key={post.url} className="flex flex-col gap-2 p-2 border border-gray-200 rounded-lg">
                        <h3 className="text-lg font-roboto font-semibold">{post.author}</h3>
                        <p className="text-gray-600">{post.content}</p>
                        <div className="flex flex-row gap-4">
                            <span className="text-gray-500">{post.timestamp}</span>
                            <span className="text-gray-500">{post.reactions} reactions</span>
                            <span className="text-gray-500">{post.comments} comments</span>
                            <span className="text-gray-500">{post.shares} shares</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
};
