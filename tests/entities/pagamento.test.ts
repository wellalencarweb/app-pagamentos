import { Pagamento, PagamentoTipoEnum } from "entities/pagamento";

describe("Given PagamentoEntity", () => {
    describe("when received all params correctly", () => {
        it("should create a new instance of Pagamento", () => {
            const pagamento = new Pagamento({
                pedidoId: "dfffddc535266e603724b4ba",
                valorTotal: 10,
                tipo: PagamentoTipoEnum.Recusado
            });

            expect(pagamento).toBeInstanceOf(Pagamento);
        });

        it("should have a valid id", () => {
          const ObjectIdRegex = /^[a-f\d]{24}$/i;
  
          const pagamento = new Pagamento({
            pedidoId: "dfffddc535266e603724b4ba",
            valorTotal: 10,
            tipo: PagamentoTipoEnum.Recusado
          });

          expect(ObjectIdRegex.test(pagamento.id));
        });
    });

    describe("when create a new instance of Pagamento without tipo", () => {
      it("should have default tipo 'Pendente'", () => {
          const pagamento = new Pagamento({
              pedidoId: "dfffddc535266e603724b4ba",
              valorTotal: 10,
          });

          expect(pagamento.tipo).toBe(PagamentoTipoEnum.Pendente);
      });

      it("should have a valid id", () => {
        const ObjectIdRegex = /^[a-f\d]{24}$/i;

        const pagamento = new Pagamento({
          pedidoId: "dfffddc535266e603724b4ba",
          valorTotal: 10,
          tipo: PagamentoTipoEnum.Recusado
        });

        expect(ObjectIdRegex.test(pagamento.id));
      });
  });

    describe("When missing a required param", () => {
        it("should throw an error if pedidoId is not provided", () => {
            expect(() => {
                new Pagamento({
                    pedidoId: undefined,
                    valorTotal: 10,
                    tipo: PagamentoTipoEnum.Recusado
                });
            }).toThrow("pedidoId is required");
        });

        it("should throw an error if valorTotal is not provided", () => {
            expect(() => {
                new Pagamento({
                  pedidoId: "dfffddc535266e603724b4ba",
                  valorTotal: undefined,
                  tipo: PagamentoTipoEnum.Recusado
                });
            }).toThrow("valorTotal is required");
        });
    });

    describe("When pedidoId has a invalid ObjectId", () => {
      it("should throw an error", () => {
        expect(() => {
            new Pagamento({
                pedidoId: "123",
                valorTotal: 10,
                tipo: PagamentoTipoEnum.Recusado
            });
        }).toThrow("pedidoId must be a valid ObjectId");
      });
    });

    describe("When tipo has a invalid value", () => {
      it("should throw an error", () => {
        const invalidObject = {
          pedidoId: "dfffddc535266e603724b4ba",
          valorTotal: 10,
          tipo: "invalid"
        };

        expect(() => {
          new Pagamento(invalidObject as Pagamento);
        }).toThrow(`tipo must be one of ${Object.values(PagamentoTipoEnum)}`);
      });
    });

    describe("When valorTotal has a value less than zero", () => {
        it("should throw an error", () => {
            expect(() => {
                new Pagamento({
                    pedidoId: "dfffddc535266e603724b4ba",
                    valorTotal: 0
                });
            }).toThrow("valorTotal must be bigger than zero");
        });
    });
});