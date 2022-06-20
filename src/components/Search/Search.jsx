import React, {useCallback, useRef, useState} from 'react';
import styles from './Search.module.scss';
import close from '../../assets/img/close.svg';
import debounce from 'lodash.debounce';
import {useDispatch, useSelector} from "react-redux";
import {setSearchValue} from "../../redux/slices/filterSlice";

const Search = () => {
    const dispatch = useDispatch();
    const searchValue = useSelector(state => state.filterSlice.searchValue)
    const [value, setValue] = useState('');
    const inputRef = useRef();

    const updateSearchValue = useCallback(
        debounce((str) => {
            dispatch(setSearchValue(str))
        }, 250), []
    )

    const onChangeInput = event => {
        setValue(event.target.value)
        updateSearchValue(event.target.value)
    }

    const onClickClear = () => {
        dispatch(setSearchValue(''))
        setValue('')
        inputRef.current.focus();
    }


    return (
        <div className={styles.root}>
            <input ref={inputRef} value={value} onChange={onChangeInput} className={styles.input}
                   placeholder="Поиск пиццы..."/>
            {searchValue && <img alt="крестик" onClick={onClickClear} className={styles.clearIcon} src={close} />}
        </div>
    );
};

export default Search;