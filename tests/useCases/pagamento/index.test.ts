import { Pagamento, PagamentoTipoEnum } from "entities/pagamento";
import { PagamentoModel } from "external/mongo/models";
import { QueueManager } from "external/queueService";
import { SQSClient } from "external/queueService/client";
import { PagamentoGateway } from "interfaces/gateways";
import { ClientSession } from "mongoose";

import { PagamentoUseCase } from "useCases";
import { BadError } from "utils/errors/badError";
import { ResourceNotFoundError } from "utils/errors/resourceNotFoundError";
import { ValidationError } from "utils/errors/validationError";

jest.mock("aws-sdk", () => {
    return {
        SQS: jest.fn().mockImplementation(() => {
            return {
                sendMessage: jest.fn().mockReturnValue({
                    promise: jest.fn(),
                }),
            };
        }),
    };
});

describe("Given PagamentoUseCases", () => {
    let gatewayStub: PagamentoGateway;
    let sut: PagamentoUseCase;
    let queueMock: QueueManager;

    const mockPagamentoId = "659cb4b915015e863e284663";
    const mockPedidoId = "659cae053a5d35f50991ac0a";

    const mockPagamento = new Pagamento({
        pedidoId: "dfffddc535266e603724b4ba",
        valorTotal: 38.9,
    });

    class PagamentoGatewayStub implements PagamentoGateway {
        create(_: Pagamento): Promise<Pagamento> {
            return Promise.resolve(mockPagamento);
        }

        getAll(_?: Partial<Pagamento>): Promise<Pagamento[]> {
            return Promise.resolve([mockPagamento]);
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

        checkDuplicate(args: { pedidoId: string }): Promise<boolean> {
            if (args.pedidoId === mockPedidoId) {
                return Promise.resolve(true);
            }

            return Promise.resolve(false);
        }
    }

    beforeAll(() => {
        jest.spyOn(PagamentoModel, "startSession").mockImplementation(() => {
            return Promise.resolve({
                startTransaction: jest.fn(),
                commitTransaction: jest.fn(),
                abortTransaction: jest.fn(),
                endSession: jest.fn(),
            } as Partial<ClientSession> as ClientSession);
        });

        gatewayStub = new PagamentoGatewayStub();
        queueMock = new QueueManager("test", SQSClient);

        sut = new PagamentoUseCase(PagamentoModel, gatewayStub, queueMock);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe("Given create method is called", () => {
        describe("When all the data is correct and no problems are found", () => {
            it("should call create on the gateway and return the created pagamento", async () => {
                const create = jest.spyOn(gatewayStub, "create");

                const pagamento = await sut.create(mockPagamento);

                expect(pagamento.pedidoId).toEqual(mockPagamento.pedidoId);
                expect(pagamento.valorTotal).toEqual(mockPagamento.valorTotal);
                expect(create).toHaveBeenCalledWith(mockPagamento);
            });
        });

        describe("When the pedidoId already exists", () => {
            it("should throw 'Já existe registro para esse pedido' error", async () => {
                await expect(
                    sut.create({
                        pedidoId: mockPedidoId,
                        valorTotal: 28,
                    }),
                ).rejects.toThrow("Já existe registro para esse pedido");
            });
        });

        describe("When tipo is informed", () => {
            it("should throw 'Não é necessário informar o tipo de pagamento' error", async () => {
                await expect(
                    sut.create({
                        ...mockPagamento,
                        tipo: PagamentoTipoEnum.Aprovado,
                    }),
                ).rejects.toThrow(
                    "Não é necessário informar o tipo de pagamento",
                );
            });
        });
    });

    describe("Given getAll method is called", () => {
        it("should return all Pagamento", async () => {
            const getAll = jest.spyOn(gatewayStub, "getAll");

            const all = await sut.getAll();

            expect(getAll).toHaveBeenCalled();
            expect(all).toEqual([mockPagamento]);
        });
    });

    describe("Given getById method is called", () => {
        describe("When id exists", () => {
            it("should return Pagamento", async () => {
                const getById = jest.spyOn(gatewayStub, "getById");

                const pagamento = await sut.getById(mockPagamento.id);

                expect(getById).toHaveBeenCalledWith(mockPagamento.id);
                expect(pagamento).toEqual(mockPagamento);
            });
        });

        describe("When id do not exists", () => {
            it("should throw an ResourceNotFoundError", async () => {
                jest.spyOn(gatewayStub, "getById").mockResolvedValueOnce(
                    undefined,
                );

                await expect(sut.getById(mockPagamentoId)).rejects.toThrow(
                    new ResourceNotFoundError("Pagamento não encontrado"),
                );
            });
        });
    });

    describe("Given getByPedidoId method is called", () => {
        describe("When pedidoId exists", () => {
            it("should return Pagamento", async () => {
                const getByPedidoId = jest.spyOn(gatewayStub, "getByPedidoId");

                const pagamento = await sut.getByPedidoId(
                    mockPagamento.pedidoId,
                );

                expect(getByPedidoId).toHaveBeenCalledWith(
                    mockPagamento.pedidoId,
                );
                expect(pagamento).toEqual(mockPagamento);
            });
        });

        describe("When pedidoId do not exists", () => {
            it("should throw an ResourceNotFoundError", async () => {
                jest.spyOn(gatewayStub, "getByPedidoId").mockResolvedValueOnce(
                    undefined,
                );

                await expect(sut.getByPedidoId(mockPedidoId)).rejects.toThrow(
                    new ResourceNotFoundError("Pedido não encontrado"),
                );
            });
        });
    });

    describe("Given updateStatus method is called", () => {
        describe("When id exists and tipo is 'Pendente'", () => {
            it("should return Pagamento", async () => {
                const updateStatus = jest.spyOn(gatewayStub, "updateStatus");

                const pagamento = await sut.updateStatus(
                    mockPagamento.id,
                    PagamentoTipoEnum.Aprovado,
                );

                expect(updateStatus).toHaveBeenCalled();
                expect(pagamento).toEqual(mockPagamento);
            });
        });

        describe("When id do not exists", () => {
            it("should throw an ResourceNotFoundError", async () => {
                const getById = jest
                    .spyOn(gatewayStub, "getById")
                    .mockResolvedValueOnce(undefined);

                const pagamento = sut.updateStatus(
                    "nonexistent-id",
                    PagamentoTipoEnum.Aprovado,
                );

                await expect(pagamento).rejects.toThrow(
                    new ResourceNotFoundError("Pagamento não encontrado"),
                );

                expect(getById).toHaveBeenCalledWith("nonexistent-id");
            });
        });

        describe("When status is not informed", () => {
            it("should throw an ValidationError", async () => {
                const pagamento = sut.updateStatus(mockPagamento.id, undefined);

                await expect(pagamento).rejects.toThrow(
                    new ValidationError("É necessário informar o status"),
                );
            });
        });

        describe("When status informed is invalid", () => {
            it("should throw an ValidationError", async () => {
                const pagamento = sut.updateStatus(
                    mockPagamento.id,
                    "invalid_status" as any,
                );

                await expect(pagamento).rejects.toThrow(
                    new ValidationError(
                        "É necessário informar um status válido",
                    ),
                );
            });
        });

        describe("When pagamento already has Aprovado or Recusado status", () => {
            it("should throw an ValidationError", async () => {
                mockPagamento.tipo = PagamentoTipoEnum.Recusado;
                const pagamento = sut.updateStatus(
                    mockPagamento.id,
                    PagamentoTipoEnum.Aprovado,
                );

                await expect(pagamento).rejects.toThrow(
                    new BadError(
                        `Não é possível alterar o status pois já foi ${PagamentoTipoEnum.Recusado}!`,
                    ),
                );
            });
        });
    });
});
