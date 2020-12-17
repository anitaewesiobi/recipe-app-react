import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import axios from 'axios';
import Recipe from './Recipe'
import styled from "styled-components";
import homeImg from '../assets/home-background.jpg'
import logo from "../assets/logo.png"


function RecipeModule(props) {
    const [searchBar, setSearchBar] = useState(false)
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [query, setQuery] = useState('')
    useEffect(() => {
        getRecipes()
    }, [query])

    const getRecipes = async () => {
        // if the query is empty then get random if not then pass query into api string
        if (query) {
            axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
                .then(response => {
                    setRecipes(response.data.meals)
                    setLoading(false)
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            axios.all([
                axios.get('https://www.themealdb.com/api/json/v1/1/random.php'),
                axios.get('https://www.themealdb.com/api/json/v1/1/random.php'),
                axios.get('https://www.themealdb.com/api/json/v1/1/random.php'),
                axios.get('https://www.themealdb.com/api/json/v1/1/random.php'),
                axios.get('https://www.themealdb.com/api/json/v1/1/random.php'),
            ])
                .then(responseArr => {
                    setRecipes(responseArr.map(item => {
                        return item.data.meals[0]
                    }))
                    setLoading(false)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
    const updateSearch = (e) => {
        setSearch(e.target.value)
    }
    const getSearch = (e) => {
        e.preventDefault()
        setQuery(search)
    }
    const searchToggle = (e) => {
        setSearchBar(!searchBar)
    }
    return (
        <Homepage className="
        ">
            {searchBar ? <form className="search-form" onSubmit={getSearch}>
                <div className="search-input-container">
                    <button className="search-button fas fa-arrow-left"></button>
                    <input type="text" className="search-bar" onChange={updateSearch} value={search} ref={input => input && input.focus()} placeholder="Im Craving... " />
                </div>
                <ul className=" my-5">
                    {recipes.map(item => {
                        return <Link to={`/${item.strMeal}`}>
                            <div className="my-5">{item.strMeal}</div>
                        </Link>
                    })}
                </ul>
            </form> : null}
            <header className="">
                <div className="logo"></div>
            </header>
            <div className="headline text-center mt-3">Recipes of the Day</div>
            <button className="search-toggle" onClick={searchToggle}><span className="fas fa-search"></span></button>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    {recipes.map(item => {
                        return <Link to={`/${item.strMeal}`} className="col-md-4 text-center px-0 px-md-4" >
                            <Recipe
                                title={item.strMeal}
                                img={item.strMealThumb}
                                key={item.idMeal}
                            />
                        </Link>
                    })}
                </div>
            </div>

        </Homepage>
    );
}
const Homepage = styled.div`
header{
    background: url(${homeImg}) no-repeat center center; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    height: 30vh;
}
.logo{
    background: url(${logo}) no-repeat center center; 
    height: 28vh;
    transform: scale(.5);

}
.headline{
color: #636363;
font-style: italic;
}
a{
    text-decoration: none!important;
    color: black!important;
}
.search-toggle{

    height: 70px;
    width: 70px;
    border: 1px red;
    border-radius: 50%;
    background: red;
    position: fixed;
    bottom: 4vh;
    right: 5vw;
    z-index: 999;
    
}
.search-button {
   border: 0;
   background: transparent;
   color: white; 
   font-size: 25px;
   padding: 0px 16px;
   vertical-align: middle;
}
.search-input-container{
    background-color: grey;
}
input{
    height: 60px;
    background: transparent;
    border: none;
    color: white
}
input::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: white !important;
    opacity: 1; /* Firefox */
  }
  
  input:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: white;
  }
  
  input::-ms-input-placeholder { /* Microsoft Edge */
    color: white;
  }
`;

export default RecipeModule;