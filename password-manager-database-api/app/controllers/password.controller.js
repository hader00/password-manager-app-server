const db = require("../models");
const Password = db.password;
const Op = db.Sequelize.Op;

// Create and save a new Password
exports.create = (req, res) => {
    if (!req.body.title || !req.body.description || !req.body.url || !req.body.username || !req.body.password || !req.body.userID) {
        res.status(400).send({
            message: "Content missing required parameters!",
        });
        return;
    }

    // Create a new Password
    const password = {
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        username: req.body.username,
        password: req.body.password,
        userID: req.body.userID,
    };

    // CreateTable database
    Password.create(password)
        .then(data => {
            let id = data?.dataValues?.id;
            let success = true
            if (id === undefined || id === null) {
                success = false
            }
            res.send({id: id, success: success});
        })
        .catch(err => {
            res.status(500).send({
                message: "Some error occurred while adding new 'password'.",
                success: false
            });
            console.log(err)
        });
};


exports.fetch = (req, res) => {
    if (!req.body.userID) {
        res.status(400).send({
            message: "Content missing required parameters!",
        });
        return;
    }

    const userID = req.body.userID;

    const condition = {userID: `${userID}`};
    Password.findAll({where: condition})
        .then(data => {
            let passwords = []
            data.forEach(password => {
                passwords.push(password.dataValues)
            })
            // todo add success
            console.log(passwords)
            res.send(passwords);
        })
        .catch(err => {
            res.status(500).send({
                message: "Some error occurred while retrieving passwords.",
                success: false
            });
            console.log(err)
        });
};

exports.update = (req, res) => {
    if (!req.body.id || !req.body.title || !req.body.description || !req.body.url || !req.body.username || !req.body.password || !req.body.userID) {
        res.status(400).send({
            message: "Content missing required parameters!",
        });
        return;
    }

    const id = req.body.id;
    console.log(req.body)
    const condition = {id: `${id}`};
    Password.update(req.body, {
        where: condition
    })
        .then(num => {
            console.log("num", num)
            if (num[0] === 1) {
                res.send({
                    message: "Password was updated successfully.",
                    success: true
                });
            } else {
                res.send({
                    message: `Cannot update Password with id: ${id}.!`,
                    success: false
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating Password with id: ${id}.!`,
                success: false
            });
            console.log(err)
        });
};

exports.delete = (req, res) => {
    if (!req.body.id || !req.body.userID) {
        res.status(400).send({
            message: "Content missing required parameters!",
        });
        return;
    }

    const id = req.body.id;
    const userID = req.body.userID;

    const condition =  {
        [Op.and]:
            [
                {id: `${id}`},
                {userID: `${userID}`}
            ]
    };
    Password.destroy({
        where: condition
    })
        .then(num => {
            console.log(num)
            if (num === 1) {
                res.send({
                    message: `Password with id ${id} was deleted successfully!`,
                    success: true
                });
            } else {
                res.send({
                    message: `Cannot delete Password with id: ${id}.`,
                    success: false
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error deleting Password with id: ${id}.`,
                success: false
            });
            console.log(err)
        });
};
