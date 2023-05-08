import { revealMiniature } from './controller/image-controller.js';

const miniatureTemplate = document.querySelector('#picture').content;
const miniaturesList = document.querySelector('.pictures');
const miniaturesListFragment = document.createDocumentFragment();

const createMiniature = function(miniatureData) {
  const miniature = miniatureTemplate.cloneNode(true);
  miniature.querySelector('.picture__img').src = miniatureData.url;
  miniature.querySelector('.picture__likes').textContent = miniatureData.likes;
  miniature.querySelector('.picture__comments').textContent = miniatureData.comments.length;
  miniature.querySelector('.picture__img').addEventListener('click', () => {
    revealMiniature(miniatureData.url, miniatureData.likes, miniatureData.comments, miniatureData.description);
  });
  miniaturesListFragment.appendChild(miniature);
  miniaturesList.append(miniaturesListFragment);
};

function renderPhotos(photos) {
  miniaturesList.querySelectorAll('.picture').forEach((miniature) => { miniature.remove(); });
  photos.forEach((photo) => {
    createMiniature(photo);
  });
}

export { renderPhotos };
