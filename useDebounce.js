import { useEffect, useRef, useState } from "react";

export default function useDebounce(fn, delay = 500) {
    const timeout = useRef();
    const debouncedFn = useCallback((...args) => {
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            fn(...args);
        }, delay);
    }, [fn, delay]);
    return debouncedFn;
}


export function useDebounce2(value, delay = 500) {
    const [internalValue, setInternalValue] = useState(value);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setInternalValue(value);
        }, delay);
        return () => {
            clearTimeout(timeout);
        };
    }, [value, delay]);
    return internalValue;
}