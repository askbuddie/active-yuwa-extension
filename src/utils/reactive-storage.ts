import { useEffect, useState } from "react";

type ReactiveStorage<T> = [T, (val: T) => void];

export const createReactiveStorage = <T>(name: string, initialValue: T): ReactiveStorage<T> => {

    const [value, setValue] = useState<T>(initialValue);

    useEffect(() => {
        chrome.storage.local.get(name, (data: { [key: string]: T }) => {
            if (data[name] && data[name] !== value) {
                setValue(data[name]);
            }
        })
    }, []);

    chrome.storage.local.onChanged.addListener(changes => {
        if (changes[name] && changes[name].newValue !== value) {
            setValue(changes[name].newValue);
        }
    });

    const setter = (data: T): void => {

        setValue(data);

        chrome.storage.local.set({ [name]: data }).catch((e) => {
            console.log(e);
        });
    }

    return [value, setter];
}

