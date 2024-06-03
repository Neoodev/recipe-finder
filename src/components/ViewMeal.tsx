import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { FoodContext, ViewMeal } from "../context/mainContext";
import { NavLink } from "../../node_modules/react-router-dom/dist/index";
import "../styles/ViewMeal.css";
import logo1 from "../assets/instructions.png";
import { Meal, MealProp } from "../types/global.types";

const ViewMeal = () => {
  const { meal } = useContext(FoodContext);

  const retrievedViewMeal =
    JSON.parse(localStorage.getItem("viewMeal") as string) || {};
  const [mealName, setMealName] = useState(retrievedViewMeal);

  let strIngredients: string[];
  let strMeasurements: string[];
  useEffect(() => {
    const getMeal = async (): Promise<void> => {
      await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal.strMeal}`
      )
        .then((res) => res.json())
        .then((json) => setMealName(json));
    };
    getMeal();
  }, [meal]);

  useEffect(() => {
    localStorage.setItem("viewMeal", JSON.stringify(mealName));
  }, [mealName]);
  const { meals } = mealName;

  meals?.forEach((e: Meal) => {
    strMeasurements = [
      `${e.strMeasure1} ${e.strIngredient1}`,
      `${e.strMeasure2} ${e.strIngredient2}`,
      `${e.strMeasure3} ${e.strIngredient3}`,
      `${e.strMeasure4} ${e.strIngredient4}`,
      `${e.strMeasure5} ${e.strIngredient5}`,
      `${e.strMeasure6} ${e.strIngredient6}`,
      `${e.strMeasure7} ${e.strIngredient7}`,
      `${e.strMeasure8} ${e.strIngredient8}`,
      `${e.strMeasure9} ${e.strIngredient9}`,
      `${e.strMeasure10} ${e.strIngredient10}`,
      `${e.strMeasure11} ${e.strIngredient11}`,
      `${e.strMeasure12} ${e.strIngredient12}`,
      `${e.strMeasure13} ${e.strIngredient13}`,
      `${e.strMeasure14} ${e.strIngredient14}`,
      `${e.strMeasure15} ${e.strIngredient15}`,
      `${e.strMeasure16} ${e.strIngredient16}`,
      `${e.strMeasure17} ${e.strIngredient17}`,
      `${e.strMeasure18} ${e.strIngredient18}`,
      `${e.strMeasure19} ${e.strIngredient19}`,
      `${e.strMeasure20} ${e.strIngredient20}`,
    ];
  });
  meals?.forEach((e: Meal) => {
    strIngredients = [
      e.strIngredient1,
      e.strIngredient2,
      e.strIngredient3,
      e.strIngredient4,
      e.strIngredient5,
      e.strIngredient6,
      e.strIngredient7,
      e.strIngredient8,
      e.strIngredient9,
      e.strIngredient10,
      e.strIngredient11,
      e.strIngredient12,
      e.strIngredient13,
      e.strIngredient14,
      e.strIngredient15,
      e.strIngredient16,
      e.strIngredient17,
      e.strIngredient18,
      e.strIngredient19,
      e.strIngredient20,
    ];
  });

  function displayIngredient(): JSX.Element {
    return (
      <>
        {strMeasurements?.map((measure, index) => (
          <div key={index}>
            {measure === " null" ||
            measure.trim() === "" ||
            measure === "null null" ? (
              ""
            ) : (
              <li>{measure}</li>
            )}
          </div>
        ))}
      </>
    );
  }

  console.log(meals);
  return (
    <div>
      <button type="button">
        <NavLink to="/">Back</NavLink>
      </button>
      {meals?.map((meal: MealProp) => (
        <div key={meal.idMeal}>
          <div className="imageContainer">
            <div className="image-card" style={{ position: "relative" }}>
              <div
                className="overlay-image"
                style={{ backgroundImage: `url(${meal.strMealThumb})` }}
              >
                <div className="mealImage" style={{ height: 450, width: 450 }}>
                  <h1 className="meal-name">{meal.strMeal}</h1>

                  <div className="meal-details">
                    <h1 className="meal-category">{meal.strCategory}</h1>
                    <h1 className="meal-origin">{meal.strArea}</h1>
                  </div>
                </div>
              </div>
              {meal.strSource === "" || meal.strSource === null ? (
                ""
              ) : (
                <>
                  <h1 style={{ textAlign: "center", marginTop: 15 }}>
                    Meal Source:
                  </h1>
                  <NavLink to={`${meal.strSource}`}>
                    <p style={{ textAlign: "center", marginTop: 15 }}>
                      {meal.strSource}
                    </p>
                  </NavLink>
                </>
              )}
            </div>

            <br />
            <hr />
            <div className="textContainer">
              <br />
              <h1>Ingredients: </h1>
              <br />

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {strIngredients?.map((ingredient, index) => (
                  <div key={index}>
                    {ingredient === "" || ingredient === null ? (
                      ""
                    ) : (
                      <div className="ingredient-card">
                        <img
                          loading="lazy"
                          src={`//www.themealdb.com/images/ingredients/${ingredient}.png`}
                          width="150"
                          height="150"
                        />
                        <p>{ingredient}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <br />
          <br />

          <div className="instructions">
            <div className="instruction-block">
              <img
                src={logo1}
                alt="a instruction logo"
                width="150"
                height="150"
              />
              <h1>Instructions: </h1>
              <br />
              <p>{`${meal.strInstructions}`.replace(". ", "\n")}</p>
            </div>
            <div className="measurement-block">
              <img
                src={logo1}
                alt="a instruction logo"
                width="150"
                height="150"
              />
              <h1>Measurements: </h1>
              <br />
              <div className="measurement-text">
                <div style={{ textAlign: "start" }}>{displayIngredient()}</div>
              </div>
            </div>
            <div className="youtube-block">
              <h1>Watch on youtube</h1>
              <NavLink to={`${meal.strYoutube}`} style={{ color: "white" }}>
                Link here
              </NavLink>
            </div>
          </div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default ViewMeal;
