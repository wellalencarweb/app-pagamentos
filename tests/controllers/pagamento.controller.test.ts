import { PagamentoController } from "controllers/pagamento";
import { PagamentoTipoEnum } from "entities/pagamento";
import { PagamentoUseCase } from "useCases";
import { StatusCode } from "utils/statusCode";

describe("PagamentoController", () => {
  let pagamentoUseCaseMock: jest.Mocked<PagamentoUseCase>;
  let pagamentoController: PagamentoController;

  beforeEach(() => {
    pagamentoUseCaseMock = {} as jest.Mocked<PagamentoUseCase>;
    pagamentoController = new PagamentoController(pagamentoUseCaseMock);
  });

  describe("Given post method is called", () => {
    describe("When all the data is correct and no problems are found", () => {
      it("should create a new pagamento data and return it", async () => {
        const mockRequest = {
          body: {
            pedidoId: "65a2aedd591338377f5a575e",
            valorTotal: 26
          },
        } as any;

        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        } as any;

        const mockNextFunction = jest.fn();
        const expectedResult = { id: "someId", ...mockRequest.body };

        pagamentoUseCaseMock.create = jest
          .fn()
          .mockResolvedValue(expectedResult);

          await pagamentoController.post(
            mockRequest,
            mockResponse,
            mockNextFunction,
          );

          expect(mockResponse.status).toHaveBeenCalledWith(
            StatusCode.created,
          );
          expect(mockResponse.json).toHaveBeenCalledWith(expectedResult);
          expect(mockNextFunction).not.toHaveBeenCalled();
      });
    });

    describe("When an error happens", () => {
      it("should handle errors by calling the next function with the error", async () => {
          const mockRequest = {
              body: {},
          } as any;
          const mockResponse = {} as any;
          const mockNextFunction = jest.fn();

          pagamentoUseCaseMock.create = jest
              .fn()
              .mockRejectedValue(new Error("Failed to create"));

          await pagamentoController.post(
              mockRequest,
              mockResponse,
              mockNextFunction,
          );

          expect(mockNextFunction).toHaveBeenCalledWith(
              expect.any(Error),
          );
      });
    });
  });

  describe("Given getAll method is called", () => {
    describe("Just return all pagamentos", () => {
      it("should return all pagamentos", async () => {
        const mockRequest = {} as any;

        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        } as any;

        const mockNextFunction = jest.fn();
        const expectedResult = [
          { id: "someId", pagamentoId: "someOrderId", valorTotal: 20, tipo: PagamentoTipoEnum.Aprovado},
          { id: "someAnotherId", pagamentoId: "someAnotherOrderId", valorTotal: 39, tipo: PagamentoTipoEnum.Recusado},
         ];

        pagamentoUseCaseMock.getAll = jest
          .fn()
          .mockResolvedValue(expectedResult);

          await pagamentoController.get(
            mockRequest,
            mockResponse,
            mockNextFunction,
          );

          expect(mockResponse.status).toHaveBeenCalledWith(
            StatusCode.ok,
          );
          expect(mockResponse.json).toHaveBeenCalledWith(expectedResult);
          expect(mockNextFunction).not.toHaveBeenCalled();
      });
    });
  });

  describe("Given getById method is called", () => {
    describe("When all the data is correct and no problems are found", () => {
      it("should search the pagamento and return it", async () => {
          const mockRequest = {
              params: {
                  id: "65a2b665e3efaec673f665bd",
              },
          } as any;
          const mockResponse = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
          } as any;
          const mockNextFunction = jest.fn();

          const expectedResult = {
              id: "someId",
              ...mockRequest.params,
              pedidoId: "65a2aedd591338377f5a575e",
              tipo: PagamentoTipoEnum.Aprovado,
              valorTotal: 36,
          };

          pagamentoUseCaseMock.getById = jest
              .fn()
              .mockResolvedValue(expectedResult);

          await pagamentoController.getById(
              mockRequest,
              mockResponse,
              mockNextFunction,
          );

          expect(mockResponse.status).toHaveBeenCalledWith(StatusCode.ok);
          expect(mockResponse.json).toHaveBeenCalledWith(expectedResult);
          expect(mockNextFunction).not.toHaveBeenCalled();
      });
    });

    describe("When the id is not sent through the params", () => {
      it("it should return unprocessableEntity(422) response error", async () => {
          const mockRequest = {
              params: {},
          } as any;
  
          const mockResponse = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
          } as any;
  
          const mockNextFunction = jest.fn();
  
          await pagamentoController.getById(
              mockRequest,
              mockResponse,
              mockNextFunction,
          );
  
          expect(mockResponse.status).toHaveBeenCalledWith(
              StatusCode.unprocessableEntity,
          );
          expect(mockResponse.json).toHaveBeenCalledWith({
              message: "Missing identifier id",
          });
          expect(mockNextFunction).not.toHaveBeenCalled();
      });
    });

    describe("When the useCase return an empty value", () => {
      it("it should return notFound(404) response error", async () => {
          const mockRequest = {
              params: {
                  id: "65a2b9abae87632d0f50b02f",
              },
          } as any;
          const mockResponse = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
              end: jest.fn(),
          } as any;
          const mockNextFunction = jest.fn();

          pagamentoUseCaseMock.getById = jest
              .fn()
              .mockResolvedValue(undefined);

          await pagamentoController.getById(
              mockRequest,
              mockResponse,
              mockNextFunction,
          );

          expect(mockResponse.status).toHaveBeenCalledWith(
              StatusCode.notFound,
          );
          expect(mockResponse.end).toHaveBeenCalled();
          expect(mockNextFunction).not.toHaveBeenCalled();
      });
    });
  });

  describe("Given getByPedidoId method is called", () => {
    describe("When all the data is correct and no problems are found", () => {
      it("should search the pagamento and return it", async () => {
          const mockRequest = {
              params: {
                  pedidoId: "65a2b665e3efaec673f665bd",
              },
          } as any;
          const mockResponse = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
          } as any;
          const mockNextFunction = jest.fn();

          const expectedResult = {
              id: "someId",
              ...mockRequest.params,
              pedidoId: "65a2aedd591338377f5a575e",
              tipo: PagamentoTipoEnum.Aprovado,
              valorTotal: 36,
          };

          pagamentoUseCaseMock.getByPedidoId = jest
              .fn()
              .mockResolvedValue(expectedResult);

          await pagamentoController.getByPedidoId(
              mockRequest,
              mockResponse,
              mockNextFunction,
          );

          expect(mockResponse.status).toHaveBeenCalledWith(StatusCode.ok);
          expect(mockResponse.json).toHaveBeenCalledWith(expectedResult);
          expect(mockNextFunction).not.toHaveBeenCalled();
      });
    });

    describe("When the pedidoId is not sent through the params", () => {
      it("it should return unprocessableEntity(422) response error", async () => {
          const mockRequest = {
              params: {},
          } as any;
  
          const mockResponse = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
          } as any;
  
          const mockNextFunction = jest.fn();
  
          await pagamentoController.getByPedidoId(
              mockRequest,
              mockResponse,
              mockNextFunction,
          );
  
          expect(mockResponse.status).toHaveBeenCalledWith(
              StatusCode.unprocessableEntity,
          );
          expect(mockResponse.json).toHaveBeenCalledWith({
              message: "Missing identifier pedidoId",
          });
          expect(mockNextFunction).not.toHaveBeenCalled();
      });
    });

    describe("When the useCase return an empty value", () => {
      it("it should return notFound(404) response error", async () => {
          const mockRequest = {
              params: {
                  pedidoId: "65a2b9abae87632d0f50b02f",
              },
          } as any;
          const mockResponse = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
              end: jest.fn(),
          } as any;
          const mockNextFunction = jest.fn();

          pagamentoUseCaseMock.getByPedidoId = jest
              .fn()
              .mockResolvedValue(undefined);

          await pagamentoController.getByPedidoId(
              mockRequest,
              mockResponse,
              mockNextFunction,
          );

          expect(mockResponse.status).toHaveBeenCalledWith(
              StatusCode.notFound,
          );
          expect(mockResponse.end).toHaveBeenCalled();
          expect(mockNextFunction).not.toHaveBeenCalled();
      });
    });
  });

  describe("Given patchStatus method is called", () => {
    describe("When all the data is correct and no problems are found", () => {
      it("should update the pagamento and return it", async () => {
          const mockRequest = {
              params: {
                id: "65a2b665e3efaec673f665bd",
              },
              body: {
                status: PagamentoTipoEnum.Aprovado,
              },
          } as any;
          const mockResponse = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
          } as any;
          const mockNextFunction = jest.fn();

          const expectedResult = {
              id: "someId",
              ...mockRequest.params,
              pedidoId: "65a2aedd591338377f5a575e",
              tipo: PagamentoTipoEnum.Aprovado,
              valorTotal: 36,
          };

          pagamentoUseCaseMock.updateStatus = jest
              .fn()
              .mockResolvedValue(expectedResult);

          await pagamentoController.patchStatus(
              mockRequest,
              mockResponse,
              mockNextFunction,
          );

          expect(mockResponse.status).toHaveBeenCalledWith(StatusCode.ok);
          expect(mockResponse.json).toHaveBeenCalledWith(expectedResult);
          expect(mockNextFunction).not.toHaveBeenCalled();
      });
    });

    describe("When the id is not sent through the params", () => {
      it("it should return unprocessableEntity(422) response error", async () => {
          const mockRequest = {
              params: {},
          } as any;
  
          const mockResponse = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
          } as any;
  
          const mockNextFunction = jest.fn();
  
          await pagamentoController.patchStatus(
              mockRequest,
              mockResponse,
              mockNextFunction,
          );
  
          expect(mockResponse.status).toHaveBeenCalledWith(
              StatusCode.unprocessableEntity,
          );
          expect(mockResponse.json).toHaveBeenCalledWith({
              message: "Missing identifier id",
          });
          expect(mockNextFunction).not.toHaveBeenCalled();
      });
    });

    describe("When the status is not sent through the body", () => {
      it("it should return unprocessableEntity(422) response error when there is no body at all", async () => {
          const mockRequest = {
              params: {
                id: "65a2b665e3efaec673f665bd"
              },
          } as any;
  
          const mockResponse = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
          } as any;
  
          const mockNextFunction = jest.fn();
  
          await pagamentoController.patchStatus(
              mockRequest,
              mockResponse,
              mockNextFunction,
          );
  
          expect(mockResponse.status).toHaveBeenCalledWith(
              StatusCode.unprocessableEntity,
          );
          expect(mockResponse.json).toHaveBeenCalledWith({
              message: "Missing status on body",
          });
          expect(mockNextFunction).not.toHaveBeenCalled();
      });

      it("it should return unprocessableEntity(422) response error", async () => {
          const mockRequest = {
              params: {
                id: "65a2b665e3efaec673f665bd"
              },
              body: {}
          } as any;
  
          const mockResponse = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
          } as any;
  
          const mockNextFunction = jest.fn();
  
          await pagamentoController.patchStatus(
              mockRequest,
              mockResponse,
              mockNextFunction,
          );
  
          expect(mockResponse.status).toHaveBeenCalledWith(
              StatusCode.unprocessableEntity,
          );
          expect(mockResponse.json).toHaveBeenCalledWith({
              message: "Missing status on body",
          });
          expect(mockNextFunction).not.toHaveBeenCalled();
      });
    });
  });
})
