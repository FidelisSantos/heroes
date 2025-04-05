import HeroValidator from "../../validators/HeroValidator.js";
import IHeroRepository from "../../interfaces/repositories/IHeroRepository.js";
import CreateHeroDTO from "../../dtos/hero/CreateHeroDTO.js";
import UpdateHeroDTO from "../../dtos/hero/UpdateHeroDTO.js";
import CryptoHelper from "../../helpers/CryptHelper.js";
import { jest, describe, beforeEach, it, expect } from '@jest/globals';

describe("HeroValidator", () => {
    let heroRepositoryMock: jest.Mocked<IHeroRepository>;
    let heroValidator: HeroValidator;

    beforeEach(() => {
        heroRepositoryMock = {
            exists: jest.fn(),
            changeStatus: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            find: jest.fn(),
            get: jest.fn(),
            delete: jest.fn()
        } as jest.Mocked<IHeroRepository>;

        heroValidator = new HeroValidator(heroRepositoryMock);
    });
    describe("validateCreate", () => {
        it("Deve retornar erro se o apelido já existir no universo", async () => {
            heroRepositoryMock.exists.mockResolvedValueOnce(true);
    
            const heroDto = new CreateHeroDTO("Superman", "Clark Kent", new Date("1938-06-01"), "DC", "Super força", "https://example.com/avatar.jpg");
    
            const result = await heroValidator.validateCreate(heroDto);
    
            expect(result.isValid).toBe(false);
            expect(result.messages).toContain("Apelido já existe nesse universo");
        });
    
        it("Deve retornar erro se o nome já existir no universo", async () => {
            heroRepositoryMock.exists.mockResolvedValueOnce(false).mockResolvedValueOnce(true);
            const heroDto = new CreateHeroDTO("Superman", "Clark Kent", new Date("1938-06-01"), "DC", "Super força", "https://example.com/avatar.jpg");
    
            const result = await heroValidator.validateCreate(heroDto);
    
            expect(result.isValid).toBe(false);
            expect(result.messages).toContain("Nome já existe nesse universo");
        });
    
        it("Deve retornar erro se tanto o nome quanto o apelido já existirem no universo", async () => {
            heroRepositoryMock.exists.mockResolvedValueOnce(true).mockResolvedValueOnce(true);
    
            const heroDto = new CreateHeroDTO("Superman", "Clark Kent", new Date("1938-06-01"), "DC", "Super força", "https://example.com/avatar.jpg");
    
            const result = await heroValidator.validateCreate(heroDto);
    
            expect(result.isValid).toBe(false);
            expect(result.messages).toEqual([
                "Apelido já existe nesse universo",
                "Nome já existe nesse universo"
            ]);
        });

        it("Deve retornar erro de campos vázios", async () => {    
            const heroDto = new CreateHeroDTO("", "", new Date(""), "", "", "");
    
            const result = await heroValidator.validateCreate(heroDto);
    
            expect(result.isValid).toBe(false);
            expect(result.messages).toEqual(expect.arrayContaining([
                "O nome é obrigatório.",
                "O apelido é obrigatório.",
                "A data de nascimento é obrigatória.",
                "O universo é obrigatório.",
                "O principal poder é obrigatório."
            ]));
        });

        it("Deve retornar erro de campo nome", async () => {    
            const heroDto = new CreateHeroDTO( "Clark Kent2","Superman", new Date("1938-06-01"), "DC", "Super força", "https://example.com/avatar.jpg");
    
            const result = await heroValidator.validateCreate(heroDto);
    
            expect(result.isValid).toBe(false);
            expect(result.messages).toEqual(expect.arrayContaining([
                "O nome não pode conter números."
            ]));
        });
    
    
        it("Deve retornar válido se não houver duplicatas", async () => {
            heroRepositoryMock.exists.mockResolvedValueOnce(false).mockResolvedValueOnce(false);
    
            const heroDto = new CreateHeroDTO("Superman", "Clark Kent", new Date("1938-06-01"), "DC", "Super força", "https://example.com/avatar.jpg");
    
            const result = await heroValidator.validateCreate(heroDto);
    
            expect(result.isValid).toBe(true);
            expect(result.messages).toEqual([]);
        });
    });

    describe("validateUpdate", () => {
        it("Deve retornar erro se o apelido já existir no universo", async () => {
            heroRepositoryMock.exists.mockResolvedValueOnce(true).mockResolvedValueOnce(false).mockResolvedValueOnce(true);
    
            const heroDto = new UpdateHeroDTO(
                1,
                "Homem de Ferro",
                "Tony",
                new Date("1970-05-29"),
                "Marvel",
                "Armadura",
                "https://imagem.com/ironman.jpg"
            );
    
            const result = await heroValidator.validateUpdate(heroDto);
    
            expect(result.isValid).toBe(false);
            expect(result.messages).toContain("Apelido já existe nesse universo");
        });
    
        it("Deve retornar erro se o nome já existir no universo", async () => {
            heroRepositoryMock.exists.mockResolvedValueOnce(true).mockResolvedValueOnce(false).mockResolvedValueOnce(false).mockResolvedValueOnce(true);
    
            const heroDto = new UpdateHeroDTO(
                1,
                "Homem de Ferro",
                "Tony",
                new Date("1970-05-29"),
                "Marvel",
                "Armadura",
                "https://imagem.com/ironman.jpg"
            );
    
            const result = await heroValidator.validateUpdate(heroDto);
    
            expect(result.isValid).toBe(false);
            expect(result.messages).toContain("Nome já existe nesse universo");
        });
    
        it("Deve retornar erro se tanto o nome quanto o apelido já existirem no universo", async () => {
            heroRepositoryMock.exists.mockResolvedValueOnce(true).mockResolvedValueOnce(false).mockResolvedValueOnce(true).mockResolvedValueOnce(true);
            const heroDto = new UpdateHeroDTO(
                1,
                "Homem de Ferro",
                "Tony",
                new Date("1970-05-29"),
                "Marvel",
                "Armadura",
                "https://imagem.com/ironman.jpg"
            );
    
            const result = await heroValidator.validateUpdate(heroDto);
    
            expect(result.isValid).toBe(false);
            expect(result.messages).toEqual([
                "Apelido já existe nesse universo",
                "Nome já existe nesse universo"
            ]);
        });

        it("Deve retornar por herói estar inativo", async () => {
            heroRepositoryMock.exists.mockResolvedValueOnce(true).mockResolvedValueOnce(true).mockResolvedValueOnce(true).mockResolvedValueOnce(true);

            const heroDto = new UpdateHeroDTO(
                1,
                "Homem de Ferro",
                "Tony",
                new Date("1970-05-29"),
                "Marvel",
                "Armadura",
                "https://imagem.com/ironman.jpg"
            );
    
            const result = await heroValidator.validateUpdate(heroDto);
    
            expect(result.isValid).toBe(false);
            expect(result.messages).toEqual([
                "Herói inativo não pode ser editado"
            ]);
        });

        it("Deve retornar erro de campos vázios", async () => {    
            const heroDto = new UpdateHeroDTO(1,"", "", new Date(""), "", "", "");
    
            const result = await heroValidator.validateUpdate(heroDto);
    
            expect(result.isValid).toBe(false);
            expect(result.messages).toEqual(expect.arrayContaining([
                "O nome é obrigatório.",
                "O apelido é obrigatório.",
                "A data de nascimento é obrigatória.",
                "O universo é obrigatório.",
                "O principal poder é obrigatório."
            ]));
        });

        it("Deve retornar erro de nome inválido", async () => {    
            const heroDto = new UpdateHeroDTO(
                1,
                "Tony 2",
                "Homem de Ferro",
                new Date("1970-05-29"),
                "Marvel",
                "Armadura",
                "https://imagem.com/ironman.jpg"
            );
    
            const result = await heroValidator.validateUpdate(heroDto);
    
            expect(result.isValid).toBe(false);
            expect(result.messages).toEqual(expect.arrayContaining([
                "O nome não pode conter números.",
            ]));
        });
    
    
        it("Deve retornar válido se não houver duplicatas", async () => {
            heroRepositoryMock.exists.mockResolvedValueOnce(true).mockResolvedValueOnce(false).mockResolvedValueOnce(false).mockResolvedValueOnce(false);
    
            const heroDto = new UpdateHeroDTO(
                1,
                "Homem de Ferro",
                "Tony",
                new Date("1970-05-29"),
                "Marvel",
                "Armadura",
                "https://imagem.com/ironman.jpg"
            );

            const result = await heroValidator.validateUpdate(heroDto);
    
            expect(result.isValid).toBe(true);
            expect(result.messages).toEqual([]);
        });
    });
});
