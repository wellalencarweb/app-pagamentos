import { Entity } from "interfaces/entity.interface";
import { AssertionConcern } from "utils/assertionConcern";

export enum PagamentoTipoEnum {
    Pendente = "pendente",
    Aprovado = "aprovado",
    Recusado = "recusado",
}

export type PagamentoTipo = `${PagamentoTipoEnum}`;

export type PagamentoFields = Partial<Pagamento> & Pick<Pagamento, "pedidoId" | "valorTotal">;

export class Pagamento implements Entity {
    id: string;
    pedidoId: string;
    tipo: PagamentoTipo;
    valorTotal: number;

    constructor(fields: PagamentoFields) {
        this.id = fields.id;
        this.pedidoId = fields.pedidoId;
        this.tipo = fields.tipo ?? PagamentoTipoEnum.Pendente;
        this.valorTotal = fields.valorTotal;

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
        AssertionConcern.assertArgumentIsValid(
            this.tipo,
            Object.values(PagamentoTipoEnum),
            `tipo must be one of ${Object.values(PagamentoTipoEnum)}`,
        );
        AssertionConcern.assertArgumentNotEmpty(
            this.valorTotal,
            "valorTotal is required",
        );
        AssertionConcern.assertArgumentIsBiggerThanZero(
            this.valorTotal,
            "valorTotal must be bigger than zero",
        );

    }
}
