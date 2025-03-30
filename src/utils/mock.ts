import dayjs from "dayjs";
import { TOrder } from "./types";

export const mockData: Partial<TOrder>[] = [
  {
    number: 345550,
    name: "Supernova Infinity бургер",
    status: "done",
    updatedAt: dayjs(new Date("2025/03/04")).format(),
    ingredients: [
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa0941",
      "643d69a5c3f7b9001cfa093c",
    ],
    _id: "2",
  },
];

const mockPiceBun = 99;
const mockPriceMain = 327;
export const mockIngredientsPartial = [
  {
    _id: "643d69a5c3f7b9001cfa093c",
    name: "Краторная булка N-200i",
    type: "bun",
    price: mockPiceBun,
  },
  {
    _id: "643d69a5c3f7b9001cfa0941",
    name: "Биокотлета из марсианской Магнолии",
    type: "main",
    price: mockPriceMain,
  },
];

export const mockPrice = mockPriceMain + mockPiceBun * 2;

export const mockMessage = {
  success: true,
  total: 72333,
  totalToday: 200,
  orders: mockData,
};
