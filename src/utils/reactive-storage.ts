import { useEffect, useState } from "react";

type ReactiveStorage<T> = [T, (val: Partial<T>) => void];

export const createReactiveStorage = <T extends object>(name: string, initialValue: T): ReactiveStorage<T> => {

    const [value, setValue] = useState<T>(initialValue);

    useEffect(() => {
        chrome.storage.local.get(name, (data: { [key: string]: T }) => {
            if (data[name] && data[name] !== value) {
                setValue(data[name]);
            }
        })
    }, []);

    const setter = (data: Partial<T>): void => {
        const newData = { ...value, ...data };

        chrome.storage.local.set({ [name]: data }).then(() => {
            setValue(newData);
        });
    }

    return [value, setter];
}
