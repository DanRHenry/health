require("dotenv").config();
const express = require("express");
const app = express();
// const server = require("http").createServer(app);
const PORT = process.env.PORT;

//controllers
const userController = require("./controllers/user.controller")
const cardioController = require("./controllers/cardio.controller")
const workoutController = require("./controllers/workout.controller")
const mealsController = require("./controllers/meals.controller")
const dailyMealsController = require("./controllers/dailyMeals.controller")
const weightController = require("./controllers/weight.controller")

//middleware

const requireValidation = require("./middleware/validate-session")

const cors = require("cors")
app.use(cors());

const mongoose = require("mongoose")
const MONGO = process.env.MONGODB;

mongoose.connect(
    `${MONGO}/health`,
)

const db = mongoose.connection;
db.once("open", () => console.log(`Connected: ${MONGO}`));

app.use(express.json());

app.use("/user", userController)


app.use(requireValidation);

app.use("/cardio", cardioController)
app.use("/workout", workoutController)
app.use("/meals", mealsController)
app.use("/weight", weightController)

app.listen(PORT, () => {
    console.log(`The health app server is running on port: ${PORT}`)
})
