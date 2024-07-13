export type PedidoStatus =
    | "pagamento_pendente"
    | "pagamento_aprovado"
    | "pagamento_nao_autorizado";

export interface PedidoSvcEvent {
    pagamento: PedidoStatus;
}
