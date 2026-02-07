document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('startQuiz');
  const quizBlock = document.getElementById('quizBlock');

  if (startButton && quizBlock) {
    startButton.addEventListener('click', function () {
      // Показываем блок квиза
      quizBlock.removeAttribute('hidden');
      quizBlock.scrollIntoView({ behavior: 'smooth' });

      // Инициализируем квиз
      if (typeof initQuiz === 'function') {
        initQuiz();
      }

      // Меняем кнопку
      this.textContent = 'Продолжить квиз';
      this.classList.add('button--secondary');
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Инициализация слайдера отзывов
  const reviewsSlider = new Swiper('.reviews__slider', {
    // Основные настройки
    slidesPerView: 1, // На мобилках по умолчанию 1 слайд
    spaceBetween: 30, // Расстояние между карточками
    loop: true, // Бесконечная прокрутка
    grabCursor: true, // Меняет курсор на "руку" при наведении

    // Навигация (стрелки)
    navigation: {
      nextEl: '.reviews__btn--next',
      prevEl: '.reviews__btn--prev',
    },

    // Адаптив (Mobile First)
    breakpoints: {
      // Когда ширина экрана >= 768px
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      // Когда ширина экрана >= 1100px
      1100: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },

    // Пагинация (если захочешь добавить точки снизу)
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
});
