import React from 'react';
import styles from './Search.module.scss';
import close from '../../assets/img/close.svg';

const Search = ({searchValue, setSearchValue}) => {
    return (
        <div className={styles.root}>
            <input value={searchValue} onChange={(evt) => setSearchValue(evt.target.value)} className={styles.input}
                   placeholder="Поиск пиццы..."/>
            {searchValue && <img onClick={() => setSearchValue('')} className={styles.clearIcon} src={close} />}
        </div>
    );
};

export default Search;