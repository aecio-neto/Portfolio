/* O que preciso fazer? 
- Definir o limite diário - ok
- Restar o dia

- setDailyLimit()
- resetDay
-- Será um método de qual classe? CalorieTracker? UdtateUI? InfoPanel?

*/

// Da início à execução do programa, define os listeners, integra as classes/métodos
class App {
  constructor() {
    this.calorieTracker = new CalorieTracker()
    this.infoPanel = new InfoPanel()
  }

  start() {
    console.log('comecei do zero')
    this.setupEventListeners()
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
    })

    // Reseta o balanço de calorias diário
    this.resetDayButton = document.querySelector('#reset')
    this.resetDayButton.addEventListener('click', () => {
      this.calorieTracker.resetDay()
      console.log('resetDayButton pressionado')
      this.infoPanel.updateUI(
        this.calorieTracker.caloriesConsumed,
        this.calorieTracker.caloriesSpent)
    })
  }
}

class CalorieTracker {
  constructor(dailyLimit, caloriesConsumed, caloriesSpent) {
    this.dailyLimit = 0
    this.caloriesConsumed = 0
    this.caloriesSpent = 0
  }

  setDailyLimit(newLimit) {
    // Verificar se o limite informado é um número válido
    if (!isNaN(newLimit) && newLimit > 0) {
      this.dailyLimit = parseInt(newLimit)
      console.log('CalorieTracker método: setDailiLimit() funcionando')
      this.updateUI.updateDailyLimit(newLimit)
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
}

// Agora, preciso do updateUI para modificar o DOM com o limite novo. 
class InfoPanel {
  constructor() {
    this.dailyLimitElement = document.querySelector('#calories-limit')
    this.caloriesConsumedElement = document.querySelector('#calories-consumed')
    this.caloriesSpentElement = document.querySelector('#calories-spent')
    this.totalCaloriesElement = document.querySelector('#total-calories')
  }

  updateUI(caloriesConsumed, caloriesSpent) {
    this.caloriesConsumedElement.textContent = caloriesConsumed
    this.caloriesSpentElement.textContent = caloriesSpent
    // this.totalCaloriesElement.textContent = totalCalories
  }

  updateDailyLimit(newLimit) {
    this.dailyLimitElement.textContent = newLimit
    console.log('updateDailyLimit do InfoPanel: ativo')
  }

}

const app = new App()
app.start()