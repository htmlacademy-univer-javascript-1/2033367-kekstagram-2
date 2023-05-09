import { getPhotos } from './api.js';
import { showMessage } from './controller/message-modal-controller.js';
import { revealFilters, applyFilter } from './controller/filter-controller.js';
import './controller/upload-modal-controller.js';
import './avatar.js';
import { renderPhotos } from './miniatures.js';

const receivePhotos = () => {
  getPhotos((photos) => {
    renderPhotos(applyFilter(photos));
  }, (errorText) => {
    showMessage(errorText, true);
  });
};

revealFilters();
receivePhotos();

export { receivePhotos };