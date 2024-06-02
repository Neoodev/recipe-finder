import React, { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";

export type Meal = {
  strMeal: string;
  strMealThumb: string;
  idMeal: number;
};
type ViewMeal = {
  strMeal: string;
  strDrinkAlternate: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
};

export interface IMealContext {
  ingredients: Meal[];
  setIngredients: (meals: Meal[]) => void;
  searchText: string;
  setSearchText: (text: string) => void;
  render: boolean;
  error: string;
  setError: (text: string) => void;
  meal: ViewMeal;
  setMeal: (text: object) => void;
}

const initialState = {
  ingredients: [],
  setIngredients: () => {},
  searchText: "",
  setSearchText: () => {},
  render: false,
  error: "",
  setError: () => {},
  meal: {},
  setMeal: () => {},
};

const FoodContext = createContext<IMealContext>(initialState);

const retrievedSearch =
  JSON.parse(localStorage.getItem("queryIngredient")) || "";
const retrievedMeal = JSON.parse(localStorage.getItem("mealName")) || {};

const MainContextProvider = ({ children }: React.ReactNode) => {
  const [ingredients, setIngredients] = useState<Meal[]>([]);
  const [meal, setMeal] = useState(retrievedMeal);
  const [searchText, setSearchText] = useState<string>(retrievedSearch);
  const [render, shouldRender] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchText) {
        mealsRecipe();
      } else {
        shouldRender(false);
      }
    }, 1500);

    localStorage.setItem("queryIngredient", JSON.stringify(searchText));

    return () => clearTimeout(delay);
  }, [searchText]);

  useEffect(() => {
    localStorage.setItem("mealName", JSON.stringify(meal));
  }, [meal]);
  const mealsRecipe = async (): Promise<void> => {
    setLoading(true);
    await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`
    )
      .then((res) => res.json())
      .then((json) => {
        setIngredients(json.meals);
        shouldRender(true);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
      <FoodContext.Provider
        value={{
          ingredients,
          setIngredients,
          searchText,
          setSearchText,
          render,
          error,
          setError,
          meal,
          setMeal,
          loading,
        }}
      >
        {children}
      </FoodContext.Provider>
    </>
  );
};
export { FoodContext, MainContextProvider };
