import THeroResponse from "./THeroResponse";

type THeroState = {
    heroes: THeroResponse[];
    loading: boolean;
    error: boolean;
    errorMessage: string;
    pagination: {
      page: number;
      lastPage: number;
      total: number;
    };
}

export default THeroState