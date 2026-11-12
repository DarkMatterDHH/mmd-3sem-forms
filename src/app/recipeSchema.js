import { z } from "zod";

export const recipeSchema = z.object({
  recipeName: z.string().trim().min(1, "Opskriftens titel skal udfyldes."),
  recipeDescription: z
    .string()
    .trim()
    .min(1, "Opskriftens beskrivelse skal udfyldes."),
  recipeIngredients: z
    .string()
    .trim()
    .min(1, "Ingredienser skal udfyldes."),
});
