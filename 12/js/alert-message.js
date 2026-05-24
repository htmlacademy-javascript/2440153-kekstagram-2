import { isEscapeKey } from './utils';

const body = document.querySelector('body');

const createMessage = (templateId, buttonClass, stopPropagation = false) => {
  const template = document.querySelector(`#${templateId}`).content;
  const messageElement = template.querySelector(`.${templateId}`).cloneNode(true);
  const closeButton = messageElement.querySelector(buttonClass);

  body.append(messageElement);

  const closeMessage = () => {
    messageElement.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  function onDocumentKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();

      if (stopPropagation) {
        evt.stopPropagation();
      }
      closeMessage();
    }
  }

  closeButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onDocumentKeydown);

  messageElement.addEventListener('click', (evt) => {
    if (evt.target === messageElement) {
      closeMessage();
    }
  });
};

const showSuccessMessage = () => createMessage('success', '.success__button');
const showErrorDownloadMessage = () => createMessage('error', '.error__button', true);

const showDataErrorMessage = () => {
  const templateDataError = document.querySelector('#data-error');
  const dataError = templateDataError.content.querySelector('.data-error');
  const showMessage = dataError.cloneNode(true);

  body.append(showMessage);

  setTimeout(() => showMessage.remove(), 5000);
};

export { showErrorDownloadMessage, showSuccessMessage, showDataErrorMessage };
