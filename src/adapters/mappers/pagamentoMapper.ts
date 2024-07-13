import { Pagamento } from "entities/pagamento";
import { PagamentoDTO } from "useCases";

export class PagamentoMapper {
    public static toDomain(dto: PagamentoDTO): Pagamento {
        return new Pagamento({
            id: dto.id,
            pedidoId: dto.pedidoId,
            tipo: dto.tipo,
            valorTotal: dto.valorTotal
        });
    }

    public static toDTO(pagamento: Pagamento): PagamentoDTO {

        return {
            id: pagamento.id,
            tipo: pagamento.tipo,
            pedidoId: pagamento.pedidoId,
            valorTotal: pagamento.valorTotal,
        };
    }
}
