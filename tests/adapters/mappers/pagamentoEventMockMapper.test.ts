import { PagamentoEventMockMapper } from "adapters/mappers";
import { PagamentoEventMock, PagamentoEventMockTipoEnum } from "entities/pagamentoEventMock";
import { PagamentoEventMockDTO } from "useCases";

describe("Given pagamentoEventMockMapper", () => {
    const mockData = {
        id: "7dabebe08f06c4bfeeb7d896",
        pedidoId: "dfffddc535266e603724b4ba",
        valorTotal: 10,
        tipo: PagamentoEventMockTipoEnum.Pendente
    };
    describe("When toDomain is called", () => {
        it("should parse a domain produto to dto format", () => {
            const parsed = PagamentoEventMockMapper.toDomain(mockData as PagamentoEventMockDTO);
            expect(parsed).toBeInstanceOf(PagamentoEventMock);
            expect(parsed).toEqual(
                new PagamentoEventMock({
                  pedidoId: mockData.pedidoId,
                  tipo: mockData.tipo,
                }),
            );
        });
    });
});