'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProvenanceDocs', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      transactionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Transactions',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      fileUrl: {
        type: Sequelize.STRING, // path to file (local, S3, Supabase bucket, etc.)
        allowNull: false,
      },
      fileHash: {
        type: Sequelize.STRING, // cryptographic hash for authenticity
        allowNull: false,
      },
      verifiedBy: {
        type: Sequelize.INTEGER, // admin or collector who verified
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ProvenanceDocs');
  },
};
