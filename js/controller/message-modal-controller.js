import { isEscapeKey } from '../util.js';

const successMessage = document.getElementById('success').content.querySelector('.success');
const errorMessage = document.getElementById('error').content.querySelector('.error');

const hideMessage = (message) => {
  message.remove();
};

const createMessage = (text, templateContent, title, button) => {
  const message = templateContent.cloneNode(true);

  message.style.zIndex = 5;
  message.querySelector(title).textContent = text;

  message.querySelector(button).addEventListener('click', (evt) => {
    evt.preventDefault();
    hideMessage(message);
  });

  document.addEventListener('keydown', (evt) => {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      hideMessage(message);
    }
  });

  message.addEventListener('click', (evt) => {
    evt.preventDefault();
    if(evt.target === message) {
      hideMessage(message);
    }
  });

  document.body.appendChild(message);
};

const showMessage = (text, isError) => {
  if(isError) {
    createMessage(text, errorMessage, '.error__title', '.error__button');
  } else {
    createMessage(text, successMessage, '.success__title', '.success__button');
  }
};

export { showMessage };
