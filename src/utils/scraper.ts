import { Settings, Strategy } from "../hooks/settings";

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
    article: HTMLDivElement;
}

export const fetchPosts = (document: Document, settings: Settings): Post[] => {

    const { postSelector } = settings;

    const articles: NodeListOf<HTMLDivElement> = document.querySelectorAll(postSelector);

    return Array.from(articles).map((article: HTMLDivElement) => extractPost(article, settings));
}

type ExtractionStrategy = {
    query: (article: HTMLDivElement, selector: string) => any;
    regex: (article: HTMLDivElement, selector: string) => any;
}

type Fields = 'author' | 'content' | 'timestamp' | 'reactions' | 'comments' | 'url';

const strategies: Record<Fields, ExtractionStrategy> = {
    author: {
        query: (article: HTMLDivElement, selector: string) => asString(article.querySelector(selector)?.textContent),
        regex: (article: HTMLDivElement, selector: string) => {
            const regex = new RegExp(selector);
            const match = regex.exec(article.innerHTML);
            return match ? match[1] : '';
        }
    },
    content: {
        query: (article: HTMLDivElement, selector: string) => asString(article.querySelector(selector)?.textContent),
        regex: (article: HTMLDivElement, selector: string) => {
            const regex = new RegExp(selector);
            const match = regex.exec(article.innerHTML);
            return match ? match[1] : '';
        }
    },
    timestamp: {
        query: (article: HTMLDivElement, selector: string) => asString(article.querySelector(selector)?.textContent),
        regex: (article: HTMLDivElement, selector: string) => {
            const regex = new RegExp(selector);
            const match = regex.exec(article.innerHTML);
            return match ? match[1] : '';
        }
    },
    reactions: {
        query: (article: HTMLDivElement, selector: string) => asNumber(article.querySelector(selector)?.textContent),
        regex: (article: HTMLDivElement, selector: string) => {
            const regex = new RegExp(selector);
            const match = regex.exec(article.innerHTML);
            return match ? asNumber(match[1]) : 0;
        }
    },
    comments: {
        query: (article: HTMLDivElement, selector: string) => asNumber(article.querySelector(selector)?.textContent),
        regex: (article: HTMLDivElement, selector: string) => {
            const regex = new RegExp(selector);
            const match = regex.exec(article.innerHTML);
            return match ? asNumber(match[1]) : 0;
        }
    },
    url: {
        query: (article: HTMLDivElement, selector: string) => asString(article.querySelector(selector)?.getAttribute('href')),
        regex: (article: HTMLDivElement, selector: string) => {
            const regex = new RegExp(selector);
            const match = regex.exec(article.innerHTML);
            return match ? asString(match[1]) : '';
        }
    }
}

export const extractPost = (article: HTMLDivElement, settings: Settings): Post => {

    const {
        authorSelector,
        contentSelector,
        timestampSelector,
        reactionsSelector,
        commentsSelector,

        authorStrategy,
        contentStrategy,
        timestampStrategy,
        reactionsStrategy,
        commentsStrategy,
    } = settings;

    const extract = (strategy: Strategy, selector: string, field: Fields) => {

        const { query, regex } = strategies[field];

        if (strategy === 'query') {
            return query(article, selector);
        }

        if (strategy === 'regex') {
            return regex(article, selector);
        }

        throw new Error(`Unknown strategy: ${strategy}`);
    }

    return {
        author: extract(authorStrategy, authorSelector, 'author'),
        content: extract(contentStrategy, contentSelector, 'content'),
        timestamp: extract(timestampStrategy, timestampSelector, 'timestamp'),
        reactions: extract(reactionsStrategy, reactionsSelector, 'reactions'),
        comments: extract(commentsStrategy, commentsSelector, 'comments'),
        article
    }
}
