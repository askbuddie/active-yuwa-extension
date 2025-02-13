import { useCallback } from "react";
import { defaultSettings, Settings as ISettings, useSettings } from "../hooks/settings";
import { Pill } from "./pill";
import { usePosts } from "../hooks/posts";
import { Input } from "./forms/input";

export const Settings: React.FC = () => {

    const [settings, setSettings] = useSettings();
    const [, setPosts] = usePosts();

    const hasChanged = useCallback((settings: ISettings, defaultSettings: ISettings) => {
        for (const key in settings) {
            if (settings[key as keyof typeof settings] !== defaultSettings[key as keyof ISettings]) {
                return true;
            }
        }
        return false;
    }, [settings]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-6">

                <div className="flex flex-col gap-4">
                    <div className="pb-4 border-b border-gray-300 dark:border-gray-700">
                        <h2 className="text-lg font-roboto font-semibold">Post Selector</h2>
                    </div>

                    <Input id="postSelector"
                        label="Post Selector"
                        hint="CSS selector for the post element"
                        value={settings.postSelector}
                        onChange={value => setSettings({ ...settings, postSelector: value })} />
                </div>

                <div className="flex flex-col gap-4">

                    <div className="pb-4 border-b border-gray-300 dark:border-gray-700">
                        <h2 className="text-lg font-roboto font-semibold">Post Content Selectors</h2>
                        <p className="text-xs text-gray-500">Following fields determine the CSS selectors for the post content. The selectors must be relative to the post html element</p>
                    </div>

                    <Input id="authorSelector"
                        label="Author Selector"
                        hint="CSS selector for the author name"
                        value={settings.authorSelector}
                        onChange={value => setSettings({ ...settings, authorSelector: value })} />

                    <Input id="contentSelector"
                        label="Content Selector"
                        hint="CSS selector for the post content"
                        value={settings.contentSelector}
                        onChange={value => setSettings({ ...settings, contentSelector: value })} />

                    <Input id="timestampSelector"
                        label="Timestamp Selector"
                        hint="CSS selector for the post timestamp"
                        value={settings.timestampSelector}
                        onChange={value => setSettings({ ...settings, timestampSelector: value })} />

                    <Input id="reactionsSelector"
                        label="Reactions Selector"
                        hint="CSS selector for the post reactions"
                        value={settings.reactionsSelector}
                        onChange={value => setSettings({ ...settings, reactionsSelector: value })} />

                    <Input id="commentsSelector"
                        label="Comments Selector"
                        hint="CSS selector for the post comments"
                        value={settings.commentsSelector}
                        onChange={value => setSettings({ ...settings, commentsSelector: value })} />

                    <Input id="sharesSelector"
                        label="Shares Selector"
                        hint="CSS selector for the post shares"
                        value={settings.sharesSelector}
                        onChange={value => setSettings({ ...settings, sharesSelector: value })} />

                    <Input id="urlSelector"
                        label="URL Selector"
                        hint="CSS selector for the post URL"
                        value={settings.urlSelector}
                        onChange={value => setSettings({ ...settings, urlSelector: value })} />
                </div>


                <div className="flex flex-col gap-4">
                    <div className="pb-4 border-b border-gray-300 dark:border-gray-700">
                        <h2 className="text-lg font-roboto font-semibold">Post Thresholds</h2>

                        <p className="text-xs text-gray-500">Following fields determine the criteria for displaying a post</p>
                    </div>

                    <Input id="maxReactions"
                        label="Minimum Reactions"
                        hint="Posts with reactions below this threshold will not be displayed"
                        value={settings.maxReactions.toString()}
                        onChange={value => setSettings({ ...settings, maxReactions: parseInt(value) })} />

                    <Input id="maxComments"
                        label="Minimum Comments"
                        hint="Posts with comments below this threshold will not be displayed"
                        value={settings.maxComments.toString()}
                        onChange={value => setSettings({ ...settings, maxComments: parseInt(value) })} />

                    <Input id="maxShares"
                        label="Minimum Shares"
                        hint="Posts with shares below this threshold will not be displayed"
                        value={settings.maxShares.toString()}
                        onChange={value => setSettings({ ...settings, maxShares: parseInt(value) })} />

                </div>

                {hasChanged(settings, defaultSettings) && (
                    <div className="flex flex-col gap-4 mt-8">
                        <Pill active={true} onClick={() => { setSettings(defaultSettings) }}>Reset to Default Settings</Pill>
                    </div>
                )}

                <div className="flex flex-col gap-4 mt-8">
                    <Pill active={false} onClick={() => { setPosts([]); }}>Clear Stored Posts</Pill>
                </div>
            </div>
        </div>
    )
};
