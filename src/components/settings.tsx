import { defaultSettings, Strategy, useSettings } from "../hooks/settings";
import { Pill } from "./pill";
import { Input } from "./forms/input";
import { RadioGroup } from "./forms/radio-group";
import { ErrorBoundary } from "./error-boundary";
import { Accordion } from "./accordion";
import { Textarea } from "./forms/textarea";

export const Settings: React.FC = () => {

    const [settings, setSettings] = useSettings();


    const strategies = [
        { label: 'Based on QuerySelector', value: 'query' },
        { label: 'Based on Regex', value: 'regex' }
    ];

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                <ErrorBoundary>
                    <Accordion heading="Post Selector Settings" open subheading="CSS Selector for finding posts inside the document">
                        <Input id="postSelector"
                            label="Post Selector"
                            hint="CSS selector for the post element"
                            value={settings.postSelector}
                            onChange={value => setSettings({ postSelector: value })} />
                    </Accordion>

                    <Accordion heading="Post Content Selector Settings" subheading="Settings for CSS/Regex selectors for extracting data from a post dom element">
                        <Input id="authorSelector"
                            label="Author Selector"
                            hint="CSS selector or regular expression for the author name"
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
                            hint="CSS selector or regular expression for the post content"
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
                            hint="CSS selector or regular expression for the post timestamp"
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
                            hint="CSS selector or regular expression for the post reactions"
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
                            hint="CSS selector or regular expression for the post comments"
                            value={settings.commentsSelector}
                            onChange={value => setSettings({ commentsSelector: value })} />

                        <RadioGroup
                            hint="Determines how to extract the post comments"
                            options={strategies.map(s => ({ id: `comments${s.value}`, label: s.label, value: s.value }))}
                            selected={settings.commentsStrategy}
                            label="Comments Selection Strategy"
                            onChange={(value: string) => setSettings({ commentsStrategy: value as Strategy })} />
                    </Accordion>

                    <Accordion heading="Post Thresholds Settings" subheading="Crietria for selecting posts to be commented on">


                        <Input id="maxReactions"
                            label="Maximum Reactions"
                            hint="Posts with reactions above this threshold will not be commented on"
                            value={settings.maxReactions.toString()}
                            onChange={value => setSettings({ maxReactions: parseInt(value) })} />

                        <Input id="maxComments"
                            label="Maximum Comments"
                            hint="Posts with comments above this threshold will not be commented on"
                            value={settings.maxComments.toString()}
                            onChange={value => setSettings({ maxComments: parseInt(value) })} />

                    </Accordion>

                    <Accordion heading="Post Boosting Settings" subheading="Text to be added to the post content">
                        <Textarea id="boostComment"
                            label="Boost Comment"
                            hint="Text to be added to the post content"
                            value={settings.boostComment}
                            onChange={value => setSettings({ boostComment: value })} />
                    </Accordion>

                </ErrorBoundary>

                <Pill active={true} onClick={() => { setSettings(defaultSettings) }}>Reset to Default Settings</Pill>
            </div>
        </div>
    )
};
