import { useCallback, useEffect, useRef } from "react";

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

export function useThrottle2(value, delay = 500) {
    const [internalValue, setInternalValue] = useState(value);
    const shouldWait = useRef(false);
    const waitingValue = useRef(null);
    const timeoutFn = useCallback(() => {
        if (!waitingValue.current) {
            shouldWait.current = false;
        } else {
            setInternalValue(waitingValue.current);
            waitingValue.current = null;
            setTimeout(timeoutFn, delay);
        }
    }, [delay]);

    useEffect(() => {
        if (shouldWait.current) {
            waitingValue.current = value;
            return;
        }
        setInternalValue(value);
        shouldWait.current = true;
        setTimeout(timeoutFn, delay);
    }, [value, delay, timeoutFn]);

    return internalValue;
}