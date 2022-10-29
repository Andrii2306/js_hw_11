import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from './js/refs';
import { emptyMarkup, renderMarkup } from './js/markupFunctions';
import { getPictures } from './js/searchFunction';
import { onLoad } from './js/onLoadFunction';

const axios = require('axios').default;

refs.loadMoreBtn.hidden = true;
refs.searchForm.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();
  emptyMarkup();

  const searchName = refs.input.value.trim();

  try {
    await getPictures(searchName).then(response => {
      if (response.data.totalHits > 0) {
        Notiflix.Notify.success(
          `Hooray! We found ${response.data.totalHits} images.`
        );
        refs.gallery.insertAdjacentHTML('beforeend', renderMarkup(response));
        const lightbox = new SimpleLightbox('.gallery a', {
          showCounter: false,
        });
        refs.loadMoreBtn.hidden = false;
        refs.loadMoreBtn.addEventListener('click', onLoad);
        lightbox.refresh();
      } else {
        emptyMarkup();
        throw new Error();
      }
    });
  } catch (error) {}
}
