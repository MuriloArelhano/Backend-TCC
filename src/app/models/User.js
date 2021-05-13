const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        birth_date: Sequelize.DATEONLY,
        status: Sequelize.ENUM('PENDENTE', 'ATIVO', 'REMOVIDO'),
        role: Sequelize.ENUM('ADMIN', 'BASE'),
      },
      {
        sequelize,
      },
    );

    return this;
  }
}

module.exports = User;
