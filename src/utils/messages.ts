import { Settings } from "../hooks/settings";

export const start = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab) {
        throw new Error('No active tab found');
    }

    chrome.tabs.sendMessage(tab.id!, { action: 'start' }, (_) => { });
}

export const stop = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab) {
        throw new Error('No active tab found');
    }

    chrome.tabs.sendMessage(tab.id!, { action: 'stop' }, (_) => { });
}

export const commentPosts = async (settingsFactory: () => Settings) => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab) {
        throw new Error('No active tab found');
    }

    const settings = settingsFactory();

    chrome.tabs.sendMessage(tab.id!, { action: 'comment-posts', settings }, (response) => {
        if (response.running) {

            // wait for 10 seconds before processing the next page
            setTimeout(() => {

                console.log('Processing next page');
                commentPosts(settingsFactory);
            }, 10000);
        }
    });

};
