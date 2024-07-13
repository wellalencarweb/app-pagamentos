import { PagamentoMapper } from "adapters/mappers";
import { Pagamento, PagamentoTipoEnum } from "entities/pagamento";
import { PagamentoDTO } from "useCases";

describe("Given pagamentoMapper", () => {
    const mockData = {
        id: "7dabebe08f06c4bfeeb7d896",
        pedidoId: "dfffddc535266e603724b4ba",
        valorTotal: 10,
        tipo: PagamentoTipoEnum.Pendente
    };

    describe("When toDTO is Called", () => {
        it("should format the data to DTO format", () => {
            const pagamento = new Pagamento({
                id: mockData.id,
                pedidoId: mockData.pedidoId,
                valorTotal: mockData.valorTotal,
                tipo: mockData.tipo,
            });
            const parsed = PagamentoMapper.toDTO(pagamento);
            expect(parsed).toEqual(mockData);
        });
    });

    describe("When toDomain is called", () => {
        it("should parse a domain produto to dto format", () => {
            const parsed = PagamentoMapper.toDomain(mockData as PagamentoDTO);
            expect(parsed).toBeInstanceOf(Pagamento);
            expect(parsed).toEqual(
                new Pagamento({
                  id: mockData.id,
                  pedidoId: mockData.pedidoId,
                  valorTotal: mockData.valorTotal,
                  tipo: mockData.tipo,
                }),
            );
        });
    });
});