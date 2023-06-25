const MESSAGES = [
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
]

const NAMES = [
  'Синий Трактор',
  'Терминатор',
  'Лунтик',
  'Джон Уик',
  'Мамкин ютубер',
  'Бумбараш'
]

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
]

const MAX_PHOTO_COUNT = 25;

const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;

const createId = () => {
  let count =0;
  return function () {
    count++;
  }
}

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};


/**
 * @returns {number} id  порядковый номер описания фотографии
 * @returns {string} url адрес фотографии
 * @returns {string} description описание фотографии
 * @returns {number} likes счетчик лайков
 * @returns {Array} comments массив комментариев других пользователей
 */
const createPhotoDescription = () => {
  const getId = createId();
  const getUrl = getRandomInteger(0, MAX_PHOTO_COUNT);
  const getDescription = getRandomInteger(0, DESCRIPTION.length - 1);
  const getLikes = getRandomInteger (MIN_LIKES_COUNT, MAX_LIKES_COUNT);


  return {
    id: getId,
    url: `photos/${getUrl}.jpg`,
    description: getDescription,
    likes: getLikes,
    comments:''
  };
}

console.log(createPhotoDescription());
