import { clearThumbnails } from './thumbnails.js';

const COUNT_RANDOM_PICTURES = 10;
const Filter = {
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
  DEFAULT: 'filter-default'
};

const pictureFilter = document.querySelector('.img-filters');

let currentFilter = Filter.DEFAULT;
let pictures = [];

/**
 * сортировка случайных фото
 */
const getRandomFilteredPicture = () => Math.random() - 0.5;

/**
 * сортировка обсуждаемых фото
 * @param {Array} pictureA массив коментариев
 * @param {Array} pictureB массив коментариев
 */
const getDiscussedFilteredPicture = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

/**
 * сортировка фото по выбраному фильтру
 * @returns отсортированный массив фото
 */
const getFilteredPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...pictures].sort(getRandomFilteredPicture).slice(0, COUNT_RANDOM_PICTURES);
    case Filter.DISCUSSED:
      return [...pictures].sort(getDiscussedFilteredPicture);
    case Filter.DEFAULT:
      return [...pictures];
  }
};

/**
 * обработка клика по фильтрам сортировки
 * @param {*} callback с отрисоваными фото по выбранаму фильтру
 */
const onFilterClick = (callback) => {
  pictureFilter.addEventListener('click', (evt) => {
    clearThumbnails();
    if (evt.target.classList.contains('img-filters__button') && !evt.target.classList.contains('img-filters__button--active')) {
      const clickButton = evt.target;
      pictureFilter.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      clickButton.classList.add('img-filters__button--active');
      currentFilter = clickButton.id;
      callback(getFilteredPictures());
    }
  });
};


/**
 * функция показывает фильтры
 * @param {Array} picturesData - загруженные с сервера фото
 * @param {*} callback
 */
const renderFilteredPictures = (picturesData, callback) => {
  pictureFilter.classList.remove('img-filters--inactive');
  pictures = [...picturesData];
  onFilterClick(callback);
};

export { renderFilteredPictures };
