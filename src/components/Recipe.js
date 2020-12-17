import React from 'react';
import styled from "styled-components";
function Recipe({title,img}) {
    return (
        <RecipeContainer className="my-3">
            <p className="card-text title my-3">{title}</p>
        <div className="text-center img-cont my-3">
        <img src={img} alt={title}/>
      </div>
      
        </RecipeContainer>

    );
}
const RecipeContainer = styled.div`
.title{
    font-weight: 600;
    color: black;
}
a{
    text-decoration: none!important;
}
img{

}
.img-cont{
height: 25vh;
    max-width: 100%;
    overflow: hidden; 
      margin-left: auto;
  margin-right: auto;
  position: relative;
}

`
export default Recipe;