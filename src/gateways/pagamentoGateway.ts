import { PagamentoDTO } from "useCases";
import { PagamentoGateway } from "interfaces/gateways";
import { Pagamento, PagamentoTipoEnum } from "entities/pagamento";
import { PagamentoModel } from "external/mongo/models";
import { PagamentoMapper } from "adapters/mappers";
import { ClientSession } from "mongoose";

export class PagamentoMongoGateway implements PagamentoGateway {
    constructor(private readonly pagamentoModel: typeof PagamentoModel) {}

    async create(pagamento: PagamentoDTO): Promise<Pagamento> {
        const result = await this.pagamentoModel.create({
            valorTotal: pagamento.valorTotal,
            tipo: pagamento.tipo,
            pedidoId: pagamento.pedidoId,
        });

        return PagamentoMapper.toDomain({
            id: result.id,
            pedidoId: result.pedidoId,
            tipo: result.tipo,
            valorTotal: result.valorTotal,
        });
    }

    async getAll(filters?: Partial<Pagamento>): Promise<Pagamento[]> {
        let filterQuery = { deleted: { $ne: true } };

        if (filters) {
            filterQuery = { ...filterQuery, ...filters };
        }

        const results = await this.pagamentoModel
            .aggregate([{ $match: filterQuery }])
            .sort({ createdAt: 1 });

        return results.map((result) =>
            PagamentoMapper.toDomain({
                id: result._id,
                tipo: result.tipo,
                pedidoId: result.pedidoId,
                valorTotal: result.valorTotal,
            }),
        );
    }

    async getById(id: string): Promise<Pagamento> {
        const result = await this.pagamentoModel.findOne({
            _id: id,
            deleted: { $ne: true },
        });

        if (result) {
            return PagamentoMapper.toDomain({
                id: result.id,
                tipo: result.tipo,
                pedidoId: result.pedidoId,
                valorTotal: result.valorTotal,
            });
        }
    }

    async updateStatus(
        id: string,
        status: PagamentoTipoEnum,
        session: ClientSession,
    ): Promise<Pagamento> {
        const result = await this.pagamentoModel.findOneAndUpdate(
            { _id: id },
            { tipo: status },
            {
                new: true,
                session,
            },
        );

        return PagamentoMapper.toDomain({
            id: result.id,
            tipo: result.tipo,
            pedidoId: result.pedidoId,
            valorTotal: result.valorTotal,
        });
    }

    async getByPedidoId(pedidoId: string): Promise<Pagamento> {
        const result = await this.pagamentoModel.findOne({
            pedidoId: pedidoId,
            deleted: { $ne: true },
        });

        if (result) {
            return PagamentoMapper.toDomain({
                id: result.id,
                tipo: result.tipo,
                pedidoId: result.pedidoId,
                valorTotal: result.valorTotal,
            });
        }
    }

    async checkDuplicate(args: { pedidoId: string }): Promise<boolean> {
        const result = await this.pagamentoModel.count({
            pedidoId: args.pedidoId,
            deleted: { $ne: true },
        });

        return result > 0;
    }
}
