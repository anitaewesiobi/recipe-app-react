import React from 'react';
import { useState, useEffect } from 'react'
import styled from "styled-components"
import axios from 'axios'
import { useHistory } from "react-router-dom";

function RecipeDetail({ match }) {

    let history = useHistory();
    const [details, setDetails] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getDetails()
    }, [])
    useEffect(() => {
        console.log(details)
    }, [loading])

    const sortIng = () => {
        let ingredients = [];
        for (var i = 1; i <= 20; i++) {
            if (details[`strIngredient${i}`]) {
                ingredients.push(`${details[`strMeasure${i}`]} ${details[`strIngredient${i}`]}`)
            }
        }
        return ingredients
    }
    const getDetails = async () => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${match.params.id}`)
            .then(response => {
                setDetails(response.data.meals[0])
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
    }
    var list = sortIng();

    return (
        <DetailContainer>{!loading && <div>
            
            <div className="row detail-header py-3 px-2 icons">
                <div className="col-6 fas fa-arrow-left text-left d-inline-block " onClick={() => history.goBack()}></div>
                <div className="col-6 far fa-heart d-inline-block text-right"></div>
            </div>

            
            <div className="row">
            <div className="img-container col-md-6"><img src={details.strMealThumb} alt={details.strMeal} /></div>
                <div className="col-md-6">
                <div className="meal-title py-2 px-2 ">{details.strMeal}</div>
            <ul className="text-left px-2 ">
                {
                    list.map(ingredient => {
                        return <div className="ingredient">{ingredient}</div>
                    })
                }
            </ul>
                </div>
            </div>
            
            <div className="meal-title">Directions</div>
            <div className="instructions"> {details.strInstructions}</div>
        </div>}</DetailContainer>
    );
}
const DetailContainer = styled.div`
.instructions{
    font-size: 20px;
}
.icons{
    font-size: 26px;
    color: white;
}
.title{
    font-weight: 600;
    color: black;
}
a{
    text-decoration: none!important;
}
.img{
    position: absolute;
}
.img-container{
    height: 24vh;

    max-width: 100%;
    overflow: hidden; 
}
.detail-header{
    background-color: grey;
    
}
.text-right{
    text-align: right;
}
.meal-title{
    font-weight: 600;
    font-size: 30px;
}
.ingredient{
    font-size:20px;
}
/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
.img-container{
    height: 75vh;
}
}
`

export default RecipeDetail;