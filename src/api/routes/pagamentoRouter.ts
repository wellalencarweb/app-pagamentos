import { Router } from "express";
import { pagamentoController } from "controllers";

export function makePagamentoRouter(): Router {
    const pagamentoRouter = Router();

    pagamentoRouter.post("/", async (req, res, next) =>
        pagamentoController.post(req, res, next),
    );

    pagamentoRouter.get("/", async (req, res, next) =>
        pagamentoController.get(req, res, next),
    );

    pagamentoRouter.get("/:id", async (req, res, next) =>
        pagamentoController.getById(req, res, next),
    );

    pagamentoRouter.patch("/:id/update-status", async (req, res, next) =>
        pagamentoController.patchStatus(req, res, next),
    );

    pagamentoRouter.get("/getByPedido/:pedidoId", async (req, res, next) =>
        pagamentoController.getByPedidoId(req, res, next),
    );

    return pagamentoRouter;
}
