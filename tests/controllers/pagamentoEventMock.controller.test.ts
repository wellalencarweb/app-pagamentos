import { WebhookController } from "controllers/webhook";
import { PagamentoEventMockUseCase } from "useCases";
import { PagamentoEventMockTipoEnum } from "entities/pagamentoEventMock";
import { StatusCode } from "utils/statusCode";

describe("PagamentoEventMockController", () => {
  let pagamentoEventMockUseCaseMock: jest.Mocked<PagamentoEventMockUseCase>;
  let pagamentoEventMockController: WebhookController;

  beforeEach(() => {
    pagamentoEventMockUseCaseMock = {} as jest.Mocked<PagamentoEventMockUseCase>;
    pagamentoEventMockController = new WebhookController(pagamentoEventMockUseCaseMock);
  });

  describe("Given postMock method is called", () => {
    describe("When all the data is correct and no problems are found", () => {
      it("should update the pagamento and return 200", async () => {
          const mockRequest = {
              body: {
                pedidoId: "65a2b665e3efaec673f665bd",
                tipo: PagamentoEventMockTipoEnum.Aprovado,
              },
          } as any;
          const mockResponse = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
              end: jest.fn(),
          } as any;
          const mockNextFunction = jest.fn();

          pagamentoEventMockUseCaseMock.handle = jest
              .fn()
              .mockResolvedValue(null);

          await pagamentoEventMockController.postMock(
              mockRequest,
              mockResponse,
              mockNextFunction,
          );

          expect(mockResponse.status).toHaveBeenCalledWith(StatusCode.ok);
          expect(mockNextFunction).not.toHaveBeenCalled();
      });
    });
  });
})
