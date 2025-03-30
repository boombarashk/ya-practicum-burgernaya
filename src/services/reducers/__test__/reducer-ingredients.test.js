import { DATA_URL } from "../../../consts";
import ingredientsReducer, { initialIngredientsState } from "../ingredients";

const mockIngredients = [
  { id: 1, price: 1 },
  { id: 4, price: 2 },
];

describe("ingredients reducer", () => {
  it("should return the initial state", () => {
    expect(ingredientsReducer(undefined, { type: "" })).toEqual(
      initialIngredientsState,
    );
  });

  it("should set ingredients", () => {
    expect(
      ingredientsReducer(undefined, {
        type: `${DATA_URL}/fulfilled`,
        payload: mockIngredients,
      }),
    ).toEqual({ loading: false, data: mockIngredients });
  });

  it("should set loading", () => {
    expect(
      ingredientsReducer(undefined, { type: `${DATA_URL}/pending` }).loading,
    ).toBeTruthy();
  });

  it("should reset loading", () => {
    expect(
      ingredientsReducer(undefined, { type: `${DATA_URL}/rejected` }).loading,
    ).toBeFalsy();
  });
});
