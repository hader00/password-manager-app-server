module.exports = (sequelize, Sequelize) => {
  return sequelize.define("password", {
    item: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    userID: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
};