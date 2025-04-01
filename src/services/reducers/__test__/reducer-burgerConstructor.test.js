import { IngredientTypeEnum } from "../../../utils/types";
import reducer, {
  initialConstructorState,
  resetConstructor,
  addIngredient,
  deleteIngredient,
  sortIngredients,
} from "../burgerConstructor";

const mockBun = {
  _id: "123",
  price: 100,
  label: undefined,
  image: "/somePath",
};
const mockIngredient = {
  _id: "111",
  price: 200,
  label: "sauce",
  image: "/somePath",
}; // type: IngredientTypeEnum.SAUCE
const mockState = {
  data: [mockIngredient],
  baseIngredient: mockBun,
  counters: { [mockBun._id]: 2, [mockIngredient._id]: 1 },
  finalPrice: 2 * mockBun.price + mockIngredient.price,
};

describe("burgerConstructor reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialConstructorState);
  });

  it("should reset state", () => {
    expect(reducer(mockState, { type: resetConstructor.type })).toEqual(
      initialConstructorState,
    );
  });

  it("should add bun ingredient", () => {
    expect(
      reducer(
        {
          data: [mockIngredient],
          baseIngredient: null,
          counters: { [mockIngredient._id]: 1 },
          finalPrice: mockIngredient.price,
        },
        {
          type: addIngredient.type,
          payload: { ...mockBun, type: IngredientTypeEnum.BUN },
        },
      ),
    ).toEqual(mockState);
  });

  it("should delete ingredient", () => {
    expect(
      reducer(mockState, {
        type: deleteIngredient.type,
        payload: { price: mockIngredient.price, key_id: mockIngredient._id },
      }),
    ).toEqual({
      data: [],
      baseIngredient: mockBun,
      counters: { [mockBun._id]: 2 },
      finalPrice: mockBun.price * 2,
    });
  });

  it("should sort ingredients", () => {
    expect(
      reducer(
        {
          data: [mockBun, mockIngredient],
        },
        {
          type: sortIngredients.type,
          payload: { dragIndex: 1, hoverIndex: 0 },
        },
      ),
    ).toEqual({
      data: [mockIngredient, mockBun],
    });
  });
});
