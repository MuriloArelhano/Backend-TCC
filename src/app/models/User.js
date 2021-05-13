import Sequelize, { Model } from 'sequelize';

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

export default User;
