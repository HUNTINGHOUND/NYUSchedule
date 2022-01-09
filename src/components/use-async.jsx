import { useState, useCallback, useEffect} from "react";

/**
 * Async use hook calls the asynchronous function you supply to it while setting the status. 
 * There are four states:
 * - idle
 * - pending
 * - success
 * - error
 * 
 * Idle is only set before the function is ever called. These status allow users to disable certain features before a request is complete, especially if
 * the request is long.
 * @param {*} asyncFunction asynchronous function to be executed
 * @param {*} immediate whether or not the function is to be executed immediately
 */
const useAsync = (asyncFunction, immediate = true) => {
    const [status, setStatus] = useState("idle");
    const [value, setValue] = useState(null);
    const [error, setError] = useState(null);
    
    /**
     * Execute the given function. Set the value, error, and status appropriately.
     */
    const execute = useCallback(
        () => {
            setStatus("pending");
            setValue(null);
            setError(null);

            return asyncFunction()
                .then((response) => {
                    setValue(response);
                    setStatus("success");
                })
                .catch((error) => {
                    setError(error);
                    setStatus("error");
                })
        },
        [asyncFunction],
    )

    /**
     * Check if on mount the function needs to be executed immediately.
     */
    useEffect(() => {
        if(immediate) {
            execute();
        }
    }, [execute, immediate]);

    return {execute, status, value, error};
}

export default useAsync;