import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from "react-router-dom";

  import './App.css'

  import Index from "./Pages/Index";
  import Login from "./Pages/Login";
  import Recipes from "./Pages/Recipes";
  import Recipe from "./Pages/Recipe";
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe/:id" element={<Recipe />} />
      </>
    )
  );
  


  export default function App() {
    return (
      <RouterProvider router={router} />
    )
  }

