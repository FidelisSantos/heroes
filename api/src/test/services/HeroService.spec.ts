import HeroService from "../../services/HeroService.js";
import CreateHeroDTO from "../../dtos/hero/CreateHeroDTO.js";
import HeroResponse from "../../models/hero/HeroResponse.js";
import BadRequestError from "../../errors/BadRequestError.js";
import { Hero } from "../../entity/Hero.js";
import IHeroRepository from "../../interfaces/repositories/IHeroRepository.js";
import IHeroValidator from "../../interfaces/validators/IHeroValidator.js";
import IMapper from "../../interfaces/mapper/IMapper.js";
import UpdateHeroDTO from "../../dtos/hero/UpdateHeroDTO.js";
import CryptoHelper from "../../helpers/CryptHelper.js";
import { jest, describe, beforeEach, it, expect } from '@jest/globals';

describe("HeroService", () => {
    let heroService: HeroService;
    let heroRepository: jest.Mocked<IHeroRepository>;
    let heroValidator: jest.Mocked<IHeroValidator>;
    let mapper: jest.Mocked<IMapper>;

    beforeEach(() => {
        heroRepository = {
            exists: jest.fn(),
            changeStatus: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            find: jest.fn(),
            get: jest.fn(),
            delete: jest.fn()
        } as jest.Mocked<IHeroRepository>;

        heroValidator = {
            validateCreate: jest.fn(),
            validateUpdate: jest.fn(),
            validateExists: jest.fn()
        } as jest.Mocked<IHeroValidator>;

        mapper = {
            mapCreateHeroDTOToHero: jest.fn(),
            mapHeroToHeroResponse: jest.fn(),
            mapUpdateHeroDTOToHero: jest.fn()
        }  as jest.Mocked<IMapper>;

        heroService = new HeroService(heroRepository, heroValidator, mapper);
    });

    describe("create", () => {
        it("should create a hero successfully", async () => {
            const heroDto = new CreateHeroDTO(
                "Superman",
                "Clark Kent",
                new Date("1938-06-01"),
                "DC",
                "Super força",
                "https://example.com/avatar.jpg"
            );

            const heroEntity = new Hero();
            heroEntity.id = 1;
            heroEntity.name = "Superman";
            heroEntity.nickname = "Clark Kent";
            heroEntity.date_of_birth = new Date("1938-06-01");
            heroEntity.universe = "DC";
            heroEntity.main_power = "Super força";
            heroEntity.avatar_url = "https://example.com/avatar.jpg";
            heroEntity.is_active = true;
            heroEntity.created_at = new Date();
            heroEntity.updated_at = new Date();

            const heroResponse = new HeroResponse(
                heroEntity.id,
                heroEntity.name,
                heroEntity.nickname,
                heroEntity.date_of_birth,
                heroEntity.universe,
                heroEntity.main_power,
                heroEntity.avatar_url,
                heroEntity.is_active,
                heroEntity.created_at,
                heroEntity.updated_at
            );

            heroValidator.validateCreate.mockResolvedValue({ isValid: true, messages: [] });
            mapper.mapCreateHeroDTOToHero.mockReturnValue(heroEntity);
            heroRepository.create.mockResolvedValue(heroEntity);
            mapper.mapHeroToHeroResponse.mockReturnValue(heroResponse);

            const result = await heroService.create(heroDto);

            expect(heroValidator.validateCreate).toHaveBeenCalledWith(heroDto);
            expect(mapper.mapCreateHeroDTOToHero).toHaveBeenCalledWith(heroDto);
            expect(heroRepository.create).toHaveBeenCalledWith(heroEntity);
            expect(mapper.mapHeroToHeroResponse).toHaveBeenCalledWith(heroEntity);
            expect(result).toBe(heroResponse);
        });

        it("should throw BadRequestError if validation fails", async () => {
            const heroDto = new CreateHeroDTO(
                "Superman",
                "Clark Kent",
                new Date("1938-06-01"),
                "DC",
                "Super força",
                "https://example.com/avatar.jpg"
            );

            heroValidator.validateCreate.mockResolvedValue({
                isValid: false,
                messages: ["Nome inválido", "Poder principal obrigatório"]
            });

            await expect(heroService.create(heroDto)).rejects.toThrow(BadRequestError);
            expect(heroValidator.validateCreate).toHaveBeenCalledWith(heroDto);
            expect(mapper.mapCreateHeroDTOToHero).not.toHaveBeenCalled();
            expect(heroRepository.create).not.toHaveBeenCalled();
        });
    });

    describe("update", () => {
        it("should update a hero successfully", async () => {
            const heroDto = {
                id:1,
                nickname: "Superman",
                name: "Clark Kent",
                date_of_birth: new Date("1938-06-01"),
                universe: "DC",
                main_power: "Super força",
                avatar_url:"https://example.com/avatar.jpg"
            }

            const heroEntity = new Hero();
            heroEntity.id = 1;
            heroEntity.name = "Superman";
            heroEntity.nickname = "Clark Kent";
            heroEntity.date_of_birth = new Date("1938-06-01");
            heroEntity.universe = "DC";
            heroEntity.main_power = "Super força";
            heroEntity.avatar_url = "https://example.com/avatar.jpg";
            heroEntity.is_active = true;
            heroEntity.created_at = new Date();
            heroEntity.updated_at = new Date();

            const heroResponse = new HeroResponse(
                heroEntity.id,
                heroEntity.name,
                heroEntity.nickname,
                heroEntity.date_of_birth,
                heroEntity.universe,
                heroEntity.main_power,
                heroEntity.avatar_url,
                heroEntity.is_active,
                heroEntity.created_at,
                heroEntity.updated_at
            );

            heroValidator.validateUpdate.mockResolvedValue({ isValid: true, messages: [] }).mockResolvedValue({ isValid: true, messages: [] });
            mapper.mapUpdateHeroDTOToHero.mockReturnValue(heroEntity);
            heroRepository.update.mockResolvedValue(heroEntity);
            mapper.mapHeroToHeroResponse.mockReturnValue(heroResponse);

            const result = await heroService.update(heroDto, CryptoHelper.encrypt(1));

            expect(heroValidator.validateUpdate).toHaveBeenCalledWith(heroDto);
            expect(mapper.mapUpdateHeroDTOToHero).toHaveBeenCalledWith(heroDto);
            expect(heroRepository.update).toHaveBeenCalledWith(heroEntity);
            expect(mapper.mapHeroToHeroResponse).toHaveBeenCalledWith(heroEntity);
            expect(result).toBe(heroResponse);
        });

        it("should throw BadRequestError if validation fails", async () => {
            const heroDto = {
                id:1,
                nickname: "Superman",
                name: "Clark Kent",
                date_of_birth: new Date("1938-06-01"),
                universe: "DC",
                main_power: "Super força",
                avatar_url:"https://example.com/avatar.jpg"
            }

            heroValidator.validateUpdate.mockResolvedValue({
                isValid: false,
                messages: ["Nome inválido", "Poder principal obrigatório"]
            });

            await expect(heroService.update(heroDto, CryptoHelper.encrypt(1))).rejects.toThrow(BadRequestError);
            expect(heroValidator.validateUpdate).toHaveBeenCalledWith(heroDto);
            expect(mapper.mapUpdateHeroDTOToHero).not.toHaveBeenCalled();
            expect(heroRepository.update).not.toHaveBeenCalled();
        });
    });

    describe("delete", ()=> {
    
        it("should failed decrypt", async () => {
            await expect(heroService.delete('teste'))
                .rejects.toThrow(new BadRequestError("ID inválido"));
            expect(heroRepository.delete).not.toHaveBeenCalled();
        });

        it("should not found hero", async () => {
            const id = CryptoHelper.encrypt(1);

            heroValidator.validateExists.mockResolvedValue({
                isValid: false,
                messages: ["Heroi não encontrado"]
            });
            await expect(heroService.delete(id)).rejects.toThrow(BadRequestError);
            expect(heroRepository.delete).not.toHaveBeenCalled();
        });

        it("should delete hero", async () => {
            const id = CryptoHelper.encrypt(1);

            heroValidator.validateExists.mockResolvedValue({
                isValid: true,
                messages: []
            });

            await expect(heroService.delete(id)).resolves.toBeUndefined();
            expect(heroRepository.delete).toHaveBeenCalledWith(1);
        });
    });

    describe("changeStatus",()=>{
        it("should change hero status successfully", async () => {
            const id = CryptoHelper.encrypt(1);
            const isActive = false;

            heroValidator.validateExists.mockResolvedValue({
                isValid: true,
                messages: []
            });

            heroRepository.changeStatus.mockResolvedValue(new Hero());

            await expect(heroService.changeStatus(id, isActive)).resolves.toBeUndefined();
            expect(heroValidator.validateExists).toHaveBeenCalledWith(1);
            expect(heroRepository.changeStatus).toHaveBeenCalledWith(1, isActive);
        });

        it("should throw BadRequestError if hero does not exist", async () => {
            const id = CryptoHelper.encrypt(1);
            const isActive = false;

            heroValidator.validateExists.mockResolvedValue({
                isValid: false,
                messages: ["Heroi não encontrado"]
            });

            await expect(heroService.changeStatus(id, isActive)).rejects.toThrow(BadRequestError);
            expect(heroRepository.changeStatus).not.toHaveBeenCalled();
        });
    });
});
