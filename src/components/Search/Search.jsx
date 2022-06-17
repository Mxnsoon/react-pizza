import React, {useCallback, useContext, useRef, useState} from 'react';
import styles from './Search.module.scss';
import close from '../../assets/img/close.svg';
import {SearchContext} from "../../App";
import debounce from 'lodash.debounce';

const Search = () => {
    const [value, setValue] = useState('');
    const {searchValue, setSearchValue} = useContext(SearchContext)
    const inputRef = useRef();

    const updateSearchValue = useCallback(
        debounce((str) => {
            setSearchValue(str)
        }, 250), []
    )

    const onChangeInput = event => {
        setValue(event.target.value)
        updateSearchValue(event.target.value)
    }

    const onClickClear = () => {
        setSearchValue('')
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