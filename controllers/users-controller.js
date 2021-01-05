const fetchUsers = require("../models/users-model")

exports.getUsers = (req, res, next) => {
    console.log("controller")
    fetchUsers().then((users) => {
        console.log(users)
        res.status(200).send({users})
    }).catch((error) => {
        console.log("hi");
    })
}