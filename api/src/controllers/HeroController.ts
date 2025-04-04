import { Request, Response } from "express";

import CreateHeroDTO from "../dtos/hero/CreateHeroDTO.js";
import UpdateHeroDTO from "../dtos/hero/UpdateHeroDTO.js";
import TParamsHero from "../type/TParamsHero.js";
import IHeroService from "../interfaces/services/IHeroService.js";

class HeroController {
    constructor(private heroService: IHeroService) {}

    async create(req: Request, res: Response) {
        const hero = await this.heroService.create(req.body as CreateHeroDTO);
        return res.status(201).json(hero);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const hero = await this.heroService.update(req.body as UpdateHeroDTO, id);
        return res.status(200).json(hero);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        await this.heroService.delete(id);
        return res.status(204).send();
    }

    async get(req: Request, res: Response) {
        const parameters: TParamsHero = {
            search: typeof req.query.search === "string" ? req.query.search : "",
            total: req.query.total ? Number(req.query.total) : undefined,
            page: req.query.page ? Number(req.query.page) : undefined
        };
        const heroes = await this.heroService.get(parameters);
        return res.status(200).json(heroes);

    }

    async changeStatus(req: Request, res: Response) {
        const { id } = req.params;
        const { status } = req.body;
        const hero = await this.heroService.changeStatus(id, status);
        return res.status(200).json(hero);
    }
}

export default HeroController;
