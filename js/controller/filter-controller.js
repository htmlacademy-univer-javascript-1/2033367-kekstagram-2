import { getRandom } from '../util.js';
import { renderPhotos } from '../miniatures.js';
import { receivePhotos } from '../main.js';
import { debounce } from '../util.js';

const filtersSection = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');

const inactiveAllButtons = () => {
  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
};

function revealFilters() {
  filtersSection.classList.remove('img-filters--inactive');

  filterButtons.forEach((button) => {
    button.addEventListener('click', debounce(() => {
      inactiveAllButtons();
      button.classList.add('img-filters__button--active');
      receivePhotos();
    }));
  });
}

const compareCommentsCount = (a, b) => b.comments.length > a.comments.length ? 1 : -1;

const applyDefaultFilter = (photos) => photos;

const applyRandomFilter = (photos) => getRandom(photos, 10);

const applyDiscussedFilter = (photos) => photos.slice().sort(compareCommentsCount);

function applyFilter(photos) {
  let filteredPhotos = photos;
  const currentFilter = document.querySelector('.img-filters__button--active');
  if(currentFilter.id === 'filter-default') {
    filteredPhotos = applyDefaultFilter(photos);
  } else if (currentFilter.id === 'filter-random') {
    filteredPhotos = applyRandomFilter(photos);
  } else if (currentFilter.id === 'filter-discussed') {
    filteredPhotos = applyDiscussedFilter(photos);
  }
  renderPhotos(filteredPhotos);
}

export { revealFilters, applyFilter };
