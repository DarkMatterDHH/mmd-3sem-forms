"use server";

import { z } from "zod";
import { recipeSchema } from "../app/recipeSchema";

const postRecipe = async (_previousState, formData) => {
  const validation = recipeSchema.safeParse({
    recipeName: formData.get("recipename"),
    recipeDescription: formData.get("recipedescription"),
    recipeIngredients: formData.get("recipeingredients"),
  });

  if (!validation.success) {
    return {
      success: false,
      message: "",
      fieldErrors: z.flattenError(validation.error).fieldErrors,
    };
  }

  const { recipeName } = validation.data;

  try {
    const response = await fetch("https://dummyjson.com/recipes/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: recipeName,
        description: validation.data.recipeDescription,
        ingredients: validation.data.recipeIngredients,
      }),
    });

    const responseText = await response.text();
    let responseData;
    let responseIsJson = false;
    try {
      responseData = JSON.parse(responseText);
      responseIsJson = true;
    } catch {
      responseData = null;
    }

    const serverMessage =
      typeof responseData?.message === "string"
        ? responseData.message
        : responseIsJson
          ? ""
          : responseText.trim();

    if (!response.ok) {
      return {
        success: false,
        message:
          serverMessage ||
          `Fejl ved oprettelse af opskrift: ${response.status}, ${response.statusText}`,
      };
    }

    return {
      success: true,
      message: serverMessage || `Opskriften "${recipeName}" blev oprettet.`,
    };
  } catch (error) {
    console.error("Fejl ved oprettelse af opskrift:", error);
    return {
      success: false,
      message: `Fejl ved oprettelse af opskrift: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
};

export default postRecipe;
