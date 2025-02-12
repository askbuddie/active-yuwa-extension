import { createReactiveStorage } from "../utils/reactive-storage";


export type Settings = {
    postSelector: string;
    authorSelector: string;
    contentSelector: string;
    timestampSelector: string;
    reactionsSelector: string;
    commentsSelector: string;
    sharesSelector: string;
    urlSelector: string;
    maxReactions: number;
    maxComments: number;
    maxShares: number;
};

export const defaultSettings: Settings = {
    postSelector: '[role="article"]',
    authorSelector: "",
    contentSelector: "",
    timestampSelector: "",
    reactionsSelector: "",
    commentsSelector: "",
    sharesSelector: "",
    urlSelector: "",
    maxReactions: 0,
    maxComments: 0,
    maxShares: 0
};


export const useSettings = () => {
    return createReactiveStorage<Settings>('settings', defaultSettings);
};
