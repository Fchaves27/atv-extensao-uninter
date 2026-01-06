const Sequelize = require('sequelize');

// Cria o banco de dados em um arquivo local 'database.sqlite'
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false // Desativa logs de SQL no terminal para ficar mais limpo
});

module.exports = sequelize;