import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface BasketSlice {
  basket: number[] | any;
}

const initialState: BasketSlice = {
  basket: [],
};

export const BasketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.basket.push(action.payload);
    },
    removeItem: (state, action) => {
      // remove
    },
  },
});

export const { addToBasket, removeItem } = BasketSlice.actions;
export const SelectBasket = (state: RootState) => state.Basket;
export default BasketSlice.reducer;
