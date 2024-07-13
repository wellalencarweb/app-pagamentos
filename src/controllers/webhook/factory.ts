import { PagamentoEventMockUseCase } from "useCases";
import { PagamentoModel } from "external/mongo/models";
import { WebhookController } from "./controller";
import { PagamentoMongoGateway } from "gateways";

export class WebhookControllerFactory {
    public static create(): WebhookController {
        const pagamentoGateway = new PagamentoMongoGateway(PagamentoModel);
        const produtoUseCase = new PagamentoEventMockUseCase(pagamentoGateway);

        return new WebhookController(produtoUseCase);
    }
}
