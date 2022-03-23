module.exports = (sequelize, Sequelize) => {
  return sequelize.define("user", {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    serverSalt: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    iv: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    encryptedSymmetricKey: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  }, {
    uniqueKeys: {
      actions_unique: {
        fields: ['email']
      }
    }
  });
};