document.addEventListener('DOMContentLoaded', () => {
  // 1. Логика для кнопки "Начать квиз" 
  const startButton = document.getElementById('startQuiz');
  const quizBlock = document.getElementById('quizBlock');

  if (startButton && quizBlock) {
    startButton.addEventListener('click', function () {
      // Показываем блок квиза
      quizBlock.removeAttribute('hidden');
      quizBlock.scrollIntoView({ behavior: 'smooth' });

      // Инициализируем квиз, если функция определена в quiz.js
      if (typeof initQuiz === 'function') {
        initQuiz();
      }

      // Меняем кнопку
      this.textContent = 'Продолжить квиз';
      this.classList.add('button--secondary');
    });
  }

  // Дополнительная логика для кнопки запуска квиза в Hero-секции (если ID отличаются)
  const startQuizHeroButton = document.querySelector('.hero__button');
  if (startQuizHeroButton && !startButton) { // Проверяем, чтобы не дублировать логику
    startQuizHeroButton.addEventListener('click', () => {
      const quizSection = document.querySelector('.quiz-step');
      if (quizSection) {
        quizSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // 2. Инициализация слайдера отзывов Swiper 
  const reviewsSlider = new Swiper('.reviews__slider', {
    // Основные настройки

    // На мобильных устройствах показываем 1 целый слайд и часть следующего
    slidesPerView: 1.4,
    spaceBetween: 30, // Расстояние между карточками
    loop: true, // Бесконечная прокрутка
    grabCursor: true, // Меняет курсор на "руку" при наведении

    // Ключевой параметр для эффекта: центрируем активный слайд
    centeredSlides: true,

    // Навигация (стрелки)
    navigation: {
      nextEl: '.reviews__btn--next',
      prevEl: '.reviews__btn--prev',
    },

    // Адаптив (Mobile First)
    breakpoints: {
      // Когда ширина экрана >= 768px
      768: {
        slidesPerView: 2.5,
        spaceBetween: 40,
      },
      // Когда ширина экрана >= 1100px
      1100: {
        slidesPerView: 3.5,
        spaceBetween: 50,
      },
    },

    // Пагинация 
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
});
