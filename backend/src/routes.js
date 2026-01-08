const express = require('express');
const routes = express.Router();
const VendaController = require('./controllers/VendaController');
// Importe os modelos para garantir que o banco os crie
const Produto = require('./models/Produto');
const Venda = require('./models/Venda'); // <--- Adicione aqui

const ProdutoController = require('./controllers/ProdutoController');
const DashboardController = require('./controllers/DashboardController'); // <--- Novo

// Rotas de Produto (Já existentes)
routes.get('/produtos', ProdutoController.index);
routes.post('/produtos', ProdutoController.store);
routes.delete('/produtos/:id', ProdutoController.delete);

// Rotas de Dashboard (Nova)
routes.get('/dashboard/resumo', DashboardController.getResumoDiario);

// Rota de teste para criar uma venda fake (útil para testar o gráfico)
routes.post('/vendas/teste', async (req, res) => {
    const venda = await Venda.create({ valorTotal: req.body.valor });
    res.json(venda);
});




// Nova Rota de Venda Real (que baixa estoque)
routes.post('/realizar-venda', VendaController.realizarVenda);

module.exports = routes;