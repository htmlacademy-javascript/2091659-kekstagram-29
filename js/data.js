import {getRandomArrayElement} from './util.js';
import {getRandomInteger} from './util.js';

const MESSAGES = [
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Синий Трактор',
  'Терминатор',
  'Лунтик',
  'Джон Уик',
  'Мамкин ютубер',
  'Бумбараш'
];

const DESCRIPTION = [
  'Описание №1',
  'Описание №2',
  'Описание №3',
  'Описание №4',
  'Описание №5',
  'Описание №6',
  'Описание №7',
  'Описание №8',
  'Описание №9',
  'Описание №10',
  'Описание №11',
  'Описание №12'
];

const MAX_PHOTO_COUNT = 25;
const MAX_AVATAR_COUNT = 6;

const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;

const PHOTO_DATA_COUNT = 25;
/*
function createId () {
  let count = 0;
  return function () {
    count++;
  };
}
*/


/**
 * Функция по сооздания объекта с описанием фотографии.
 * @returns {number} id  порядковый номер описания фотографии
 * @returns {string} url адрес фотографии
 * @returns {string} description описание фотографии
 * @returns {number} likes счетчик лайков
 * @returns {Array} comments массив комментариев других пользователей
 */
const createPhotoData = () => ({
  id: getRandomInteger(0, MAX_PHOTO_COUNT),
  url: `photos/${getRandomInteger(0, MAX_PHOTO_COUNT)}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
  comments:{
    id: getRandomInteger(0, MAX_PHOTO_COUNT),
    avatar: `img/avatar-${getRandomInteger(1, MAX_AVATAR_COUNT)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  }
});

const makePhotoData = () => Array.from({length:PHOTO_DATA_COUNT}, createPhotoData);

export {makePhotoData};
