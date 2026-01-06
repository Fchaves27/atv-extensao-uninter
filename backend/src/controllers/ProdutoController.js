const Produto = require('../models/Produto');

module.exports = {
    // 1. Listar todos os produtos
    async index(req, res) {
        try {
            const produtos = await Produto.findAll();
            return res.json(produtos);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar produtos' });
        }
    },

    // 2. Criar novo produto
    async store(req, res) {
        try {
            const { nome, sku, categoria, precoCusto, precoVenda, quantidade } = req.body;
            
            // Validação simples
            if (!nome || !precoVenda) {
                return res.status(400).json({ error: 'Nome e Preço de Venda são obrigatórios' });
            }

            const produto = await Produto.create({
                nome, sku, categoria, precoCusto, precoVenda, quantidade
            });

            return res.status(201).json(produto);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar produto' });
        }
    },

    // 3. Deletar produto
    async delete(req, res) {
        try {
            const { id } = req.params;
            await Produto.destroy({ where: { id } });
            return res.status(204).send(); // 204 = Sucesso sem conteúdo
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar' });
        }
    }
};