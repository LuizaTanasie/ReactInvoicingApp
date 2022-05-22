import { useState, useCallback } from "react";

export const enum ActionState {
    IDLE="idle",
    PENDING="pending",
    SUCCESS="success",
    ERROR="error"
}

export const useAsync = <T, I>(
    asyncFunction: (params: I) => Promise<T>
) => {
    const [ value, setValue ] = useState<null | T>(null);
    const [ status, setStatus ] = useState<ActionState>(ActionState.IDLE)
    const [ error, setError ] = useState<null | string>(null)

    const execute = useCallback((params: I) => {
        setStatus(ActionState.PENDING)
        setError(null)
        setValue(null)
        asyncFunction(params)
            .then((genericResponse) => {
                setStatus(ActionState.SUCCESS)
                setValue(genericResponse)
            })
            .catch((err) => {
                setStatus(ActionState.ERROR)
                setError(err)
            })
    }, [asyncFunction])

    return { value, status, error, execute }
}
