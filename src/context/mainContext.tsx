import React, { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";

export type Meal = {
  strMeal: string;
  strMealThumb: string;
  idMeal: number;
};
export type TViewMeal = {
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
  meal: TViewMeal;
  setMeal: (text: object) => void;
  loading: boolean;
}

const initialState: IMealContext = {
  ingredients: [],
  setIngredients: () => {},
  searchText: "",
  setSearchText: () => {},
  render: false,
  error: "",
  setError: () => {},
  meal: {
    strMeal: "",
    strCategory: "",
    strArea: "",
    strDrinkAlternate: "",
    strInstructions: "",
  },
  setMeal: () => {},
  loading: false,
};

const FoodContext = createContext<IMealContext>(initialState);

const retrievedSearch = JSON.parse(
  localStorage.getItem("queryIngredient") || ""
) as string;
const retrievedMeal = JSON.parse(
  localStorage.getItem("mealName" || "") as string
);
const MainContextProvider = ({ children }: { children: React.ReactNode }) => {
  console.log("hey", retrievedSearch);
  const [ingredients, setIngredients] = useState<Meal[]>([]);
  const [meal, setMeal] = useState(retrievedMeal);
  const [searchText, setSearchText] = useState<string>(retrievedSearch);
  const [render, shouldRender] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
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
