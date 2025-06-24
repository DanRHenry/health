require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const PORT = process.env.PORT;

//middleware

const requireValidation = require("./middleware/validate-session")

//controllers
const userController = require("./controllers/user.controller")
const cardioController = require("./controllers/cardio.controller")

const cors = require("cors")
const mongoose = require("mongoose")
const MONGO = process.env.MONGODB;

mongoose.connect(
    `${MONGO}/health`,
)

const db = mongoose.connection;
db.once("open", () => console.log(`Connected: ${MONGO}`));
app.use(express.json());
app.use(cors());

app.use("/api/health/user",userController)

// requireValidation()
app.use("/api/health/cardio", cardioController)


server.listen(PORT, () => {
    console.log(`The health app server is running on port: ${PORT}`)
})