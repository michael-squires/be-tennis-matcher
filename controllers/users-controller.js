const { fetchUsers, fetchCurrentUser, createNewUser } = require("../models/users-model")
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

exports.getCurrentUser = (req, res, next) => {
    const username = req.params.username
    fetchCurrentUser(username)
        .then((currentUser) => {
            res.status(200).send(currentUser[0])
        })
}

exports.postNewUser = (req, res, next) => {
    createNewUser(req.body)
    .then((newUser) => {
        res.status(201).send(newUser[0])
    })
}

exports.patchCurrentUser = (req, res, next) => {
    updateCurrentUser(req.body.)
    .then((newUser) => {
        res.status(201).send(newUser[0])
    })
}