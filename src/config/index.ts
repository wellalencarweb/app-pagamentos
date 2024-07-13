import { parseEnvInt, parseEnvStr } from "./utils";

export const serverConfig = {
    env: parseEnvStr("NODE_ENV", "development"),
    port: parseEnvInt("PORT", 6003),
    isProduction: process.env.NODE_ENV === "production",
    isDevelopment: process.env.NODE_ENV === "development",
    mongo: {
        dbName: parseEnvStr("MONGO_DB_NAME", "fast_food"),
        connectionString: parseEnvStr(
            "MONGODB_CONN_STRING",
            "mongodb://localhost:27017",
        ),
    },
    mercadoPago: {
        apiUrl: "https://api.mercadopago.com",
        userId: parseEnvStr("MERCADO_PAGO_USER_ID", "379061219"),
        pos: parseEnvStr("MERCADO_PAGO_POS", "STORE001POS001"),
        token: parseEnvStr(
            "MERCADO_PAGO_TOKEN",
            "TEST-2732348911740652-082612-1a10554b72bc3f53eab52110003023d0-379061219",
        ),
    },
    pedidosMicroService: {
        apiUrl: parseEnvStr(
            "PEDIDO_SVC_URL",
            "http://localhost:6004/api/pedido",
        ),
    },
    sqs: {
        region: parseEnvStr("SQS_REGION"),
        accessKeyId: parseEnvStr("SQS_ACCESS_KEY_ID"),
        secretAccessKey: parseEnvStr("SQS_SECRET_ACCESS_KEY"),
    },
    queues: {
        confirmacaoPagemento: parseEnvStr(
            "QUEUE_CONFIRMACAO_PAGAMENTO",
            "https://sqs.us-east-1.amazonaws.com/146747026776/confirmacao-pagamento",
        ),
    },
} as const;
