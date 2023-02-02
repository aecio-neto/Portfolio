/* Passo a passo

a) Checar configurações navegador/OS e definir o tema - feito
b) Pegar o texto que o usuário irá digitar
-- let input armazena o texto após o submit - ok

c) Inserir no DOM o html com o texto/for/id - ok
pegar referência da lista de itens
modificar a estrutura do html +=
é possível fazer um appendChild também.
d) mostrar o trash button X quando houver um hover na Li - Ok
e) deletar tarefas quando clicado no X - Ok
f) fazer as lis/tarefas inseridas serem interativas - ok
g) riscar o texto quando o input é marcado com checked - ok
h) escrever quantas tarefas existem - ok
i) filtrar tarefas feitas - ok
j) filtrar tarefas a fazer
l) limpar tarefas completadas
m) mostrar todas as tarefas

y) Bugs encontrados: X na versão mobile

z) refatorar código

*/


const themeToggleBtn = document.querySelector('#theme-toggle-btn')
const themeToggleDarkIcon = document.querySelector('#theme-toggle-dark-icon')
const themeToggleLightIcon = document.querySelector('#theme-toggle-light-icon')

const todoInput = document.querySelector('#todoInput')
const form = document.querySelector('form')
const todosContainer = document.querySelector('#todosContainer')
const counter = document.querySelector('#counter')
const completedBtn = document.querySelectorAll('.completedBtn')
const uncompletedBtn = document.querySelectorAll('.uncompletedBtn')


const checkLocalStorageTheme = () => {
  const isDarkModeOn = localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)

  if (isDarkModeOn) {
    themeToggleLightIcon.classList.remove('hidden')
  } else {
    themeToggleDarkIcon.classList.remove('hidden')
  }
}

const changeThemeColor = () => {
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
}

const countTodos = () => {
  const todosInList = todosContainer.getElementsByTagName('li').length
  const checkedTodos = todosContainer.querySelectorAll('input[type="checkbox"]:checked').length
  const todosLeft = todosInList - checkedTodos

  todosLeft === 0 
    ? counter.textContent = `Tarefas concluídas` 
    : counter.textContent = `Faltam ${todosLeft} tarefas`
}

const createTodoItem = () => {

  let input = ''
  
  todoInput.addEventListener('input', event => {
    input = event.target.value    
  })
  
  form.addEventListener('submit', event => {
    event.preventDefault()
    
    const newLi = document.createElement("li")
    newLi.className = "dark:bg-VeryDarkDesaturatedBlue h-16 pl-6 flex items-center border-b-LightGrayisBlue listItem";
    
    const newInput = document.createElement("input")
    newInput.className = "peer rounded-full border-LightGrayishBlue dark:bg-VeryDarkDesaturatedBlue p-3 hover:cursor-pointer checked:bg-gradient-to-r from-[#8C9DFB] to-[#BA63F1]"
    newInput.type = "checkbox"
    newInput.name = input
    
    const newLabel = document.createElement("label")
    newLabel.className = "peer-checked:line-through pt-2 ml-3 hover:cursor-pointer flex-grow dark:text-LightGrayishBlue"
    newLabel.textContent = input
    
    const newImg = document.createElement("img")
    newImg.className = "hover:cursor-pointer mx-[15px] trashIcon hidden sm:visible"
    newImg.src = "images/icon-cross.svg"
    newImg.alt = ""
    
    newLi.appendChild(newInput)
    newLi.appendChild(newLabel)
    newLi.appendChild(newImg)
    todosContainer.appendChild(newLi)
    
    newLi.addEventListener("mouseover", () => {
      newImg.classList.remove("hidden")
    })
    newLi.addEventListener("mouseout", () => {
      newImg.classList.add("hidden")
    })
    
    countTodos()
    form.reset()
  })
}

const removeTodoItem = () => {
  todosContainer.addEventListener('click', event => {
    const clickedElement = event.target
    if (clickedElement.tagName === 'IMG') {
      clickedElement.parentElement.remove()
    }
    countTodos()
  })
}

const filterCompletedTodos = () => {
  completedBtn.forEach(link => {
    link.addEventListener('click', () => {
      const allTodos = Array.from(todosContainer.getElementsByTagName('li'))
      const checkedTodos = Array.from(todosContainer.querySelectorAll('input[type="checkbox"]:checked'))
      
        allTodos.forEach(todo => {
          todo.classList.toggle('hidden')
        })

      checkedTodos.forEach(checked => {
        checked.parentElement.classList.toggle('hidden')
      })
    })
  })
}

const filterUndoneTodos = () => {
  uncompletedBtn.forEach(link => {
    link.addEventListener('click', () => {
      const checkedTodos = Array.from(todosContainer.querySelectorAll('input[type="checkbox"]:checked'))
      
      checkedTodos.forEach(checked => {
        checked.parentElement.classList.toggle('hidden')
      })
    })
  })
}

const allTodosBtn = document.querySelectorAll('.allTodosBtn');

const displayAllTodos = () => {
  allTodosBtn.forEach(link => {
    link.addEventListener('click', () => {
      const allTodos = Array.from(todosContainer.getElementsByTagName('li'))

      allTodos.forEach(li => {
        li.classList.toggle('hidden')
      })
    })
  })
}

checkLocalStorageTheme()
changeThemeColor()
countTodos()
createTodoItem()
removeTodoItem()
filterCompletedTodos()
filterUndoneTodos()


