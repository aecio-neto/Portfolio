const cityForm = document.querySelector('[data-js="change-location"]')
const cityNameContainer = document.querySelector('[data-js="city-name"]')
const cityWeather = document.querySelector('[data-js="city-weather"]')
const cityTemperature = document.querySelector('[data-js="city-temperature"]')
const cityCard = document.querySelector('[data-js="city-card"]')
let timeImg = document.querySelector('[data-js="time"]');
const timeIconContainer = document.querySelector('[data-js="time-icon"]');

const insertCityCard = () => {
  if(cityCard.classList.contains('d-none')) {
    cityCard.classList.remove('d-none')
  }
}

const diplayCityWeatherInfo = async cityName => {
  const [{ Key, LocalizedName }] = await getCityData(cityName)
  const [{ WeatherText, Temperature, IsDayTime, WeatherIcon }] = await getCityWeather(Key)
  const timeIcon = `<img src="./src/icons/${WeatherIcon}.svg" />`
  timeImg.src = IsDayTime ? './src/day.jpeg' : './src/noite.jpeg'
 
  timeIconContainer.innerHTML = timeIcon
  cityNameContainer.textContent = LocalizedName
  cityWeather.textContent = WeatherText
  cityTemperature.textContent = Temperature.Metric.Value
  insertCityCard()
}

const loadLocalStorageCity = () => {
  const city = localStorage.getItem('city')
  
  if (city) {
    diplayCityWeatherInfo(city)
  }
}

cityForm.addEventListener('submit', event => {
  event.preventDefault()
  const inputValue = event.target.city.value

  diplayCityWeatherInfo(inputValue)
  localStorage.setItem('city', inputValue)
  cityForm.reset()
})

loadLocalStorageCity()
