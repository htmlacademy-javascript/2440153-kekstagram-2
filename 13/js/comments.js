import { getPluralWord } from './utils.js';

const MAX_COMMENTS_VIEW = 5;

const bigPicture = document.querySelector('.big-picture');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialCommentsContainer = bigPicture.querySelector('.social__comments');
const socialComment = bigPicture.querySelector('.social__comment');
const commentCountContainer = bigPicture.querySelector('.social__comment-count');
const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');

let currentListComments = [];
let currentCommentsCount = 0;

const renderOneComment = ({ avatar, name, message }) => {
  const newComment = socialComment.cloneNode(true);
  const authorsImage = newComment.querySelector('.social__picture');

  authorsImage.src = avatar;
  authorsImage.alt = name;
  newComment.querySelector('.social__text').textContent = message;
  return newComment;
};

const renderComments = (comments) => {
  comments.forEach((comment) => {
    socialCommentsContainer.append(renderOneComment(comment));
  });
};

export const initComments = (comments) => {
  const showCommentText = commentCountContainer.childNodes[4];
  const word = getPluralWord(comments.length, ['комментарий', 'комментария', 'комментариев']);

  if (comments.length <= MAX_COMMENTS_VIEW) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  commentTotalCount.textContent = comments.length;
  showCommentText.textContent = `${word.padStart(word.length + 1)}`;
  socialCommentsContainer.innerHTML = '';

  currentListComments = comments;
  currentCommentsCount = Math.min(comments.length, MAX_COMMENTS_VIEW);
  commentShownCount.textContent = currentCommentsCount;

  renderComments(currentListComments.slice(0, currentCommentsCount));
};

commentsLoader.addEventListener('click', () => {
  const previousCommentsCount = currentCommentsCount;

  currentCommentsCount = Math.min(currentListComments.length, currentCommentsCount + MAX_COMMENTS_VIEW);

  const newCommentsBatch = currentListComments.slice(previousCommentsCount, currentCommentsCount);

  renderComments(newCommentsBatch);
  commentShownCount.textContent = currentCommentsCount;

  if (currentCommentsCount >= currentListComments.length) {
    commentsLoader.classList.add('hidden');
  }
});
