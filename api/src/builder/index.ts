//Database
import { instanceDatabase } from "./typeorm.js";

// Entidades
import { Hero } from "../entity/Hero.js";


// Interfaces
import IHeroRepository from "../interfaces/repositories/IHeroRepository.js";
import IHeroValidator from "../interfaces/validators/IHeroValidator.js";
import IHeroService from "../interfaces/services/IHeroService.js";


// Repositórios
import HeroRepository from "../repositories/HeroRepository.js";

// Serviços e Validações
import HeroValidator from "../validators/HeroValidator.js";
import HeroService from "../services/HeroService.js";

// Controllers
import HeroController from "../controllers/HeroController.js";

//Mappers
import Mapper from "../mapper/Mapper.js"

// TypeORM
export const typeorm = await instanceDatabase();

//Mapper
export const mapper = new Mapper();

// Repositórios
const heroDb = typeorm.getRepository(Hero);

// Hero
export const heroRepository: IHeroRepository = new HeroRepository(heroDb);
export const heroValidation: IHeroValidator = new HeroValidator(heroRepository);
export const heroService: IHeroService = new HeroService(heroRepository, heroValidation, mapper);
export const heroController = new HeroController(heroService);
