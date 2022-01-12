import {useState} from "react";

export function useDebounceTime<S>(timeInMS: number, initialVal: S | undefined = undefined) {
    const [val, setVal] = useState<S | undefined>(initialVal);
    let timeout: NodeJS.Timeout;

    const setDebounced = (val: S) => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            setVal(val);
        }, timeInMS);
    }

    return [val, setDebounced] as [S | undefined, (val: S) => void];
}
