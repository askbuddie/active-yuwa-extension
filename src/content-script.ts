import { Settings } from './hooks/settings';
import { fetchPosts } from './utils/scraper';

type Message<T> = {
    type: string;
    data: T;
}

const onFetchPosts = (payload: Message<Settings>, sendResponse: (data?: any) => void) => {

    console.log('FETCH_POSTS message received', payload);

    const settings: Settings = payload.data;
    const posts = fetchPosts(document, settings);

    sendResponse({
        type: 'POSTS',
        data: posts
    });
}

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
    switch (message.type) {
        case 'FETCH_POSTS':
            onFetchPosts(message, sendResponse);
            break;
        default:
    }
});

const observer = new MutationObserver(() => {

    console.log('DOM changed, sending DOM_CHANGED message');

    chrome.runtime.sendMessage({
        type: 'DOM_CHANGED'
    })
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

