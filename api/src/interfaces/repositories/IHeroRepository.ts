import { FindManyOptions, FindOneOptions } from "typeorm";
import { Hero } from "../../entity/Hero";

interface IHeroRepository {
    create(hero: Hero): Promise<Hero>;
    update(hero: Hero): Promise<Hero>;
    get(options?: FindManyOptions<Hero>): Promise<[Hero[], number]>;
    find(options: FindOneOptions<Hero>): Promise<Hero>;
    changeStatus(id: number, status: boolean): Promise<Hero>;
    exists(options: FindOneOptions<Hero>): Promise<boolean>;
    delete(id: number): Promise<void>;
}

export default IHeroRepository;