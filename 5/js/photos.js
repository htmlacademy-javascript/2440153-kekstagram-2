const template = document.querySelector('#picture').content;

const createThumbnail = ({ id, comments, likes, url, description }) => {
  const thumbnail = template.cloneNode(true);

  const commentsContainer = thumbnail.querySelector('.picture__comments');
  const likesContainer = thumbnail.querySelector('.picture__likes');
  const image = thumbnail.querySelector('.picture__img');

  thumbnail.children[0].dataset.id = id;
  commentsContainer.textContent = comments.length;
  likesContainer.textContent = likes;
  image.src = url;
  image.alt = description;

  return thumbnail;
};

export const setThumbnails = (photos, container) => {
  const fragment = document.createDocumentFragment();
  photos.forEach((photoItem) => {
    const thumbnail = createThumbnail(photoItem);
    fragment.appendChild(thumbnail);
  });

  container.appendChild(fragment);
};
