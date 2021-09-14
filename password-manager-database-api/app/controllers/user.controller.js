const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

// Create and save a new User
exports.create = (req, res) => {
    console.log(req.body)
    if (!req.body.firstName && !req.body.lastName && !req.body.email && !req.body.password) {
        res.status(400).send({
            message: "Content missing required parameters!",
            success: false
        });
        return;
    }

    // Create a new User
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    };

    // CreateTable database
    User.create(user)
        // todo add success
        .then(data => {
            console.log(data)
            res.send({id: data.dataValues.id, success: true});
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message: "Some error occurred while adding new 'user'.",
                success: false
            });
        });
};


exports.login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({
            message: "Content missing required parameters!",
            success: false
        });
        return;
    }

    const email = req.body.email;
    const password = req.body.password;
    const condition = {
        [Op.and]:
            [
                {email: `${email}`},
                {password: `${password}`}
            ]
    };

    User.findAll({where: condition})
        .then(data => {
            // todo add success
            console.log(data)
            let id = data[0]?.dataValues?.id;
            let success = true;
            if (id === null || id === undefined) {
                success = false
            }
            res.send({id: id, success: success});
        })
        .catch(err => {
            res.status(500).send({
                message: "Some error occurred while retrieving user.",
                success: false
            });
            console.log(err)
        });
};

exports.update = (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
        res.status(400).send({
            message: "Content missing required parameters!",
            success: false
        });
        return;
    }

    const email = req.body.email;
    const password = req.body.password;
    const condition = {
      [Op.and]:
          [
            {email: `${email}`},
            {password: `${password}`}
          ]
    };

    User.update(req.body, {
        where: condition
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "User was updated successfully.",
                    success: true
                });
            } else {
                res.send({
                    message: `Cannot update user with email: ${email}.!`,
                    success: false
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating User with email: ${email}`,
                success: false
            });
            console.log(err)
        });
};

exports.delete = (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({
            message: "Content missing required parameters!",
            success: false
        });
        return;
    }

    const email = req.body.email;
    const password = req.body.password;
    const condition = {
      [Op.and]:
          [
            {email: `${email}`},
            {password: `${password}`}
          ]
    };

    User.destroy({
        where: condition
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: `User ${email} was deleted successfully!`,
                    success: true
                });
            } else {
                res.send({
                    message: `Cannot update user with email: ${email}.`,
                    success: false
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error deleting User with email: ${email}`,
                success: false
            });
            console.log(err)
        });
};
