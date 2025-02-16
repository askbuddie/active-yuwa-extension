import { Settings } from './hooks/settings';
import { fetchPosts, Post } from './utils/scraper';


const askbuddie_sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// @ts-ignore
const commentPost = async (post: Post, settings: Settings) => {

    console.log("Commenting on post:", post);
    const { article } = post;
    const { boostComment } = settings;


    let enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        which: 13,
        bubbles: true,
        cancelable: true,
    });

    const commentButton: HTMLDivElement | null = article.querySelector('div[role="textbox"][contenteditable="true"][data-lexical-editor="true"]');
    if (!commentButton) {
        console.error("Could not find the comment box for post:", article);
        return;
    }

    commentButton.focus();
    document.execCommand('selecctAll', false);
    document.execCommand('insertText', false, boostComment);
    commentButton.dispatchEvent(enterEvent);
}

const handleMessages = (message: any, _: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {

    if (message.action === 'stop') {
        // @ts-ignore
        window.ASK_BUDDIE_RUNNING = false;
        return sendResponse({
            running: false,
        });
    }

    if (message.action === 'status') {
        return sendResponse({
            // @ts-ignore
            running: window.ASK_BUDDIE_RUNNING,
        });
    }

    if (message.action === 'start') {
        // @ts-ignore
        window.ASK_BUDDIE_RUNNING = true;
        return sendResponse({
            running: true,
        });
    }

    // killswitch for the extension
    // @ts-ignore
    if (!window.ASK_BUDDIE_RUNNING) {
        return sendResponse({
            running: false,
        });
    }

    if (message.action === 'comment-posts') {

        const { maxReactions, maxComments, boostComment }: Settings = message.settings;

        if (boostComment.length === 0) {
            return sendResponse({
                error: "Boost comment is empty",
                running: false,
            });
        }

        const posts = fetchPosts(document, message.settings);

        const filteredPosts = posts
            .filter(({ author, reactions, comments }: Post) => {
                return author.length > 0 && reactions <= maxReactions && comments <= maxComments;
            });



        filteredPosts.map(async (post) => {
            const { article } = post;
            if (!article) {
                console.error("Could not find the article for post:", post);
                return;
            }

            // comment on the post 
            await commentPost(post, message.settings);

            // sleep for 2 seconds to avoid spamming
            await askbuddie_sleep(2000);


        });

        // scroll to the end to load more posts
        window.scrollTo(0, document.body.scrollHeight);


        return sendResponse({
            posts: filteredPosts,
            running: true,
        });
    }
};

chrome.runtime.onMessage.addListener(handleMessages);
