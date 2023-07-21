/**
 * Получение целого случайного числа из заданного интервала
 * @param {number} a начало, нижняя граница интервало
 * @param {number} b финиш, верхняя граница интервала
 * @returns {number} случайное целое число из интервала
 */
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/**
 * Получение случайного элемента массива
 * @param {Array} elements  массив
 * @returns случайный элемент массива
 */
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export {getRandomInteger, getRandomArrayElement};
