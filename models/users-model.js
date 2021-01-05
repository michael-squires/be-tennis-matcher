//const connection = require("../db/data/connection");

exports.fetchUsers = () => {
    console.log("hello")
    return connection
    .select("*")
    .from("users")
    .then((users) => {
        console.log(users)
    })
}