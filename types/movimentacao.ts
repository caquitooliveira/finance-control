export type Movimentacao = {
    id: number;
    tipo: "receita" | "despesa";
    categoria: string;
    descricao: string;
    valor: number;
    data: string; 
};