const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const DEFAULT_SCALE_VALUE = 100;

const increaseButton = document.querySelector('.scale__control--bigger');
const decreaseButton = document.querySelector('.scale__control--smaller');
const scaleValueElement = document.querySelector('.scale__control--value');
const pictureElement = document.querySelector('.img-upload__preview img');

/**
 * Функция по преобразованию получаемого значения
 * @param {number} value получаемое значение
 */
const scalePicture = (value) => {
  pictureElement.style.transform = `scale(${value / 100})`;// передаём процент масштаба изображения
  scaleValueElement.value = `${value}%`;// отображаемое значение в поле ввода
};

/**
 * Увеличение масштаба по клику
 */
const onButtonMoreClick = () => {
  const currentScaleValue = parseInt(scaleValueElement.value, 10);
  const enlargedScaleValue = currentScaleValue + SCALE_STEP;
  if (enlargedScaleValue > MAX_SCALE_VALUE) {
    scalePicture(MAX_SCALE_VALUE);
  } else {
    scalePicture(enlargedScaleValue);
  }
};


/**
 * Уменьшение масштаба по клику
 */
const onButtonLessClick = () => {
  const currentScaleValue = parseInt(scaleValueElement.value, 10);
  const reducedScaleValue = currentScaleValue - SCALE_STEP;
  if (reducedScaleValue < MIN_SCALE_VALUE) {
    scalePicture(MIN_SCALE_VALUE);
  } else {
    scalePicture(reducedScaleValue);
  }
};


/**
 * Установка по умолчанию
 */
const resetScale = () => scalePicture(DEFAULT_SCALE_VALUE);

const addButtonScaleHandler = () => {
  increaseButton.addEventListener('click', onButtonMoreClick);
  decreaseButton.addEventListener('click', onButtonLessClick);
};

export { resetScale, addButtonScaleHandler };
