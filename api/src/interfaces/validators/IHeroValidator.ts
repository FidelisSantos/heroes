import CreateHeroDTO from "../../dtos/hero/CreateHeroDTO";
import UpdateHeroDTO from "../../dtos/hero/UpdateHeroDTO";
import TValidatorHero from "../../type/TValidatorHero";

interface IHeroValidator {
    validateCreate(heroDto: CreateHeroDTO): Promise<TValidatorHero>;
    validateUpdate(heroDto: UpdateHeroDTO): Promise<TValidatorHero>;
    validateExists(id: number): Promise<TValidatorHero>;
}

export default IHeroValidator;