import findByParam from "./findByParam";
import { TCard, TIngredientFullInfo, TOrder } from "./types";

// расчет стоимости и приведение orders к типу TCard
export default function formatOrder(
  order: TOrder,
  ingredientsData: TIngredientFullInfo[] | null | undefined,
): TCard {
  const price = order.ingredients.reduce((sum, ingredientId) => {
    if (ingredientsData === null || typeof ingredientsData === "undefined") {
      return sum;
    }
    return (sum += findByParam(ingredientsData, ingredientId)?.price ?? 0);
  }, 0);

  return {
    orderId: `${order.number}`,
    name: order.name,
    date: order.createdAt,
    ingredients: order.ingredients,
    status: order.status,
    price,
  };
}
