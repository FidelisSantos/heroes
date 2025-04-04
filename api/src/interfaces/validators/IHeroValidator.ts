import CreateHeroDTO from "../../dtos/hero/CreateHeroDTO.js";
import UpdateHeroDTO from "../../dtos/hero/UpdateHeroDTO.js";
import TValidatorHero from "../../type/TValidatorHero.js";

interface IHeroValidator {
    validateCreate(heroDto: CreateHeroDTO): Promise<TValidatorHero>;
    validateUpdate(heroDto: UpdateHeroDTO): Promise<TValidatorHero>;
    validateExists(id: number): Promise<TValidatorHero>;
}

export default IHeroValidator;