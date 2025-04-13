import { createSlice } from "@reduxjs/toolkit";
import THeroState from "../../types/THeroState";
import {
  fetchHeroes,
  createHero,
  updateHero,
  deleteHero,
  changeHeroStatus
} from "./actions";

const initialState: THeroState = {
  heroes: [],
  pagination: {
    page: null,
    lastPage: null,
  },
  loading: false,
  error: null,
};

const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    setPage(state, action) {
      state.pagination.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.loading = false;
        state.heroes = action.payload.append
          ? [...state.heroes, ...action.payload.data]
          : action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchHeroes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createHero.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHero.fulfilled, (state, action) => {
        state.heroes.unshift(action.payload);
        state.loading = false;
      })
      .addCase(createHero.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateHero.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHero.fulfilled, (state, action) => {
        const updatedHero = { ...action.payload, is_active: true };
        state.heroes = state.heroes.map(hero =>
          hero.id === updatedHero.id ? updatedHero : hero
        );
        state.loading = false;
      })
      .addCase(updateHero.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteHero.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHero.fulfilled, (state, action) => {
        state.loading = false;
        state.heroes = state.heroes.filter((hero) => hero.id !== action.payload);
      })
      .addCase(deleteHero.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(changeHeroStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeHeroStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.heroes = state.heroes.map((hero) =>
          hero.id === action.payload.id
            ? { ...hero, is_active: action.payload.status }
            : hero
        );
      })
      .addCase(changeHeroStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPage } = heroSlice.actions;
export default heroSlice.reducer;
