const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Form extends Model {
  static init(sequelize) {
    super.init(
      {
        focus_area: Sequelize.STRING,
        answers: Sequelize.ARRAY(Sequelize.JSON),
      },
      {
        sequelize,
      },
    );

    this.removeAttribute('id');

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { as: 'user' });
    this.belongsTo(models.Stage, { as: 'stage' });
  }
}

module.exports = Form;
