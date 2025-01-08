export type Order = {
  price: number;
  count: number;
  amount: number;
}

export type OrderBookState = {
  bids: Order[];
  asks: Order[];
}

export type UpdatePayload = [price: number, count: number, amount: number];