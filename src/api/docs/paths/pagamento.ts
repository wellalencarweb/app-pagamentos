import { PagamentoTipoEnum } from "entities/pagamento";
import { serverError, unprocessableEntity } from "../defaults";

const PagamentoEnum = Object.values(PagamentoTipoEnum);

const PagamentoFields = {
    tipo: {
        type: "string",
        enum: PagamentoEnum,
    },
    valorTotal: {
        type: "number",
    },
    pedidoId: {
        type: "string",
    },
};

const RequiredFields = ["pedidoId", "valorTotal"];

export const PagamentoPaths = {
    "/pagamento": {
        get: {
            tags: ["pagamento"],
            summary: "Rota para listar todos os pagamentos",
            responses: {
                200: {
                    description: "pagamentos encontrados",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        id: {
                                            type: "string",
                                        },
                                        ...PagamentoFields,
                                    },
                                },
                            },
                        },
                    },
                },
                500: {
                    ...serverError,
                },
            },
        },
        post: {
            tags: ["pagamento"],
            summary: "Rota para inserir o pedido na base de pagamentos",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                ...PagamentoFields,
                            },
                            example: {
                                pedidoId: "649cdaa7a6f75c45046d797d",
                                valorTotal: 50,
                            },
                            required: RequiredFields,
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Pedido cadastrado",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    id: {
                                        type: "string",
                                    },
                                    ...PagamentoFields,
                                },
                            },
                        },
                    },
                },
                422: {
                    ...unprocessableEntity,
                },
                500: {
                    ...serverError,
                },
            },
        },
    },
    "/pagamento/{id}": {
        get: {
            tags: ["pagamento"],
            summary: "Rota para retornar um pagamento",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "id do pagamento a ser consultado",
                    required: true,
                    schema: {
                        type: "string",
                    },
                },
            ],
            responses: {
                201: {
                    description: "Dados do pagamento",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    id: {
                                        type: "string",
                                    },
                                    ...PagamentoFields,
                                },
                            },
                        },
                    },
                },
                422: {
                    ...unprocessableEntity,
                },
                500: {
                    ...serverError,
                },
            },
        },
    },
    "/pagamento/getByPedido/{pedidoId}": {
        get: {
            tags: ["pagamento"],
            summary: "Rota para retornar o pagamento de um determinado pedido",
            parameters: [
                {
                    in: "path",
                    name: "pedidoId",
                    description: "id do pedido a ser consultado",
                    required: true,
                    schema: {
                        type: "string",
                    },
                },
            ],
            responses: {
                201: {
                    description: "Dados do pagamento do pedido",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    id: {
                                        type: "string",
                                    },
                                    ...PagamentoFields,
                                },
                            },
                        },
                    },
                },
                422: {
                    ...unprocessableEntity,
                },
                500: {
                    ...serverError,
                },
            },
        },
    },
    "/pagamento/{id}/update-status": {
        patch: {
            tags: ["pagamento"],
            summary: "Rota para atualizar o status de um pagamento",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "id do pagamento a ser atualizado",
                    required: true,
                    schema: {
                        type: "string",
                    },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                status: {
                                    type: "string",
                                    enum: PagamentoEnum,
                                    default: "pendente",
                                },
                            },
                            required: "status",
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Status do pagamento atualizado",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    id: {
                                        type: "string",
                                    },
                                    ...PagamentoFields,
                                },
                                required: RequiredFields,
                            },
                        },
                    },
                },
                422: {
                    ...unprocessableEntity,
                },
                500: {
                    ...serverError,
                },
            },
        },
    },
};
