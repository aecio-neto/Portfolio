// interessante a separação dos arquivos e suas funcionalidades
// weather ficou com os requests e objetos obtidos 
// app.js ficou com a manipulação do DOM

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

const fetchCityWeatherInfo = async cityName => {
  const [{ Key, LocalizedName }] = await getCityData(cityName)       // func declarada no weather.js
  const [{WeatherText, Temperature, IsDayTime, WeatherIcon} ] = await getCityWeather(Key)
  return { LocalizedName, WeatherText, Temperature, IsDayTime, WeatherIcon }
}

const diplayCityWeatherInfo = async cityName => {
  const { LocalizedName, WeatherText, Temperature, IsDayTime, WeatherIcon } =
    await fetchCityWeatherInfo(cityName)
  
  console.log(Temperature)
  
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
  const inputValue = event.target.city.value  // city vem do input/html

  diplayCityWeatherInfo(inputValue)
  localStorage.setItem('city', inputValue)
  cityForm.reset()
})

loadLocalStorageCity()
