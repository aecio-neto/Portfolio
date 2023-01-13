const alert = document.querySelector('[data-js="alert-container"]')
const currencyOneEl = document.querySelector('[data-js="currency-one"]')
const currencyTwoEl = document.querySelector('[data-js="currency-two"]')
const currenciesEl = document.querySelector('[data-js="alert-container"]')
const convertedValueEl = document.querySelector('[data-js="converted-value"]')
const valuePrecisionEl = document.querySelector('[data-js="conversion-precision"]')
const timesCurrencyOneEl = document.querySelector('[data-js="currency-one-times"]')


const showAlert = err => {
  const div = document.createElement('div')
  const button = document.createElement('button')

  div.textContent = err.message
  div.classList.add('alert', 'alert-warning', 'alert-dismissible', 'fade', 'show')
  div.setAttribute('role', 'alert')
  button.classList.add('btn-close')
  button.setAttribute('type', 'button')
  button.setAttribute('aria-label', 'Close')

  button.addEventListener('click', () => {
    div.remove()
  })

  div.appendChild(button)
  currenciesEl.insertAdjacentElement('afterend', div)
}

const state = (() => {
  let exchangeRate = {}
  return {
    getExchangeRate: () => exchangeRate,
    setExchangeRate: newExchangeRate => {
      if (!newExchangeRate.conversion_rates) {
        showAlert({message: 'O objeto precisa ter uma propriedade convertion_rates'})
        return
      }

      exchangeRate = newExchangeRate
      return exchangeRate
    }
  }
})()

const APIKey = '1ceabc3c2ac4104c9fbefa37'
const exchangesCodesURL = `https://v6.exchangerate-api.com/v6/${APIKey}/codes`
const getUrl = currency => `https://v6.exchangerate-api.com/v6/${APIKey}/latest/${currency}/`

const getErrorMessage = errorType => ({
  'unsupported-code': 'A moeda não existe em nosso banco de dados.',
  'malformed-request"': 'Request fora do padrão suportado. Verifique a documentação',
  'invalid-key': 'A chave da API não é válida.',
  'inactive-account': 'Endereço de e-mail não foi confirmado.',
  'quota-reached': 'Sua conta atingiu o número de solicitações permitidas pelo seu plano.'

})[errorType] || 'Não foi possível obter as informações'

const fetchExchangeRate = async url => {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Sua conexão falhou. Não foi possível obter as informações')
    }
    
    const exchangeRateData = await response.json()

    if (exchangeRateData.result === 'error') {
      throw new Error(getErrorMessage(exchangeRateData['error-type']))
    }    

    return exchangeRateData 
  } catch (err) {
    showAlert(err)
  } 
}

const getOptions = (selectedCurrency, conversion_rates) => {
  const setSelectedAttribute = currency => 
    currency === selectedCurrency ? 'selected' : ''

  return Object.keys(conversion_rates)
    .map(currency => `<option ${setSelectedAttribute(currency)}>${currency}</option>`)
    .join('')
}

loadInitialInfo = ({ conversion_rates }) => {
  currencyOneEl.innerHTML = getOptions('USD', conversion_rates)
  currencyTwoEl.innerHTML = getOptions('BRL', conversion_rates)
  convertedValueEl.textContent = conversion_rates.BRL.toFixed(2)
  valuePrecisionEl.textContent = `1 USD = ${conversion_rates.BRL.toFixed(2)} BRL`
}

const init = async () => {
  const url = getUrl('USD')
  const exchangeRateFromAPI = fetchExchangeRate(url)
  const exchangeRate = state.setExchangeRate(await exchangeRateFromAPI)

  if (exchangeRate && exchangeRate.conversion_rates) {
    loadInitialInfo(exchangeRate)
  }
}

const getMultipliedExchangeRate = conversion_rates => {
  const currencyTwo = conversion_rates[currencyTwoEl.value]
  return (timesCurrencyOneEl.value * currencyTwo).toFixed(2)
}

showUpdatedRates = ({ conversion_rates }) => {
  convertedValueEl.textContent = (timesCurrencyOneEl.value * conversion_rates[currencyTwoEl.value]).toFixed(2)
  valuePrecisionEl.textContent = 
    `1 ${currencyOneEl.value} = ${1 * conversion_rates[currencyTwoEl.value].toFixed(2)} ${currencyTwoEl.value}`
}

timesCurrencyOneEl.addEventListener('input', e => {
  const { conversion_rates } = state.getExchangeRate()
  convertedValueEl.textContent = getMultipliedExchangeRate(conversion_rates)
})

currencyTwoEl.addEventListener('input', () => {
  const exchangeRate = state.getExchangeRate()
  showUpdatedRates(exchangeRate)
})

currencyOneEl.addEventListener('input', async e => {
  const url = getUrl(e.target.value)
  const newExchangeRate = await fetchExchangeRate(url)
  const exchangeRate = state.setExchangeRate(newExchangeRate)

  showUpdatedRates(exchangeRate)
})

init()
