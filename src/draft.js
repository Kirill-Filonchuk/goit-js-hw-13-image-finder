import './sass/main.scss';

import getRefs from './js/refs';
import ApiServicePixabey from './js/apiService';
import photoCardMarkup from './templates/card.hbs';

const apiServicePixabey = new ApiServicePixabey();

const refs = getRefs();

refs.btnLoad.addEventListener('click', onLoadMore);

refs.searchForm.addEventListener('submit', sendSearch);

function sendSearch(e) {
  e.preventDefault();
  apiServicePixabey.resetPage();
  const inputData = e.currentTarget;
  apiServicePixabey.request = inputData.elements.query.value;
  if (apiServicePixabey.request === ' ' || apiServicePixabey.request === '') {
    return alert('Вы ввели пробел! Введите свой запрос');
  }
  apiServicePixabey.getApiCards().then(photo => {
    clearPageOnNewSearch();
    renderPhotoGalery(photo);
    onLoadMore(); // Why function call here?
  });
}
function onLoadMore() {
  document.querySelector('.m-element-selector').scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
// Метод парсит указанную строку как HTML и добавляет результирующие узлы в указанное место DOM-дерева. Не делает повторный рендеринг для существующих элементов внутри элемента-родителя на котором используется
function renderPhotoGalery(photoFromApi) {
  refs.cardContainer.insertAdjacentHTML('beforeend', photoCardMarkup(photoFromApi));
}
function clearPageOnNewSearch() {
  refs.cardContainer.innerHTML = '';
}