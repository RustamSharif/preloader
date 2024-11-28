document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const itemsContainer = document.getElementById('items');

  // Функция для создания элемента валюты
  const createCurrencyElement = (code, value) => {
    return `
      <div class="item">
        <div class="item__code">${code}</div>
        <div class="item__value">${value.toFixed(2)}</div>
        <div class="item__currency">руб.</div>
      </div>
    `;
  };

  // Загрузка данных
  fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses')
    .then(response => response.json())
    .then(data => {
      // Скрываем loader
      loader.classList.remove('loader_active');

      // Отображаем данные
      const currencies = data.response.Valute;
      let html = '';

      for (let key in currencies) {
        const currency = currencies[key];
        html += createCurrencyElement(currency.CharCode, currency.Value);
      }

      itemsContainer.innerHTML = html;
    })
    .catch(error => {
      console.error('Ошибка загрузки данных:', error);
      loader.classList.remove('loader_active');
    });
});