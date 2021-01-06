const usersRouter = require("express").Router();
const {getUsers, getCurrentUser, postNewUser} = require("../controllers/users-controller");

usersRouter.route("/").get(getUsers)
usersRouter.route("/:username").get(getCurrentUser).post(postNewUser)

module.exports = usersRouter;