import { PagamentoTipoEnum } from "entities/pagamento";
import mongoose from "mongoose";

const PagamentoSchema = new mongoose.Schema(
    {
        pedidoId: {
            type: String,
            required: true,
        },
        tipo: {
            type: String,
            enum: Object.values(PagamentoTipoEnum),
            default: PagamentoTipoEnum.Pendente,
            required: true,
        },
        valorTotal: {
            type: Number,
            required: false,
        },
        deleted: {
            type: Boolean,
            required: false,
        },
        deletedAt: { type: Date, required: false },
    },
    { timestamps: true },
);

export const PagamentoModel = mongoose.model("Pagamentos", PagamentoSchema);
