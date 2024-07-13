import { PagamentoEventMockDTO } from "./dto";

export interface IPagamentoEventMockUseCase {
    handle(data: PagamentoEventMockDTO): Promise<void>;
}
