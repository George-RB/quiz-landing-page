const quizData = [
  {
    question: 'Какие виды тестов вам нравятся?',
    description:
      'Многие из нас хоть раз попадались на эту удочку — хочешь пройти всего один тест из интернета, и вдруг понимаешь, что пролетела полдня.',
    options: [
      'На темперамент',
      'Кто я из Марвел',
      'Увидел это',
      'Тотемное животное',
      'На IQ',
      'Словарный запас',
    ],
    type: 'checkbox',
  },
  {
    question: 'Вы любите проходить тесты?',
    description: 'Нам важно узнать насолько часто Вы проходите тесты.',
    options: [
      'Нет, я не никогда не прохожу тесты',
      'Да, я прохожу все тесты',
      'Заставляю себя проходить тесты',
      'Не люблю проходить тесты, но иногда приходится',
    ],
    type: 'radio',
  },
];

let currentStep = 0;

// Функция обновления сайдбара (теперь она ищет элементы внутри документа каждый раз)
function updateSidebar() {
  const sidebarResults = document.getElementById('sidebarResults');
  const checked = document.querySelectorAll('.quiz-options__checkbox:checked');

  if (!sidebarResults) return;

  if (checked.length === 0) {
    sidebarResults.innerHTML =
      '<span class="sidebar-info__placeholder">Выберите варианты...</span>';
    return;
  }

  const selectedValues = Array.from(checked).map((cb) => cb.value);
  sidebarResults.textContent = selectedValues.join('. ') + '.';

  sidebarResults.style.opacity = '0.5';
  setTimeout(() => {
    sidebarResults.style.opacity = '1';
  }, 100);
}

// Главная функция рендера
function renderStep(index) {
  const container = document.getElementById('quizDynamicContent');
  if (!container) return;

  const data = quizData[index];

  if (!data) {
    container.innerHTML = `
      <div class="quiz-final">
        <img src="assets/img/like.png" alt="Smile" style="margin-bottom: 20px; max-width: 180px;" />
        <h2 class="quiz-step__question">Спасибо за ответы!</h2>
        <p class="quiz-step__description">Выберите вариант и напишите свое мнение:</p>
        
          <div class="quiz-field" style="margin-bottom: 32px;">
            <textarea id="userOpinion" class="quiz-textarea" 
              placeholder="Ваше мнение сюда..." 
              style="width: 100%; font-size: 36px; border-bottom: 2px solid #000; font-family: inherit; font-size: 16px; resize: none; outline: none;"></textarea>
          </div>

        <div class="quiz-feedback">
          <!-- Кастомный выпадающий список -->
          <div class="custom-select" id="feedbackSelect">
            <div class="custom-select__header">
              <span id="selectCurrent">Очень понравился</span>
              <img src="assets/img/up.png" style="width: 24px; height: 24px;" />
            </div>
            <div class="custom-select__dropdown">
              <div class="custom-select__item" data-value="Очень понравился">Очень понравился</div>
              <div class="custom-select__item" data-value="Не понравился">Не понравился</div>
              <div class="custom-select__item" data-value="Пройду еще раз">Пройду еще раз</div>
              <div class="custom-select__item" data-value="Посоветую всем">Посоветую всем пройти</div>
            </div>
            <input type="hidden" id="selectedStatus" value="">
          </div>


          <div class="wrapper" style="display: flex;">
          <div class="quiz-step__actions" >
            <button type="button" class="button button--secondary" id="finishQuizBtn" style="margin-right: 20px;">Назад</button>
          </div>
          <div class="quiz-step__actions">
            <button type="button" class="button button--primary" id="finishQuizBtn">Продолжить</button>
          </div>
          </div>
        </div>
      </div>
    `;
    return;
  }

  const optionsHtml = data.options
    .map(
      (opt) => `
    <label class="quiz-options__item">
      <input type="${data.type}" name="quiz-answer" value="${opt}" class="quiz-options__checkbox">
      <span class="quiz-options__label">${opt}</span>
    </label>
  `,
    )
    .join('');

  container.innerHTML = `
    <h2 class="quiz-step__question">${data.question}</h2>
    <p class="quiz-step__description">${data.description}</p>
    <div class="quiz-options quiz-options--tags">
      ${optionsHtml}
    </div>
    <div class="quiz-step__actions">
      <button type="button" class="button button--primary" id="nextStepBtn">Продолжить</button>
    </div>
  `;

  // Очищаем сайдбар при смене вопроса
  updateSidebar();
}

// Глобальный слушатель кликов (Делегирование)
document.addEventListener('click', (e) => {
  // Логика кнопки "Продолжить"
  if (e.target && e.target.id === 'nextStepBtn') {
    const checked = document.querySelectorAll(
      '.quiz-options__checkbox:checked',
    );
    if (checked.length === 0) {
      alert('Выберите вариант!');
      return;
    }

    currentStep++;
    const container = document.getElementById('quizDynamicContent');
    container.style.opacity = '0';

    setTimeout(() => {
      renderStep(currentStep);
      container.style.opacity = '1';
    }, 300);
  }
});

// Глобальный слушатель изменений (для сайдбара)
document.addEventListener('change', (e) => {
  if (e.target && e.target.classList.contains('quiz-options__checkbox')) {
    updateSidebar();
  }
});

// Функция запуска
window.initQuiz = function () {
  currentStep = 0;
  renderStep(currentStep);
};

document.addEventListener('click', (e) => {
  // Нашли заголовок селекта
  const selectHeader = e.target.closest('.custom-select__header');

  if (selectHeader) {
    const parent = selectHeader.parentElement;
    parent.classList.toggle('is-active');
  }

  // Нашли элемент списка
  const selectItem = e.target.closest('.custom-select__item');
  if (selectItem) {
    const value = selectItem.dataset.value;
    const parent = selectItem.closest('.custom-select');

    document.getElementById('selectCurrent').textContent = value;
    document.getElementById('selectedStatus').value = value;

    parent.classList.remove('is-active');

    // Обновляем сайдбар
    const sidebarResults = document.getElementById('sidebarResults');
    if (sidebarResults) sidebarResults.textContent = value + '.';
  }

  // Закрытие при клике в любое другое место экрана
  if (!e.target.closest('.custom-select')) {
    document
      .querySelectorAll('.custom-select')
      .forEach((s) => s.classList.remove('is-active'));
  }
});
