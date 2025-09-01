    import { createDailyMealsEntry } from "../dailyMeals/crud_functions/createDailyMealsEntry.js"

export async function buildDailyMealsSection (focusedDate) {
    console.log("buildingDailyMealsSection...")
    const dailyMealsSection = document.createElement("div")
    dailyMealsSection.id = "dailyMealsSection"

    const addBtn = document.createElement("button")
    addBtn.innerText = "Add"
    addBtn.addEventListener("click",() => {
        console.log('add...')
        createDailyMealsEntry(focusedDate)
    })

    const updateDefaultMealBtn = document.createElement("button")
    updateDefaultMealBtn.innerText = "Update & Add"
    updateDefaultMealBtn.addEventListener("click",()=> {
        console.log('update default...')
    })



    dailyMealsSection.append(addBtn, updateDefaultMealBtn)

    document.getElementById("mealsIngredientsSection").append(dailyMealsSection)
}