import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchHeroById } from "../../api/heroAPI";
import { Hero } from "../../interfaces/Hero";
import { RootState } from "../store";

export interface HerosState {
  status: "idle" | "loading" | "failed";
  hero: Hero;
}

const initialState: HerosState = {
  status: "idle",
  hero: {
    id: 0,
    nickname: "",
    real_name: "",
    catch_phrase: "",
    origin_description: "",
    superpowers: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

export const fetchHeroByIdAsync = createAsyncThunk(
  "hero/fetchHeroById",
  async (id: number) => {
    const response = await fetchHeroById(id);

    return response;
  }
);

export const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    setHero: (state, action: PayloadAction<Hero>) => {
      state.hero = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHeroByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.hero = action.payload;
      });
  },
});

export const { setHero } = heroSlice.actions;

export const selectHero = (state: RootState) => state.hero.hero;

export default heroSlice.reducer;
