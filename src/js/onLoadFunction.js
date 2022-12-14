import { refs } from './refs';
import { renderMarkup } from './markupFunctions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const axios = require('axios').default;

const URL = 'https://pixabay.com/api/';
const KEY = '30932931-541e61a77d62bc2845be72b94';

const lightbox = new SimpleLightbox('.gallery a', {
  showCounter: false,
});

let page = 1;

async function onLoad() {
  page += 1;
  const searchName = refs.input.value.trim();
  return axios
    .get(
      `${URL}?key=${KEY}&q=${searchName}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    )
    .then(response => {
      refs.gallery.insertAdjacentHTML(
        'beforeend',
        renderMarkup(response, page)
      );
      lightbox.refresh();
      if (
        response.status === 400 ||
        refs.gallery.childElementCount >= response.data.totalHits
      ) {
        refs.loadMoreBtn.hidden = true;
        throw new Error();
      }
    })
    .catch(error => {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      console.log(error);
    });
}
export { onLoad };
