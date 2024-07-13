import { PagamentoTipo } from "entities/pagamento";

export interface PagamentoDTO {
  id?: string;
  pedidoId: string;
  tipo?: PagamentoTipo;
  valorTotal: number;
}
