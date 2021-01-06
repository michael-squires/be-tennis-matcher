const usersRouter = require("express").Router();
const {getUsers, getCurrentUser, postNewUser, patchCurrentUser} = require("../controllers/users-controller");

usersRouter.route("/").get(getUsers)
usersRouter.route("/:username").get(getCurrentUser).post(postNewUser)//.patch(patchCurrentUser)

module.exports = usersRouter;