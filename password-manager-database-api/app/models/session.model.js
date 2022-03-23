module.exports = (sequelize, Sequelize) => {
  return sequelize.define("session", {
    session_id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    expires: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, {
    uniqueKeys: {
      actions_unique: {
        fields: ['session_id']
      }
    }
  });
};