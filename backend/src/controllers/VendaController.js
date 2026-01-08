const Produto = require('../models/Produto');
const Venda = require('../models/Venda');

module.exports = {
    async realizarVenda(req, res) {
        try {
            // Recebe dados do Frontend (incluindo forma de pagamento)
            const { produto_id, quantidade, formaPagamento } = req.body;

            const produto = await Produto.findByPk(produto_id);

            if (!produto) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }

            // Verifica Estoque
            if (produto.quantidade < quantidade) {
                return res.status(400).json({ 
                    error: 'Estoque insuficiente', 
                    atual: produto.quantidade 
                });
            }

            const valorTotalVenda = produto.precoVenda * quantidade;

            // 1. Baixa no Estoque
            produto.quantidade = produto.quantidade - quantidade;
            await produto.save();

            // 2. Registra Financeiro
            await Venda.create({
                valorTotal: valorTotalVenda,
                formaPagamento: formaPagamento, // Salva se foi Pix, Dinheiro, etc.
                dataVenda: new Date()
            });

            return res.json({
                mensagem: 'Venda realizada com sucesso!',
                novoEstoque: produto.quantidade,
                valorFaturado: valorTotalVenda
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao processar venda' });
        }
    }
};