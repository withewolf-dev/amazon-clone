import { configureStore } from "@reduxjs/toolkit";
import BasketReducer from "./slice/basket-slice";
import UserReducer from "./slice/user-slice";
export const store = configureStore({
  reducer: {
    Basket: BasketReducer,
    User: UserReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
