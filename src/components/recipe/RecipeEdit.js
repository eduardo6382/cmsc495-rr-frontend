import React from "react";
import RecipeForm from "./recipe_form/RecipeForm";

import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { editRecipe } from "../../redux/actions/recipes";

export default function RecipeEdit() {
  
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id)

  const { recipes } = useSelector((state) => state.recipes);
  console.log("test:", recipes)

  const recipe = recipes.filter((recipe) => recipe._id === id);

  console.log("is there a recipe?",recipe)
  const handleFormSubmit = (formData) => {
    dispatch(editRecipe(id, formData));
  };

  return (
    <div>
      <RecipeForm
        buttonLabel="Update"
        handleFormSubmit={handleFormSubmit}
        editMode={true}
        recipe={recipe}
      />
    </div>
  );
}
