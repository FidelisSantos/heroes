import { Repository } from "typeorm";
import HeroRepository from "../../repositories/HeroRepository.js";
import { Hero } from "../../entity/Hero.js";
import { jest, describe, beforeEach, it, expect } from '@jest/globals';


jest.mock("typeorm", () => {
    const actualTypeOrm = jest.requireActual("typeorm");
    return {
        Repository: jest.fn().mockImplementation(() => ({
            save: jest.fn(),
            findAndCount: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        })),
    };
});

describe("HeroRepository", () => {
    let heroRepository: HeroRepository;
    let mockRepository: jest.Mocked<Repository<Hero>>;

    beforeEach(() => {
        mockRepository = {
            save: jest.fn(),
            findAndCount: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        } as any; // Forçamos a tipagem como Repository<Hero>

        heroRepository = new HeroRepository(mockRepository);
    });

    it("create() deve salvar e retornar o herói", async () => {
        const hero: Hero = {
            id: 1,
            name: "Superman",
            nickname: "Man of Steel",
            date_of_birth: new Date("1938-06-01"),
            universe: "DC",
            main_power: "Super Strength",
            avatar_url: "https://example.com/superman.png",
            is_active: true,
            created_at: new Date(),
            updated_at: new Date(),
        };
        mockRepository.save.mockResolvedValue(hero);

        const result = await heroRepository.create(hero);

        expect(mockRepository.save).toHaveBeenCalledWith(hero);
        expect(result).toEqual(hero);
    });

    it("update() deve atualizar e retornar o herói", async () => {
        const hero: Hero = {
            id: 1,
            name: "Superman",
            nickname: "Man of Steel",
            date_of_birth: new Date("1938-06-01"),
            universe: "DC",
            main_power: "Super Strength",
            avatar_url: "https://example.com/superman.png",
            is_active: true,
            created_at: new Date(),
            updated_at: new Date(),
        };
        mockRepository.save.mockResolvedValue(hero);

        const result = await heroRepository.update(hero);

        expect(mockRepository.save).toHaveBeenCalledWith(hero);
        expect(result).toEqual(hero);
    });

    it("get() deve retornar uma lista de heróis e a contagem total", async () => {
        const heroes: Hero[] = [{
            id: 1,
            name: "Superman",
            nickname: "Man of Steel",
            date_of_birth: new Date("1938-06-01"),
            universe: "DC",
            main_power: "Super Strength",
            avatar_url: "https://example.com/superman.png",
            is_active: true,
            created_at: new Date(),
            updated_at: new Date(),
        }];
        mockRepository.findAndCount.mockResolvedValue([heroes, 1]);

        const result = await heroRepository.get();

        expect(mockRepository.findAndCount).toHaveBeenCalled();
        expect(result).toEqual([heroes, 1]);
    });

    it("find() deve retornar um herói específico", async () => {
        const hero: Hero = {
            id: 1,
            name: "Superman",
            nickname: "Man of Steel",
            date_of_birth: new Date("1938-06-01"),
            universe: "DC",
            main_power: "Super Strength",
            avatar_url: "https://example.com/superman.png",
            is_active: true,
            created_at: new Date(),
            updated_at: new Date(),
        };
        mockRepository.findOne.mockResolvedValue(hero);

        const result = await heroRepository.find({ where: { id: 1 } });

        expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
        expect(result).toEqual(hero);
    });

    it("changeStatus() deve atualizar o status e retornar o herói atualizado", async () => {
        const hero: Hero = {
            id: 1,
            name: "Superman",
            nickname: "Man of Steel",
            date_of_birth: new Date("1938-06-01"),
            universe: "DC",
            main_power: "Super Strength",
            avatar_url: "https://example.com/superman.png",
            is_active: true,
            created_at: new Date(),
            updated_at: new Date(),
        };
        mockRepository.update.mockResolvedValue({ affected: 1 } as any);
        mockRepository.findOne.mockResolvedValue({ ...hero, is_active: true });

        const result = await heroRepository.changeStatus(1, true);

        expect(mockRepository.update).toHaveBeenCalledWith(1, { is_active: true });
        expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
        expect(result).toEqual({ ...hero, is_active: true });
    });

    it("exists() deve retornar true se o herói existir", async () => {
        mockRepository.findOne.mockResolvedValue({
            id: 1,
            name: "Superman",
            nickname: "Man of Steel",
            date_of_birth: new Date("1938-06-01"),
            universe: "DC",
            main_power: "Super Strength",
            avatar_url: "https://example.com/superman.png",
            is_active: true,
            created_at: new Date(),
            updated_at: new Date(),
        });

        const result = await heroRepository.exists({ where: { id: 1 } });

        expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
        expect(result).toBe(true);
    });

    it("exists() deve retornar false se o herói não existir", async () => {
        mockRepository.findOne.mockResolvedValue(null);

        const result = await heroRepository.exists({ where: { id: 2 } });

        expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 2 } });
        expect(result).toBe(false);
    });

    it("delete() deve chamar o método de exclusão", async () => {
        mockRepository.delete.mockResolvedValue({ affected: 1 } as any);

        await heroRepository.delete(1);

        expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });
});
