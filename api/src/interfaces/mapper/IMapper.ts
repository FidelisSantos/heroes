import CreateHeroDTO from "../../dtos/hero/CreateHeroDTO.js";
import UpdateHeroDTO from "../../dtos/hero/UpdateHeroDTO.js";
import { Hero } from "../../entity/Hero.js";
import HeroResponse from "../../models/hero/HeroResponse.js";

interface IMapper {
    mapHeroToHeroResponse(hero: Hero): HeroResponse;
    mapCreateHeroDTOToHero(hero: CreateHeroDTO): Hero;
    mapUpdateHeroDTOToHero(hero: UpdateHeroDTO): Hero;
}

export default IMapper;