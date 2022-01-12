import {DependencyList, EffectCallback, useState, useEffect as nativeUseEffect} from "react";

declare const UNDEFINED_VOID_ONLY: unique symbol;
type AsyncDestructor = () => Promise<void> | Promise<{ [UNDEFINED_VOID_ONLY]: never }>;
type AsyncEffectCallback = () => (Promise<void> | AsyncDestructor);

export function useEffect<S>(effect: AsyncEffectCallback | EffectCallback, deps?: DependencyList) {
    nativeUseEffect(() => {
        effect();
    }, deps)
}

export function useEffectExceptFirst<S>(effect: AsyncEffectCallback | EffectCallback, deps?: DependencyList) {
    const [skip, setSkip] = useState(true)
    nativeUseEffect(() => {
        if(skip) {
            setSkip(false);
            return;
        }
        effect();
    }, deps)
}
