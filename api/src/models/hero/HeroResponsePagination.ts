import TPaginate from "../../type/TPaginate";
import HeroResponse from "./HeroResponse.js";

class HeroResponsePagination {
    constructor(readonly data: HeroResponse[], readonly pagination: TPaginate) {}
}

export default HeroResponsePagination;