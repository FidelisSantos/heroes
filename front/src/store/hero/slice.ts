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
    page: 0,
    lastPage: 0,
    total: 0
  },
  loading: false,
  error: false,
  errorMessage: ""
};

const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    setPage(state, action) {
      state.pagination.page = action.payload;
    },
    clearError(state) {
      state.error = false;
      state.errorMessage = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.loading = true;

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
        state.error = true;
        state.errorMessage = action.payload as string;
      })
      .addCase(createHero.pending, (state) => {
        state.loading = true;
      })
      .addCase(createHero.fulfilled, (state, action) => {
        state.heroes.unshift(action.payload);

        if (state.heroes.length > 10) {
          state.heroes.pop();
        }

        state.pagination.lastPage = Math.ceil(state.pagination.total / 10);

        state.loading = false;
      })
      .addCase(createHero.rejected, (state, action) => {
        state.errorMessage = action.payload as string;
        state.error = true;
        state.loading = false;
      })
      .addCase(updateHero.pending, (state) => {
        state.loading = true;
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
        state.error = true;
        state.errorMessage = action.payload as string;
      })
      .addCase(deleteHero.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteHero.fulfilled, (state, action) => {
        state.loading = false;
        state.heroes = state.heroes.filter((hero) => hero.id !== action.payload);
      })
      .addCase(deleteHero.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload as string;
      })
      .addCase(changeHeroStatus.pending, (state) => {
        state.loading = true;
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
        state.error = true;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { setPage, clearError } = heroSlice.actions;
export default heroSlice.reducer;
