import { initComments } from './comments';
import { isEscapeKey } from './utils';

export const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const image = bigPicture.querySelector('.big-picture__preview img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const cancelBtn = bigPicture.querySelector('.big-picture__cancel');


const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

cancelBtn.addEventListener('click', closeBigPicture);

export const renderBigPicture = (photo) => {

  image.src = photo.url;
  likesCount.textContent = photo.likes;
  socialCaption.textContent = photo.description;

  initComments(photo.comments);

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};
