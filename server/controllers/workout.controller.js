const router = require("express").Router();
const Workout = require("../models/workout.model");

const serverError = (res, error) => {
  console.log("Server-side error", error.message);
  return res.status(500).json({
    message: error.message,
  });
};


//!Create Workout Entry
router.post("/create", async (req, res) => {
  const { exerciseName, duration, machine, date, userID } = req.body;

  try {
    const workout = new Workout({
      exerciseName: exerciseName,
      duration: duration,
      machine: machine,
      date: date,
      userID: userID,
    });

    const checkForExistingWorkoutEntry = await Workout.findOne(req.body);

    if (checkForExistingWorkoutEntry) {
      res.status(200).json({
        message: "Workout Routine Already There",
      });
    } else {
      const newWorkout = await workout.save();

      res.status(200).json({
        newWorkout: newWorkout,
        message: "Success! New Workout Routine Created!",
      });
    }
  } catch (err) {
    serverError(res, err);
  }
});

//!Find a Workout Entry
router.get("/findone:id", async (req, res) => {
  try {
    const { id } = req.params;

    const findWorkoutRecord = await Workout.findOne({
      _id: id,
    });

    findWorkoutRecord
      ? res.status(200).json({
          message: "Found!",
          findWorkoutRecord,
        })
      : res.status(404).json({
          message: `No Workout Record Found.`,
        });
  } catch (err) {
    serverError(res, err);
  }
});

//!Find Workout Entries by date
router.get("/find:userID/:date", async (req, res) => {
  try {
    const { userID, date } = req.params;
    const getWorkoutRecords = await Workout.find({
      date: date,
      userID: userID,
    });
    getWorkoutRecords
      ? res.status(200).json({
          message: "Found!",
          getWorkoutRecords,
        })
      : res.status(404).json({
          message: "No Records Found.",
        });
  } catch (err) {
    serverError(res, err);
  }
});

//!Update Workout Entry by ID //todo finish
router.patch("/update:workoutEntryID", async (req, res) => {
  try{
    const {workoutEntryID} = req.params
    const record = await Workout.findOne({_id: workoutEntryID})
    const {updateInfo} = req.body;

    if (!record) {
      res.status(404).json({
        message: "Entry not found to update."
      })
    }

    // This makes sure the information has been updated before returning
    const returnOption = {new: true}

    const updateWorkoutRecord = await Workout.findOneAndUpdate({_id:workoutEntryID},
      JSON.parse(updateInfo),
      returnOption
    )

    updateWorkoutRecord? res.status(200).json({
      message: "Workout entry has been updated successfully.",
      updateWorkoutRecord
    })
    : res.status(520).json({
      message: "Unable to update the workout entry. Try again later."
    })
  } catch(err){
    serverError(err)
  }
})

//!Delete a Workout Entry
router.delete("/delete:workoutID", async (req,res) => {
  try {
  const {workoutID} = req.params;
    // console.log(workoutID)

    const deleteWorkoutItem = await Workout.deleteOne({
      _id: workoutID
    })

    deleteWorkoutItem.deletedCount === 1 ? res.status(200).json({
      message: "Workout entry was deleted."
    }) : res.status(404).json({
      message: "Workout entry was not found or deleted."
    })
  } catch (err) {
    serverError(err)
  }
})


// router.post("update")
module.exports = router;
