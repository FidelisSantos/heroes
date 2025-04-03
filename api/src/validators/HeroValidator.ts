import { Not } from "typeorm";
import CreateHeroDTO from "../dtos/hero/CreateHeroDTO";
import UpdateHeroDTO from "../dtos/hero/UpdateHeroDTO";
import IHeroRepository from "../interfaces/repositories/IHeroRepository";
import IHeroValidator from "../interfaces/validators/IHeroValidator";
import TValidatorHero from "../type/TValidatorHero";

class HeroValidator implements IHeroValidator{
    constructor(private heroRepository: IHeroRepository){}

    async validateCreate(heroDto: CreateHeroDTO): Promise<TValidatorHero> {
        const messages = heroDto.validate();
    
        if (messages.length > 0) {
            return { isValid: false, messages };
        }
    
        const [nicknameExists, nameExists] = await Promise.all([
            this.heroRepository.exists({ where: { nickname: heroDto.nickname, universe: heroDto.universe } }),
            this.heroRepository.exists({ where: { name: heroDto.name, universe: heroDto.universe } })
        ]);
    
        if (nicknameExists) messages.push("Apelido já existe nesse universo");
        if (nameExists) messages.push("Nome já existe nesse universo");
    
        return { isValid: messages.length === 0, messages };
    }

    async validateUpdate(heroDto: UpdateHeroDTO): Promise<TValidatorHero> {
        const messages = heroDto.validate();
    
        if (messages.length > 0) {
            return { isValid: false, messages };
        }

        if (!await this.heroRepository.exists({ where: { id: heroDto.id as number}})) {
            return { isValid: false, messages: ["Herói não encontrado na base"] };
        }
    
        if (await this.heroRepository.exists({ where: { id: heroDto.id as number, is_active: false } })) {
            return { isValid: false, messages: ["Herói inativo não pode ser editado"] };
        }
    
        const [nicknameExists, nameExists] = await Promise.all([
            this.heroRepository.exists({ where: { nickname: heroDto.nickname, universe: heroDto.universe, id: Not(heroDto.id as number) } }),
            this.heroRepository.exists({ where: { name: heroDto.name, universe: heroDto.universe, id: Not(heroDto.id as number) } })
        ]);
    
        if (nicknameExists) messages.push("Apelido já existe nesse universo");
        if (nameExists) messages.push("Nome já existe nesse universo");
    
        return { isValid: messages.length === 0, messages };
    }

    async validateExists(id: number): Promise<TValidatorHero> {
        if (!await this.heroRepository.exists({ where: { id: id}})) {
            return { isValid: false, messages: ["Herói não encontrado na base"] };
        }

        return { isValid: true, messages: [] };
    }
}

export default HeroValidator;