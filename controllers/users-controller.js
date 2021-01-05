const { fetchUsers } = require("../models/users-model")

console.log(fetchUsers)

exports.getUsers = (req, res, next) => {
    const { availability, gender, playing_hand, min_ability, max_ability, mon_morn, mon_aft, mon_eve, tues_morn, tues_aft, tues_eve, wed_morn, wed_aft, wed_eve, thurs_morn, thurs_aft, thurs_eve, fri_morn, fri_aft, fri_eve, sat_morn, sat_aft, sat_eve, sun_morn, sun_aft, sun_eve } = req.query
    console.log("controller")
    fetchUsers({ availability, gender, playing_hand, min_ability, max_ability, mon_morn, mon_aft, mon_eve, tues_morn, tues_aft, tues_eve, wed_morn, wed_aft, wed_eve, thurs_morn, thurs_aft, thurs_eve, fri_morn, fri_aft, fri_eve, sat_morn, sat_aft, sat_eve, sun_morn, sun_aft, sun_eve })
        .then((users) => {
            res.status(200).send({ users })
        })
}
