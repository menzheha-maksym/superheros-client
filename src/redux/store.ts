import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import paginationReducer from "./reducers/paginationSlice";

export const store = configureStore({
  reducer: {
    pagination: paginationReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
