const router = require("express").Router();
const Weight = require("../models/weight.model");

const serverError = (res, error) => {
  console.log("Server-side error", error.message);
  return res.status(500).json({
    message: error.message,
  });
};

router.get("/find/:userID/:date", async (req, res) => {
try {
    const {userID, date} = req.params;
    const getDailyWeight = await Weight.find({
        date: date,
        userID: userID
    })
    getDailyWeight
        ? res.status(200).json({
            message: "Found weight record",
            getDailyWeight
        }) 
        : res.status(404).json({
            message: "No weight record found"
        })
} catch (err) {
    serverError(res, err)
}
})

router.post("/create", async (req, res) => {
    try {
        const {weight, date, userID} = req.body

        const weightEntry = new Weight({
            weight: weight,
            date: date,
            userID: userID
        });

        const newWeightEntry = await weightEntry.save();

        res.status(200).json({
            weightEntry: newWeightEntry,
            message: "Weight Entry Saved",
        })
    } catch (err) {
        serverError(res, err)
    }
})

router.patch("/update", async (req,res) => {
    try {
        const {userID, date} = req.body
        const update = req.body;
        
        const findWeight = await Weight.findOne({ userID: userID,
            date: date
         });

        if (!findWeight) {
      res.status(404).json({
        message: `Weight Entry Not Found.`
      })
    }
    const updatedWeight = await Weight.findOneAndUpdate({
        userID: userID,
        date: date
    }, update)

    updatedWeight
      ? res.status(200).json({
        message: `Weight has been updated successfully.`,
        updatedWeight
      })
      : res.status(520).json({
        message: "Unable to update weight."
      })

    } catch (err) {
        serverError(res, err)
    }
})

module.exports = router;
