const Venda = require('../models/Venda');
const Produto = require('../models/Produto');

module.exports = {
    async getResumoDiario(req, res) {
        try {
            // 1. Calcular Dinheiro Investido em Estoque (Custo x Quantidade)
            const produtos = await Produto.findAll();
            const totalInvestidoEstoque = produtos.reduce((acc, produto) => {
                return acc + (parseFloat(produto.precoCusto) * produto.quantidade);
            }, 0);

            // 2. Calcular Faturamento Total (Soma das Vendas)
            const totalVendasRealizadas = await Venda.sum('valorTotal') || 0;

            // 3. Lucro Bruto Estimado
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
    }
};