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
    // console.log(a.getAttribute('href'));
    // console.log(e.target.nodeName);
    link=`<img src="${a.getAttribute('href')}" width="800" height="600">`
    const instance = basicLightbox.create(link)
    instance.show(link)
}

// ///////////// Modal window

refs.btnLoad.style.visibility = 'hidden';

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

refs.btnLoad.style.visibility = 'visible';
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

///////////////

// const options = {
//     // root: null,
//     rootMargin: '50px',
//     threshold: 0.1
// }
// const observer = new IntersectionObserver((entries, observer) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             const lasyImg = entry.target;
//             console.log(lasyImg);
//             onLoadMore()
//             observer.unobserve(lasyImg)
//         }
//     })
// }, options);

// const toLoad = document.querySelectorAll('.observ');

// toLoad.forEach(i => {
//     observer.observe(i)
// })

      
//  const myStack = new PNotify.Stack({dir1: 'top', firstpos1: 25});
// PNotify.notice({
//   text: 'Notice 1.',
//   stack: myStack
// });
// error({
//   title: 'Ошибка',
//     text: 'Вы ввели пробел! Но не ввели запрос',
//   delay: 500,
// });
// notice({
//   title: 'Oh No!',
//     text: 'Something terrible happened.',
//   delay: 500,
// });
// success({
//   title: 'Oh No!',
//     text: 'Something terrible happened.',
//   delay: 500,
// });