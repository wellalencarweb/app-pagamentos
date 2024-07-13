import { PagamentoControllerFactory } from "./pagamento";
import { HealthControllerFactory } from "./health";
import { WebhookControllerFactory } from "./webhook";

export const pagamentoController = PagamentoControllerFactory.create();
export const webhookController = WebhookControllerFactory.create();
export const healthController = HealthControllerFactory.create();
