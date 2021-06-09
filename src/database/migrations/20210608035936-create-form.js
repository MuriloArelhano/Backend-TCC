module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('forms', {
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        stage_id: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        focus_area: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        answers: {
          type: Sequelize.ARRAY(Sequelize.JSON),
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      })
      .then(() => {
        return queryInterface.sequelize.query(
          'ALTER TABLE "forms" ADD CONSTRAINT "pk" PRIMARY KEY ("user_id", "stage_id", "focus_area")',
          'ALTER TABLE "forms" ADD CONSTRAINT "user_id_fk" FOREIGN KEY "user_id" REFERENCES users ("id") ON DELETE CASCADE ON UPDATE CASCADE',
          'ALTER TABLE "forms" ADD CONSTRAINT "stage_id_id_fk" FOREIGN KEY "stage_id" REFERENCES users ("id") ON DELETE CASCADE ON UPDATE CASCADE',
        );
      });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('forms');
  },
};
