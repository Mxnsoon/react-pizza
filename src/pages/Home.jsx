import React, {useContext, useEffect, useRef} from 'react';
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import Pagination from "../components/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {selectFilter, setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import qs from 'qs';
import {useNavigate} from "react-router-dom";
import {fetchPizzas, selectPizzaData} from "../redux/slices/pizzasSlice";

const Home = () => {
    const navigate = useNavigate()
    const isSearch = useRef(false)
    const isMounted = useRef(false)
    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter)
    const {items, status} = useSelector(selectPizzaData)
    const dispatch = useDispatch();
    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (page) => {
        dispatch(setCurrentPage(page))
    }


    const getPizzas = async () => {
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const sortBy = sort.sortProperty.replace('-', '')
        const category = categoryId > 0 ? `&category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''
        dispatch(fetchPizzas({
            order,
            sortBy,
            category,
            search,
            currentPage
        }))
    }

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)
            dispatch(setFilters(
                {...params, sort}))
            isSearch.current = true
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!isSearch.current) {
            getPizzas();
        }
        isSearch.current = false
    }, [categoryId, sort, searchValue, currentPage])

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true;
    }, [categoryId, sort, searchValue, currentPage])

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === 'error' ?
                    <div className="content__error-info">
                        <h2>Произошла ошибка <icon>😕</icon></h2>
                        <p>
                            Не удалось получить пиццы.
                        </p>
                    </div> : <div className="content__items">
                        {
                            status === 'loading'
                                ? [...new Array(6)].map((_, i) => <Skeleton key={i}/>)
                                : items.map(obj => (
                                    <PizzaBlock key={obj.id} {...obj} />
                                ))
                        }
                    </div>
            }
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    );
};

export default Home;