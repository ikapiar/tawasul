import {useEffect, useRef} from "react";
import {debounce} from "../lib/utils";

export function useDebounce<T extends (...args: never[]) => never | void>(
    fn: T,
    wait: number
) {
    const fnRef = useRef(fn)
    useEffect(() => { fnRef.current = fn }, [fn])

    const debouncedRef = useRef<ReturnType<typeof debounce<T>>>()

    if (!debouncedRef.current) {
        debouncedRef.current = debounce(((...args: Parameters<T>) => fnRef.current(...args)) as T, wait)
    }

    useEffect(() => {
        return () => debouncedRef.current?.cancel()
    })

    return debouncedRef.current!
}