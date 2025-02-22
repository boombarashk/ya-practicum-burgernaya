import { TIngredient } from "./types";

export default function collectIngredients(
  baseIngredient: TIngredient,
  ingredients: TIngredient[],
): string {
  return JSON.stringify({
    ingredients: [
      baseIngredient._id,
      ...ingredients.map((instance) => instance._id),
      baseIngredient._id,
    ],
  });
}
