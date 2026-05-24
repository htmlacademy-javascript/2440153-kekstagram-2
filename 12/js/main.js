import { getData } from './api';
import { showDataErrorMessage } from './alert-message';
import { renderThumbnails } from './photos';
import { renderBigPicture } from './big-picture';
import { initFilters } from './filters';

import './upload-form.js';
import './image-effects.js';

let picturesList = [];

getData()
  .then((pictures) => {
    picturesList = pictures;
    renderThumbnails(pictures);
    initFilters(pictures);
  })
  .catch(() => {
    showDataErrorMessage();
  });


document.body.addEventListener('click', (evt) => {
  const pictureNode = evt.target.closest('.picture');

  if (!pictureNode) {
    return;
  }

  evt.preventDefault();

  const photoId = pictureNode.dataset.id;
  const currentPhoto = picturesList.find((photo) => photo.id === Number(photoId));

  if (currentPhoto) {
    renderBigPicture(currentPhoto);
  }

});
