const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Form extends Model {
  static init(sequelize) {
    super.init(
      {
        stage: Sequelize.STRING,
        focus_area: Sequelize.STRING,
        answers: Sequelize.JSON,
      },
      {
        sequelize,
      },
    );

    this.removeAttribute('id');

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { as: 'user_id' });
  }
}

module.exports = Form;
