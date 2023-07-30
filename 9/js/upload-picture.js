import { isEscapeKey } from './util.js';
import { resetScale, addButtonScaleHandler } from './scale.js';
import { addSliderEffectHandler, hideSlider, resetEffect} from './slider.js';

const MAX_HASHTAGS_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ERROR_TEXT = {
  invalidCount: `не более ${MAX_HASHTAGS_COUNT} хэш-тэгов`,
  invalidHashtag: 'ошибка при вводе хеш-тега',
  notUnique: 'хэш-тэг повторяется',
};
const SubmitButtonText = { //текст на кнопке отправить
  UNBLOCK: 'Сохранить',
  BLOCK: 'Загружаю'
};
const FILE_TYPES = ['gif', 'webp', 'jpeg', 'png', 'avif', 'jpg', 'svg'];
const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const pictureField = form.querySelector('.img-upload__input');
const hashtagsField = form.querySelector('.text__hashtags');
const commentsField = form.querySelector('.text__description');
const cancelButton = form.querySelector('.img-upload__cancel');
const submitButton = form.querySelector('.img-upload__submit');
const picturePreview = document.querySelector('.img-upload__preview img');
const pictureEffectsPreview = document.querySelector('.effects__preview');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

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
 * @param {string} hashtagString значение инпута
 * обрезаем пробелы, # отсоединяем по пробелу, массив с эл прошедшими проверку
 */
const editHashtag = (hashtagString) => hashtagString.trim().split(' ').filter((hashtag) => Boolean(hashtag.length));

/**
 * Функция проверки введия невалидного хэш-тега
 * @param {string} value текущее значение поля
 * перебираем массив на заданные условия, возвращаем true или false
 * .match() возвращает получившиеся совпадения при сопоставлении строки с регулярным выражением
 */
const validateHashtag = (value) => editHashtag(value).every((hashtag) => (hashtag.match(VALID_SYMBOLS)));

/**
 * Функция проверки превышено количество хэш-тегов
 * @param {string} value текущее значение поля
 */
const validateHashtagCount = (value) => editHashtag(value).length <= MAX_HASHTAGS_COUNT;

/**
 * Функция проверки хэш-теги повторяются
 * @param {string} value текущее значение поля
 */
const validateUniqueHashtagName = (value) => {
  const UpperCaseHashtag = editHashtag(value).map((hashtag) => hashtag.toUpperCase());
  return UpperCaseHashtag.length === new Set(UpperCaseHashtag).size;
};


pristine.addValidator(hashtagsField, validateHashtagCount, ERROR_TEXT.invalidCount, 3, true);
pristine.addValidator(hashtagsField, validateHashtag, ERROR_TEXT.invalidHashtag, 2, true);
pristine.addValidator(hashtagsField, validateUniqueHashtagName, ERROR_TEXT.notUnique, 1, true);


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

function onModalWindowEscape(evt) {
  if (isEscapeKey(evt) && !isFieldFocus()) {
    evt.preventDefault();
    closeEditorPicture();
  }
}

cancelButton.addEventListener('click', () => {
  closeEditorPicture();
});


const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.BLOCK;
};

const unBlockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.UNBLOCK;
};

const showUploadPicture = () => {
  const file = pictureField.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    picturePreview.src = URL.createObjectURL(file);
    //const transformPictureEffectsPreview = Array.from(pictureEffectsPreview);
    pictureEffectsPreview.forEach((preview) => {
      preview.style.backgroundImage = `url(${picturePreview.src})`;
    });
  }
};

pictureField.addEventListener('change', () => {
  openEditorPicture();
  showUploadPicture();
});

const setOnFormSubmit = (callback) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      await callback(new FormData(form));
      unBlockSubmitButton();
    }
  });
};

export { setOnFormSubmit, closeEditorPicture};
