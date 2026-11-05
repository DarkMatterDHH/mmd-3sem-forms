"use client";
import postRecipe from "../actions/action";

const RecipeForm = () => {
  return (
    <form action={postRecipe} className="flex flex-col gap-2">
      <input
        type="text"
        name="recipename"
        placeholder="Opskriftens titel"
        className="border"
      />
      <button type="submit" className="border">
        Opret opskrift
      </button>
    </form>
  );
};

export default RecipeForm;
