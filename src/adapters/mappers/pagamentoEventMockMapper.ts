import { PagamentoEventMock } from "entities/pagamentoEventMock";
import { PagamentoEventMockDTO } from "useCases";

export class PagamentoEventMockMapper {
    public static toDomain(dto: PagamentoEventMockDTO): PagamentoEventMock {
        return new PagamentoEventMock({
            pedidoId: dto.pedidoId,
            tipo: dto.tipo,
        });
    }
}
