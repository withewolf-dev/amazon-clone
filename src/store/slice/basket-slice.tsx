import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Item {
  id: string;
  title: string;
  image: string;
  rating: number;
  price: number;
}

interface BasketSlice {
  basket: Item[];
}

const initialState: BasketSlice = {
  basket: [],
};

export const BasketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<Item>) => {
      state.basket.push(action.payload);
    },
    removeItem: (state, action) => {
      // remove
      state.basket = state.basket.filter((b) => b.id !== action.payload.id);
    },
  },
});

export const { addToBasket, removeItem } = BasketSlice.actions;
export const SelectBasket = (state: RootState) => state.Basket;
export default BasketSlice.reducer;
