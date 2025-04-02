import CreateHeroDTO from "../../dtos/hero/CreateHeroDTO";
import UpdateHeroDto from "../../dtos/hero/UpdateHeroDTO";
import HeroResponse from "../../models/hero/HeroResponse";
import HeroResponsePagination from "../../models/hero/HeroResponsePagination";
import TPaginate from "../../type/TPaginate";
import TParams from "../../type/TParams";

interface IHeroService {
    create(hero: CreateHeroDTO): Promise<HeroResponse>;
    update(hero: Partial<UpdateHeroDto>): Promise<HeroResponse>;
    get(params: TParams, paginate: TPaginate): Promise<HeroResponsePagination[]>
    find(params: TParams): Promise<HeroResponse>;
    changeStatus(id: string, status: boolean): Promise<HeroResponse>;
}

export default IHeroService;