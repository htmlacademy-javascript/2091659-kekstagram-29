import { isEscapeKey } from './util.js';

const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success');


/**
 * закрытие сообщения с помощью клавиатуры
 * @param {object} evt объект события
 */
const onMessageEscape = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};


/**
 * закрытие сообщения при клике по документу
 * @param {object} evt объект события
 */
const onBodyClick = (evt) => {
  if (evt.target === document.querySelector('.error, .success')) {
    evt.preventDefault();
    closeMessage();
  }
};


/**
 * функция закрытия сообщения
 */
function closeMessage () {
  const messageElement = document.querySelector('.error, .success');
  messageElement.remove();
  document.addEventListener('keydown', onMessageEscape);
  document.removeEventListener('click', onBodyClick);
}


/**
 * функция по показу сообщения
 * @param {*} messageElement сообщение
 * @param {*} closeBtnClass класс кнопки
 */
const showMessage = (messageElement, closeButtonClass) => {
  document.body.append(messageElement);
  document.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onMessageEscape);
  messageElement.querySelector(closeButtonClass).addEventListener('click', closeMessage);
};


/**
 * функция по показу сообщения об успешной загрузки изображения
 */
const showSuccessMessage = () => {
  showMessage(successMessage, '.success__button');
};


/**
 * функция по показу сообщения с ошибкой загрузки изображения
 */
const showErrorMessage = () => {
  showMessage(errorMessage, '.error__button');
};

export { showSuccessMessage, showErrorMessage };
