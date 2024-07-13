import { PagamentoUseCase } from "useCases";
import { PagamentoMongoGateway } from "gateways";
import { PagamentoModel } from "external/mongo/models";
import { PagamentoController } from "./controller";
import { QueueManager } from "external/queueService";
import { serverConfig } from "config";
import { SQSClient } from "external/queueService/client";

export class PagamentoControllerFactory {
    public static create(): PagamentoController {
        const pagamentoGateway = new PagamentoMongoGateway(PagamentoModel);
        const pedidoQueueManager = new QueueManager(
            serverConfig.queues.confirmacaoPagemento,
            SQSClient,
        );

        const pagamentoUseCase = new PagamentoUseCase(
            PagamentoModel,
            pagamentoGateway,
            pedidoQueueManager,
        );
        return new PagamentoController(pagamentoUseCase);
    }
}
