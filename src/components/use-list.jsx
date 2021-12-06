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

    return {list, addList, deleteList, setList};
}

export default useList;