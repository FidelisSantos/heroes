import axios from "axios";
import THeroRequest from "../types/THeroRequest";
import THeroResponse from "../types/THeroResponse";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5555";

export const heroService = {
    async fetchHeroes(page = 1, search = "", append = false) {
      const response = await axios.get<{ data: THeroResponse[], pagination: { page: number; lastPage: number } }>(
          `${API_URL}/hero?page=${page}&search=${search}`
      );
      return { ...response.data, append };
    },

    async createHero(heroData: THeroRequest) {
      const response = await axios.post<THeroResponse>(`${API_URL}/hero`, heroData);
      return response.data;
    },

    async updateHero(id: string, heroData: THeroRequest) {
      const response = await axios.put<THeroResponse>(`${API_URL}/hero/${id}`, heroData);
      return response.data;
    },

    async deleteHero(id: string) {
      await axios.delete(`${API_URL}/hero/${id}`);
      return id;
    },

    async changeHeroStatus(id: string, status: boolean) {
      await axios.put<{ status: boolean }>(`${API_URL}/hero/${id}/status`, { status });
      return { id, status: status};
    }
};
