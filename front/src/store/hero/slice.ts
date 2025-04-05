import { createSlice } from "@reduxjs/toolkit";
import THeroState from "../../types/THeroState";
import { fetchHeroes, createHero, updateHero, deleteHero, changeHeroStatus } from "./actions";

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
                state.heroes = action.payload.append ? [...state.heroes, ...action.payload.data] : action.payload.data;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchHeroes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createHero.fulfilled, (state, action) => {
                state.loading = false;
                state.heroes.push(action.payload);
            })
            .addCase(updateHero.fulfilled, (state, action) => {
                state.loading = false;
                state.heroes = state.heroes.map(hero =>
                    hero.id === action.payload.id ? action.payload : hero
                );
            })
            .addCase(deleteHero.fulfilled, (state, action) => {
                state.loading = false;
                state.heroes = state.heroes.filter(hero => hero.id !== action.payload);
            })
            .addCase(changeHeroStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.heroes = state.heroes.map(hero =>
                    hero.id === action.payload.id ? { ...hero, is_active: action.payload.status } : hero
                );
            });
    },
});

export const { setPage } = heroSlice.actions;
export default heroSlice.reducer;
