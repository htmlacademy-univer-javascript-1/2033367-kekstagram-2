import { isEscapeKey } from '../util.js';
import { postPhoto } from '../api.js';
import { showSuccessMessage, showErrorMessage } from './message-modal-controller.js';
import '../../nouislider/nouislider.js';

const uploadModalElement = document.querySelector('.img-upload__overlay');
const uploadModalCloseElement = document.getElementById('upload-cancel');
const uploadModalForm = document.getElementById('upload-select-image');
const submitButton = document.getElementById('upload-submit');
const filenameInput = document.querySelector('[name="filename"]');
const hashtagInput = document.querySelector('[name="hashtags"]');
const descriptionInput = document.querySelector('[name="description"]');
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const previewImage = document.querySelector('.img-upload__preview').querySelector('img');
const effectSliderElement = document.querySelector('.effect-level__slider');
const effectValueElement = document.querySelector('.effect-level__value');
const effectsRadioButtons = document.querySelectorAll('.effects__radio');

const effectFiltersParams = {
  chrome: { min: 0, max: 1, step: 0.1, unit: '', param: 'grayscale' },
  sepia: { min: 0, max: 1, step: 0.1, unit: '', param: 'sepia' },
  marvin: { min: 0, max: 100, step: 1, unit: '%', param: 'invert' },
  phobos: { min: 0, max: 3, step: 0.1, unit: 'px', param: 'blur' },
  heat: { min: 1, max: 3, step: 0.1, unit: '', param: 'brightness' },
};

let scaleValue = 1;
let currentFilter = 'none';

/**
 * Валидация полей формы
 */
const pristine = new Pristine(uploadModalForm, { classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error-text',
  errorTextTag: 'div'
}, true);

const validateHashtag = (value) => value.match(/^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/);

function validateHashtags(value) {
  if (value === '') { return true; }
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


noUiSlider.create(effectSliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

effectSliderElement.noUiSlider.on('update', () => {
  effectValueElement.value = effectSliderElement.noUiSlider.get();
  if(currentFilter !== 'none') {
    previewImage.style.filter = `${effectFiltersParams[currentFilter].param}(${effectValueElement.value}${effectFiltersParams[currentFilter].unit})`;
  }
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохранение фото...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

/**
 * Открытие/Закрытие формы
 */
const onModalEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadModal();
  }
};

function changePreviewScale(value) {
  previewImage.style.scale = `${value}`;
  scaleControlValue.value = `${value * 100}%`;
}

function resetUploadModal() {
  scaleValue = 1;
  currentFilter = 'none';
  previewImage.className = '';
  previewImage.style = '';
  changePreviewScale(1);
  effectSliderElement.hidden = true;
  uploadModalForm.reset();
}

function openUploadModal() {
  effectSliderElement.hidden = true;
  uploadModalElement.classList.remove('hidden');
  document.addEventListener('keydown', onModalEscKeydown);
  document.body.classList.add('modal-open');
}

function closeUploadModal() {
  resetUploadModal();
  uploadModalElement.classList.add('hidden');
  document.removeEventListener('keydown', onModalEscKeydown);
  document.body.classList.remove('modal-open');
}

/**
 * Слушатели событий на элементах формы
 */
filenameInput.addEventListener('change', () => {
  openUploadModal();
});

uploadModalCloseElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeUploadModal();
});

uploadModalForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if(pristine.validate()) {
    blockSubmitButton();
    postPhoto(
      (successText) => {
        showSuccessMessage(successText);
        unblockSubmitButton();
        closeUploadModal();
      },
      (errorText) => {
        showErrorMessage(errorText);
        unblockSubmitButton();
      },
      new FormData(evt.target),
    );
  }
});

hashtagInput.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
  if(isEscapeKey(evt)) { hashtagInput.blur(); }
});

descriptionInput.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
  if(isEscapeKey(evt)) { descriptionInput.blur(); }
});

scaleControlSmaller.addEventListener('click', () => {
  if(scaleValue > 0.25) { changePreviewScale(scaleValue -= 0.25); }
});

scaleControlBigger.addEventListener('click', () => {
  if(scaleValue < 1) { changePreviewScale(scaleValue += 0.25); }
});

effectsRadioButtons.forEach((radioButton) => {
  radioButton.addEventListener('click', () => {
    previewImage.className = `effects__preview--${radioButton.value}`;
    currentFilter = radioButton.value;
    if(currentFilter !== 'none') {
      effectSliderElement.noUiSlider.updateOptions({
        range: {
          min: effectFiltersParams[currentFilter].min,
          max: effectFiltersParams[currentFilter].max,
        },
        start: effectFiltersParams[currentFilter].max,
        step: effectFiltersParams[currentFilter].step,
      });
      effectSliderElement.noUiSlider.set(effectFiltersParams[currentFilter].max);
      effectSliderElement.hidden = false;
    } else {
      previewImage.style.filter = '';
      effectSliderElement.hidden = true;
    }
  });
});
