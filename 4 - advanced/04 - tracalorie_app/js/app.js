class App {
  constructor() {
    this.calorieTracker = new CalorieTracker()
    this.infoPanel = new InfoPanel()
    this.mealsPanel = new MealsPanel(this.calorieTracker, () => this.updateUI())
    this.workoutsPanel = new WorkoutsPaneld(this.calorieTracker, () => this.updateUI())
  }
  
  start() {
    this.setupEventListeners()
    const savedDailyLimit = localStorage.getItem('dailyLimit')
    if (savedDailyLimit) {
      this.calorieTracker.setDailyLimit(parseInt(savedDailyLimit))
      this.infoPanel.updateDailyLimit(savedDailyLimit)
    }
    this.mealsPanel.loadMealsFromLocalStorage()
    this.workoutsPanel.loadWorkoutsFromLocalStorage()
    this.updateUI()
  }

  updateUI() {
    const { dailyLimit, caloriesConsumed, caloriesSpent } = this.calorieTracker
    this.infoPanel.updateUI(dailyLimit, caloriesConsumed, caloriesSpent)
  }

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

    this.resetDayButton = document.querySelector('#reset')
    this.resetDayButton.addEventListener('click', () => {
      this.calorieTracker.resetDay()
      this.mealsPanel.clearMeals()
      this.workoutsPanel.clearWorkouts()
      this.updateUI()
    })

    const addMealform = document.querySelector('#meal-form')
    addMealform.addEventListener('submit', e => {
      e.preventDefault()

      const mealName = document.querySelector('#meal-name').value
      const mealCalories = document.querySelector('#meal-calories').value
      
      const collapseMeal =  document.querySelector('#collapse-meal')
      const bsCollapse = new bootstrap.Collapse(collapseMeal, {
        toggle: true,
      })

      if (mealName && mealCalories) {
        const meal = new Meal(mealName, mealCalories)
        this.mealsPanel.addMeal(meal)
        this.calorieTracker.addCaloriesConsumed(mealCalories)
        
        this.updateUI()
      }
    })

    const addWorkoutForm = document.querySelector('#workout-form')
    addWorkoutForm.addEventListener('submit', e => {
      e.preventDefault()

      const workoutName = document.querySelector('#workout-name').value
      const workoutCalories = document.querySelector('#workout-calories').value
      const collapseWorkout =  document.querySelector('#collapse-workout')
      const bsCollapse = new bootstrap.Collapse(collapseWorkout, {
        toggle: true,
      })

      if (workoutName && workoutCalories) {
        const workout = new Workout(workoutName, workoutCalories)
        this.workoutsPanel.addWorkout(workout)
        this.calorieTracker.addCaloriesSpent(workoutCalories)
        this.updateUI()
      }
    })

    const filterMealsInput = document.querySelector('#filter-meals')
    filterMealsInput.addEventListener('input', () => {
      const searchTerm = filterMealsInput.value.trim()
      this.mealsPanel.filterMeals(searchTerm)
    })

    const filterWorkoutInput = document.querySelector('#filter-workouts')
    filterWorkoutInput.addEventListener('input', () => {
      const searchTerm = filterWorkoutInput.value.trim()
      this.workoutsPanel.filterWorkouts(searchTerm)
    })
  }
}

class CalorieTracker {
  constructor(dailyLimit, caloriesConsumed, caloriesSpent) {
    this.dailyLimit = 2000
    this.caloriesConsumed = 0
    this.caloriesSpent = 0
    this.loadFromLocalStorage()
  }

  setDailyLimit(newLimit) {
    if (!isNaN(newLimit) && newLimit > 0) {
      this.dailyLimit = parseInt(newLimit)
      this.saveToLocalStorage()
    } else {
      console.log('Informe um valor de calorias válido!')
    }
  }

  resetDay() {
    this.caloriesConsumed = 0
    this.caloriesSpent = 0
    this.saveToLocalStorage()
  }

  addCaloriesConsumed(calories) {
    if (!isNaN(calories) && calories > 0) {
      this.caloriesConsumed += parseInt(calories)
      this.saveToLocalStorage()
    } else {
      console.log('Informe um valor de calorias válido!')
    }
  }

  removeCaloriesConsumed(calories) {
    if (!isNaN(calories) && calories > 0) {
      this.caloriesConsumed -= parseInt(calories)
      this.saveToLocalStorage()
    } else {
      console.log('Informe um valor de calorias válido!')
    }
  }

  addCaloriesSpent(calories) {
    if (!isNaN(calories) && calories > 0) {
      this.caloriesSpent += parseInt(calories)
      this.saveToLocalStorage()
    } else {
      console.log('Informe um valor de calorias válido!')
    }
  }

  removeCaloriesSpent(calories) {
    if (!isNaN(calories) && calories > 0) {
      this.caloriesSpent -= parseInt(calories)
      this.saveToLocalStorage()
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

  saveToLocalStorage() {
    const data = {
      dailyLimit: this.dailyLimit,
      caloriesConsumed: this.caloriesConsumed,
      caloriesSpent: this.caloriesSpent
    }
    localStorage.setItem('calorieTrackerData', JSON.stringify(data))
  }

  loadFromLocalStorage() {
    const data = localStorage.getItem('calorieTrackerData')
    if (data) {
      const parsedData = JSON.parse(data)
      this.dailyLimit = parsedData.dailyLimit
      this.caloriesConsumed = parsedData.caloriesConsumed
      this.caloriesSpent = parsedData.caloriesSpent
    }
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
    localStorage.setItem('dailyLimit', newLimit)
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

class MealsPanel {
  constructor(calorieTracker, updateUI) {
    this.meals = []
    this.mealsItems = document.querySelector('#meal-items')
    this.calorieTracker = calorieTracker
    this.updateUI = updateUI
  }

  addMeal(meal) {
    this.meals.push(meal)
    this.renderMeal(meal)
    this.saveMealsToLocalStorage()
  }

  removeMeal(meal) {
    const index = this.meals.indexOf(meal)
    if (index !== -1) {
      this.meals.splice(index, 1)
      meal.removeElement()
      this.calorieTracker.removeCaloriesConsumed(meal.calories) // Remover as calorias da refeição removida
      this.saveMealsToLocalStorage()
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
          <div class="fs-4 bg-primary text-white text-center rounded-2 px-2 px-sm-5">
            ${meal.calories} cal
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

  saveMealsToLocalStorage() {
    localStorage.setItem('meals', JSON.stringify(this.meals))
  }

  loadMealsFromLocalStorage() {
    const mealsData = localStorage.getItem('meals')
    if (mealsData) {
      const parsedData = JSON.parse(mealsData)
      this.meals = parsedData.map(meal => new Meal(meal.name, meal.calories))
      this.meals.forEach(meal => this.renderMeal(meal))
    }
  }

  clearMeals() {
    this.meals.forEach(meal => {
      meal.removeElement()
    })
    this.meals = []
    this.saveMealsToLocalStorage()
  }

  filterMeals(searchTerm) {
    this.meals.forEach(meal => {
      const mealItem = meal.element
      if (meal.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        mealItem.classList.remove('d-none');
      } else {
        mealItem.classList.add('d-none');
      }
    })
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

class WorkoutsPaneld {
  constructor(calorieTracker, updateUI) {
    this.workouts = []
    this.workoutsItems = document.querySelector('#workout-items')
    this.calorieTracker = calorieTracker
    this.updateUI = updateUI
  }

  addWorkout(workout) {
    this.workouts.push(workout)
    this.renderWorkout(workout)
    this.saveWorkoutsToLocalStorage()
  }

  removeWorkout(workout) {
    const index = this.workouts.indexOf(workout)
    if (index !== -1) {
      this.workouts.splice(index, 1)
      workout.removeElement()
      this.calorieTracker.removeCaloriesSpent(Number(workout.calories)) // Remover as calorias do treino feito
      this.updateUI()
      this.saveWorkoutsToLocalStorage()
    }
  }

  renderWorkout(workout) {
    const workoutItem = document.createElement('div')
    workoutItem.className = 'card my-2'
    workoutItem.innerHTML = `
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${workout.name}</h4>
          <div class="fs-4 bg-primary text-white text-center rounded-2 px-2 px-sm-5">
            ${workout.calories} cal
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

  saveWorkoutsToLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.workouts))
  }

  loadWorkoutsFromLocalStorage() {
    const workoutsData = localStorage.getItem('workouts')
    if (workoutsData) {
      const parsedData = JSON.parse(workoutsData)
      this.workouts = parsedData.map(workout => new Workout(workout.name, workout.calories))
      this.workouts.forEach(workout => this.renderWorkout(workout))
    }
  }

  clearWorkouts() {
    this.workouts.forEach(workout => {
      workout.removeElement()
    })
    this.workouts = []
    this.saveWorkoutsToLocalStorage()
  }

  filterWorkouts(searchTerm) {
    this.workouts.forEach(workout => {
      const workoutItem = workout.element
      if (workout.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        workoutItem.classList.remove('d-none');
      } else {
        workoutItem.classList.add('d-none');
      }
    })
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