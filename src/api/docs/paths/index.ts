import { PagamentoPaths } from "./pagamento";
import { WebhookPaths } from "./webhook";

export const ApiPaths = {
    ...PagamentoPaths,
    ...WebhookPaths
};
