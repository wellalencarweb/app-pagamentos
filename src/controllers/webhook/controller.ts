import { NextFunction, Request, Response } from "express";
import { PagamentoEventMockDTO, PagamentoEventMockUseCase } from "useCases";
import { StatusCode } from "utils/statusCode";

export class WebhookController {
    constructor(
        private readonly pagamentoEventMockUseCase: PagamentoEventMockUseCase,
    ) {}

    public async postMock(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const data = req.body as PagamentoEventMockDTO;
            await this.pagamentoEventMockUseCase.handle(data);

            return res.status(StatusCode.ok).end();
        } catch (error) {
            next(error);
        }
    }
}
