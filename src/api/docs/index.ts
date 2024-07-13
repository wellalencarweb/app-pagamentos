import { ApiPaths } from "./paths";

export const SwaggerConfig = {
    openapi: "3.0.0",
    info: {
        title: "fiap-5soat-pagamentos-app",
        description:
            "Microserviço de pagamentos",
        version: "1.0.0",
    },
    servers: [
        {
            url: "/api",
        },
    ],
    tags: [
        {
            name: "pagamento",
            description: "Rotas relacionadas a pagamento",
        },
    ],
    paths: ApiPaths,
};
