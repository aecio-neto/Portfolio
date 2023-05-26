/* O que preciso fazer? 
- adicionar refeições
-- alterar as calorias das classes (calorieTracker)
*/

// Da início à execução do programa, define os listeners, integra as classes/métodos
class App {
  constructor() {
    this.calorieTracker = new CalorieTracker()
    this.infoPanel = new InfoPanel()
    this.mealPanel = new MealPanel()
  }
  
  start() {
    console.log('comecei do zero')
    this.setupEventListeners()
    this.caloriesConsumeTest()
    this.updateUI()
  }

  caloriesConsumeTest() {
    this.calorieTracker.addCaloriesConsumed(400)
    this.calorieTracker.addCaloriesSpent(0)
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
      console.log(newLimit)
      this.calorieTracker.setDailyLimit(newLimit)
      this.infoPanel.updateDailyLimit(newLimit)
      this.updateUI()
    })

    // Reseta o balanço de calorias diário
    this.resetDayButton = document.querySelector('#reset')
    this.resetDayButton.addEventListener('click', () => {
      this.calorieTracker.resetDay()
      console.log('resetDayButton pressionado')
      this.updateUI()
    })

    // Atualiza as calorias com base nas meals inseridas
    const addMealform = document.querySelector('#meal-form')
    addMealform.addEventListener('submit', e => {
      e.preventDefault()

      const mealName = document.querySelector('#meal-name').value
      const mealCalories = document.querySelector('#meal-calories').value
      console.log(mealName, mealCalories)

      if (mealName && mealCalories) {
        const meal = new Meal(mealName, mealCalories)
        this.mealPanel.addMeal(meal)
        this.calorieTracker.addCaloriesConsumed(mealCalories)
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
      console.log('CalorieTracker método: setDailiLimit() funcionando')
    } else {
      console.log('Informe um limite diário válido!')
    }
  }

  resetDay() {
    this.caloriesConsumed = 0
    this.caloriesSpent = 0
    console.log('resetDay CalorieTracker: disparado')
  }


  addCaloriesConsumed(calories) {
    if (!isNaN(calories) && calories > 0) {
      this.caloriesConsumed += parseInt(calories)
    } else {
      console.log('Informe um valor de calorias válido!')
    }
  }

  addCaloriesSpent(calories) {
    if (!isNaN(calories) && calories > 0) {
      this.caloriesSpent += parseInt(calories)
    } else {
      console.log('Informe um valor de calorias válido!')
    }
  }

  removeCaloriesConsumed(calories) {
    if (!isNaN(calories) && calories > 0) {
      this.caloriesConsumed -= parseInt(calories)
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
    console.log('updateDailyLimit do InfoPanel: ativo')
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

// Preciso inserir as refeições
// Isso é feito através do clique em um botão. 
// As refeições possuem Nome e Calorias
// As refeições são adicionadas ao painel de refeições
// As calorias afetam a CalorieTracker. (O infoPanel já está ligado à calorieTracker)
// Após a inserção ou remoção o painel precisa ser atualizado. 

// as refeições esão sendo inseridas
// calorias contabilizadas (adição)
// a adição das calorias ocorre no calorieTracker
// quero que o render fique em MealPanel
// quero que as calorias sejam contabilizadas na App
// O que mudar?

class MealPanel {
  constructor() {
    this.meals = []
    this.mealsItems = document.querySelector('#meal-items')
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
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    `
    this.mealsItems.appendChild(mealItem)

    const deleteButton = mealItem.querySelector('.delete')
    deleteButton.addEventListener('click', () => {
      this.removeMeal(meal)
    })

    meal.setElement(mealItem)
  }

  // updateTotalCalories() {
  //   let totalCalories = 0
  //   for (const meal of this.meals) {
  //     totalCalories += meal.calories
  //   }
  //   this.updateTotalCaloriesUI(totalCalories)
  // }

  // updateTotalCaloriesUI(totalCalories) {
  //   const totalCaloriesEl = document.querySelector('#total-calories')
  //   totalCaloriesEl.textContent = totalCalories
  // }
}

class Meal {
  constructor(name, calories) {
    this.name = name
    this.calories = calories
    this.element = null
    this.calorieTracker = new CalorieTracker()
  }

  setElement(element) {
    this.element = element
  }

  removeElement() {
    this.element.remove();
  }
}



const app = new App()
app.start()