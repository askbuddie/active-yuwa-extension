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

    maxReactions: number;
    maxComments: number;

    boostComment: string;
};

export const defaultSettings: Settings = {
    postSelector: '[role="article"][aria-labelledby]',
    authorSelector: '[data-ad-rendering-role="profile_name"]',
    authorStrategy: 'query',
    contentSelector: '[data-ad-rendering-role="story_message"]',
    contentStrategy: 'query',
    timestampSelector: '/aria-label="(\d+[dmyh])"/g',
    timestampStrategy: 'regex',
    reactionsSelector: 'div[data-visualcompletion="ignore-dynamic"] span div span[aria-hidden=true]',
    reactionsStrategy: 'query',
    commentsSelector: 'div[data-visualcompletion="ignore-dynamic"] div div div span div div div span span',
    commentsStrategy: 'query',
    maxReactions: 5,
    maxComments: 5,
    boostComment: '🚀 boosting the reach #boost'
};


export const useSettings = () => {
    const [settings, setSettings] = createReactiveStorage<Settings>('settings', defaultSettings);

    const setter = (data: Partial<Settings>): void => {
        setSettings({ ...settings, ...data });
    };

    return [settings, setter] as const;
};
