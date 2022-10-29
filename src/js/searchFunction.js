import { refs } from './refs';
import { emptyMarkup } from './markupFunctions'; //  рендер пустої розмітки
import Notiflix from 'notiflix';
const axios = require('axios').default;

const URL = 'https://pixabay.com/api/';
const KEY = '30822963-d0fd13470d1d847e8cb7d7e51';
const searchName = refs.input.value.trim();

export async function getPictures(searchName) {
  if (searchName === '') {
    Notiflix.Notify.info(
      'Sorry, search query can not be empty. Please try again.',
      emptyMarkup()
    );
    return;
  }

  return axios
    .get(
      `${URL}?key=${KEY}&q=${searchName}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`
    )
    .then(response => {
      //console.log('this is RESPONSE inside searchFunction: ', response)

      if (response.data.hits <= 0 || response.status === 404) {
        emptyMarkup();
        throw new Error();
      }
      return response;
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
        emptyMarkup()
      );

      console.log(error);
    });
}
