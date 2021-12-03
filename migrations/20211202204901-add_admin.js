'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'users',
      'admin',
      Sequelize.BOOLEAN
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'users',
      'admin',
      Sequelize.BOOLEAN
    );
  }
};
