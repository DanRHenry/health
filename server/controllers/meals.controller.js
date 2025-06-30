const router = require("express").Router();
const Meals = require("../models/meals.model");

const serverError = (res, error) => {
  console.log("Server-side error", error.message);
  return res.status(500).json({
    message: error.message,
  });
};


//!Create Meals Entry
router.post("/create", async (req, res) => {
  const { breakfast, lunch, dinner, snack, date, userID } = req.body;

  try {
    console.log(req.body)
    const meals = new Meals({
      breakfast: breakfast,
      lunch: lunch,
      dinner: dinner,
      snack: snack,
      date: date,
      userID: userID,
    });

    const checkForExistingMealsEntry = await Meals.findOne(req.body);

    if (checkForExistingMealsEntry) {
      res.status(200).json({
        message: "Meals Entry Already There",
      });
    } else {
      const newMeals = await meals.save();

      res.status(200).json({
        newMeals: newMeals,
        message: "Success! New Meals Entry Created!",
      });
    }
  } catch (err) {
    serverError(res, err);
  }
});

//!Find a Meals Entry
router.get("/findone:id", async (req, res) => {
  try {
    const { id } = req.params;

    const findMealsRecord = await Meals.findOne({
      _id: id,
    });

    findMealsRecord
      ? res.status(200).json({
          message: "Found!",
          findMealsRecord,
        })
      : res.status(404).json({
          message: `No Meals Record Found.`,
        });
  } catch (err) {
    serverError(res, err);
  }
});

//!Find Meals Entries by date
router.get("/find:userID/:date", async (req, res) => {
  try {
    const { userID, date } = req.params;
    const getMealsRecords = await Meals.find({
      date: date,
      userID: userID,
    });
    getMealsRecords.length > 0
      ? res.status(200).json({
          message: "Found!",
          getMealsRecords,
        })
      : res.status(404).json({
          message: "No Records Found.",
        });
  } catch (err) {
    serverError(res, err);
  }
});

//!Update Meals Entry by ID //todo finish
router.patch("/update:mealsEntryID", async (req, res) => {
  try{
    const {mealsEntryID} = req.params
    const record = await Meals.findOne({_id: mealsEntryID})
    const {updateInfo} = req.body;

    if (!record) {
      res.status(404).json({
        message: "Entry not found to update."
      })
    }

    // This makes sure the information has been updated before returning
    const returnOption = {new: true}

    const updateMealsRecord = await Meals.findOneAndUpdate({_id:mealsEntryID},
      JSON.parse(updateInfo),
      returnOption
    )

    updateMealsRecord? res.status(200).json({
      message: "Meals entry has been updated successfully.",
      updateMealsRecord
    })
    : res.status(520).json({
      message: "Unable to update the meals entry. Try again later."
    })
  } catch(err){
    serverError(err)
  }
})

//!Delete a Meals Entry
router.delete("/delete:mealsID", async (req,res) => {
  try {
  const {mealsID} = req.params;
    // console.log(mealsID)

    const deleteMealsItem = await Meals.deleteOne({
      _id: mealsID
    })

    deleteMealsItem.deletedCount === 1 ? res.status(200).json({
      message: "Meals entry was deleted."
    }) : res.status(404).json({
      message: "Meals entry was not found or deleted."
    })
  } catch (err) {
    serverError(err)
  }
})

//!Find all meals entries
router.get("/findall:id", async (req, res) => {
    try{
        const {id} = req.params;

        const getAllMeals = await Meals.find({
            userID: id
        })

        getAllMeals
        ? res.status(200).json({
            message: "All Meals from user",
            getAllMeals
        })
        : res.status(404).json({
            message: "No Meals Found"
        })
    } catch(err) {
        serverError(err)
    }
}) 


// router.post("update")
module.exports = router;
