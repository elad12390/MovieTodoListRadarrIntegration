import {Context, useContext as nativeUseContext} from "react";
import {UseStateFunctionResult} from "../../components/Layout/App/App";

type GlobalStatesContext<T> = Context<{[key: string]: UseStateFunctionResult<T>}>;

export function useContext<T>(context: Context<T> | GlobalStatesContext<T>, key: string | null = null): T | UseStateFunctionResult<T> {
    if (key !== null) {
        const ctx = nativeUseContext(context as GlobalStatesContext<T>);
        if (ctx?.[key] !== null) {
            return ctx[key];
        }
    }
    return nativeUseContext(context as Context<T>);
}
