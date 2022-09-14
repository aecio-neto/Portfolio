const includeTodoInList = document.querySelector('.form-add-todo');
const searchTodo = document.querySelector('.form-control')
const todosContainer = document.querySelector('.todos-container')

const createTodoItem = (todoItemText) => {
  if (todoItemText.length != 0) {
    todosContainer.innerHTML += 
    `<li class="list-group-item d-flex justify-content-between align-items-center" data-todo="${todoItemText}">
      <span>${todoItemText}</span>
      <i class="far fa-trash-alt delete" data-trash="${todoItemText}"></i>
    </li>`
  }
}

const removeTodo = (clickedElement) => {
  const trashDataValue = clickedElement.dataset.trash
  const todo = document.querySelector(`[data-todo="${clickedElement.dataset.trash}"]`)
    
  if (trashDataValue) {
    todo.remove()
  }
}

searchTodo.addEventListener('input', event => {
  const inputSearchValue = event.target.value.trim().toLowerCase()
  const matchedInputs = item => item.textContent.toLowerCase().includes(inputSearchValue)
  const notMatchedInputs = item => !item.textContent.toLowerCase().includes(inputSearchValue)

  const hideTodos = todo => {
    todo.classList.add('d-none')
    todo.classList.remove('d-flex')
  }
  
  const displayTodos = todo => {
    todo.classList.add('d-flex')
    todo.classList.remove('d-none')
  }

  Array.from(todosContainer.children).filter(matchedInputs).forEach(displayTodos)
  Array.from(todosContainer.children).filter(notMatchedInputs).forEach(hideTodos)
})

todosContainer.addEventListener('click', event => {
    const clickedElement = event.target
    removeTodo(clickedElement)
})

includeTodoInList.addEventListener('submit', event => {
  const todoItemText = event.target.add.value.trim()
  event.preventDefault()

  createTodoItem(todoItemText)
  event.target.reset()
})

