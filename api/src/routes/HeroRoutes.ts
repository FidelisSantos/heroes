import { Router, Request, Response, NextFunction } from "express";
import { heroController } from "../builder/index.js";

class HeroRoutes {
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        /**
         * @swagger
         * /hero:
         *   post:
         *     summary: Criar um novo herói
         *     tags: [Heróis]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/CreateHeroDTO'
         *     responses:
         *       201:
         *         description: Herói criado com sucesso
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Hero'
         */
        this.router.post("/", this.create);

        /**
         * @swagger
         * /hero/{id}:
         *   put:
         *     summary: Atualizar um herói existente
         *     tags: [Heróis]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/UpdateHeroDTO'
         *     responses:
         *       200:
         *         description: Herói atualizado com sucesso
         */
        this.router.put("/:id", this.update);

        /**
         * @swagger
         * /hero/{id}:
         *   delete:
         *     summary: Excluir um herói
         *     tags: [Heróis]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *     responses:
         *       204:
         *         description: Herói excluído com sucesso
         */
        this.router.delete("/:id", this.delete);

        /**
         * @swagger
         * /hero:
         *   get:
         *     summary: Listar todos os heróis
         *     tags: [Heróis]
         *     responses:
         *       200:
         *         description: Lista de heróis
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/HeroResponsePagination'
         */
        this.router.get("/", this.get);

       /**
         * @swagger
         * /hero/{id}/status:
         *   put:
         *     summary: Alterar status de um herói
         *     tags: [Heróis]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               status:
         *                 type: boolean
         *                 example: true
         *     responses:
         *       200:
         *         description: Status do herói alterado com sucesso
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 status:
         *                   type: boolean
         *                   example: true
         */
        this.router.put("/:id/status", this.changeStatus);
    }

    private async create(req: Request, res: Response, next: NextFunction) {
        try {
            await heroController.create(req, res);
            return
        } catch (error) {
            next(error); // Pass the error to the next middleware
        }
    }

    private async update(req: Request, res: Response, next: NextFunction) {
        try {
            await heroController.update(req, res);
            return
        } catch (error) {
            next(error);
        }
    }

    private async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await heroController.delete(req, res);
            return
        } catch (error) {
            next(error);
        }
    }

    private async get(req: Request, res: Response, next: NextFunction) {
        try {
            await heroController.get(req, res);
            return
        } catch (error) {
            next(error);
        }
    }

    private async changeStatus(req: Request, res: Response, next: NextFunction) {
        try {
            await heroController.changeStatus(req, res);
            return
        } catch (error) {
            next(error);
        }
    }
}

export default HeroRoutes;
