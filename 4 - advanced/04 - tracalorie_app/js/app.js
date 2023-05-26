/* O que preciso fazer? 
- Definir o limite diário - ok
- Restar o dia

- setDailyLimit() - ok
- resetDay - ok
- getTotalCalories()
*/

// Da início à execução do programa, define os listeners, integra as classes/métodos
class App {
  constructor() {
    this.calorieTracker = new CalorieTracker()
    this.infoPanel = new InfoPanel()
  }

  start() {
    console.log('comecei do zero')
    this.caloriesConsumeTest()
    this.updateUI()
    this.setupEventListeners()
  }

  caloriesConsumeTest() {
    this.calorieTracker.addCaloriesConsumed(2100)
    this.calorieTracker.addCaloriesSpent(0)
  }

  updateUI() {
    this.infoPanel.updateUI(this.calorieTracker.dailyLimit, this.calorieTracker.caloriesConsumed, this.calorieTracker.caloriesSpent)
    this.infoPanel.updateProgressBar(this.calorieTracker.dailyLimit, this.calorieTracker.caloriesConsumed, this.calorieTracker.caloriesSpent)
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
  }
}

class CalorieTracker {
  constructor(dailyLimit, caloriesConsumed, caloriesSpent) {
    this.dailyLimit = 2000 //match o html, isso muda com o localStorage
    this.caloriesConsumed = 0
    this.caloriesSpent = 0
  }

  setDailyLimit(newLimit) {
    // Verificar se o limite informado é um número válido
    if (!isNaN(newLimit) && newLimit > 0) {
      this.dailyLimit = parseInt(newLimit)
      console.log('CalorieTracker método: setDailiLimit() funcionando')
    } else {
      console.log('Informe um limite diário válido!')
    }
  }

  // vai zerar as consumidas e queimadas. 
  resetDay() {
    this.caloriesConsumed = 0
    this.caloriesSpent = 0
    console.log('resetDay CalorieTracker: disparado')
  }


  addCaloriesConsumed(calories) {
    // Verificar se as calorias informadas são um número válido
    if (!isNaN(calories) && calories > 0) {
      this.caloriesConsumed += parseInt(calories)
    } else {
      console.log('Informe um valor de calorias válido!')
    }
  }

  addCaloriesSpent(calories) {
    // Verificar se as calorias informadas são um número válido
    if (!isNaN(calories) && calories > 0) {
      this.caloriesSpent += parseInt(calories)
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

// Agora, preciso do updateUI para modificar o DOM com o limite novo. 
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
    this.totalCaloriesEl.textContent = this.caloriesBalance(caloriesConsumed, caloriesSpent)
    this.caloriesRemainingEl.textContent = this.getCaloriesRemaining(dailyLimit, caloriesConsumed, caloriesSpent)
  }

  caloriesBalance(caloriesConsumed, caloriesSpent) {
    return caloriesConsumed - caloriesSpent
  }

  getCaloriesRemaining(dailyLimit, caloriesConsumed, caloriesSpent) {
    return dailyLimit + caloriesSpent - caloriesConsumed
  }

  updateDailyLimit(newLimit) {
    this.dailyLimitEl.textContent = newLimit
    console.log('updateDailyLimit do InfoPanel: ativo')
  }

  updateProgressBar(dailyLimit, caloriesConsumed, caloriesSpent) {
    const totalCalories = dailyLimit + caloriesSpent
    const remainingCalories = totalCalories - caloriesConsumed
    const percentage = ((totalCalories - remainingCalories) / totalCalories) * 100;
    this.progressBar.style.width = `${percentage}%`;
    this.progressBar.classList.toggle('bg-danger', remainingCalories < 0)
    this.progressBar.classList.toggle('bg-success', remainingCalories >= 0)
    this.caloriesRemainingEl.parentElement.classList.toggle('bg-danger', remainingCalories < 0)
    this.caloriesRemainingEl.parentElement.classList.toggle('bg-success', remainingCalories >= 0)
  }

}

const app = new App()
app.start()