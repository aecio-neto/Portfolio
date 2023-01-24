const themeToggleBtn = document.querySelector('#theme-toggle-btn')
const themeToggleDarkIcon = document.querySelector('#theme-toggle-dark-icon')
const themeToggleLightIcon = document.querySelector('#theme-toggle-light-icon')

// Checar configurações navegador/OS

const checkLocalStorageTheme = () => {
  const isDarkModeOn = localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)

  if (isDarkModeOn) {
    themeToggleLightIcon.classList.remove('hidden');
  } else {
    themeToggleDarkIcon.classList.remove('hidden');
  }
}

themeToggleBtn.addEventListener('click', () => {
  themeToggleDarkIcon.classList.toggle('hidden')
  themeToggleLightIcon.classList.toggle('hidden')
  
  const darkModeOn = document.documentElement.classList.contains('dark')
  const lightModeOn = localStorage.getItem('color-theme') === 'light'

  if (localStorage.getItem('color-theme')) {
      if (lightModeOn) {
          document.documentElement.classList.add('dark')
          localStorage.setItem('color-theme', 'dark')
      } else {
          document.documentElement.classList.remove('dark')
          localStorage.setItem('color-theme', 'light')
      }

  } else {
      if (darkModeOn) {
          document.documentElement.classList.remove('dark')
          localStorage.setItem('color-theme', 'light')
      } else {
          document.documentElement.classList.add('dark')
          localStorage.setItem('color-theme', 'dark')
      }
  }
    
})

checkLocalStorageTheme()




