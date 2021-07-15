import './sass/main.scss';
import '../node_modules/basiclightbox/src/styles/main.scss';
import '../node_modules/@pnotify/core/dist/BrightTheme.css';

import * as basicLightbox from '../node_modules/basiclightbox';

import getRefs from './js/refs';
import ApiServicePixabey from './js/apiService';
import photoCardMarkup from './templates/card.hbs';

import { alert, defaultModules, notice,  error, success} from '../node_modules/@pnotify/core/dist/PNotify.js';
  import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
defaultModules.set(PNotifyMobile, {push: 'top', firstpos1: 25});

alert({
      text: 'Введи Ваш запрос',
       delay: 500,
 });

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

refs.btnLoad.addEventListener('click', onLoadMore)

refs.searchForm.addEventListener('submit', sendSearch);


function clearPageOnNewSearch() {
    refs.cardContainer.innerHTML = '';
}


function sendSearch(e) {
    e.preventDefault();
    
    apiServicePixabey.resetPage();
    const inputData = e.currentTarget;
    apiServicePixabey.request = inputData.elements.query.value;
   
    if (apiServicePixabey.request === ' ' || apiServicePixabey.request === '' ) {
        return error({
            title: 'Ошибка',
            text: 'Вы напечатали пробел или вообще ничего не напечатали! Введите Ваш запрос',
            delay: 1000,
            });
        
    }
    apiServicePixabey.getApiCards().then(photo => {
        clearPageOnNewSearch();
        renderPhotoGalery(photo);
        refs.btnLoad.style.visibility = 'visible';
    })
}

function onLoadMore() {
    apiServicePixabey.getApiCards()
        .then(renderPhotoGalery)     
        .then(() => apiServicePixabey.handleButtonClick())
        .then(() => setTimeout(() => { apiServicePixabey.handleButtonClick() }, 700))
}

// Метод парсит указанную строку как HTML и добавляет результирующие узлы в указанное место DOM-дерева. Не делает повторный рендеринг для существующих элементов внутри элемента-родителя на котором используется
function renderPhotoGalery(photoFromApi) {
    if (photoFromApi.length === 0) {
        error({
            title: 'Ошибка',
            text: 'НЕТ КАРТИНОК',
            delay: 2000,
            });
    } else {
        success({
            title: 'Супер!',
            text: 'Любуйтесь картинками',
            delay: 2000,
            });
    }
    refs.cardContainer.insertAdjacentHTML('beforeend', photoCardMarkup(photoFromApi))
    console.log(photoFromApi);
}
