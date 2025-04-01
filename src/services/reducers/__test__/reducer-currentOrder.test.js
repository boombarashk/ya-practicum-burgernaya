import reducer, {
  initialState,
  setCurrentOrder,
  resetCurrentOrder,
} from "../currentOrder";

const mockOrderState = {
  data: {
    ingredients: [{ id: 1 }],
    orderId: 1231,
    price: 250,
    name: "Mock burger",
    date: new Date().toDateString(),
  },
};

describe("currentOrder reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should reset state", () => {
    expect(reducer(mockOrderState, { type: resetCurrentOrder.type })).toEqual(
      initialState,
    );
  });

  it("should set state", () => {
    expect(
      reducer(undefined, {
        type: setCurrentOrder.type,
        payload: mockOrderState.data,
      }),
    ).toEqual(mockOrderState);
  });
});
