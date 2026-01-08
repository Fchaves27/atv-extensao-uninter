const Sequelize = require('sequelize');
const database = require('../database/db');

const Venda = database.define('venda', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    valorTotal: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    formaPagamento: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Dinheiro'
    },
    dataVenda: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
    }
});

module.exports = Venda;