import wsReducer, {
  initialState,
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage,
} from "../history";
import { SocketStateEnum } from "../../../utils/types";
import {
  mockData,
  mockIngredientsPartial,
  mockPrice,
  mockMessage,
} from "../../../utils/mock";

describe("history reducer", () => {
  it("should return the initial state", () => {
    expect(wsReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("check connecting", () => {
    expect(wsReducer(undefined, { type: wsConnecting }).status).toEqual(
      SocketStateEnum.CONNECTING,
    );
  });

  it("check open wss", () => {
    expect(wsReducer(undefined, { type: wsOpen }).status).toEqual(
      SocketStateEnum.ONLINE,
    );
  });

  it("check close wss", () => {
    expect(wsReducer(undefined, { type: wsClose }).status).toEqual(
      SocketStateEnum.OFFLINE,
    );
  });

  it("check error wss", () => {
    expect(wsReducer(undefined, { type: wsError }).error).not.toBeNull();
  });

  it("should set history orders", () => {
    expect(
      wsReducer(undefined, {
        type: wsMessage,
        payload: {
          data: mockMessage,
          rootState: { ingredients: { data: mockIngredientsPartial } },
        },
      }),
    ).toEqual({
      ...initialState,
      total: mockMessage.total,
      totalToday: mockMessage.totalToday,
      orders: [
        {
          ingredients: mockData[0].ingredients,
          name: mockData[0].name,
          status: mockData[0].status,
          orderId: String(mockData[0].number),
          price: mockPrice,
        },
      ],
    });
  });
});
