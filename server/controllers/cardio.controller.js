const router = require("express").Router();
const Cardio = require("../models/cardio.model");

const serverError = (res, error) => {
  console.log("Server-side error", error.message);
  return res.status(500).json({
    message: error.message,
  });
};


//!Create Cardio Entry
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

//!Find a Cardio Entry
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

//!Find Cardio Entries by date
router.get("/find:userID/:date", async (req, res) => {
  try {
    const { userID, date } = req.params;
    const getCardioRecords = await Cardio.find({
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

//!Update Cardio Entry by ID //todo finish
router.patch("/update:cardioEntryID", async (req, res) => {
  try{
    const {cardioEntryID} = req.params
    const record = await Cardio.findOne({_id: cardioEntryID})
    const {updateInfo} = req.body;

    if (!record) {
      res.status(404).json({
        message: "Entry not found to update."
      })
    }

    // This makes sure the information has been updated before returning
    const returnOption = {new: true}

    const updateCardioRecord = await Cardio.findOneAndUpdate({_id:cardioEntryID},
      JSON.parse(updateInfo),
      returnOption
    )

    updateCardioRecord? res.status(200).json({
      message: "Cardio entry has been updated successfully.",
      updateCardioRecord
    })
    : res.status(520).json({
      message: "Unable to update the cardio entry. Try again later."
    })
  } catch(err){
    serverError(err)
  }
})

//!Delete a Cardio Entry
router.delete("/delete:cardioID", async (req,res) => {
  try {
  const {cardioID} = req.params;
    // console.log(cardioID)

    const deleteCardioItem = await Cardio.deleteOne({
      _id: cardioID
    })

    deleteCardioItem.deletedCount === 1 ? res.status(200).json({
      message: "Cardio entry was deleted."
    }) : res.status(404).json({
      message: "Cardio entry was not found or deleted."
    })
  } catch (err) {
    serverError(err)
  }
})


// router.post("update")
module.exports = router;
