/* O que preciso fazer? 
- configurar as buscas
- consertar o resetDay
- implementar localStorage
*/

// Da início à execução do programa, define os listeners, integra as classes/métodos
class App {
  constructor() {
    this.calorieTracker = new CalorieTracker()
    this.infoPanel = new InfoPanel()
    this.mealPanel = new MealPanel(this.calorieTracker, () => this.updateUI())
    this.workoutPanel = new WorkoutPanel(this.calorieTracker, () => this.updateUI())
  }
  
  start() {
    this.setupEventListeners()
    this.updateUI()
  }

  updateUI() {
    const { dailyLimit, caloriesConsumed, caloriesSpent } = this.calorieTracker
    this.infoPanel.updateUI(dailyLimit, caloriesConsumed, caloriesSpent)
  }

  // Configura os listeners e a interação com usuário 
  setupEventListeners() {
    this.setDailyLimitButton = document.querySelector("#limit-form")
    this.setDailyLimitButton.addEventListener('submit', e => {
      e.preventDefault()
      const limitInput = document.getElementById('limit')
      const newLimit = parseInt(limitInput.value)
      this.calorieTracker.setDailyLimit(newLimit)
      this.infoPanel.updateDailyLimit(newLimit)
      this.updateUI()
    })

    // Reseta o balanço de calorias diário
    this.resetDayButton = document.querySelector('#reset')
    this.resetDayButton.addEventListener('click', () => {
      this.calorieTracker.resetDay()
      this.updateUI()
    })

    // Atualiza as calorias com base nas meals inseridas
    const addMealform = document.querySelector('#meal-form')
    addMealform.addEventListener('submit', e => {
      e.preventDefault()

      const mealName = document.querySelector('#meal-name').value
      const mealCalories = document.querySelector('#meal-calories').value

      if (mealName && mealCalories) {
        const meal = new Meal(mealName, mealCalories)
        this.mealPanel.addMeal(meal)
        this.calorieTracker.addCaloriesConsumed(mealCalories)
        this.updateUI()
      }
    })

    const addWorkoutForm = document.querySelector('#workout-form')
    addWorkoutForm.addEventListener('submit', e => {
      e.preventDefault()

      const workoutName = document.querySelector('#workout-name').value
      const workoutCalories = document.querySelector('#workout-calories').value

      if (workoutName && workoutCalories) {
        const workout = new Workout(workoutName, workoutCalories)
        this.workoutPanel.addWorkout(workout)
        this.calorieTracker.addCaloriesSpent(workoutCalories)
        this.updateUI()
      }
    })
  }
}

class CalorieTracker {
  constructor(dailyLimit, caloriesConsumed, caloriesSpent) {
    this.dailyLimit = 2000 
    this.caloriesConsumed = 0
    this.caloriesSpent = 0
  }

  setDailyLimit(newLimit) {
    if (!isNaN(newLimit) && newLimit > 0) {
      this.dailyLimit = parseInt(newLimit)
    } else {
    }
  }

  resetDay() {
    this.caloriesConsumed = 0
    this.caloriesSpent = 0
  }


  addCaloriesConsumed(calories) {
    if (!isNaN(calories) && calories > 0) {
      this.caloriesConsumed += parseInt(calories)
    } else {
    }
  }

  removeCaloriesConsumed(calories) {
    if (!isNaN(calories) && calories > 0) {
      this.caloriesConsumed -= parseInt(calories)
    } else {
    }
  }

  addCaloriesSpent(calories) {
    if (!isNaN(calories) && calories > 0) {
      this.caloriesSpent += parseInt(calories)
    } else {
      console.log('Informe um valor de calorias válido!')
    }
  }

  removeCaloriesSpent(calories) {
    if (!isNaN(calories) && calories > 0) {
      console.log(`calores gastas antes removeCaloriesSpent: ${this.caloriesSpent}`);
      this.caloriesSpent -= parseInt(calories)
      console.log(`calorias gastas depois removeCaloriesSpent: ${this.caloriesSpent}`);
    } else {
      console.log('Informe um valor de calorias válido!')
    }
  }

  getTotalCalories() {
    return this.dailyLimit + this.caloriesSpent - this.caloriesConsumed
  }

  getCaloriesRemaining() {
    return this.dailyLimit + this.caloriesSpent - this.caloriesConsumed
  }
}

class InfoPanel {
  constructor() {
    this.dailyLimitEl = document.querySelector('#calories-limit')
    this.caloriesConsumedEl = document.querySelector('#calories-consumed')
    this.caloriesSpentEl = document.querySelector('#calories-spent')
    this.caloriesRemainingEl = document.querySelector('#calories-remaining')
    this.totalCaloriesEl = document.querySelector('#calories-total')
    this.progressBar = document.querySelector('.progress-bar')
  }

  updateUI(dailyLimit, caloriesConsumed, caloriesSpent) {
    this.caloriesConsumedEl.textContent = caloriesConsumed
    this.caloriesSpentEl.textContent = caloriesSpent
    this.totalCaloriesEl.textContent = this.getCaloriesBalance(caloriesConsumed, caloriesSpent)
    this.caloriesRemainingEl.textContent = this.getCaloriesRemaining(dailyLimit, caloriesConsumed, caloriesSpent)
    this.updateProgressBar(dailyLimit, caloriesConsumed, caloriesSpent)
  }

  updateDailyLimit(newLimit) {
    this.dailyLimitEl.textContent = newLimit
  }
  
  getCaloriesBalance(caloriesConsumed, caloriesSpent) {
    return caloriesConsumed - caloriesSpent
  }

  getCaloriesRemaining(dailyLimit, caloriesConsumed, caloriesSpent) {
    return dailyLimit + caloriesSpent - caloriesConsumed
  }

  updateProgressBar(dailyLimit, caloriesConsumed, caloriesSpent) {
    const totalCalories = dailyLimit + caloriesSpent
    const remainingCalories = totalCalories - caloriesConsumed
    const percentage = ((totalCalories - remainingCalories) / totalCalories) * 100
    this.progressBar.style.width = `${percentage}%`
    this.progressBar.classList.toggle('bg-danger', remainingCalories < 0)
    this.progressBar.classList.toggle('bg-success', remainingCalories >= 0)
    this.caloriesRemainingEl.parentElement.classList.toggle('bg-danger', remainingCalories < 0)
    this.caloriesRemainingEl.parentElement.classList.toggle('bg-success', remainingCalories >= 0)
  }
}

class MealPanel {
  constructor(calorieTracker, updateUI) {
    this.meals = []
    this.mealsItems = document.querySelector('#meal-items')
    this.calorieTracker = calorieTracker
    this.updateUI = updateUI
  }

  addMeal(meal) {
    this.meals.push(meal)
    this.renderMeal(meal)
  }

  removeMeal(meal) {
    const index = this.meals.indexOf(meal)
    if (index !== -1) {
      this.meals.splice(index, 1)
      meal.removeElement()
      this.calorieTracker.removeCaloriesConsumed(meal.calories) // Remover as calorias da refeição removida
      this.updateUI()
    }
  }

  renderMeal(meal) {
    const mealItem = document.createElement('div')
    mealItem.className = 'card my-2'
    mealItem.innerHTML = `
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${meal.name}</h4>
          <div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">
            ${meal.calories}
          </div>
          <button class="remove-meal btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    `
    this.mealsItems.appendChild(mealItem)

    const removeMealBtn = mealItem.querySelector('.remove-meal')
    removeMealBtn.addEventListener('click', () => {
      this.removeMeal(meal)
    })

    meal.setElement(mealItem)
  }
}

class Meal {
  constructor(name, calories) {
    this.name = name
    this.calories = calories
    this.element = null
  }

  setElement(element) {
    this.element = element
  }

  removeElement() {
    this.element.remove()
  }
}

// Controla a inserção e remoção dos workouts
class WorkoutPanel {
  constructor(calorieTracker, updateUI) {
    this.workouts = []
    this.workoutsItems = document.querySelector('#workout-items')
    this.calorieTracker = calorieTracker
    this.updateUI = updateUI
  }

  addWorkout(workout) {
    this.workouts.push(workout)
    this.renderWorkout(workout)
  }

  removeWorkout(workout) {
    const index = this.workouts.indexOf(workout)
    if (index !== -1) {
      this.workouts.splice(index, 1)
      workout.removeElement()
      this.calorieTracker.removeCaloriesSpent(Number(workout.calories)) // Remover as calorias do treino feito
      this.updateUI()
    }
  }

  renderWorkout(workout) {
    const workoutItem = document.createElement('div')
    workoutItem.className = 'card my-2'
    workoutItem.innerHTML = `
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${workout.name}</h4>
          <div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">
            ${workout.calories}
          </div>
          <button class="remove-workout btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    `
    this.workoutsItems.appendChild(workoutItem)

    const removeWorkoutBtn = workoutItem.querySelector('.remove-workout')
    removeWorkoutBtn.addEventListener('click', () => {
      this.removeWorkout(workout)
    })

    workout.setElement(workoutItem)
  }
}

class Workout {
  constructor(name, calories) {
    this.name = name
    this.calories = calories
    this.element = null
  }

  setElement(element) {
    this.element = element
  }

  removeElement() {
    this.element.remove()
  }
}

const app = new App()
app.start()