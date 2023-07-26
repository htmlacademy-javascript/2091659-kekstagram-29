import { isEscapeKey } from './util.js';
import { resetScale, addButtonScaleHandler } from './scale.js';
import { addSliderEffectHandler, hideSlider, resetEffect} from './slider.js';

const MAX_HASHTAGS_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1-19}$/i;
const ERROR_TEXT = {
  invalidCount: `не более ${MAX_HASHTAGS_COUNT} хэш-тэгов`,
  invalidHashtag: 'ошибка при вводе хеш-тега',
  notUnique: 'хэш-тэг повторяется',
};

const SubmitButtonText = { //текст на кнопке отправить
  UNBLOCK: 'Сохранить',
  BLOCK: 'Загружаю'
};


const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');//форма загрузки
const overlay = form.querySelector('.img-upload__overlay');//подложка
const pictureField = form.querySelector('.img-upload__input');//контрол загрузки файла
const hashtagsField = form.querySelector('.text__hashtags'); //input для заполнения хештегов
const commentsField = form.querySelector('.text__description');//input для коментария
const cancelButton = form.querySelector('.img-upload__cancel');//кнопка закрыть
const submitButton = form.querySelector('.img-upload__submit');//кнопка отправить


/**
 * правила для формы  пристин
 */
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

/**
 * функция для открытия подложки
 */
const openEditorPicture = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onModalWindowEscape);
  addButtonScaleHandler();
  addSliderEffectHandler();
  hideSlider();
};

/**
 * функция по определению хештега
 * @param {string} tags значение инпута
 * обрезаем пробелы, # отсоединяем по пробелу, массив с эл прошедшими проверку
 */
const normalHashtag = (hashtagString) => hashtagString.trim().split(' ').filter((hashtag) => Boolean(hashtag.length));

/**
 * Функция проверки введия невалидного хэш-тега
 * @param {string} value текущее значение поля
 * перебираем массив на заданные условия, возвращаем true или false
 * .match() возвращает получившиеся совпадения при сопоставлении строки с регулярным выражением
 */
const validateHashtag = (value) => normalHashtag(value).every((hashtag) => (hashtag.match(VALID_SYMBOLS)));

/**
 * Функция проверки превышено количество хэш-тегов
 * @param {string} value текущее значение поля
 */
const validateHashtagCount = (value) => normalHashtag(value).length <= MAX_HASHTAGS_COUNT;

/**
 * Функция проверки хэш-теги повторяются
 * @param {string} value текущее значение поля
 */
const validateUniqueHashtagName = (value) => {
  const UpperCaseHashtag = normalHashtag(value).map((hashtag) => hashtag.toUpperCase());
  return UpperCaseHashtag.length === new Set(UpperCaseHashtag).size;
};

/**
 * валидаторы хэштэгов
 * на мах количество хэш-тэгов
 * на правильность ввода хэш-тэга
 * на уникальность хэш-тэга
 */
pristine.addValidator(hashtagsField, validateHashtagCount, ERROR_TEXT.invalidCount, 3, true);
pristine.addValidator(hashtagsField, validateHashtag, ERROR_TEXT.invalidHashtag, 2, true);
pristine.addValidator(hashtagsField, validateUniqueHashtagName, ERROR_TEXT.notUnique, 1, true);


/**
 * закрытие подложки
 */
const closeEditorPicture = () => {
  form.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalWindowEscape);
  pristine.reset();
  resetScale();
  resetEffect();
};


/**
 * находим элементы в фокусе
 * @returns {boolean} — true, если попадает в фокус
 */
const isFieldFocus = () => document.activeElement === hashtagsField || document.activeElement === commentsField;

/**
 * закрытия с помощью клавиатуры, кроме случая поле ввода в фокусе
 */
function onModalWindowEscape(evt) {
  if (isEscapeKey(evt) && !isFieldFocus()) {
    evt.preventDefault();
    closeEditorPicture();
  }
}


/**
 * клик на кнопку закрыть
 */
cancelButton.addEventListener('click', () => {
  closeEditorPicture();
});

/**
 * открытие модалки
 */
const uploadPicture = () => {
  pictureField.addEventListener('change', openEditorPicture);
};

/**
 * Блокировка кнопки отправить
 */
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.BLOCK;
};

/**
 * Разблокировка кнопки отправить
 */
const unBlockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.UNBLOCK;
};

/**
 * отправка формы
 * @param {object} cb данные из формы
 */
const setOnFormSubmit = (cb) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(form));
      unBlockSubmitButton();
    }
  });
};

export { setOnFormSubmit, uploadPicture, closeEditorPicture};
