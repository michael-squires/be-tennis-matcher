const connection = require("../db/data/connection");
const { use } = require("../routers/usersRouter");

exports.fetchUsers = ({ username, gender, playing_hand, min_ability, max_ability, weekday_daytime, weekday_evening, weekends }) => {
    return connection
        .select("*")
        .from("users")
        .modify((query) => {
            if (gender) query.where('users.gender', '=', gender)
            if (playing_hand) query.where('users.playing_hand', '=', playing_hand)
            if (min_ability) query.where('users.ability', '>=', min_ability)
            if (max_ability) query.where('users.ability', '<=', max_ability)
            if (weekday_daytime) query.where('users.weekday_daytime', '=', weekday_daytime)
            if (weekday_evening) query.where('users.weekday_evening', '=', weekday_evening)
            if (weekends) query.where('users.weekends', '=', weekends)
            if (username) query.where('users.username', '!=', username)
            // if (mon_morn) query.where('users.mon_morn', '=', mon_morn)
            // if (mon_aft) query.where('users.mon_aft', '=', mon_aft)
            // if (mon_eve) query.where('users.mon_eve', '=', mon_eve)
            // if (tues_morn) query.where('users.tues_morn', '=', tues_morn)
            // if (tues_aft) query.where('users.tues_aft', '=', tues_aft)
            // if (tues_eve) query.where('users.tues_eve', '=', tues_eve)
            // if (wed_morn) query.where('users.wed_morn', '=', wed_morn)
            // if (wed_aft) query.where('users.wed_aft', '=', wed_aft)
            // if (wed_eve) query.where('users.wed_eve', '=', wed_eve)
            // if (thurs_morn) query.where('users.thurs_morn', '=', thurs_morn)
            // if (thurs_aft) query.where('users.thurs_aft', '=', thurs_aft)
            // if (thurs_eve) query.where('users.thurs_eve', '=', thurs_eve)
            // if (fri_morn) query.where('users.fri_morn', '=', fri_morn)
            // if (fri_aft) query.where('users.fri_aft', '=', fri_aft)
            // if (fri_eve) query.where('users.fri_eve', '=', fri_eve)
            // if (sat_morn) query.where('users.sat_morn', '=', sat_morn)
            // if (sat_aft) query.where('users.sat_aft', '=', sat_aft)
            // if (sat_eve) query.where('users.sat_eve', '=', sat_eve)
            // if (sun_morn) query.where('users.sun_morn', '=', sun_morn)
            // if (sun_aft) query.where('users.sun_aft', '=', sun_aft)
            // if (sun_eve) query.where('users.sun_eve', '=', sun_eve)
        })
}

exports.fetchCurrentUser = (username) => {
    return connection
        .select("*")
        .from("users")
        .where({ username })
}

exports.createNewUser = (newUser) => {
    return connection
        .insert(newUser)
        .into("users")
        .returning("*")
}


//, max_ability, hand_preference, min_age, max_age, gender_preference
exports.updateCurrentUser = (username, distance, min_ability, max_ability, hand_preference, min_age, max_age, gender_preference) => {
    return connection("users")
        .where({ username })
        .update({ distance, min_ability, max_ability, hand_preference, min_age, max_age, gender_preference })
        .returning("*");
}