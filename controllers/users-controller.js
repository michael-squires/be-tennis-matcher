const { fetchUsers } = require("../models/users-model")

console.log(fetchUsers)

exports.getUsers = (req, res, next) => {
    const { gender, playing_hand, min_ability, max_ability } = req.query
    console.log("controller")
    fetchUsers({ gender, playing_hand, min_ability, max_ability })
        .then((users) => {
            res.status(200).send({ users })
        })
}
