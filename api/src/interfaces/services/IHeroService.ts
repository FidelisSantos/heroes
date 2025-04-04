import HeroResponse from "../../models/hero/HeroResponse.js";
import HeroResponsePagination from "../../models/hero/HeroResponsePagination.js";
import TParamsHero from "../../type/TParamsHero.js";

interface IHeroService {
    create(data: any): Promise<HeroResponse>;
    update(data: any, id: string): Promise<HeroResponse>;
    get(params: TParamsHero): Promise<HeroResponsePagination>
    changeStatus(id: string, status: boolean): Promise<HeroResponse>;
    delete(id: string): Promise<void>;
}

export default IHeroService;