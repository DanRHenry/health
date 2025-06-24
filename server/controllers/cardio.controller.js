const router = require("express").Router();
const Cardio = require("../models/cardio.model");

const serverError = (res, error) => {
  console.log("Server-side error", error.message);
  return res.status(500).json({
    message: error.message,
  });
};

router.post("/create", async (req, res) => {
  const { exerciseName, duration, machine, date, userID } = req.body;

  try {
    const cardio = new Cardio({
      exerciseName: exerciseName,
      duration: duration,
      machine: machine,
      date: date,
      userID: userID,
    });

    const checkForExistingCardioEntry = await Cardio.findOne(req.body);

    if (checkForExistingCardioEntry) {
      res.status(200).json({
        message: "Cardio Routine Already There",
      });
    } else {
      const newCardio = await cardio.save();

      res.status(200).json({
        newCardio: newCardio,
        message: "Success! New Cardio Routine Created!",
      });
    }
  } catch (err) {
    serverError(res, err);
  }
});

router.get("/findone:id", async (req, res) => {
  try {
    const { id } = req.params;

    const findCardioRecord = await Cardio.findOne({
      _id: id,
    });

    findCardioRecord
      ? res.status(200).json({
          message: "Found!",
          findCardioRecord,
        })
      : res.status(404).json({
          message: `No Cardio Record Found.`,
        });
  } catch (err) {
    serverError(res, err);
  }
});

router.get("find:userID/:date/", async (req, res) => {
  try {
    const { userID, date } = req.params;

    console.log(userID, date)
    const getCardioRecords = Cardio.find({
      date: date,
      userID: userID,
    });

    getCardioRecords
      ? res.status(200).json({
          message: "Found!",
          getCardioRecords,
        })
      : res.status(404).json({
          message: "No Records Found.",
        });
  } catch (err) {
    serverError(res, err);
  }
});

// router.post("update")
module.exports = router;
