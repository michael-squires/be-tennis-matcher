const { usersData } = require('../data/index.js')

exports.seed = function (knex) {
    return knex.migrate
        .rollback()
        .then(() => {
            return knex.migrate.latest()
        })
        .then(() => {
            return Promise.all([
                knex.insert(usersData).into('users').returning('*'),
                knex.insert(clubsData).into('clubs').returning('*'),
            ])           
        })
}