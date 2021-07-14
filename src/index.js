import './sass/main.scss';

import getRefs from './js/refs';
import ApiServicePixabey from './js/apiService';
import photoCardMarkup from './templates/card.hbs';

const apiServicePixabey = new ApiServicePixabey()

const refs = getRefs();

refs.btnLoad.addEventListener('click', onLoadMore)

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
        renderPhotoGalery(photo);

    //   setTimeout(() => {console.log('In Timeout LoadMore');
    //     handleButtonClick()
    // },700)()
        //onLoadMore(); // Why function call here?
    })
   
    // Т.К. асинхронная ф-ция на свое место ВСЕГДА возвращает промис, то к ней я применяю THEN
   
}



function onLoadMore() {
    apiServicePixabey.getApiCards()
        .then(renderPhotoGalery).then(()=>  apiServicePixabey.handleButtonClick())    
        .then(() => setTimeout(() => { apiServicePixabey.handleButtonClick() }, 700))
    // apiServicePixabey.handleButtonClick().then()
     // Why this do not here ?
    // setTimeout(() => {console.log('In Timeout LoadMore');
    //     handleButtonClick()
    // },700)
//     document.querySelector('.m-element-selector').scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// });
    // apiServicePixabey.handleButtonClick().then()
}
// Метод парсит указанную строку как HTML и добавляет результирующие узлы в указанное место DOM-дерева. Не делает повторный рендеринг для существующих элементов внутри элемента-родителя на котором используется
function renderPhotoGalery(photoFromApi) {
   refs.cardContainer.insertAdjacentHTML('beforeend', photoCardMarkup(photoFromApi))
}

function clearPageOnNewSearch() {
    refs.cardContainer.innerHTML = '';
}

/// 

// var scrolToEnd = document.getElementById("box1");



// function handleButtonClick() {
//     scrolToEnd.scrollIntoView({ block: "center", behavior: "smooth" }); 
//     console.log('LoadMore');
// }
