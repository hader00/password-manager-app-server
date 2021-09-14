module.exports = app => {
  const user = require("../controllers/user.controller.js");
  const password = require("../controllers/password.controller.js");

  const router = require("express").Router();

  router.post("/user-create", user.create);
  router.post("/user-login", user.login);
  router.post("/user-update", user.update);
  router.post("/user-delete", user.delete);

  router.post("/password-create", password.create);
  router.post("/password-fetch", password.fetch);
  router.post("/password-update", password.update);
  router.post("/password-delete", password.delete);

  app.use('/api/password-manager', router);
};
