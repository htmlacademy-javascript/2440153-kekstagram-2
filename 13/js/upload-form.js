import { sendData } from './api';
import { isEscapeKey } from './utils';
import { pristineConfig } from './validation';
import { showErrorDownloadMessage, showSuccessMessage } from './alert-message';

const submitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const body = document.querySelector('body');
const imageUploadForm = document.querySelector('.img-upload__form');

const submitButton = imageUploadForm.querySelector('.img-upload__submit');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageUploadOverlay = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadCancel = imageUploadOverlay.querySelector('.img-upload__cancel');
const imageUploadPreview = imageUploadOverlay.querySelector('.img-upload__preview img');
const effectsPreview = imageUploadOverlay.querySelectorAll('.effects__preview');


const textHashtags = imageUploadOverlay.querySelector('.text__hashtags');
const commentInput = imageUploadOverlay.querySelector('.text__description');


const isTextFieldFocused = () => document.activeElement === textHashtags || document.activeElement === commentInput;

const closeUploadOverlay = () => {
  imageUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  URL.revokeObjectURL(imageUploadPreview.src);

  effectsPreview.forEach((item) => {
    item.style.backgroundImage = '';
  });


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
  const file = imageUploadInput.files[0];
  const currentFile = file.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => currentFile.endsWith(type));

  if (matches) {
    const fileUrl = URL.createObjectURL(file);

    imageUploadPreview.src = fileUrl;
    effectsPreview.forEach((item) => {
      item.style.backgroundImage = `url(${fileUrl})`;
    });
  }

  evt.preventDefault();
  openUploadOverlay();
});

imageUploadCancel.addEventListener('click', () => {
  closeUploadOverlay();
});

imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristineConfig.validate();

  if (isValid) {
    blockSubmitButton();

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
