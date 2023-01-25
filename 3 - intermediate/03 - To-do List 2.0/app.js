const themeToggleBtn = document.querySelector('#theme-toggle-btn')
const themeToggleDarkIcon = document.querySelector('#theme-toggle-dark-icon')
const themeToggleLightIcon = document.querySelector('#theme-toggle-light-icon')
const todoInput = document.querySelector('#todoInput')
const form = document.querySelector('form');
const todosContainer = document.querySelector('#todosContainer');
const todoItems = document.querySelectorAll('li');

console.log(todoInput, form, todosContainer, todoItems)

let input = ''

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
  
  const checkLocalTheme = localStorage.getItem('color-theme')
  const darkModeOn = document.documentElement.classList.contains('dark')
  const lightModeOn = localStorage.getItem('color-theme') === 'light'

  if (checkLocalTheme) {
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

/* Passo a passo

a) Checar configurações navegador/OS e definir o tema - feito
b) Pegar o texto que o usuário irá digitar
-- let input armazena o texto após o submit - ok

c) Inserir no DOM o html com o texto/for/id - ok
  pegar referência da lista de itens
  modificar a estrutura do html +=
  é possível fazer um appendChild também.

d) mostrar o trash button X quando houver um hover na Li

e) deletar tarefas quando clicado no X

f) riscar o texto quando o input é marcado com checked

e) fazer as lis/tarefas inseridas serem interativas


*/

todoInput.addEventListener('input', event => {
  input = event.target.value
  
})

form.addEventListener('submit', event => {
  event.preventDefault()
  console.log(input)

  const todoItem = `
  <li>
    <div class="bg-white dark:bg-VeryDarkDesaturatedBlue h-16 pl-6 flex items-center border-b-LightGrayisBlue">
      <div class="p-[.04em] bg-gradient-to-r from-white to-white hover:from-[#8C9DFB] hover:to-[#BA63F1] rounded-full hover:cursor-pointer" id="checkbox-border-effect">
        <input class="rounded-full border-LightGrayishBlue dark:bg-VeryDarkDesaturatedBlue p-3 hover:cursor-pointer checked:bg-gradient-to-r from-[#8C9DFB] to-[#BA63F1]" type="checkbox" name="" id="${input}">
      </div>
      <label class="pt-2 ml-3 hover:cursor-pointer flex-grow dark:text-LightGrayishBlue" for="${input}">${input}</label>
      <img class="hover:cursor-pointer mx-2 hidden" src="images/icon-cross.svg" alt="">
    </div>
  </li>`

  todosContainer.innerHTML += todoItem

  form.reset()

})

// conseguir a referência das classes para remover o hidden do trash icon.

todoItems.forEach(li =>{
  li.addEventListener('mouseover', e => {
    console.log(li.childNodes)
  })
})

checkLocalStorageTheme()



