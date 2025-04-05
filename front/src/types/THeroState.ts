import THeroResponse from "./THeroResponse";

type THeroState = {
    heroes: THeroResponse[];
    loading: boolean;
    error: string | null;
    pagination: {
      page: number | null;
      lastPage: number | null;
    };
}

export default THeroState