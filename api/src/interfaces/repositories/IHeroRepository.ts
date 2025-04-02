import { FindManyOptions, FindOneOptions } from "typeorm";
import { Hero } from "../../entity/Hero";

interface IHeroRepository {
    create(hero: Hero): Promise<Hero>;
    update(hero: Hero, id: number): Promise<Hero>;
    get(options?: FindManyOptions<Hero>): Promise<Hero[]>;
    find(options?: FindOneOptions<Hero>): Promise<Hero>;
    changeStatus(id: number, status: boolean): Promise<Hero>;
}

export default IHeroRepository;