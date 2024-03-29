import getRefs from './refs';
const refs = getRefs();

const URL = "https://pixabay.com/api/"
    const KEY = "22443315-0655a572bf532c2d4a9d9c050";
    const perPage = "12";

export default class ApiServicePixabey {
    constructor() {
        this.searchRequest = '';
        this.page = 1;
    }

    async getApiCards() {
    // console.log("Before request",this);
    
    try {
        const response = await fetch(`${URL}?image_type=photo&orientation=horizontal&q=${this.searchRequest}&page=${this.page}&per_page=${perPage}&key=${KEY}`);
        // const cardFromAPi = await response.json(); // response.json() на свое место возвращает Промис!!!
        // this.incrementPage();
        // console.log("After request", this);
        // console.log(cardFromAPi.hits);
        // return cardFromAPi.hits;
        const { hits }= await response.json(); // response.json() на свое место возвращает Промис!!!
        this.incrementPage();
        return hits;
    } catch (e) {
        return console.dir(e);
        }
    }

   async handleButtonClick() {
       console.log('1LoadMore1');
       
       return await refs.scrolObj.scrollIntoView({ block: "end", behavior: "smooth" }); 
    }

    incrementPage() {
    this.page += 1;
    }
    
    resetPage() {
        this.page = 1;
    }

    get request() {
        return this.searchRequest;
    }

    set request(newRequest) {
        this.searchRequest = newRequest;
    }
}
