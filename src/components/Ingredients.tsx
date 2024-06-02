import React, { Fragment } from "react";
import "../styles/Ingredients.css";
import { FoodContext } from "../context/mainContext";
import { useContext } from "react";
import { NavLink } from "../../node_modules/react-router-dom/dist/index";
import { Meal } from "../context/mainContext";

const Ingredients = () => {
  const {
    ingredients,
    setSearchText,
    render,
    searchText,
    meal,
    setMeal,
    error,
    loading,
  } = useContext(FoodContext);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleClick = (meal: Meal) => {
    setMeal(meal);
  };

  console.log(ingredients);
  return (
    <>
      <input
        type="search"
        placeholder="Search ingredient"
        onChange={(e) => handleChange(e)}
        className="searchBar"
        value={searchText}
      />
      <br />
      <>{error === "Invalid" ? <h1>Hey</h1> : ""}</>

      <div className="container">
        {loading && <h1>Loading...</h1>}
        {searchText === "" && !render ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1>Search any ingredient you want to cook above :)</h1>
          </div>
        ) : (
          <Fragment>
            {ingredients === null && !loading && render ? (
              <h1>Cannot find with that search.</h1>
            ) : render && !loading ? (
              ingredients?.map((ingredients) => (
                <div key={ingredients.idMeal} className="ingredient-block">
                  <a href={`viewmeal`} onClick={() => handleClick(ingredients)}>
                    <div>
                      <img
                        loading="lazy"
                        src={ingredients.strMealThumb}
                        alt={ingredients.strMeal}
                        className="ingredient-img"
                      />
                    </div>
                  </a>
                  <div className="foodName">
                    <h3
                      style={{
                        marginTop: 15,
                        width: 250,
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                      }}
                    >
                      {ingredients.strMeal}
                    </h3>
                  </div>
                </div>
              ))
            ) : (
              ""
            )}
          </Fragment>
        )}
      </div>
    </>
  );
};

export default Ingredients;
