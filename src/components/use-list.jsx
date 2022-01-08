import {useState, useCallback} from 'react';

const useList = (initList) => {
    const [list, setList] = useState(initList);

    const addList = useCallback(item => {
        setList(prev => {
            return [...prev, item]
        });
    }, [setList]);

    const deleteList = useCallback(index => {
        setList(prev => {
            // create new array
            var newarr = [...prev];
            newarr.splice(index, 1);
            return newarr;
        });
    }, [setList]);

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