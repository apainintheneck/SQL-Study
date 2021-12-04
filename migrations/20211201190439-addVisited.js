'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Users',
      'lastVisited',
      Sequelize.STRING(50)
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'Users',
      'lastVisited',
      Sequelize.STRING(50)
    );
  }
};
