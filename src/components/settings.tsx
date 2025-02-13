import { defaultSettings, Strategy, useSettings } from "../hooks/settings";
import { Pill } from "./pill";
import { usePosts } from "../hooks/posts";
import { Input } from "./forms/input";
import { RadioGroup } from "./forms/radio-group";
import { ErrorBoundary } from "./error-boundary";

export const Settings: React.FC = () => {

    const [settings, setSettings] = useSettings();
    const [, setPosts] = usePosts();


    const strategies = [
        { label: 'Based on QuerySelector', value: 'query' },
        { label: 'Based on Regex', value: 'regex' }
    ];

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-6">
                <ErrorBoundary>
                    <div className="flex flex-col gap-4">
                        <div className="pb-4 border-b border-gray-300 dark:border-gray-700">
                            <h2 className="text-lg font-roboto font-semibold">Post Selector</h2>
                        </div>

                        <Input id="postSelector"
                            label="Post Selector"
                            hint="CSS selector for the post element"
                            value={settings.postSelector}
                            onChange={value => setSettings({ postSelector: value })} />
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
                            onChange={value => setSettings({ authorSelector: value })} />


                        <RadioGroup
                            hint="Determines how to extract the author name"
                            options={strategies.map(s => ({ id: `author${s.value}`, label: s.label, value: s.value }))}
                            selected={settings.authorStrategy}
                            label="Author Selection Strategy"
                            onChange={(value: string) => setSettings({ authorStrategy: value as Strategy })} />

                        <Input id="contentSelector"
                            label="Content Selector"
                            hint="CSS selector for the post content"
                            value={settings.contentSelector}
                            onChange={value => setSettings({ contentSelector: value })} />

                        <RadioGroup
                            hint="Determines how to extract the post content"
                            options={strategies.map(s => ({ id: `content${s.value}`, label: s.label, value: s.value }))}
                            selected={settings.contentStrategy}
                            label="Content Selection Strategy"
                            onChange={(value: string) => setSettings({ contentStrategy: value as Strategy })} />

                        <Input id="timestampSelector"
                            label="Timestamp Selector"
                            hint="CSS selector for the post timestamp"
                            value={settings.timestampSelector}
                            onChange={value => setSettings({ timestampSelector: value })} />

                        <RadioGroup
                            hint="Determines how to extract the post timestamp"
                            options={strategies.map(s => ({ id: `timestamp${s.value}`, label: s.label, value: s.value }))}
                            selected={settings.timestampStrategy}
                            label="Timestamp Selection Strategy"
                            onChange={(value: string) => setSettings({ timestampStrategy: value as Strategy })} />


                        <Input id="reactionsSelector"
                            label="Reactions Selector"
                            hint="CSS selector for the post reactions"
                            value={settings.reactionsSelector}
                            onChange={value => setSettings({ reactionsSelector: value })} />

                        <RadioGroup
                            hint="Determines how to extract the post reactions"
                            options={strategies.map(s => ({ id: `reactions${s.value}`, label: s.label, value: s.value }))}
                            selected={settings.reactionsStrategy}
                            label="Reactions Selection Strategy"
                            onChange={(value: string) => setSettings({ reactionsStrategy: value as Strategy })} />

                        <Input id="commentsSelector"
                            label="Comments Selector"
                            hint="CSS selector for the post comments"
                            value={settings.commentsSelector}
                            onChange={value => setSettings({ commentsSelector: value })} />

                        <RadioGroup
                            hint="Determines how to extract the post comments"
                            options={strategies.map(s => ({ id: `comments${s.value}`, label: s.label, value: s.value }))}
                            selected={settings.commentsStrategy}
                            label="Comments Selection Strategy"
                            onChange={(value: string) => setSettings({ commentsStrategy: value as Strategy })} />

                        <Input id="sharesSelector"
                            label="Shares Selector"
                            hint="CSS selector for the post shares"
                            value={settings.sharesSelector}
                            onChange={value => setSettings({ sharesSelector: value })} />

                        <RadioGroup
                            hint="Determines how to extract the post shares"
                            options={strategies.map(s => ({ id: `shares${s.value}`, label: s.label, value: s.value }))}
                            selected={settings.sharesStrategy}
                            label="Shares Selection Strategy"
                            onChange={(value: string) => setSettings({ sharesStrategy: value as Strategy })} />

                        <Input id="urlSelector"
                            label="URL Selector"
                            hint="CSS selector for the post URL"
                            value={settings.urlSelector}
                            onChange={value => setSettings({ urlSelector: value })} />

                        <RadioGroup
                            hint="Determines how to extract the post URL"
                            options={strategies.map(s => ({ id: `url${s.value}`, label: s.label, value: s.value }))}
                            selected={settings.urlStrategy}
                            label="URL Selection Strategy"
                            onChange={(value: string) => setSettings({ urlStrategy: value as Strategy })} />
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
                            onChange={value => setSettings({ maxReactions: parseInt(value) })} />

                        <Input id="maxComments"
                            label="Minimum Comments"
                            hint="Posts with comments below this threshold will not be displayed"
                            value={settings.maxComments.toString()}
                            onChange={value => setSettings({ maxComments: parseInt(value) })} />

                        <Input id="maxShares"
                            label="Minimum Shares"
                            hint="Posts with shares below this threshold will not be displayed"
                            value={settings.maxShares.toString()}
                            onChange={value => setSettings({ maxShares: parseInt(value) })} />

                    </div>

                </ErrorBoundary>
                <div className="flex flex-col gap-4 mt-8">
                    <Pill active={true} onClick={() => { setSettings(defaultSettings) }}>Reset to Default Settings</Pill>
                </div>

                <div className="flex flex-col gap-4 mt-4">
                    <Pill active={false} onClick={() => { setPosts([]); }}>Clear Stored Posts</Pill>
                </div>

            </div>
        </div>
    )
};
