import { NextFunction, Request, Response } from "express";
import { PagamentoUseCase } from "useCases";
import { StatusCode } from "utils/statusCode";

export class PagamentoController {
    constructor(private readonly pagamentoUseCase: PagamentoUseCase) {}

    public async get(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const result = await this.pagamentoUseCase.getAll();
            return res.status(StatusCode.ok).json(result);
        } catch (error) {
            next(error);
        }
    }

    public async getById(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        const id = req.params.id;
        try {
            if (!id) {
                return res
                    .status(StatusCode.unprocessableEntity)
                    .json({ message: "Missing identifier id" });
            }

            const result = await this.pagamentoUseCase.getById(id);

            if (!result) {
                return res.status(StatusCode.notFound).end();
            }

            return res.status(StatusCode.ok).json(result);
        } catch (error) {
            next(error);
        }
    }

    public async getByPedidoId(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        const pedidoId = req.params.pedidoId;

        try {

            if (!pedidoId) {
                return res
                    .status(StatusCode.unprocessableEntity)
                    .json({ message: "Missing identifier pedidoId" });
            }

            const result = await this.pagamentoUseCase.getByPedidoId(pedidoId);

            if (!result) {
                return res.status(StatusCode.notFound).end();
            }

            return res.status(StatusCode.ok).json(result);
        } catch (error) {
            next(error);
        }
    }

    public async post(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const result = await this.pagamentoUseCase.create(req.body);
            return res.status(StatusCode.created).json(result);
        } catch (error) {
            next(error);
        }
    }

    public async patchStatus(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        const { id } = req.params;

        try {

            if (!id) {
                return res
                    .status(StatusCode.unprocessableEntity)
                    .json({ message: "Missing identifier id" });
            }

            if (!req.body || !req.body.status) {
                return res
                    .status(StatusCode.unprocessableEntity)
                    .json({ message: "Missing status on body" });
            }

            const result = await this.pagamentoUseCase.updateStatus(id, req.body?.status ?? undefined);
            return res.status(StatusCode.ok).json(result);
        } catch (error) {
            next(error);
        }
    }
}
