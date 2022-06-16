import React, {useContext} from 'react';
import styles from './Search.module.scss';
import close from '../../assets/img/close.svg';
import {SearchContext} from "../../App";

const Search = () => {
    const {searchValue, setSearchValue} = useContext(SearchContext)
    return (
        <div className={styles.root}>
            <input value={searchValue} onChange={(evt) => setSearchValue(evt.target.value)} className={styles.input}
                   placeholder="Поиск пиццы..."/>
            {searchValue && <img onClick={() => setSearchValue('')} className={styles.clearIcon} src={close} />}
        </div>
    );
};

export default Search;