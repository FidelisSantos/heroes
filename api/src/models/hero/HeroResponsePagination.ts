import TPaginate from "../../type/TPaginate";
import HeroResponse from "./HeroResponse";

class HeroResponsePagination {
    constructor(readonly heroes: HeroResponse[], readonly pagination: TPaginate) {}
}

export default HeroResponsePagination;