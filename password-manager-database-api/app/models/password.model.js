module.exports = (sequelize, Sequelize) => {
  const Password = sequelize.define("password", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userID: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return Password;
};