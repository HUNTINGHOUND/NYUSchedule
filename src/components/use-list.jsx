import {useState, useCallback} from 'react';

/**
 * Use hook to reuse the same code for list states. Basically providing helper functions for manipulating list states.
 * @param {*} initList The initial list to use
 */
const useList = (initList) => {
    const [list, setList] = useState(initList);

    /**
     * Add an item to the list
     */
    const addList = useCallback(item => {
        setList(prev => {
            return [...prev, item]
        });
    }, [setList]);

    /**
     * Delete the index from the list. 
     */
    const deleteList = useCallback(index => {
        if(index < 0 || index >= list.length) return;
        setList(prev => {
            // create new array
            var newarr = [...prev];
            newarr.splice(index, 1);
            return newarr;
        });
    }, [setList.apply, list.length]);

    /**
     * Update element at the index
     */
    const updateList = useCallback(
        (index, val) => {
            setList(prev => {
                var newarr = [...prev];
                newarr[index] = val;
                return newarr;
            })
        },
        [setList],
    );

    /**
     * Concatenate another list to the current list 
     */
    const concatList = useCallback(
        (list) => {
            setList(prev => [...prev, ...list]
            )
        },
        [setList],
    )

    return {list, addList, deleteList, updateList, concatList, setList};
}

export default useList;