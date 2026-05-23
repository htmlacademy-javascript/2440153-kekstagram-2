import { photosData } from './mock.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

const createThumbnails = function (photo) {
  const thubnail = pictureTemplate.cloneNode(true);
  const image = thubnail.querySelector('.picture__img');

  image.src = photo.url;
  thubnail.href = photo.url;
  image.alt = photo.description;
  thubnail.dataset.id = photo.id;
  thubnail.querySelector('.picture__comments').textContent = photo.comments.length;
  thubnail.querySelector('.picture__likes').textContent = photo.likes;

  return fragment.append(thubnail);
};

photosData.forEach((photo) => {
  createThumbnails(photo);
});

container.appendChild(fragment);
