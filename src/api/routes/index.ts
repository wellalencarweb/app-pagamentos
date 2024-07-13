import { Router } from "express";
import { makePagamentoRouter } from "./pagamentoRouter";
import { makeHealthRouter } from "./healthRouter";
import { makeWebhookRouter } from "./webhookRouter";

export function makeServerRouter(): Router {
    const serverRouter = Router();

    serverRouter.use("/pagamento", makePagamentoRouter());
    serverRouter.use("/health", makeHealthRouter());
    serverRouter.use("/webhook", makeWebhookRouter());

    return serverRouter;
}
