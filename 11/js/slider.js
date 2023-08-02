import { sliderEffects } from './slider-filters-value.js';

const sliderElement = document.querySelector('.effect-level__slider');
const valueEffectElement = document.querySelector('.effect-level__value');
const sliderConainerElement = document.querySelector('.img-upload__effect-level');
const effectsElement = document.querySelector('.effects__list');
const picturePreview = document.querySelector('.img-upload__preview img');


/**
 * Функция по изменению фильтров слайдера
 * @param {object} effect имя выбраного фильтра
 * @param {object} value значение ползунока выбраного фильтра
 * @param {object} unit единица измерения выбраного фильтра
 */
const changeSliderEffect = (effect, value, unit) => {
  valueEffectElement.value = value;//берёт значение из ползунка
  picturePreview.style.filter = `${effect}(${value}${unit})`;//шаблонная строка добавляет атрибут style
};


/**
 * отображение слайдера
 * @param {object} effects
 */
const createSliderEffect = (effects) => {
  const {min, max, step} = effects;
  noUiSlider.create(sliderElement, {
    range: {
      min: min,
      max: max
    },
    start: max,
    step: step,
    connect: 'lower'
  });

  sliderElement.noUiSlider.on('update', () => {
    valueEffectElement.value = sliderElement.noUiSlider.get();
    changeSliderEffect(effects.name, valueEffectElement.value, effects.unit);
  });
};

const showSliderEffect = (effects) => {
  sliderConainerElement.classList.remove('hidden');
  createSliderEffect(effects);
};


/**
 * Скрываем слайдер
 */
const hideSlider = () => {
  sliderConainerElement.classList.add('hidden');
};


/**
 * Сброс эффектов
 */
const resetEffect = () => {
  hideSlider();
  valueEffectElement.value = null;
  picturePreview.style.filter = null;
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
};


/**
 * функция по изменению эффектов при использовании бегунка
 * @param {object} evt объект события
 * @returns
 */
const onChangeEffect = (evt) => {
  resetEffect();
  const effects = sliderEffects[evt.target.value];

  if (effects.name === 'none') {
    picturePreview.removeAttribute ('style');
    return;
  }
  showSliderEffect(effects);
};


/**
 * включение слайдера
 */
const addSliderEffectHandler = () => {
  effectsElement.addEventListener('change', onChangeEffect);
};

export { addSliderEffectHandler, hideSlider, resetEffect };
