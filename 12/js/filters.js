import { renderThumbnails } from './photos';
import { debounce } from './utils';

const RENDER_DELAY = 500;

const imageFilters = document.querySelector('.img-filters');
const imageFiltersForm = imageFilters.querySelector('.img-filters__form');
let currentPictures = [];

export const initFilters = (pictures) => {
  currentPictures = pictures;

  if (!imageFilters.classList.contains('img-filters--inactive')) {
    return;
  }

  imageFilters.classList.remove('img-filters--inactive');
};

const debouncedRenderThumbnails = debounce((pictures) => {
  document.querySelectorAll('.picture').forEach((element) => element.remove());
  renderThumbnails(pictures);
}, RENDER_DELAY);

const getDefaultPictures = () => [...currentPictures];
const getRandomPictures = () => [...currentPictures].sort(() => Math.random() - 0.5).slice(0, 10);
const getDiscussedPictures = () => [...currentPictures].sort((photoA, photoB) => photoB.comments.length - photoA.comments.length);

imageFiltersForm.addEventListener('click', (evt) => {
  evt.preventDefault();

  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }

  if (evt.target.classList.contains('img-filters__button--active')) {
    return;
  }

  const currentActiveButton = imageFiltersForm.querySelector('.img-filters__button--active');
  if (currentActiveButton) {
    currentActiveButton.classList.remove('img-filters__button--active');
  }

  evt.target.classList.add('img-filters__button--active');

  let filteredPictures = [];

  switch (evt.target.id) {
    case 'filter-default':
      filteredPictures = getDefaultPictures();
      break;

    case 'filter-random':
      filteredPictures = getRandomPictures();
      break;

    case 'filter-discussed':
      filteredPictures = getDiscussedPictures();
      break;

  }

  debouncedRenderThumbnails(filteredPictures);
});
