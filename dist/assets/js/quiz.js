document.addEventListener('DOMContentLoaded', () => {
  // 1. Находим все нужные элементы
  const checkboxes = document.querySelectorAll('.quiz-options__checkbox');
  const sidebarResults = document.getElementById('sidebarResults');

  // Текст-заполнитель, если ничего не выбрано
  const placeholder =
    '<span class="sidebar-info__placeholder">Выберите варианты...</span>';

  // 2. Функция для обновления текста в сайдбаре
  function updateSidebar() {
    // Собираем массив из значений всех ВЫБРАННЫХ чекбоксов
    const selectedValues = Array.from(checkboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    // 3. Если массив пустой — возвращаем подсказку
    if (selectedValues.length === 0) {
      sidebarResults.innerHTML = placeholder;
      return;
    }

    // 4. Формируем строку текста
    // Добавляем точку после каждого элемента, как на макете
    const formattedText = selectedValues.join('. ') + '.';

    // Вставляем текст в сайдбар
    sidebarResults.textContent = formattedText;
  }

  // 5. Вешаем «слушатель» на каждый чекбокс
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      updateSidebar();

      // Небольшой спецэффект: заставим текст в сайдбаре «мигнуть» при обновлении
      sidebarResults.style.opacity = '0.5';
      setTimeout(() => {
        sidebarResults.style.opacity = '1';
      }, 100);
    });
  });
});
