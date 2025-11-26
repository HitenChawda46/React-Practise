import { useCallback, useRef } from "react";

export default function useThrottle(fn, delay = 500) {
    const shouldWait = useRef(false);
    const waitingArgs = useRef(null);
    const timeoutFn = useCallback(() => {
        if (!waitingArgs.current) {
            shouldWait.current = false;
        } else {
            fn(...waitingArgs.current);
            waitingArgs.current = null;
            setTimeout(timeoutFn, delay);
        }
    }, [fn, delay]);
    const throttledFn = useCallback((...args) => {
        if (shouldWait.current) {
            waitingArgs.current = args;
            return;
        }
        fn(...args);
        shouldWait.current = true;
        setTimeout(timeoutFn, delay);
    }, [fn, delay, timeoutFn]);
    return throttledFn;
}