import { isEscapeKey } from '../util.js' 

const uploadModalElement = document.querySelector(".img-upload__overlay");
const uploadModalOpenElement = document.getElementById('upload-file');
const uploadModalCloseElement = document.getElementById("upload-cancel");
const uploadModalForm = document.getElementById('upload-select-image');
const filenameInput = document.querySelector('[name="filename"]');
const hashtagInput = document.querySelector('[name="hashtags"]');
const descriptionInput = document.querySelector('[name="description"]');

/**
 * Валидация полей формы
 */
const pristine = new Pristine(uploadModalForm, { classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error-text',
  errorTextTag: 'div'
}, true);

const validateHashtag = (value) => { return value.match(/^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/) }; 

function validateHashtags(value) {
  if (value === '') return true;
  const hashtags = value.trim().toLowerCase().split(' ');
  return hashtags.every(validateHashtag) && hashtags.length <= 5 && (new Set(hashtags)).size === hashtags.length;
}
 
function validateDescription(value) {
  return value.length <= 140;
}

pristine.addValidator(
  hashtagInput,
  validateHashtags,
  'Одно из значений не соответствует формату хештэга!'
);

pristine.addValidator(
  descriptionInput,
  validateDescription,
  'Комментарий не может содержать больше 140 символов!' 
);

/**
 * Изменение состояния формы при действиях пользователя
 */
const onModalEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadModal();
  }
};

function openUploadModal() {
  uploadModalElement.classList.remove('hidden');
  document.addEventListener('keydown', onModalEscKeydown);
  document.body.classList.add('modal-open');
};

function closeUploadModal() {
  uploadModalElement.classList.add('hidden');
  document.removeEventListener('keydown', onModalEscKeydown);
  document.body.classList.remove('modal-open');

  uploadModalForm.reset();
};

/**
 * Слушатели событий на элементах формы
 */
filenameInput.addEventListener('change', (evt) => {
  openUploadModal();
});

uploadModalCloseElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeUploadModal();
});

uploadModalForm.addEventListener('submit', (evt) => {
  if(!pristine.validate()) evt.preventDefault();
}); 

hashtagInput.addEventListener('keydown', (evt) => { 
  evt.stopPropagation();
  if(isEscapeKey(evt)) hashtagInput.blur(); 
});

descriptionInput.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
  if(isEscapeKey(evt)) descriptionInput.blur(); 
});
