import React from "react";
import Ingredients from "./components/Ingredients";
import { Routes, Route } from "../node_modules/react-router-dom/dist/index";
import ViewMeal from "./components/ViewMeal";

function App() {
  return (
    <>
      <Routes>
        <Route path="/recipe-finder/" element={<Ingredients />}></Route>
        <Route path="/recipe-finder/viewmeal" element={<ViewMeal />}></Route>
      </Routes>
    </>
  );
}

export default App;
