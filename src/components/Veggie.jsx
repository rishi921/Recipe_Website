import {useEffect, useState} from "react";
import React from 'react'
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import {Link} from "react-router-dom";

function Veggie() {

  const[veggie,setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {

    const check = localStorage.getItem('veggie');

    if(check){
      setVeggie(JSON.parse(check));
    }
    else{
      //This is to fetch recipe from api and &number=12 will fetch 12 recipes
    const api = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`
      );
      const data = await api.json();

      localStorage.setItem('veggie',JSON.stringify(data.recipes));

      setVeggie(data.recipes);
      console.log(data.recipes);
    }
  };

  return (
    <div>
      <Wrapper>
        <h3>OUR VEGETARIAN PICKS</h3>
        <Splide
          options = {{
            perPage: 3,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "5rem",
          }}
        >
          {veggie.map((recipe) => {
            return(
              <SplideSlide key={recipe.id}>
                <Card>
                <Link to={"/recipe/" + recipe.id}>
                  <p style={{marginBottom:'4px'}}>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                  <Gradient/>
                </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 5rem 0rem;

  h3{
    text-align: center;
    font-size: 40px;
  }
`;
const Card =styled.div`
  min-height: 18rem;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  
  img{
    border-radius: 1rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p{
    position: down;
    z-index: 10;
    left: 0%;
    bottom: 0%

    color: white;
    width: 100%;
    text-align: centre;
    font-weight: 600;
    font-size: 20px;
    height: 40%;
    display: flex;
  }
`;

const Gradient = styled.div`
  z-index:3;
  position:absolute;
  width:100%;
  height:100%;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`;

export default Veggie;