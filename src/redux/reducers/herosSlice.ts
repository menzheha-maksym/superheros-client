import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchHerosWithPagiantion } from "../../api/heroAPI";
import { Hero } from "../../interfaces/Hero";
import { RootState } from "../store";

export interface HerosState {
  status: "idle" | "loading" | "failed";
  heros: Hero[];
  allHerosCount: number;
}

const initialState: HerosState = {
  status: "idle",
  heros: [],
  allHerosCount: 0,
};

export const fetchHerosWithPaginationAsync = createAsyncThunk(
  "heros/fetchHerosWithPagination",
  async (options: { limit?: number; skip?: number }) => {
    const response = await fetchHerosWithPagiantion(
      options.limit,
      options.skip
    );

    return response;
  }
);

export const herosSlice = createSlice({
  name: "heros",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHerosWithPaginationAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHerosWithPaginationAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.heros = action.payload.data;
        state.allHerosCount = action.payload.count;
      });
  },
});

export const {} = herosSlice.actions;

export const selectHeros = (state: RootState) => state.heros.heros;
export const selectAllHerosCount = (state: RootState) =>
  state.heros.allHerosCount;

export default herosSlice.reducer;
