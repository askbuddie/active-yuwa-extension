import { createReactiveStorage } from "../utils/reactive-storage";

// determines how to extract data from the page
export type Strategy = 'query' | 'regex';

export type Settings = {
    postSelector: string;

    authorSelector: string;
    authorStrategy: Strategy;

    contentSelector: string;
    contentStrategy: Strategy;

    timestampSelector: string;
    timestampStrategy: Strategy;

    reactionsSelector: string;
    reactionsStrategy: Strategy;

    commentsSelector: string;
    commentsStrategy: Strategy;

    sharesSelector: string;
    sharesStrategy: Strategy;

    urlSelector: string;
    urlStrategy: Strategy;

    maxReactions: number;
    maxComments: number;
    maxShares: number;
};

export const defaultSettings: Settings = {
    postSelector: '[role="article"]',
    authorSelector: "",
    authorStrategy: 'query',
    contentSelector: "",
    contentStrategy: 'query',
    timestampSelector: "",
    timestampStrategy: 'query',
    reactionsSelector: "",
    reactionsStrategy: 'query',
    commentsSelector: "",
    commentsStrategy: 'query',
    sharesSelector: "",
    sharesStrategy: 'query',
    urlSelector: "",
    urlStrategy: 'query',
    maxReactions: 0,
    maxComments: 0,
    maxShares: 0
};


export const useSettings = () => {
    return createReactiveStorage<Settings>('settings', defaultSettings);
};
