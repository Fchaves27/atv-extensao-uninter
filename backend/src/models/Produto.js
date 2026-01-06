const Sequelize = require('sequelize');
const database = require('../database/db');

const Produto = database.define('produto', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sku: {
        type: Sequelize.STRING,
        allowNull: true // Pode ser vazio
    },
    categoria: {
        type: Sequelize.STRING,
        allowNull: false
    },
    precoCusto: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    precoVenda: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    estoqueMinimo: {
        type: Sequelize.INTEGER,
        defaultValue: 5
    }
});

module.exports = Produto;