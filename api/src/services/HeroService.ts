import { FindManyOptions, ILike } from "typeorm";
import CreateHeroDTO  from "../dtos/hero/CreateHeroDTO.js";
import UpdateHeroDTO from "../dtos/hero/UpdateHeroDTO.js";
import BadRequestError from "../errors/BadRequestError.js";
import CryptoHelper from "../helpers/CryptHelper.js";
import IMapper from "../interfaces/mapper/IMapper.js";
import IHeroRepository from "../interfaces/repositories/IHeroRepository.js";
import IHeroService from "../interfaces/services/IHeroService.js";
import IHeroValidator from "../interfaces/validators/IHeroValidator.js";
import HeroResponse from "../models/hero/HeroResponse.js";
import HeroResponsePagination from "../models/hero/HeroResponsePagination.js";
import TParamsHero from "../type/TParamsHero.js";
import { Hero } from "../entity/Hero.js";

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
        const { page = 1, total = 10 , search} = params;

        const options: FindManyOptions<Hero> = {
            where: search
                ? [
                    { name: ILike(`%${search}%`) },
                    { nickname: ILike(`%${search}%`) }
                ]
                : undefined,
            take: total,
            skip: (page - 1) * total,
                order: {
                created_at: "DESC"
            }
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