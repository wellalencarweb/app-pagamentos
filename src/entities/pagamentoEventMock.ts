import { AssertionConcern } from "utils/assertionConcern";

export enum PagamentoEventMockTipoEnum {
    Pendente = "pendente",
    Aprovado = "aprovado",
    Recusado = "recusado",
}

export type PagamentoEventMockTipo = `${PagamentoEventMockTipoEnum}`;

export type PagamentoEventMockFields = Pick<PagamentoEventMock, "pedidoId" | "tipo">;

export class PagamentoEventMock {
    pedidoId: string;
    tipo: PagamentoEventMockTipo;

    constructor(fields: PagamentoEventMockFields) {
        this.pedidoId = fields.pedidoId;
        this.tipo = fields.tipo;

        this.validateEntity();
    }

    public validateEntity(): void {
        AssertionConcern.assertArgumentNotEmpty(
            this.pedidoId,
            "pedidoId is required",
        );
        AssertionConcern.assertArgumentIsObjectId(
            this.pedidoId,
            "pedidoId must be a valid ObjectId",
        );
        AssertionConcern.assertArgumentNotEmpty(
            this.tipo,
            "tipo is required",
        );
        AssertionConcern.assertArgumentIsValid(
            this.tipo,
            Object.values(PagamentoEventMockTipoEnum),
            `tipo must be one of ${Object.values(PagamentoEventMockTipoEnum)}`,
        );
    }
}
