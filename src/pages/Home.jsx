import React, {useContext, useEffect, useState} from 'react';
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination/Pagination";
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage} from "../redux/slices/filterSlice";
import axios from "axios";

const Home = () => {

    const { categoryId, sort, currentPage } = useSelector(state => state.filterSlice)
    const dispatch = useDispatch();
    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (page) => {
        dispatch(setCurrentPage(page))
    }

    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const {searchValue} = useContext(SearchContext)

    useEffect(() => {
        setIsLoading(true)

        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const sortBy = sort.sortProperty.replace('-', '')
        const category = categoryId > 0 ? `&category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        axios.get(`https://62a9d80d3b314385543cca25.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then(response => {
                setItems(response.data)
                setIsLoading(false)
            })
        window.scrollTo(0, 0);
    }, [categoryId, sort, searchValue, currentPage])

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? [...new Array(6)].map((_, i) => <Skeleton key={i}/>)
                        : items.map(obj => (
                            <PizzaBlock key={obj.id} {...obj} />
                        ))
                }
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    );
};

export default Home;