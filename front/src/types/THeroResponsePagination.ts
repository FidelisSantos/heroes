import THeroResponse from "./THeroResponse";

export type THeroResponsePagination = {
    data: THeroResponse[];
    pagination: {
        total: number,
        page: number,
        lastPage: number
    };
};
