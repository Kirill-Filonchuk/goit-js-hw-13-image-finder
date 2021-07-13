import './sass/main.scss';

import getRefs from './js/refs';
import ApiServicePixabey from './js/apiService';
import photoCardMarkup from './templates/card.hbs';

const apiServicePixabey = new ApiServicePixabey()

// const element = document.getElementById('.m-element-selector');
// function handleButtonClick() {
//     element.scrollIntoView({
//         behavior: 'smooth',
//         block: 'end',
//     })
// }

const refs = getRefs();

refs.btnLoad.addEventListener('click', onLoadMore)

document.querySelector('.m-element-selector').scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});

// function handleButtonClick() {
    refs.btnLoad.scrollIntoView({
        // inline: 'end',
        behavior: 'smooth',
        block: "center"
    })
// }

refs.searchForm.addEventListener('submit', sendSearch);

function sendSearch(e) {
    e.preventDefault();
    // clearPageOnNewSearch();
    apiServicePixabey.resetPage();
 const inputData = e.currentTarget;
    apiServicePixabey.request = inputData.elements.query.value;
    // console.log( apiServicePixabey.request);
    if (apiServicePixabey.request === ' ' || apiServicePixabey.request === '' ) {
        return alert('Вы ввели пробел! Введите свой запрос')
    }
    apiServicePixabey.getApiCards().then(photo => {
        clearPageOnNewSearch();
        renderPhotoGalery(photo)
    })
    // Т.К. асинхронная ф-ция на свое место ВСЕГДА возвращает промис, то к ней я применяю THEN
   
}



function onLoadMore() {
    apiServicePixabey.getApiCards().then(renderPhotoGalery);
    // handleButtonClick()
    document.querySelector('.m-element-selector').scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});
}
// Метод парсит указанную строку как HTML и добавляет результирующие узлы в указанное место DOM-дерева. Не делает повторный рендеринг для существующих элементов внутри элемента-родителя на котором используется
function renderPhotoGalery(photoFromApi) {
   refs.cardContainer.insertAdjacentHTML('beforeend', photoCardMarkup(photoFromApi))
}

function clearPageOnNewSearch() {
    refs.cardContainer.innerHTML = '';
}

/// 

