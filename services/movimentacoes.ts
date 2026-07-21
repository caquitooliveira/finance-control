import {Movimentacao} from "../types/movimentacao";

export const movimentacoes: Movimentacao[] = [
    {
        id: 1,
        descricao: "Salário",
        valor: 5000,
        tipo: "receita",
        categoria: "Salário",
        data: "2026-07-01",

    },

    {
        id: 2,
        descricao: "Supermercado",
        valor: 450,
        tipo: "despesa",
        categoria: "Alimentação",
        data: "2026-07-05",
    },
];