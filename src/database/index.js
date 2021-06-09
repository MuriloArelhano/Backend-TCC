const Sequelize = require('sequelize');
// database config
const databaseConfig = require('../config/database');
// models
const User = require('../app/models/User');
const Stage = require('../app/models/Stage');
const Form = require('../app/models/Form');

const models = [User, Stage, Form];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      );
  }
}

module.exports = new Database();
