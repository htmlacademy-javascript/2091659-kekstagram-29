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
const form = document.querySelector('.img-upload__form');//форма загрузки
const overlay = form.querySelector('.img-upload__overlay');//подложка
const pictureField = form.querySelector('.img-upload__input');//контрол загрузки файла
const hashtagsField = form.querySelector('.text__hashtags');//выбираем поле для хэштегов
const commentsField = form.querySelector('.text__description');//выбираем поле для комментариев
const cancelButton = form.querySelector('.img-upload__cancel');//кнопка закрыть
const submitButton = form.querySelector('.img-upload__submit');//кнопка отправить
const picturePreview = document.querySelector('.img-upload__preview img');//загруженное фото для обрабоки
//const pictureEffectsPreview = document.querySelector('.effects__preview');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});


/**
 * открытие подложки
 */
const openEditorPicture = () => {
  overlay.classList.remove('hidden');//показ подложки
  body.classList.add('modal-open');//для отключения прокрутки под подложкой
  document.addEventListener('keydown', onModalWindowEscape);//обработчик закрытия на клавишу
  addButtonScaleHandler();// маштаб
  addSliderEffectHandler();//бегунок слайдера
  hideSlider();//скрывается слайдер при первоночальном показе
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

//валидаторы
pristine.addValidator(hashtagsField, validateHashtagCount, ERROR_TEXT.invalidCount, 3, true);
pristine.addValidator(hashtagsField, validateHashtag, ERROR_TEXT.invalidHashtag, 2, true);
pristine.addValidator(hashtagsField, validateUniqueHashtagName, ERROR_TEXT.notUnique, 1, true);

/**
 * функция для закрытия подложки
 */
const closeEditorPicture = () => {
  form.reset();
  pristine.reset();
  resetScale();
  resetEffect();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalWindowEscape);
};

/**
 * находим элементы в фокусе
 * @returns {boolean} — true, если попадает в фокус
 */
const isFieldFocus = () => document.activeElement === hashtagsField || document.activeElement === commentsField;

/**
 * закрытие подложки с клавиатуры, кроме случяя поле ввода в фокусе
 * @param {object} evt объект события
 */
function onModalWindowEscape(evt) {
  if (isEscapeKey(evt) && !isFieldFocus()) {
    evt.preventDefault();
    closeEditorPicture();
  }
}

//действие при клике на кнопку закрыть
cancelButton.addEventListener('click', () => {
  closeEditorPicture();
});

/**
 *блокировка кнопки отправить
 */
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.BLOCK;
};

/**
 *разблокировка кнопки отправить
 */
const unBlockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.UNBLOCK;
};

/**
 * показ загружаемого пользовательского фото
 */
const showUploadPicture = () => {
  const file = pictureField.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    picturePreview.src = URL.createObjectURL(file);
    //const transformPictureEffectsPreview = Array.from(pictureEffectsPreview);
    //transformPictureEffectsPreview.forEach((pictureEffectsPreview) => {
    //  pictureEffectsPreview.style.backgroundImage = `url(${picturePreview.src})`;
    //});
  }
};


//открытие модалки при событии change
pictureField.addEventListener('change', () => {
  openEditorPicture();
  showUploadPicture();
});


/**
 * отправка формы
 * @param {object} callback данные из формы
 */
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
