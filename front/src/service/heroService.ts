import axios from "axios";
import THeroRequest from "../types/THeroRequest";
import THeroResponse from "../types/THeroResponse";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5555";

function handleAxiosError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || "Erro inesperado ao se comunicar com o servidor.";
    throw new Error(message);
  }
  throw new Error("Erro desconhecido");
}

export const heroService = {
  async fetchHeroes(page = 1, search = "", append = false) {
    try {
      const response = await axios.get<{
        data: THeroResponse[],
        pagination: { page: number; lastPage: number; total: number }
      }>(`${API_URL}/hero?page=${page}&search=${search}`);
      return { ...response.data, append };
    } catch (error) {
      handleAxiosError(error);
    }
  },

  async createHero(heroData: THeroRequest) {
    try {
      const response = await axios.post<THeroResponse>(`${API_URL}/hero`, heroData);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  async updateHero(id: string, heroData: THeroRequest) {
    try {
      const response = await axios.put<THeroResponse>(`${API_URL}/hero/${id}`, heroData);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  async deleteHero(id: string) {
    try {
      await axios.delete(`${API_URL}/hero/${id}`);
      return id;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  async changeHeroStatus(id: string, status: boolean) {
    try {
      await axios.put<{ status: boolean }>(`${API_URL}/hero/${id}/status`, { status });
      return { id, status };
    } catch (error) {
      handleAxiosError(error);
    }
  }
};
