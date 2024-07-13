import { Pagamento, PagamentoTipoEnum } from "entities/pagamento";
import { PagamentoEventMock, PagamentoEventMockTipoEnum } from "entities/pagamentoEventMock";
import { PagamentoGateway } from "interfaces/gateways";

import { PagamentoEventMockUseCase } from "useCases";
import { ResourceNotFoundError } from "utils/errors/resourceNotFoundError";

describe("Given PagamentoEventMockUseCases", () => {
    let gatewayStub: PagamentoGateway;
    let sut: PagamentoEventMockUseCase;

    const mockPedidoId = "659cae053a5d35f50991ac0a";

    const mockPagamento = new Pagamento({
      pedidoId: "dfffddc535266e603724b4ba",
      valorTotal: 38.90,
  });

    const mockPagamentoEvent = new PagamentoEventMock({
        pedidoId: "dfffddc535266e603724b4ba",
        tipo: PagamentoEventMockTipoEnum.Aprovado,
    });

    class PagamentoGatewayStub implements PagamentoGateway {
      create(_: Pagamento): Promise<Pagamento> {
        return Promise.resolve(mockPagamento);
      }
  
      getAll(_?: Partial<Pagamento>): Promise<Pagamento[]> {
        return Promise.resolve([mockPagamento])
      }

      getById(_: string): Promise<Pagamento> {
        return Promise.resolve(mockPagamento);
      }

      getByPedidoId(_: string): Promise<Pagamento> {
        return Promise.resolve(mockPagamento);
      }

      updateStatus(_: string, __: PagamentoTipoEnum): Promise<Pagamento> {
        return Promise.resolve(mockPagamento);
      }
      
      checkDuplicate(args: { pedidoId: string; }): Promise<boolean> {
        if (args.pedidoId === mockPedidoId) {
          return Promise.resolve(true);
        }

        return Promise.resolve(false);
      }
    }

    beforeAll(() => {
      gatewayStub = new PagamentoGatewayStub();
      sut = new PagamentoEventMockUseCase(gatewayStub);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe("Given handle method is called", () => {
      describe("When tipo is 'pendente'", () => {
        it("should just return", async () => {
          const pagamento = await sut.handle(mockPagamentoEvent);
          expect(pagamento).toBeUndefined();
        });
      });

      describe("When id do not exists", () => {
        it("should throw an ResourceNotFoundError", async () => {

          const getByPedidoId = jest.spyOn(gatewayStub, "getByPedidoId").mockResolvedValueOnce(
            undefined,
          );

          const pagamento = sut.handle(mockPagamentoEvent);

          await expect(pagamento).rejects.toThrow(
            new ResourceNotFoundError("Pedido não encontrado"),
          );

          expect(getByPedidoId).toHaveBeenCalled();
        });
      });
      
      describe("When pagamento tipo is already different from 'Pendente'", () => {
        it("should just return", async () => {
          mockPagamento.tipo = PagamentoTipoEnum.Recusado;
          const pagamento = await sut.handle(mockPagamentoEvent);
          expect(pagamento).toBeUndefined();
        });
      });
    });
});