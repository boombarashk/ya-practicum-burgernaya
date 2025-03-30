import { ORDER_URL } from "../../../consts";
import orderReducer, { inititalOrderState, resetOrder } from "../order";

const mockName = "Burger 888";
const mockOrderId = 888;
const mockOrderPayload = {
  name: mockName,
  order: { number: mockOrderId },
};

describe("order reducer", () => {
  it("should return the initial state", () => {
    expect(orderReducer(undefined, { type: "" })).toEqual(inititalOrderState);
  });

  it("should reset state", () => {
    expect(orderReducer(undefined, { type: resetOrder.type })).toEqual(
      inititalOrderState,
    );
  });

  it("should set order", () => {
    expect(
      orderReducer(undefined, {
        type: `${ORDER_URL}/fulfilled`,
        payload: mockOrderPayload,
      }),
    ).toEqual({ ...inititalOrderState, name: mockName, orderId: mockOrderId });
  });

  it("should set pending params", () => {
    expect(orderReducer(undefined, { type: `${ORDER_URL}/pending` })).toEqual({
      ...inititalOrderState,
      loading: true,
    });
  });

  it("should set error", () => {
    expect(
      orderReducer(undefined, { type: `${ORDER_URL}/rejected` }).error,
    ).not.toBeNull();
  });
});
