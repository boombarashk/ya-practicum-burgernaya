import reducer, {
  initialCurrentIngredientState,
  setCurrentIngredient,
  resetCurrentIngredient,
} from "../currentIngredient";

const mockIngredient = { id: 1, price: 1 };

describe("currentIngredient reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(
      initialCurrentIngredientState,
    );
  });

  it("should reset state", () => {
    expect(
      reducer(
        { ingredient: mockIngredient },
        { type: resetCurrentIngredient.type },
      ),
    ).toEqual(initialCurrentIngredientState);
  });

  it("should set state", () => {
    expect(
      reducer(undefined, {
        type: setCurrentIngredient.type,
        payload: mockIngredient,
      }),
    ).toEqual({ ingredient: mockIngredient });
  });
});
