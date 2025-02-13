import React from "react";
import Ingredients from "./components/Ingredients";
import { Routes, Route } from "../node_modules/react-router-dom/dist/index";
import ViewMeal from "./components/ViewMeal";

function App() {
  return (
    <Routes>
      <Route path="/recipe-finder">
        <Route index element={<Ingredients />}></Route>
        <Route path="viewmeal" element={<ViewMeal />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
