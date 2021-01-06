const { fetchUsers } = require("../models/users-model")
const { filterByDistance } = require('../db/utils/data-manipulation')

exports.getUsers = (req, res, next) => {
    const { gender, playing_hand, min_ability, max_ability, weekday_daytime, weekday_evening, weekends, distance, latitude, longitude } = req.query
    fetchUsers({ gender, playing_hand, min_ability, max_ability, weekday_daytime, weekday_evening, weekends })
        .then((users) => {
            if (distance) {
                users = users.filter(user => filterByDistance(latitude, longitude, user.latitude, user.longitude, distance))
            }
            res.status(200).send({ users })
        })
}
