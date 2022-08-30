const form = document.querySelector('form');
const scoreMessageContainer = document.querySelector('#scoreMessage')
const ExtraInfoElements = document.querySelectorAll('.moreInfo');
const submitButton = document.querySelector('#submitButton');
const userSubmitAlert = document.querySelector('.userSubmitAlert');

const correctAnswers = ['C', 'C','B', 'D','E']

let score = 0

const getUserAnswers = () => {
  let userAnswers = []
  correctAnswers.forEach((_, index) => {
    const userAnswer = form[`inputQuestion${index + 1}`].value
    userAnswers.push(userAnswer)
  })
  
  return userAnswers
}

const calculateUserScore = userAnswers => {
  userAnswers.forEach((userAnswer, index) => {
    const isAnswerCorrect = userAnswer === correctAnswers[index]
    if (isAnswerCorrect) {
      score += 20;
    }
  })
}

const showFinalResult = () => {
  scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })

  const message = `Você acertou ${score / 20}/5 pergunta(s) | ${score}% de aproveitamento.`
  scoreMessageContainer.textContent = message
  scoreMessageContainer.classList.remove('d-none')
}

const addExtraInfoElements = () => {
  ExtraInfoElements.forEach(item => { item.classList.remove('d-none')})
}

form.addEventListener('submit', event => {
  event.preventDefault();

  const userAnswers = getUserAnswers()

  // avisa o usuário que é preciso responder todas as perguntas
  // como seria a refatoração dessa parte? const validateForm()
  const questionsNotAnswered = userAnswers.includes('')
   if(questionsNotAnswered) {
    userSubmitAlert.classList.remove('d-none')
    return
  }

  calculateUserScore(userAnswers)

  showFinalResult()

  addExtraInfoElements()
})
