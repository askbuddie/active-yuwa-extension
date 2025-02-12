import { createReactiveStorage } from "../utils/reactive-storage";
import { Post } from "../utils/scraper";

export const usePosts = () => {
    return createReactiveStorage<Post[]>('posts', []);
}
