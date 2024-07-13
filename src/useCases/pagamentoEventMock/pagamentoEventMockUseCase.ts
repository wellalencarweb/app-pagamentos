import { PagamentoGateway } from "interfaces/gateways";
import { PagamentoTipoEnum } from "entities/pagamento";
import { ResourceNotFoundError } from "utils/errors/resourceNotFoundError";
import { PagamentoEventMockMapper } from "adapters/mappers";
import { IPagamentoEventMockUseCase } from "./pagamentoEventMock.interface";
import { PagamentoEventMockDTO } from "./dto";

export class PagamentoEventMockUseCase implements IPagamentoEventMockUseCase {
    constructor(private readonly pagamentoGateway: PagamentoGateway) {}

    async handle(data: PagamentoEventMockDTO): Promise<void> {
        const { pedidoId, tipo } = PagamentoEventMockMapper.toDomain(data);

        if (tipo === "pendente") {
            return;
        }

        const pagamento = await this.pagamentoGateway.getByPedidoId(pedidoId);

        if (!pagamento) {
            throw new ResourceNotFoundError("Pedido não encontrado");
        }

        if (pagamento.tipo !== "pendente") {
            return;
        }

        await this.pagamentoGateway.updateStatus(
            pagamento.id,
            tipo as PagamentoTipoEnum,
            null,
        );
    }
}
