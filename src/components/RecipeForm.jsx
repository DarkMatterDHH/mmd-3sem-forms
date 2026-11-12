"use client";
import postRecipe from "../actions/action";
import { useActionState, useEffect, useState } from "react";

const initialState = {
  success: null,
  message: "",
  fieldErrors: {},
};

const RecipeForm = () => {
  const [state, postRecipeAction] = useActionState(postRecipe, initialState);
  const [formFields, setFormFields] = useState({
    recipeName: "",
    recipeDescription: "",
    recipeIngredients: "",
  });

  useEffect(() => {
    if (state.success) {
      setFormFields({
        recipeName: "",
        recipeDescription: "",
        recipeIngredients: "",
      });
    }
  }, [state]);

  return (
    <form action={postRecipeAction} className="flex flex-col gap-2">
      <input
        type="text"
        name="recipename"
        placeholder="Opskriftens titel"
        className="border"
        value={formFields.recipeName}
        onChange={(event) =>
          setFormFields({ ...formFields, recipeName: event.target.value })
        }
        aria-invalid={Boolean(state.fieldErrors?.recipeName?.length)}
        aria-describedby={
          state.fieldErrors?.recipeName?.length ? "recipeName-error" : undefined
        }
      />
      {state.fieldErrors?.recipeName?.[0] && (
        <p id="recipeName-error" className="text-red-700">
          {state.fieldErrors.recipeName[0]}
        </p>
      )}
      <input
        type="text"
        name="recipedescription"
        placeholder="Opskriftens beskrivelse"
        className="border"
        value={formFields.recipeDescription}
        onChange={(event) =>
          setFormFields({
            ...formFields,
            recipeDescription: event.target.value,
          })
        }
        aria-invalid={Boolean(state.fieldErrors?.recipeDescription?.length)}
        aria-describedby={
          state.fieldErrors?.recipeDescription?.length
            ? "recipeDescription-error"
            : undefined
        }
      />
      {state.fieldErrors?.recipeDescription?.[0] && (
        <p id="recipeDescription-error" className="text-red-700">
          {state.fieldErrors.recipeDescription[0]}
        </p>
      )}
      <input
        type="text"
        name="recipeingredients"
        placeholder="Ingredienser"
        className="border"
        value={formFields.recipeIngredients}
        onChange={(event) =>
          setFormFields({
            ...formFields,
            recipeIngredients: event.target.value,
          })
        }
        aria-invalid={Boolean(state.fieldErrors?.recipeIngredients?.length)}
        aria-describedby={
          state.fieldErrors?.recipeIngredients?.length
            ? "recipeIngredients-error"
            : undefined
        }
      />
      {state.fieldErrors?.recipeIngredients?.[0] && (
        <p id="recipeIngredients-error" className="text-red-700">
          {state.fieldErrors.recipeIngredients[0]}
        </p>
      )}
      <button type="submit" className="border">
        Opret opskrift
      </button>
      {state.message && (
        <p
          role="status"
          aria-live="polite"
          className={state.success ? "text-green-600" : "text-red-600"}
        >
          {state.message}
        </p>
      )}
    </form>
  );
};

export default RecipeForm;
