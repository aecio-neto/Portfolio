/* 
Minha sensação é que foi criado um código muito grande. Com várias integrações entre si. 
As coisas parecem fazer sentido. Mas ainda me sinto perdido. 

Minha principal dúvida é como as classes e componentes da página interagem entre si. O código inicial gerado por aí me da a oportunidade de estudar como isso acontece. 

*/


// Esse app cria os objetos e inicializa os métodos através do start()
// No final do código é criado um objeto App e ele invoca o método.  
class App {
  constructor() {
    this.calorieTracker = new CalorieTracker();
    // this.mealPanel = new MealPanel();
    // this.exercisePanel = new ExercisePanel();
    // this.searchBar = new SearchBar();
    // this.localStorageManager = new LocalStorageManager();
  }

  start() {
    // this.loadSavedData();
    this.setupEventListeners();
  }

  loadSavedData() {
    // Carregar dados salvos do localStorage
    // const savedData = this.localStorageManager.loadData();

    // Atualizar as informações do CalorieTracker, MealPanel e ExercisePanel com os dados carregados
    this.calorieTracker.setDailyLimit(savedData.dailyLimit);
    // this.mealPanel.loadMeals(savedData.meals);
    // this.exercisePanel.loadExercises(savedData.exercises);
  }

  setupEventListeners() {
    // Configurar os event listeners para interagir com os componentes da interface
    this.setDailyLimitButton = document.querySelector('[data-bs-target="#limit-modal"]');
    // Evento para definir o limite diário de calorias
    this.calorieTracker.setDailyLimitButton.addEventListener('click', () => {
      const newLimit = prompt('Informe o novo limite diário de calorias:');
      this.calorieTracker.setDailyLimit(newLimit);
      this.updateUI();
    });

    // Evento para adicionar uma refeição
    // this.mealPanel.addMealButton.addEventListener('click', () => {
    //   const mealName = prompt('Informe o nome da refeição:');
    //   const calories = prompt('Informe as calorias consumidas:');
    //   this.mealPanel.addMeal(mealName, calories);
    //   this.updateUI();
    // });

    // Evento para adicionar um exercício
    // this.exercisePanel.addExerciseButton.addEventListener('click', () => {
    //   const exerciseName = prompt('Informe o nome do exercício:');
    //   const duration = prompt('Informe a duração em minutos:');
    //   const caloriesSpent = prompt('Informe as calorias gastas:');
    //   this.exercisePanel.addExercise(exerciseName, duration, caloriesSpent);
    //   this.updateUI();
    // });

    // Evento para realizar uma busca
    // this.searchBar.searchButton.addEventListener('click', () => {
    //   const query = this.searchBar.getSearchQuery();
    //   const searchResults = this.searchBar.search(query);
    //   // Atualizar a interface com os resultados da busca
    //   // ...
    // });

    // Evento para resetar o dia
    this.resetDayButton.addEventListener('click', () => {
      this.calorieTracker.resetDay();
      // this.mealPanel.resetMeals();
      // this.exercisePanel.resetExercises();
      this.updateUI();
    });
  }

  updateUI() {
    // Atualizar a interface do usuário com as informações mais recentes
    // ...
  }
}

// mas como são tratados os dados para essa aplicação? 
class CalorieTracker {
  constructor() {
    this.dailyLimit = 0;
    this.caloriesConsumed = 0;
    this.caloriesSpent = 0;
  }

  setDailyLimit(limit) {
    // Verificar se o limite informado é um número válido
    if (!isNaN(limit) && limit > 0) {
      this.dailyLimit = parseInt(limit);
    } else {
      console.log('Informe um limite diário válido!');
    }
  }

  resetDay() {
    this.caloriesConsumed = 0;
    this.caloriesSpent = 0;
  }

  addCaloriesConsumed(calories) {
    // Verificar se as calorias informadas são um número válido
    if (!isNaN(calories) && calories > 0) {
      this.caloriesConsumed += parseInt(calories);
    } else {
      console.log('Informe um valor de calorias válido!');
    }
  }

  addCaloriesSpent(calories) {
    // Verificar se as calorias informadas são um número válido
    if (!isNaN(calories) && calories > 0) {
      this.caloriesSpent += parseInt(calories);
    } else {
      console.log('Informe um valor de calorias válido!');
    }
  }

  getTotalCaloriesRemaining() {
    return this.dailyLimit + this.caloriesSpent - this.caloriesConsumed;
  }
}

// no click do botão, a calorie tracker será atualizada. 
// na calorie tracker, a update UI será atualizada. 
// na calorie tracker, o localStorage será atualizado

class Button {
  constructor(selector, onClick) {
    this.element = document.querySelector(selector);
    this.element.addEventListener('click', onClick);
  }

  setText(text) {
    this.element.textContent = text;
  }

  setDisabled(disabled) {
    this.element.disabled = disabled;
  }
}

const limitButton = new Button('.btn-outline-light.mx-3', () => {
  // Lógica a ser executada quando o botão "Defina Limite Diário" for clicado
  // Pode ser um código para exibir um modal ou fazer outra ação relacionada ao limite diário
});

const resetButton = new Button('#reset', () => {
  // Lógica a ser executada quando o botão "Resetar Dia" for clicado
  // Pode ser um código para reiniciar as informações do dia (calorias consumidas, calorias gastas, etc.)
});


class InfoPanel {
  constructor() {
    this.dailyLimitElement = document.getElementById('daily-limit');
    this.caloriesConsumedElement = document.getElementById('calories-consumed');
    this.caloriesSpentElement = document.getElementById('calories-spent');
    this.totalCaloriesElement = document.getElementById('total-calories');
  }

  updateUI(dailyLimit, caloriesConsumed, caloriesSpent, totalCalories) {
    this.dailyLimitElement.textContent = dailyLimit;
    this.caloriesConsumedElement.textContent = caloriesConsumed;
    this.caloriesSpentElement.textContent = caloriesSpent;
    this.totalCaloriesElement.textContent = totalCalories;
  }
}

// Essa classe não faz sentido dentro do html que tenho. 
/* class MealPanel {
  constructor() {
    this.meals = [];
    this.mealListElement = document.getElementById('meal-list');
    this.addMealButton = new Button('#add-meal', this.addMeal.bind(this));
  }

  addMeal() {
    const mealName = prompt('Digite o nome da refeição:');
    const mealCalories = prompt('Digite a quantidade de calorias da refeição:');

    if (mealName && mealCalories) {
      const meal = new Meal(mealName, parseInt(mealCalories));
      this.meals.push(meal);
      this.renderMeals();
    }
  }

  renderMeals() {
    this.mealListElement.innerHTML = '';

    for (const meal of this.meals) {
      const mealElement = document.createElement('li');
      mealElement.textContent = `${meal.name} - ${meal.calories} cal`;

      this.mealListElement.appendChild(mealElement);
    }
  }
} */

/* class Meal {
  constructor(name, calories) {
    this.name = name;
    this.calories = calories;
  }
}

class SearchBar {
  constructor() {
    this.inputElement = document.getElementById('search-input');
    this.searchButton = new Button('#search-button', this.search.bind(this));
  }

  search() {
    const searchTerm = this.inputElement.value;
    // Lógica para realizar a pesquisa com o termo digitado
    // Pode ser um código para filtrar as refeições ou exercícios com base no termo
  }
} */

class LocalStorageManager {
  static saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static loadData(key) {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  }

  static removeData(key) {
    localStorage.removeItem(key);
  }
}

class UpdateUI {
  static updateInfoPanel(dailyLimit, consumedCalories, spentCalories) {
    const limitElement = document.getElementById('daily-limit');
    const consumedElement = document.getElementById('consumed-calories');
    const spentElement = document.getElementById('spent-calories');

    limitElement.textContent = `Limite Diário: ${dailyLimit} cal`;
    consumedElement.textContent = `Calorias Consumidas: ${consumedCalories} cal`;
    spentElement.textContent = `Calorias Gastas: ${spentCalories} cal`;
  }

  static updateTotalCalories(totalCalories) {
    const totalElement = document.getElementById('total-calories');
    totalElement.textContent = `Total de Calorias: ${totalCalories} cal`;
  }

  // static updateMealPanel(meals) {
  //   const mealListElement = document.getElementById('meal-list');
  //   mealListElement.innerHTML = '';

  //   for (const meal of meals) {
  //     const mealElement = document.createElement('li');
  //     mealElement.textContent = `${meal.name} - ${meal.calories} cal`;
  //     mealListElement.appendChild(mealElement);
  //   }
  // }

  // static updateExercisePanel(exercises) {
  //   const exerciseListElement = document.getElementById('exercise-list');
  //   exerciseListElement.innerHTML = '';

  //   for (const exercise of exercises) {
  //     const exerciseElement = document.createElement('li');
  //     exerciseElement.textContent = `${exercise.name} - ${exercise.calories} cal`;
  //     exerciseListElement.appendChild(exerciseElement);
  //   }
  // }
}



// Iniciar a aplicação
const app = new App();
app.start();
