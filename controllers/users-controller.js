const { fetchUsers, fetchCurrentUser, createNewUser, updateCurrentUser } = require("../models/users-model")
const { filterByDistance, filterByAge } = require('../db/utils/data-manipulation')

exports.getUsers = (req, res, next) => {
    const { gender, playing_hand, min_ability, max_ability, weekday_daytime, weekday_evening, weekends, distance, latitude, longitude, min_age, max_age } = req.query
    fetchUsers({ gender, playing_hand, min_ability, max_ability, weekday_daytime, weekday_evening, weekends })
        .then((users) => {
            if (distance) {
                users = users.filter(user => filterByDistance(latitude, longitude, user.latitude, user.longitude, distance))
            }
            if (min_age && max_age) {
                users = users.filter(user => filterByAge(user.date_of_birth, min_age, max_age))
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
    username = req.params.username
    const {distance, min_ability, max_ability, hand_preference, min_age, max_age, gender_preference} = req.body
    updateCurrentUser(username, distance, min_ability, max_ability, hand_preference, min_age, max_age, gender_preference)
    .then((currentUser) => {
        res.status(201).send(currentUser[0])
    })
}