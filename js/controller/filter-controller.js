import { getRandomArrayElements } from '../util.js';
import { receivePhotos } from '../main.js';
import { debounce } from '../util.js';

const filtersSection = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');

const compareCommentsCount = (a, b) => b.comments.length > a.comments.length ? 1 : -1;

const filters = {
  'filter-default': (photos) => photos,
  'filter-random': (photos) => getRandomArrayElements(photos, 10),
  'filter-discussed': (photos) => photos.slice().sort(compareCommentsCount),
};

const inactiveAllButtons = () => {
  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
};

function revealFilters() {
  filtersSection.classList.remove('img-filters--inactive');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      inactiveAllButtons();
      button.classList.add('img-filters__button--active');
    });

    button.addEventListener('click', debounce(receivePhotos, 500));
  });
}

function applyFilter(photos) {
  const currentFilter = document.querySelector('.img-filters__button--active');
  return filters[currentFilter.id](photos);
}

export { revealFilters, applyFilter };
