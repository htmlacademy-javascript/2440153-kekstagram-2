const VALID_HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;

const MAX_LENGTH_IMAGE_UPLOAD_COMMENT = 140;

const imageUploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = imageUploadForm.querySelector('.text__hashtags');
const isCommentValid = imageUploadForm.querySelector('.text__description');

const pristineConfig = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error-text'
});

const normalizeHashtags = (value) => value.trim().toLowerCase().split(/\s+/).filter(Boolean);

function validateHashtagFormat(value) {
  if (!value) {
    return true;
  }

  const hashtags = normalizeHashtags(value);

  return hashtags.every((tag) => VALID_HASHTAG_REGEXP.test(tag));
}

function validateHashtagCount(value) {
  const hashtagCount = normalizeHashtags(value);

  return hashtagCount.length <= 5;
}

function validateHashtagUnique(value) {

  const hashtags = normalizeHashtags(value);
  const hasNoDuplicates = !hashtags.some((item, index) => hashtags.indexOf(item) !== index);

  return hasNoDuplicates;
}

function validCommentTextArea(count) {
  return count.length <= MAX_LENGTH_IMAGE_UPLOAD_COMMENT;
}

pristineConfig.addValidator(
  hashtagsInput,
  validateHashtagFormat,
  'введён невалидный хэштег'
);
pristineConfig.addValidator(
  hashtagsInput,
  validateHashtagCount,
  'превышено количество хэштегов'
);
pristineConfig.addValidator(
  hashtagsInput,
  validateHashtagUnique,
  'хэштеги повторяются'
);

pristineConfig.addValidator(
  isCommentValid,
  validCommentTextArea,
  'длина комментария больше 140 символов'
);


export { pristineConfig };
