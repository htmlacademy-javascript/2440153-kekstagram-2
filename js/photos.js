import { photosData } from './mock.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

const createThumbnail = (photo) => {
  const thumbnail = template.cloneNode(true);
  const image = thumbnail.querySelector('.picture__img');

  image.src = photo.url;
  image.dataset.id = photo.id;
  image.alt = photo.description;
  thumbnail.href = photo.url;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;

  return thumbnail;
};

photosData.forEach((photoData) => {
  const thubnail = createThumbnail(photoData);
  fragment.append(thubnail);
});

container.append(fragment);
