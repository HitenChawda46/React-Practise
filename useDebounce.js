import { useRef } from "react";

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