import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { Hero } from "../entity/Hero.js";
import IHeroRepository from "../interfaces/repositories/IHeroRepository.js";

class HeroRepository implements IHeroRepository{
    constructor(private repository: Repository<Hero>) {}

    async create(hero: Hero): Promise<Hero> {
        return await this.repository.save(hero);
    }

    async update(hero: Hero): Promise<Hero> {
        return await this.repository.save(hero);
    }

    async get(options?: FindManyOptions<Hero>): Promise<[Hero[], number]> {
        return await this.repository.findAndCount(options);
    }

    async find(options: FindOneOptions<Hero>): Promise<Hero> {
        return await this.repository.findOne(options) as Hero;
    }

    async changeStatus(id: number, status: boolean): Promise<Hero> {
        await this.repository.update(id, { is_active: status });
        return await this.find({ where: { id } });
    }

    async exists(options: FindOneOptions<Hero>): Promise<boolean> {
        const hero = await this.repository.findOne(options);
        return hero !== null;
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}

export default HeroRepository;