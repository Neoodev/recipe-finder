import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Ingredients from './components/Ingredients';
import { FoodContext, Meal } from './context/mainContext';
import { MainContextProvider } from './context/mainContext';
import { Routes, Route } from '../node_modules/react-router-dom/dist/index';
import ViewMeal from './components/ViewMeal';

function App(){

  return (
    <>
      <MainContextProvider>
        
        <Routes>
          
          <Route path="/" element={<Ingredients/>}></Route>
          <Route path="/viewmeal" element={<ViewMeal/>}></Route>

        </Routes>

      </MainContextProvider>

    </>
  )
}

export default App
