const Sequelize = require('sequelize');
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        birth_date: Sequelize.DATEONLY,
        status: Sequelize.ENUM('SUSPENSO', 'PENDENTE', 'ATIVO', 'REMOVIDO'),
        role: Sequelize.ENUM('ADMIN', 'BASE'),
      },
      {
        sequelize,
      },
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

module.exports = User;
