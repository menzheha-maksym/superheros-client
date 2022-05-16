import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import paginationReducer from "./reducers/paginationSlice";
import herosReducer from "./reducers/herosSlice";
import heroReducer from "./reducers/heroSlice";

export const store = configureStore({
  reducer: {
    pagination: paginationReducer,
    heros: herosReducer,
    hero: heroReducer,
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
