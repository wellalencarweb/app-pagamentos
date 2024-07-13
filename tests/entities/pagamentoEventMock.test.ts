import { PagamentoEventMock, PagamentoEventMockTipoEnum } from "entities/pagamentoEventMock";

describe("Given PagamentoEventMockEntity", () => {
    describe("when received all params correctly", () => {
        it("should create a new instance of PagamentoEventMock", () => {
            const pagamento = new PagamentoEventMock({
                pedidoId: "dfffddc535266e603724b4ba",
                tipo: PagamentoEventMockTipoEnum.Recusado
            });

            expect(pagamento).toBeInstanceOf(PagamentoEventMock);
        });

        it("should have a valid pedidoId", () => {
          const ObjectIdRegex = /^[a-f\d]{24}$/i;
  
          const pagamento = new PagamentoEventMock({
            pedidoId: "dfffddc535266e603724b4ba",
            tipo: PagamentoEventMockTipoEnum.Recusado
          });

          expect(ObjectIdRegex.test(pagamento.pedidoId));
        });
    });

    describe("When missing a required param", () => {
        it("should throw an error if pedidoId is not provided", () => {
            expect(() => {
                new PagamentoEventMock({
                    pedidoId: undefined,
                    tipo: PagamentoEventMockTipoEnum.Recusado
                });
            }).toThrow("pedidoId is required");
        });

        it("should throw an error if tipo is not provided", () => {
            expect(() => {
                new PagamentoEventMock({
                    pedidoId: "dfffddc535266e603724b4ba",
                    tipo: undefined
                });
            }).toThrow("tipo is required");
        });
    });

    describe("When pedidoId has a invalid ObjectId", () => {
      it("should throw an error", () => {
        expect(() => {
            new PagamentoEventMock({
                pedidoId: "123",
                tipo: PagamentoEventMockTipoEnum.Recusado
            });
        }).toThrow("pedidoId must be a valid ObjectId");
      });
    });

    describe("When tipo has a invalid value", () => {
      it("should throw an error", () => {
        const invalidObject = {
          pedidoId: "dfffddc535266e603724b4ba",
          tipo: "invalid"
        };

        expect(() => {
          new PagamentoEventMock(invalidObject as PagamentoEventMock);
        }).toThrow(`tipo must be one of ${Object.values(PagamentoEventMockTipoEnum)}`);
      });
    });
});