import { createAsyncThunk } from "@reduxjs/toolkit";
import { heroService } from "../../service/heroService";
import THeroRequest from "../../types/THeroRequest";

export const fetchHeroes = createAsyncThunk(
    "hero/fetchHeroes",
    async ({ page, search ,append }: { page: number; search:string, append: boolean; }, { rejectWithValue }) => {
        try {
            return await heroService.fetchHeroes(page, search, append);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const createHero = createAsyncThunk(
    "hero/createHero",
    async (hero: THeroRequest, { rejectWithValue }) => {
        try {
            return await heroService.createHero(hero);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateHero = createAsyncThunk(
    "hero/updateHero",
    async ({ id, hero }: { id: string; hero: THeroRequest }, { rejectWithValue }) => {
        try {
            return await heroService.updateHero(id, hero);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteHero = createAsyncThunk(
    "hero/deleteHero",
    async (id: string, { rejectWithValue }) => {
        try {
            return await heroService.deleteHero(id);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const changeHeroStatus = createAsyncThunk(
    "hero/changeHeroStatus",
    async ({ id, status }: { id: string; status: boolean }, { rejectWithValue }) => {
      try {
        return await heroService.changeHeroStatus(id, status);
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
);
