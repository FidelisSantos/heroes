import HeroResponse from "../../models/hero/HeroResponse";
import HeroResponsePagination from "../../models/hero/HeroResponsePagination";
import TPaginate from "../../type/TPaginate";
import TParamsHero from "../../type/TParamsHero";

interface IHeroService {
    create(data: any): Promise<HeroResponse>;
    update(data: any, id: string): Promise<HeroResponse>;
    get(params: TParamsHero, paginate: TPaginate): Promise<HeroResponsePagination>
    changeStatus(id: string, status: boolean): Promise<HeroResponse>;
    delete(id: string): Promise<void>;
}

export default IHeroService;