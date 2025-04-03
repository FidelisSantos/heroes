import CreateHeroDTO from "../../dtos/hero/CreateHeroDTO";
import UpdateHeroDTO from "../../dtos/hero/UpdateHeroDTO";
import { Hero } from "../../entity/Hero";
import HeroResponse from "../../models/hero/HeroResponse";

interface IMapper {
    mapHeroToHeroResponse(hero: Hero): HeroResponse;
    mapCreateHeroDTOToHero(hero: CreateHeroDTO): Hero;
    mapUpdateHeroDTOToHero(hero: UpdateHeroDTO): Hero;
}

export default IMapper;