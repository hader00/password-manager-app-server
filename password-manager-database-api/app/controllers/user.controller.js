const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const db = require("../models");
const User = db.user;
const Session = db.session
const Op = db.Sequelize.Op;

function getPBKDF2(password, salt, iterationsCount) {
    const derivedKey = crypto.pbkdf2Sync(password, salt, iterationsCount, 32, 'sha512');
    return derivedKey.toString('hex')
}


// Create and save a new User
exports.create = (req, res) => {
    console.log(req.body)
    if (!req.body.firstName && !req.body.lastName && !req.body.email && !req.body.password &&
        !req.body.iv && !req.body.encryptedSymmetricKey) {
        res.status(400).send({
            message: "Content missing required parameters!",
            success: false
        });
        return;
    }

    const serverSalt = crypto.randomBytes(16).toString('hex');
    const passwordHash = getPBKDF2(req.body.password, serverSalt, 100000)

    // Create a new User
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: passwordHash,
        serverSalt: serverSalt,
        iv: req.body.iv,
        encryptedSymmetricKey: req.body.encryptedSymmetricKey
    };

    // CreateTable database
    User.create(user)
        .then(data => {
            // Create a new session
            const session_id = uuidv4();
            const session = {
                session_id: session_id,
                expires: new Date(Date.now() + 60*60*24*1000).toISOString(),
                user_id: data.dataValues.id,
            };
            Session.create(session).then(()=>{
                res.send(
                    {id: session_id, success: true}
                );
            }).catch(err => {
                console.log(err)
                res.status(500).send({message: "Some error occurred while creating a new 'user'.", success: false});
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message: "Some error occurred while creating a new 'user'.",
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
    const condition = {
        [Op.and]:
            [
                {email: `${email}`},
            ]
    };

    User.findAll({where: condition})
        .then(data => {
            const serverSalt = data[0]?.dataValues?.serverSalt;
            if (serverSalt !== null && serverSalt !== undefined) {
                let passwordHash = getPBKDF2(req.body.password, serverSalt, 100000)
                if (data[0]?.dataValues?.password === passwordHash && data[0]?.dataValues?.id !== null || data[0]?.dataValues?.id !== undefined) {
                    // Create a new session
                    const session_id = uuidv4();
                    const session = {
                        session_id: session_id,
                        expires: new Date(Date.now() + 60*60*24*1000).toISOString(),
                        user_id: data[0]?.dataValues?.id,
                    };
                    Session.create(session).then(() => {
                        res.send({
                            id: session_id,
                            iv: data[0]?.dataValues?.iv,
                            encryptedSymmetricKey: data[0]?.dataValues?.encryptedSymmetricKey,
                            success: true
                        });
                    }).catch(() => {
                        res.status(500).send({
                            message: "Some error occurred while finding user.",
                            success: false
                        });
                    })
                }
            } else {
                res.status(500).send({
                    message: "Some error occurred while finding user.",
                    success: false
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Some error occurred while finding user.",
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

expiredCleaner = () => {
    console.log("here", Date.now())
    Session.destroy({
        where: {
            expires: {
                [Op.lt]: new Date(new Date()).toISOString()
            }
        }
    }).then(data => {
        console.log("destroying")
        console.log(data)
    }).catch(err => {
        console.log(err)
    });

}
// Delete sessions every 12 hours
setInterval(expiredCleaner, 60*60*12 * 1000);