module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(80),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      password_hash: {
        allowNull: false,
        type: Sequelize.STRING(60),
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable('users')
  },
}
