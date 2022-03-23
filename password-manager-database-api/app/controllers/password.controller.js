const db = require("../models");
const Password = db.password;
const Session = db.session
const Op = db.Sequelize.Op;

// Create and save a new Password
exports.create = async (req, res) => {
    if (!req.body.item || !req.body.userID) {
        res.status(400).send({
            message: "Content missing required parameters!",
        });
        return;
    }

    // Create a new Password
    const password = {
        item: req.body.item,
        userID: await findUserID(req.body.userID),
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


exports.fetch = async (req, res) => {
    if (!req.body.userID) {
        res.status(400).send({
            message: "Content missing required parameters!",
        });
        return;
    }

    const userID = await findUserID(req.body.userID);

    const condition = {userID: `${userID}`};
    Password.findAll({where: condition})
        .then(data => {
            let passwords = []
            data.forEach(password => {
                passwords.push(password.dataValues)
            })
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

exports.update = async (req, res) => {
    if (!req.body.id || !req.body.item || !req.body.userID) {
        res.status(400).send({
            message: "Content missing required parameters!",
        });
        return;
    }

    const id = req.body.id;
    const userID = await findUserID(req.body.userID);
    // Create a new Password
    const password = {
        item: req.body.item,
        userID: userID,
    };
    const condition = {
        [Op.and]:
            [
                {id: `${id}`},
                {userID: `${userID}`}
            ]
    };
    Password.update(password, {
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

exports.delete = async (req, res) => {
    if (!req.body.id || !req.body.userID) {
        res.status(400).send({
            message: "Content missing required parameters!",
        });
        return;
    }

    const id = req.body.id;
    const userID = await findUserID(req.body.userID);

    const condition = {
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

findUserID = async (session_id) => {
    return await Session.findOne({where:
                    {session_id: `${session_id}`}
           })
        .then(data => {
            console.log("session id: ", data?.dataValues)
            console.log("returning: ", data?.dataValues?.user_id)
            return data?.dataValues?.user_id
        })
        .catch(err => {
            return err
        })
}