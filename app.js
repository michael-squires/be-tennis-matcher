const express = require("express");
const app = express();
const usersRouter = require("./routers/usersRouter")
const clubsRouter = require("./routers/clubsRouter")
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use("/users", usersRouter)
//app.use("/clubs", clubsRouter)

module.exports = app;