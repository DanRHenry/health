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

//middleware

const requireValidation = require("./middleware/validate-session")

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

app.use(requireValidation);

app.use("/api/health/cardio", cardioController)
app.use("/api/health/workout", workoutController)
app.use("/api/health/meals", mealsController)
app.use("/api/health/dailyMeals", dailyMealsController)

app.listen(PORT, () => {
    console.log(`The health app server is running on port: ${PORT}`)
})