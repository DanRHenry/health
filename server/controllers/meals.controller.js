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
  try {
    const { calories, protein, sugars, userID, mealName } =
      req.body;

    const meal = new Meals({
      userID: userID,
      mealName: mealName,
      calories: calories,
      protein: protein,
      sugars: sugars,
    });

    const checkForExistingMealsEntry = await Meals.findOne({
      userID: userID,
      mealName: mealName,
    });

    if (checkForExistingMealsEntry) {
      res.status(200).json({
        message: "Meal Entry Already There",
      });
    } else {
      const newMeal = await meal.save();

      res.status(200).json({
        message: "Success! New Meal Entry Created!",
        newMeals: newMeal,
      });
    }
  } catch (err) {
    serverError(res, err);
  }
});

//!Find all meals for a user
router.get("/findbyuser:userID", async (req, res) => {
  try {
    const { userID } = req.params;
    const findmeals = await Meals.find({
      userID: userID,
    });
    let mealNames = [];
    for (let i = 0; i < findmeals.length; i++) {
      mealNames.push(findmeals[i].mealName);
    }

    findmeals
      ? res.status(200).json({
          message: "Found!",
          mealNames,
        })
      : res.status(404).json({
          message: "No meal names found",
        });
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

//!Update Meals Entry without an ID
router.patch("/update", async (req, res) => {
  try {
    const { updateInfo } = req.body;
    const mealName = updateInfo.mealName;
    const userID = updateInfo.userID;
    const record = await Meals.findOne({ mealName: mealName, userID: userID });

    if (!record) {
      res.status(404).json({
        message: "Entry not found to update.",
      });
    }
    console.log("record: ", record);

    // This makes sure the information has been updated before returning
    const returnOption = { new: true };

    const updateMealsRecord = await Meals.findOneAndUpdate(
      { _id: record._id },
      updateInfo,
      returnOption
    );

    updateMealsRecord
      ? res.status(200).json({
          message: "Meals entry has been updated successfully.",
          updateMealsRecord,
        })
      : res.status(520).json({
          message: "Unable to update the meals entry. Try again later.",
        });
  } catch (err) {
    console.log("error: ", err);
    serverError(err);
  }
});

//!Update Meals Entry by ID //todo finish
// router.patch("/update:mealsEntryID", async (req, res) => {
//   try {
//     const { mealsEntryID } = req.params;
//     const record = await Meals.findOne({ _id: mealsEntryID });
//     const { updateInfo } = req.body;

//     if (!record) {
//       res.status(404).json({
//         message: "Entry not found to update.",
//       });
//     }

//     // This makes sure the information has been updated before returning
//     const returnOption = { new: true };

//     const updateMealsRecord = await Meals.findOneAndUpdate(
//       { _id: mealsEntryID },
//       JSON.parse(updateInfo),
//       returnOption
//     );

//     updateMealsRecord
//       ? res.status(200).json({
//           message: "Meals entry has been updated successfully.",
//           updateMealsRecord,
//         })
//       : res.status(520).json({
//           message: "Unable to update the meals entry. Try again later.",
//         });
//   } catch (err) {
//     serverError(err);
//   }
// });

//!Delete a Meals Entry
router.delete("/delete:mealsID", async (req, res) => {
  try {
    const { mealsID } = req.params;
    // console.log(mealsID)

    const deleteMealsItem = await Meals.deleteOne({
      _id: mealsID,
    });

    deleteMealsItem.deletedCount === 1
      ? res.status(200).json({
          message: "Meals entry was deleted.",
        })
      : res.status(404).json({
          message: "Meals entry was not found or deleted.",
        });
  } catch (err) {
    serverError(err);
  }
});

//!Find meal by name and user id
router.get("/find/:id/:mealName", async (req, res) => {
  try {
    // console.log(req.params)
    const { id, mealName } = req.params;
    // console.log("meal ID & name: ", id, mealName);
    const getAllMeals = await Meals.findOne({
      userID: id,
      mealName: mealName,
    });

    getAllMeals
      ? res.status(200).json({
          message: "Meal found",
          getAllMeals,
        })
      : res.status(404).json({
          message: "No Meal Found",
        });
  } catch (err) {
    serverError(err);
  }
});

//!Find all saved date by userID
router.get("/findmealbydateandid/:id/:date", async (req, res) => {
  try {
    const { id, date } = req.params;

    // console.log("id & date: ",id,date)
    const getAllMeals = await Meals.find({
      userID: id,
      date: date,
    });

    // console.log("all meals by name and user: ",getAllMeals)

    const allMealNames = [];
    for (let i = 0; i < getAllMeals.length; i++) {
      allMealNames.push(getAllMeals[i].mealName);
    }
    getAllMeals
      ? res.status(200).json({
          message: "All found meal names: ",
          allMealNames,
        })
      : res.status(404).json({
          message: "No meals found",
        });
  } catch (err) {
    serverError(err);
  }
});

// router.post("update")
module.exports = router;
