import { Hero } from "../../entity/Hero";
import HeroResponse from "../../models/hero/HeroResponse";

interface IMapper {
    convertHeroToHeroResponse(hero: Hero): HeroResponse;
}

export default IMapper;