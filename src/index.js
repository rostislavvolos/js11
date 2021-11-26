import './sass/main.scss';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import {getItems, resetPage} from './api.js';
import card from './card.hbs';




function showBtn(item) {
    item.classList.remove('visually-hidden')
}


function hideBtn(item) {
    item.classList.add('visually-hidden')
}


const refs = {  
    formEl: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    searchBtn: document.querySelector('.search-form-btn'),
    loadBtn: document.querySelector('.load-more'),
};

// const clearGallery = refs.gallery.innerHTML = '';
let element ='';
hideBtn(refs.loadBtn);
console.log(hideBtn(refs.loadBtn))

refs.formEl.addEventListener('submit', onSearch);
refs.loadBtn.addEventListener('click', onLoad);

// function onSearch(event) {
// event.preventDefault();
// element = event.currentTarget.searchQuery.value;
// resetPage();
// hideBtn(refs.loadBtn);
// getItems(element).then(images => {
//     const imagesArray = images.data.hits;
//     console.log(imagesArray)
//     const totalImages = images.data.totalHits;


//     if (imagesArray.length === 0) {
//         clearGallery;
//         return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//     }
//   clearGallery;
//     refs.gallery.insertAdjacentHTML('beforeend', card(imagesArray));
//     showBtn(refs.loadBtn);

// })
// }







function onSearch(event) {
  clearGallery();
    event.preventDefault();
    element = event.currentTarget.searchQuery.value;
    console.log(element);
    resetPage();
    hideBtn(refs.loadBtn);
    console.log(hideBtn(refs.loadBtn))
    getItems(element).then(images => {
      const imagesArray = images.data.hits;
      const totalImages = images.data.totalHits;
  
      if (imagesArray.length === 0) {
        clearGallery()
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again ',
        );
      }
      clearGallery()
      //renderGallery(imagesArr);
      refs.gallery.insertAdjacentHTML('beforeend', card(imagesArray));
      new SimpleLightbox('.gallery a', {
        showCounter: false
      });
      // simpleLightbox.refresh();
       Notiflix.Notify.success(`Hooray🎉 We found ${totalImages} images.`);
       showBtn(refs.loadBtn);
  
    });
  }

  function onLoad() {
    getItems(element)
      .then(images => {
        const imagesArray = images.data.hits;
  
        if (imagesArray.length === 0) {
          Notiflix.Notify.failure('We are sorry, but you have reached the end of search results.');
          hideBtn(refs.loadBtn);
          return;
        }
        //renderGallery(imagesArr);
        refs.gallery.insertAdjacentHTML('beforeend', card(imagesArray));
        new SimpleLightbox('.gallery a', {
          showCounter: false,
        });
  
        // simpleLightbox.refresh();
  
        // return;
      })
  
      .catch(error => {
        console.log(error);
        hideBtn(refs.loadBtn);
      });
  }



  function clearGallery () {
    refs.gallery.innerHTML = '';
  };