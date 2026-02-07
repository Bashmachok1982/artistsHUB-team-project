// ================================================
// 1. HELPERS — допоміжні функції
// ================================================

function lockScroll() {
  document.body.classList.add('body-no-scroll');
}

function unlockScroll() {
  document.body.classList.remove('body-no-scroll');
}

function showError(inputElement, message) {
  // Додаємо клас помилки
  inputElement.classList.add('feedback-error');

  // Шукаємо або створюємо текст помилки
  let errorElement = inputElement.parentElement.querySelector(
    '.feedback-error-text'
  );
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.className = 'feedback-error-text';
    inputElement.parentElement.appendChild(errorElement);
  }
  errorElement.textContent = message;
}

function clearError(inputElement) {
  inputElement.classList.remove('feedback-error');

  const errorElement = inputElement.parentElement.querySelector(
    '.feedback-error-text'
  );
  if (errorElement) {
    errorElement.remove();
  }
}

function clearAllErrors() {
  document.querySelectorAll('.feedback-error').forEach(el => {
    clearError(el);
  });
  // Також очищуємо можливу глобальну помилку від сервера
  const serverError = document.querySelector('.server-error-message');
  if (serverError) serverError.remove();
}

// ================================================
// 2. РЕЙТИНГ (зірочки)
// ================================================

function initRating() {
  const ratingContainer = document.querySelector('.rating');
  if (!ratingContainer) return;

  const stars = ratingContainer.querySelectorAll('.rating-star');
  const hiddenInput = document.getElementById('rating-input');

  if (!stars.length || !hiddenInput) return;

  stars.forEach(star => {
    star.addEventListener('click', () => {
      const value = Number(star.dataset.value);
      hiddenInput.value = value;

      // Активуємо зірки до обраного значення включно
      stars.forEach(s => {
        const starValue = Number(s.dataset.value);
        s.classList.toggle('active', starValue <= value);
      });
    });
  });
}

// ================================================
// 3. ФОРМА — валідація + відправка
// ================================================

function initFeedbackForm() {
  const form = document.querySelector('.js-feedback-form');
  if (!form) return;

  const nameInput = form.querySelector('input[name="name"]');
  const messageInput = form.querySelector('textarea[name="message"]');
  const ratingInput = document.getElementById('rating-input');
  const ratingBlock = form.querySelector('.rating');

  const submitText = form.querySelector('.js-submit-text');
  const submitLoader = form.querySelector('.js-submit-loader');

  form.addEventListener('submit', async event => {
    event.preventDefault();

    // Очищуємо всі попередні помилки
    clearAllErrors();

    const name = nameInput.value.trim();
    const descr = messageInput.value.trim();
    const rating = Number(ratingInput.value);

    let isValid = true;

    // ВАЛІДАЦІЯ — тут має бути точна схема з документації API
    // Зараз використовуємо розумні припущення (бо точної доки не знайшли)
    // Змініть ці перевірки, коли отримаєте офіційну схему!

    if (!name) {
      showError(nameInput, "Ім'я обов'язкове");
      isValid = false;
    } else if (name.length < 2 || name.length > 50) {
      showError(nameInput, "Ім'я повинно бути від 2 до 50 символів");
      isValid = false;
    }

    if (!descr) {
      showError(messageInput, "Повідомлення обов'язкове");
      isValid = false;
    } else if (descr.length < 10 || descr.length > 1000) {
      showError(
        messageInput,
        'Повідомлення повинно бути від 10 до 1000 символів'
      );
      isValid = false;
    }

    if (rating < 1 || rating > 5) {
      showError(ratingBlock, 'Оберіть рейтинг (1–5 зірок)');
      isValid = false;
    }

    if (!isValid) return;

    // Блокування кнопки + показ лоадера
    submitText.hidden = true;
    submitLoader.hidden = false;
    form.querySelector('.feedback-submit-btn').disabled = true;

    try {
      const response = await fetch(
        'https://sound-wave.b.goit.study/api/feedbacks',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name,
            rating,
            descr, // поле називається descr, а не message!
          }),
        }
      );

      if (!response.ok) {
        let errorMsg = 'Помилка сервера';
        try {
          const errData = await response.json();
          errorMsg = errData.message || errorMsg;
        } catch {}
        throw new Error(errorMsg);
      }

      // Успішна відправка
      form.reset();
      ratingInput.value = '0';
      document
        .querySelectorAll('.rating-star')
        .forEach(star => star.classList.remove('active'));

      // Закриваємо модалку
      const backdrop = document.querySelector('.js-feedback-backdrop');
      if (backdrop) {
        backdrop.setAttribute('hidden', '');
      }
      unlockScroll();

      // Опціонально: повідомлення про успіх (можна замінити на toast)
      alert('Дякуємо за ваш відгук!');
    } catch (error) {
      console.error('Помилка відправки відгуку:', error);

      // Показуємо помилку під формою
      const errorDiv = document.createElement('div');
      errorDiv.className = 'server-error-message';
      errorDiv.style.color = '#dc2626';
      errorDiv.style.textAlign = 'center';
      errorDiv.style.marginTop = '16px';
      errorDiv.textContent =
        error.message || 'Не вдалося відправити відгук. Спробуйте ще раз.';
      form.appendChild(errorDiv);

      // Автозникнення через 6 секунд
      setTimeout(() => errorDiv.remove(), 6000);
    } finally {
      submitText.hidden = false;
      submitLoader.hidden = true;
      form.querySelector('.feedback-submit-btn').disabled = false;
    }
  });
}

// ================================================
// 4. МОДАЛКА — відкриття / закриття
// ================================================

function initFeedbackModal() {
  const backdrop = document.querySelector('.js-feedback-backdrop');
  const openButton = document.querySelector('.js-open-feedback');
  const closeButton = document.querySelector('.js-feedback-close');

  if (!backdrop || !openButton || !closeButton) return;

  function openModal() {
    backdrop.removeAttribute('hidden');
    lockScroll();
    clearAllErrors(); // очищуємо помилки при відкритті
  }

  function closeModal() {
    backdrop.setAttribute('hidden', '');
    unlockScroll();
  }

  // Відкриття по кнопці "Leave feedback"
  openButton.addEventListener('click', openModal);

  // Закриття по кнопці ✕
  closeButton.addEventListener('click', closeModal);

  // Закриття по кліку на фон (backdrop)
  backdrop.addEventListener('click', event => {
    if (event.target === backdrop) {
      closeModal();
    }
  });

  // Закриття по Escape
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !backdrop.hasAttribute('hidden')) {
      closeModal();
    }
  });
}

// ================================================
// 5. ІНІЦІАЛІЗАЦІЯ — запускаємо все при завантаженні сторінки
// ================================================

document.addEventListener('DOMContentLoaded', () => {
  initFeedbackModal(); // модалка + відкриття/закриття
  initRating(); // зірочки
  initFeedbackForm(); // форма + валідація + відправка
});
