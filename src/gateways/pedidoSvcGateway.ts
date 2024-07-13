import { PagamentoTipoEnum } from "entities/pagamento";
import { PedidoSvcApi, PedidoStatus } from "external/pedidoSvc";

export class PedidoSvcGateway {
    constructor(private readonly pedidoSvcApi: PedidoSvcApi) {}

    async updateOrderPaymentStatus(
        pedidoId: string,
        tipo: PagamentoTipoEnum,
    ): Promise<void> {
        await this.pedidoSvcApi.patch(`/${pedidoId}/update-payment-status`, {
            statusPagamento: this.parseStatusPedidoSvc(tipo),
        });
    }

    parseStatusPedidoSvc(tipo: PagamentoTipoEnum): PedidoStatus {
        const statusMap = {
            [PagamentoTipoEnum.Aprovado]: "pagamento_aprovado",
            [PagamentoTipoEnum.Recusado]: "pagamento_nao_autorizado",
        };

        const status = statusMap[tipo] || "pagamento_pendente";

        return status as PedidoStatus;
    }
}
