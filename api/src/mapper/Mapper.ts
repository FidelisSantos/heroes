import CreateHeroDTO from "../dtos/hero/CreateHeroDTO.js";
import UpdateHeroDTO from "../dtos/hero/UpdateHeroDTO.js";
import { Hero } from "../entity/Hero.js";
import IMapper from "../interfaces/mapper/IMapper.js";
import HeroResponse from "../models/hero/HeroResponse.js";

class Mapper implements IMapper{
    mapHeroToHeroResponse(hero: Hero): HeroResponse {
        return new HeroResponse(
            hero.id,
            hero.name,
            hero.nickname,
            hero.date_of_birth,
            hero.universe,
            hero.main_power,
            hero.avatar_url,
            hero.is_active,
            hero.created_at,
            hero.updated_at
        );
    }
    mapCreateHeroDTOToHero(hero: CreateHeroDTO): Hero {
        const heroEntity = new Hero();
        heroEntity.name = hero.name;
        heroEntity.nickname = hero.nickname;
        heroEntity.avatar_url = hero.avatar_url;
        heroEntity.date_of_birth = hero.date_of_birth;
        heroEntity.universe = hero.universe;
        heroEntity.main_power = hero.main_power;

        return heroEntity;
    }
    mapUpdateHeroDTOToHero(hero: UpdateHeroDTO): Hero {
        const heroEntity = new Hero();
        heroEntity.id = hero.id;
        heroEntity.name = hero.name;
        heroEntity.nickname = hero.nickname;
        heroEntity.avatar_url = hero.avatar_url;
        heroEntity.date_of_birth = hero.date_of_birth;
        heroEntity.universe = hero.universe;
        heroEntity.main_power = hero.main_power;

        return heroEntity;
    }

}

export default Mapper;