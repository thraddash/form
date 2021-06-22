import React from "react";
import NewRecipeForm from "./NewRecipeForm";
import NewImage from "./NewImage";
import "./styles.css";

export default function App() {
    return (
        <div>
            <NewRecipeForm />
        <br></br>
            <NewImage />
        </div>
    )
}