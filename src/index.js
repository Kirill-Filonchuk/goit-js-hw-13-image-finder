import './sass/main.scss';
import '../node_modules/basiclightbox/src/styles/main.scss';

import * as basicLightbox from '../node_modules/basiclightbox';

import getRefs from './js/refs';
import ApiServicePixabey from './js/apiService';
import photoCardMarkup from './templates/card.hbs';



const apiServicePixabey = new ApiServicePixabey()

const refs = getRefs();

// ///////////// Modal window
let link = '';

refs.cardContainer.addEventListener('click', forModaWindow);

function forModaWindow(e) {
    e.preventDefault();
    
    if (e.target.nodeName !== "IMG")  return;
 
    let a = e.target.parentNode
    
    link=`<img src="${a.getAttribute('href')}" width="800" height="600">`
    const instance = basicLightbox.create(link)
    instance.show(link)
}

// ///////////// Modal window

refs.btnLoad.style.visibility = 'hidden';

//2 Закоментировал - активирован бесконечный скрол
refs.btnLoad.addEventListener('click', onLoadMore)

refs.searchForm.addEventListener('submit', sendSearch);

function sendSearch(e) {
    e.preventDefault();
    
    apiServicePixabey.resetPage();
 const inputData = e.currentTarget;
    apiServicePixabey.request = inputData.elements.query.value;
   
    if (apiServicePixabey.request === ' ' || apiServicePixabey.request === '' ) {
        return alert('Вы ввели пробел! Введите свой запрос')
    }
    apiServicePixabey.getApiCards().then(photo => {
        clearPageOnNewSearch();
        renderPhotoGalery(photo);
        refs.btnLoad.style.visibility = 'visible';
    })
}
//3 Закоментировал - активирован бесконечный скрол
function onLoadMore() {
    apiServicePixabey.getApiCards()
        .then(renderPhotoGalery)
        //4 .then(() => apiServicePixabey.handleButtonClick())
        // .then(() => setTimeout(() => { apiServicePixabey.handleButtonClick() }, 700))
}
// Закоментировал - активирован бесконечный скрол
// Метод парсит указанную строку как HTML и добавляет результирующие узлы в указанное место DOM-дерева. Не делает повторный рендеринг для существующих элементов внутри элемента-родителя на котором используется
function renderPhotoGalery(photoFromApi) {
   refs.cardContainer.insertAdjacentHTML('beforeend', photoCardMarkup(photoFromApi))
}

function clearPageOnNewSearch() {
    refs.cardContainer.innerHTML = '';
}


////////////// infinity scrol

const options = {
    // root: null,
    rootMargin: '50px',
    threshold: 0.1
}

var intersectionObserver = new IntersectionObserver(function(entries) {
  // Если intersectionRatio равен 0, цель вне зоны видимости
  // и нам не нужно ничего делать
    if (entries[0].intersectionRatio <= 0) return;
    if (apiServicePixabey.request === ' ' || apiServicePixabey.request === '') {
        return
    }

//1     apiServicePixabey.resetPage();
//  apiServicePixabey.getApiCards()
//         .then(renderPhotoGalery)
    
   onLoadMore();
  console.log('Loaded new items');
},options);
// начать наблюдение
intersectionObserver.observe(refs.scrolObj);
