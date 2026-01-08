const express = require('express');
const routes = express.Router();

// Importação dos Models (Para criar as tabelas)
const Produto = require('./models/Produto');
const Venda = require('./models/Venda');
const Movimentacao = require('./models/Movimentacao');
const Usuario = require('./models/Usuario'); // <--- NOVO

// Controllers
const ProdutoController = require('./controllers/ProdutoController');
const VendaController = require('./controllers/VendaController');
const DashboardController = require('./controllers/DashboardController');
const AuthController = require('./controllers/AuthController'); // <--- NOVO

// --- ROTAS ---

// Autenticação
routes.post('/login', AuthController.login);

// Rotas existentes...
routes.get('/produtos', ProdutoController.index);
routes.post('/produtos', ProdutoController.store);
routes.delete('/produtos/:id', ProdutoController.delete);
routes.post('/realizar-venda', VendaController.realizarVenda);
routes.get('/dashboard/resumo', DashboardController.getResumoDiario);
routes.get('/dashboard/historico', DashboardController.getHistorico);

module.exports = routes;