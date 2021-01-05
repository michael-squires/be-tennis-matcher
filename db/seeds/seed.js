const { usersData } = require('../data/index.js')

console.log('usersData in seed file', usersData)

exports.seed = function (knex) {
    return knex.migrate
        .rollback()
        .then(() => {
            return knex.migrate.latest()
        })
        .then(() => {
            return knex.insert(usersData).into('users').returning('*')
        })
}