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

    // Evento para resetar o dia
    // this.resetDayButton.addEventListener('click', () => {
    //   this.calorieTracker.resetDay()
    //   this.updateUI()
    // })
  }
}

class CalorieTracker {
  constructor(dailyLimit) {
    this.dailyLimit = 0
  }

  setDailyLimit(newLimit) {
    // Verificar se o limite informado é um número válido
    if (!isNaN(newLimit) && newLimit > 0) {
      this.dailyLimit = parseInt(newLimit)
      console.log('CalorieTracker método: setDailiLimit() funcionando')
      // this.updateUI.updateDailyLimit(newLimit)
    } else {
      console.log('Informe um limite diário válido!')
    }
  }
}

// Agora, preciso do updateUI para modificar o DOM com o limite novo. 
class InfoPanel {
  constructor() {
    this.dailyLimitElement = document.querySelector('#calories-limit')

  }

  updateDailyLimit(newLimit) {
    this.dailyLimitElement.textContent = newLimit
    console.log('updateDailyLimit do InfoPanel: ativo')
  }

  updateUI(dailyLimit, caloriesConsumed, caloriesSpent, totalCalories) {
    this.dailyLimitElement.textContent = dailyLimit

  }

}

const app = new App()
app.start()