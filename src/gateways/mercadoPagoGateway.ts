import { serverConfig } from "config";
import { PagamentoEventMockMapper } from "adapters/mappers";
import { PagamentoEventMock } from "entities/pagamentoEventMock";
import { MercadoPagoApi, MercadoPagoMerchantOrder, MercadoPagoPayment } from "external/mercadoPago";

// ! WORK IN PROGRESS
export class MercadoPagoGateway {
    constructor(private readonly mercadoPagoApi: MercadoPagoApi) {}

    private readonly mercadoPagoUserId = serverConfig.mercadoPago.userId;
    private readonly mercadoPagoPOS = serverConfig.mercadoPago.pos;

    async getPagamentoEvent(mercadoPagoId: string): Promise<PagamentoEventMock> {
        const { data } =
            await this.mercadoPagoApi.get<MercadoPagoMerchantOrder>(
                `/merchant_orders/${mercadoPagoId}`,
            );

        return PagamentoEventMockMapper.toDomain({
            pedidoId: data.external_reference,
            tipo: this.getTipo(data),
        });
    }

    async createOrder(pagamento: PagamentoEventMock): Promise<string> {
        const { data } = await this.mercadoPagoApi.post<{ qr_data: string }>(
            `/instore/orders/qr/seller/collectors/${this.mercadoPagoUserId}/pos/${this.mercadoPagoPOS}/qrs`,
            {
                external_reference: pagamento.pedidoId,
                title: pagamento.pedidoId,
                description: pagamento.pedidoId,
                items: [
                    {
                        title: "PRODUTO 1",
                        unit_price: 50,
                        quantity: 1,
                        unit_measure: "unit",
                        total_amount: 50,
                    },
                ],
            },
        );

        return data.qr_data;
    }

    private getTipo({
        status,
        payments,
    }: MercadoPagoMerchantOrder): PagamentoEventMock["tipo"] {
        const lastPayment = this.getLastPayment(payments);

        if (status === "closed" && lastPayment.status !== "approved") {
            return "recusado";
        }

        if (status === "closed" && lastPayment.status === "approved") {
            return "aprovado";
        }

        return "pendente";
    }

    private getLastPayment(payments: MercadoPagoPayment[]) {
        payments.sort(
            (a, b) =>
                new Date(b.date_created).getTime() -
                new Date(a.date_created).getTime(),
        );

        return payments[0];
    }
}

