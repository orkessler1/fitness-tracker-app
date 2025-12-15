
const goals = {
  targetCalories: 0, 
  targetProtein: 0, 
};


const meals = []; 


const targetCaloriesInput = document.getElementById("target-calories");
const targetProteinInput = document.getElementById("target-protein");
const saveGoalsBtn = document.getElementById("save-goals-btn");

const mealNameInput = document.getElementById("meal-name");
const mealCaloriesInput = document.getElementById("meal-calories");
const mealProteinInput = document.getElementById("meal-protein");
const addMealBtn = document.getElementById("add-meal-btn");

const caloriesConsumedSpan = document.getElementById("calories-consumed");
const caloriesRemainingSpan = document.getElementById("calories-remaining");
const proteinConsumedSpan = document.getElementById("protein-consumed");
const proteinRemainingSpan = document.getElementById("protein-remaining");


const mealsTbody = document.getElementById("meals-tbody");

function updateSummary() {

  const totalCalories = meals.reduce(
    (sum, meal) => sum + meal.calories,
    0 
  );


  const totalProtein = meals.reduce(
    (sum, meal) => sum + meal.protein,
    0
  );
  const remainingCalories = Math.max(goals.targetCalories - totalCalories, 0);
  const remainingProtein = Math.max(goals.targetProtein - totalProtein, 0);


  caloriesConsumedSpan.textContent = totalCalories;
  caloriesRemainingSpan.textContent = remainingCalories;
  proteinConsumedSpan.textContent = totalProtein;
  proteinRemainingSpan.textContent = remainingProtein;
}

function renderMealsTable() {
  mealsTbody.innerHTML = "";

  meals.forEach((meal) => {
    const tr = document.createElement("tr"); 

    const nameTd = document.createElement("td");
    nameTd.textContent = meal.name;

    const caloriesTd = document.createElement("td");
    caloriesTd.textContent = meal.calories;

    const proteinTd = document.createElement("td");
    proteinTd.textContent = meal.protein;

    tr.appendChild(nameTd);
    tr.appendChild(caloriesTd);
    tr.appendChild(proteinTd);

    mealsTbody.appendChild(tr);
  });
}


function readNumberFromInput(inputElement) {
  const value = Number(inputElement.value);
  return Number.isNaN(value) ? 0 : value;
}

saveGoalsBtn.addEventListener("click", () => {
  const targetCalories = readNumberFromInput(targetCaloriesInput);
  const targetProtein = readNumberFromInput(targetProteinInput);


  goals.targetCalories = targetCalories;
  goals.targetProtein = targetProtein;

  updateSummary();

  console.log("Goals updated:", goals);
});

addMealBtn.addEventListener("click", () => {
  const name = mealNameInput.value.trim();
  const calories = readNumberFromInput(mealCaloriesInput);
  const protein = readNumberFromInput(mealProteinInput);

  if (!name) {
    alert("Please enter a meal name.");
    return;
  }


  const newMeal = {
    name,
    calories,
    protein,
  };


  meals.push(newMeal);

 
  mealNameInput.value = "";
  mealCaloriesInput.value = "";
  mealProteinInput.value = "";

  renderMealsTable();
  updateSummary();

  console.log("Meal added:", newMeal);
});
