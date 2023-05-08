import { getPhotos } from './api.js';
import { showErrorMessage } from './controller/message-modal-controller.js';
import { revealFilters, applyFilter } from './controller/filter-controller.js';
import './controller/upload-modal-controller.js';

const receivePhotos = () => {
  getPhotos((photos) => {
    applyFilter(photos);
  }, (errorText) => {
    showErrorMessage(errorText);
  });
}

revealFilters();
receivePhotos();

export { receivePhotos };
