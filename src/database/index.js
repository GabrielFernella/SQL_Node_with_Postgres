const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');

const connection = new Sequelize(dbConfig); //conexão com o banco

User.init(connection);

module.exports = connection;