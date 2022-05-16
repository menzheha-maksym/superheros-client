import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchHeroById } from "../../api/heroAPI";
import {
  deleteHeroImage,
  fetchHeroImagesIds,
  postHeroImage,
} from "../../api/heroImageAPI";
import { Hero } from "../../interfaces/Hero";
import { RootState } from "../store";

export interface HerosState {
  heroStatus: "idle" | "loading" | "failed";
  imagesIdsStatus: "idle" | "loading" | "failed";
  addHeroImageStatus: "idle" | "loading" | "failed";
  deleteHeroImageByIdStatus: "idle" | "loading" | "failed";

  hero: Hero;
  imagesIds: number[];
  lastImageId: number | null;
}

const initialState: HerosState = {
  heroStatus: "idle",
  imagesIdsStatus: "idle",
  addHeroImageStatus: "idle",
  deleteHeroImageByIdStatus: "idle",
  hero: {
    id: 0,
    nickname: "",
    real_name: "",
    catch_phrase: "",
    origin_description: "",
    superpowers: "",
    createdAt: "",
    updatedAt: "",
  },
  imagesIds: [],
  lastImageId: null,
};

export const fetchHeroByIdAsync = createAsyncThunk(
  "hero/fetchHeroById",
  async (id: number) => {
    const response = await fetchHeroById(id);

    return response;
  }
);

export const fetchHeroImagesIdsAsync = createAsyncThunk(
  "hero/fetchHeroImagesIds",
  async (heroId: number) => {
    const response = await fetchHeroImagesIds(heroId);

    return response;
  }
);

export const addHeroImageAsync = createAsyncThunk(
  "hero/addHeroImage",
  async (options: { heroId: number; data: FormData }) => {
    const response = await postHeroImage(options.heroId, options.data);

    return response;
  }
);

export const deleteHeroImageByIdAsync = createAsyncThunk(
  "hero/deleteHeroImageById",
  async (id: number) => {
    const response = await deleteHeroImage(id);

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
    resetHero: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroByIdAsync.pending, (state) => {
        state.heroStatus = "loading";
      })
      .addCase(fetchHeroByIdAsync.fulfilled, (state, action) => {
        state.heroStatus = "idle";
        state.hero = action.payload;
      })
      .addCase(fetchHeroImagesIdsAsync.pending, (state) => {
        state.imagesIdsStatus = "loading";
      })
      .addCase(fetchHeroImagesIdsAsync.fulfilled, (state, action) => {
        state.imagesIdsStatus = "idle";
        state.imagesIds = action.payload.reverse();
        state.lastImageId = action.payload[0];
      })
      .addCase(addHeroImageAsync.pending, (state) => {
        state.addHeroImageStatus = "loading";
      })
      .addCase(addHeroImageAsync.fulfilled, (state, action) => {
        state.addHeroImageStatus = "idle";
        state.imagesIds.unshift(action.payload.id);
        state.lastImageId = action.payload.id;
      })
      .addCase(deleteHeroImageByIdAsync.pending, (state) => {
        state.deleteHeroImageByIdStatus = "loading";
      })
      .addCase(deleteHeroImageByIdAsync.fulfilled, (state, action) => {
        state.deleteHeroImageByIdStatus = "idle";
        const id = action.meta.arg;
        state.imagesIds = state.imagesIds.filter((imageId) => imageId !== id);
        if (state.lastImageId === id) {
          state.lastImageId = state.imagesIds[0];
        }
      });
  },
});

export const { setHero, resetHero } = heroSlice.actions;

export const selectHero = (state: RootState) => state.hero.hero;
export const selectHeroImagesIds = (state: RootState) => state.hero.imagesIds;
export const selectHeroLastImageId = (state: RootState) =>
  state.hero.lastImageId;

export default heroSlice.reducer;
