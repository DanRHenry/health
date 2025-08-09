export async function buildDailyMealsSection () {
    const dailyMealsSection = document.createElement("div")
    dailyMealsSection.id = "dailyMealsSection"

    /* 
    add new meal
    update default meal
    */

    const addBtn = document.createElement("button")
    addBtn.innerText = "Add"
    addBtn.addEventListener("click",() => {
        console.log('add...')
    })

    const updateDefaultMealBtn = document.createElement("button")
    updateDefaultMealBtn.innerText = "Update & Add"
    updateDefaultMealBtn.addEventListener("click",()=> {
        console.log('update default...')
    })


    dailyMealsSection.append(addBtn, updateDefaultMealBtn)
    document.getElementById("mealsIngredientsSection").append(dailyMealsSection)
}