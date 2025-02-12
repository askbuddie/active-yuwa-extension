import { Settings } from "../hooks/settings";

export const asString = (value: any): string => {
    return value?.toString() ?? '';
};
export const asNumber = (value: any): number => {
    return Number(value) || 0;
};

export type Post = {
    author: string;
    content: string;
    timestamp: string;
    reactions: number;
    comments: number;
    shares: number;
    url: string;
}

export const fetchPosts = (document: Document, settings: Settings): Post[] => {

    const articles: NodeListOf<HTMLDivElement> = document.querySelectorAll('[role="article"]');

    return Array.from(articles).map((article: HTMLDivElement) => extractPost(article, settings));
}

export const extractPost = (article: HTMLDivElement, settings: Settings): Post => {

    const {
        authorSelector,
        contentSelector,
        timestampSelector,
        reactionsSelector,
        commentsSelector,
        sharesSelector,
        urlSelector
    } = settings;

    return {
        author: asString(article.querySelector(authorSelector)?.textContent),
        content: asString(article.querySelector(contentSelector)?.textContent),
        timestamp: asString(article.querySelector(timestampSelector)?.textContent),
        reactions: asNumber(article.querySelector(reactionsSelector)?.textContent),
        comments: asNumber(article.querySelector(commentsSelector)?.textContent),
        shares: asNumber(article.querySelector(sharesSelector)?.textContent),
        url: asString(article.querySelector(urlSelector)?.getAttribute('href'))
    }
}
