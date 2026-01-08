const Venda = require('../models/Venda');
const Produto = require('../models/Produto');
const Movimentacao = require('../models/Movimentacao'); // <--- Importante

module.exports = {
    // 1. Balanço (Já existia)
    async getResumoDiario(req, res) {
        try {
            const produtos = await Produto.findAll();
            const totalInvestidoEstoque = produtos.reduce((acc, produto) => {
                return acc + (parseFloat(produto.precoCusto) * produto.quantidade);
            }, 0);

            const totalVendasRealizadas = await Venda.sum('valorTotal') || 0;
            const lucroEstimado = totalVendasRealizadas - totalInvestidoEstoque;

            return res.json({
                investimento: parseFloat(totalInvestidoEstoque.toFixed(2)),
                faturamento: parseFloat(totalVendasRealizadas.toFixed(2)),
                lucro: parseFloat(lucroEstimado.toFixed(2))
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao calcular balanço' });
        }
    },

    // 2. Histórico de Movimentações (NOVO)
    async getHistorico(req, res) {
        try {
            const movimentacoes = await Movimentacao.findAll({
                order: [['createdAt', 'DESC']], // Mais recentes primeiro
                limit: 50 // Traz só os últimos 50 para não pesar
            });
            return res.json(movimentacoes);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao buscar histórico' });
        }
    }
};