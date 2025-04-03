import { FindManyOptions, ILike } from "typeorm";
import CreateHeroDTO  from "../dtos/hero/CreateHeroDTO";
import UpdateHeroDTO from "../dtos/hero/UpdateHeroDTO";
import BadRequestError from "../errors/BadRequestError";
import CryptoHelper from "../helpers/CryptHelper";
import IMapper from "../interfaces/mapper/IMapper";
import IHeroRepository from "../interfaces/repositories/IHeroRepository";
import IHeroService from "../interfaces/services/IHeroService";
import IHeroValidator from "../interfaces/validators/IHeroValidator";
import HeroResponse from "../models/hero/HeroResponse";
import HeroResponsePagination from "../models/hero/HeroResponsePagination";
import TParamsHero from "../type/TParamsHero";
import { Hero } from "../entity/Hero";

class HeroService implements IHeroService {
    constructor (
        private heroRepository: IHeroRepository,
        private heroValidator: IHeroValidator,
        private mapper: IMapper ){}

    async create(data: any): Promise<HeroResponse> {
        const heroDto = new CreateHeroDTO(
            data.name,
            data.nickname,
            data.date_of_birth,
            data.universe,
            data.main_power,
            data.avatar_url
        );

        const {isValid, messages} = await this.heroValidator.validateCreate(heroDto);

        if (!isValid) throw new BadRequestError(messages);

        const heroMapper = this.mapper.mapCreateHeroDTOToHero(heroDto);
        
        const hero =  await this.heroRepository.create(heroMapper);

        return this.mapper.mapHeroToHeroResponse(hero);
    }

    async update(data: any, id: string): Promise<HeroResponse> {
        const decryptedId = CryptoHelper.decrypt(id) || (() => { throw new BadRequestError("ID inválido"); })();
        const heroDto = new UpdateHeroDTO(
            decryptedId,
            data.name,
            data.nickname,
            data.date_of_birth,
            data.universe,
            data.main_power,
            data.avatar_url
        );

        const {isValid, messages} = await this.heroValidator.validateUpdate(heroDto);

        if (!isValid) throw new BadRequestError(messages);

        const heroMapper = this.mapper.mapUpdateHeroDTOToHero(heroDto);
        
        const hero =  await this.heroRepository.update(heroMapper);

        return this.mapper.mapHeroToHeroResponse(hero);
    }

    async delete(id: string): Promise<void> {
        const decryptedId = CryptoHelper.decrypt(id) || (() => { throw new BadRequestError("ID inválido"); })();

        const {isValid, messages} = await this.heroValidator.validateExists(decryptedId);

        if (!isValid) throw new BadRequestError(messages);

        await this.heroRepository.delete(decryptedId); 
    }

    async get(params: TParamsHero): Promise<HeroResponsePagination> {
        const { page = 1, total = 10 } = params;

        const whereClause: any = {};
        
        if (params.search) {
            whereClause.OR = [
                { name: ILike(`%${params.search}%`) },
                { nickname: ILike(`%${params.search}%`) }
            ];
        }
    
        const options: FindManyOptions<Hero> = {
            where: whereClause.OR ? whereClause : undefined,
            take: total,
            skip: (page - 1) * total
        };
    
        const [heroes, count] = await this.heroRepository.get(options);
        const lastPage = Math.ceil(count / total);

        const heroesResponseList:HeroResponse[] = [];
        
        heroes.forEach(hero => {
            heroesResponseList.push(this.mapper.mapHeroToHeroResponse(hero));
        });

        return new HeroResponsePagination(heroesResponseList, {
            total: count,
            page,
            lastPage
        });
    }

    async changeStatus(id: string, status: boolean): Promise<HeroResponse> {
        const decryptedId = CryptoHelper.decrypt(id) || (() => { throw new BadRequestError("ID inválido"); })();

        const {isValid, messages} = await this.heroValidator.validateExists(decryptedId);

        if (!isValid) throw new BadRequestError(messages);

        const hero = await this.heroRepository.changeStatus(decryptedId, status);

        return this.mapper.mapHeroToHeroResponse(hero);
    }
    
}

export default HeroService;