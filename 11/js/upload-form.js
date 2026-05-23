import { sendData } from './api';
import { isEscapeKey } from './utils';
import { pristineConfig } from './validation';
import { showErrorDownloadMessage, showSuccessMessage } from './alert-message';

const submitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const body = document.querySelector('body');
const imageUploadForm = document.querySelector('.img-upload__form');

const submitButton = imageUploadForm.querySelector('.img-upload__submit');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageUploadOverlay = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadCancel = imageUploadOverlay.querySelector('.img-upload__cancel');

const textHashtags = imageUploadOverlay.querySelector('.text__hashtags');
const commentInput = imageUploadOverlay.querySelector('.text__description');


const isTextFieldFocused = () => document.activeElement === textHashtags || document.activeElement === commentInput;

const closeUploadOverlay = () => {
  imageUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imageUploadForm.reset();
  pristineConfig.reset();
  document.removeEventListener('keydown', onUploadKeydown);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = submitButtonText.SENDING;
};

const unBlockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = submitButtonText.IDLE;
};

const openUploadOverlay = () => {
  imageUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onUploadKeydown);
};

function onUploadKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeUploadOverlay();
  }
}

imageUploadInput.addEventListener('change', (evt) => {
  evt.preventDefault();
  openUploadOverlay();
});

imageUploadCancel.addEventListener('click', () => {
  closeUploadOverlay();
});

imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  blockSubmitButton();
  const isValid = pristineConfig.validate();

  if (isValid) {
    const formData = new FormData(evt.target);

    sendData(formData)
      .then(() => {
        closeUploadOverlay();
        showSuccessMessage();
      })

      .catch(() => {
        showErrorDownloadMessage();
      })

      .finally(() => {
        unBlockSubmitButton();
      });
  }

});
