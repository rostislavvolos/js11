// const axios = require('axios').default;
//  export {getItems, resetPage};


// const BASE_URL = 'https://pixabay.com/api/';
// const API = '24516187-6a7424301f95b0f6b37c73776';
// let page = 1;
// let VALUE = '&image_type=photo&orientation=hotizontal&safesearch=true&per_page=40&page=';

// async function getItems(image) {
//     try {
//         const fetchImages = await axios.get(`${BASE_URL}?key=${API}&q=${image}${VALUE}${page}`);
//         page += 1;
//         return fetchImages;
//     } catch (error){
//         console.log(error)
//     }
// };


// function resetPage() {
//     page = 1;
// };

const axios = require('axios').default;
export { getItems, resetPage };

const BASE_URL = 'https://pixabay.com/api/';
const API = '24482250-ff2a48ff2cbe8defcdea0f664';
let page = 1;
let VALUE = '&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=';

async function getItems(requestValue) {
  try {
    const images = await axios.get(`${BASE_URL}?key=${API}&q=${requestValue}${VALUE}${page}`);
    page += 1;
    return images;
  } catch (error) {
    console.log(error);
  }
}

function resetPage() {
  page = 1;
}