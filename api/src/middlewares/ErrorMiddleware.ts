import { Request, Response, NextFunction } from "express";
import BadRequestError from "../errors/BadRequestError.js";

class ErrorMiddleware {
    public static handleError(
        err: Error  ,
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        const status = err instanceof BadRequestError ? 400 : 500;
        const message = err.message || "Internal Server Error";

        res.status(status).json({ status, message });
    }
}

export default ErrorMiddleware;