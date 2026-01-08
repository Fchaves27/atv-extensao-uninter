const Sequelize = require('sequelize');
const database = require('../database/db');

const Movimentacao = database.define('movimentacao', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: false 
        // Valores: 'ENTRADA' (compra/cadastro) ou 'SAIDA' (venda)
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    observacao: {
        type: Sequelize.STRING,
        allowNull: true // Ex: "Venda ID 5" ou "Produto Vencido"
    },
    nomeProdutoSnapshot: {
        type: Sequelize.STRING 
        // Dica Pro: Salve o nome do produto aqui. Se deletarem o produto depois, você ainda sabe o que foi movimentado.
    }
});

module.exports = Movimentacao;