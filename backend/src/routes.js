const express = require('express');
const routes = express.Router();
const ProdutoController = require('./controllers/ProdutoController');

// Rotas de Produto
routes.get('/produtos', ProdutoController.index);   // Ler
routes.post('/produtos', ProdutoController.store);  // Criar
routes.delete('/produtos/:id', ProdutoController.delete); // Deletar

module.exports = routes;