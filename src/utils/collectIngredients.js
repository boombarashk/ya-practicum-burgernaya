export default function collectIngredients(baseIngredient, ingredients) {
  return JSON.stringify({
    ingredients: [
      baseIngredient._id,
      ...ingredients.map((instance) => instance._id),
      baseIngredient._id,
    ],
  });
}
