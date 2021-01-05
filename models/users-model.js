const connection = require("../db/data/connection");

exports.fetchUsers = ({ gender, playing_hand, min_ability, max_ability }) => {
    return connection
        .select("*")
        .from("users")
        .modify((query) => {
            if (gender) query.where('users.gender', '=', gender)
            if (playing_hand) query.where('users.playing_hand', '=', playing_hand)
            if (min_ability) query.where('users.ability', '>=', min_ability)
            if (max_ability) query.where('users.ability', '<=', max_ability)
        })
}
