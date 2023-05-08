import { renderPhotos } from './miniatures.js';
import { getPhotos } from './api.js';
import { showErrorMessage } from './controller/message-modal-controller.js';
import './controller/upload-modal-controller.js';

getPhotos((photos) => {
  renderPhotos(photos);
}, (errorText) => {
  showErrorMessage(errorText);
});
