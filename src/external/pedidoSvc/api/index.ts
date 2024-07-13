import axios from "axios";
import { serverConfig } from "config";

export const pedidoSvcAPi = axios.create({
    baseURL: serverConfig.pedidosMicroService.apiUrl,
});

export type PedidoSvcApi = typeof pedidoSvcAPi;
