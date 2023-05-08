import { isEscapeKey } from '../util.js';

const successMessageTemplate = document.getElementById('success');
const errorMessageTemplate = document.getElementById('error');

const hideMessage = (message) => {
  message.remove();
};

const showSuccessMessage = (successText) => {
  const successMessage = successMessageTemplate.content.querySelector('.success').cloneNode(true);

  successMessage.style.zIndex = 5;
  successMessage.querySelector('.success__title').textContent = successText;

  successMessage.querySelector('.success__button').addEventListener('click', (evt) => {
    evt.preventDefault();
    hideMessage(successMessage);
  });

  document.addEventListener('keydown', (evt) => {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      hideMessage(successMessage);
    }
  });

  document.addEventListener('click', () => {
    hideMessage(successMessage);
  });

  document.body.appendChild(successMessage);
};

const showErrorMessage = (errorText) => {
  const errorMessage = errorMessageTemplate.content.querySelector('.error').cloneNode(true);

  errorMessage.style.zIndex = 5;
  errorMessage.querySelector('.error__title').textContent = errorText;

  errorMessage.querySelector('.error__button').addEventListener('click', (evt) => {
    evt.preventDefault();
    hideMessage(errorMessage);
  });

  document.addEventListener('keydown', (evt) => {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      hideMessage(errorMessage);
    }
  });

  document.addEventListener('click', () => {
    hideMessage(errorMessage);
  });

  document.body.appendChild(errorMessage);
};

export { showSuccessMessage, showErrorMessage };
