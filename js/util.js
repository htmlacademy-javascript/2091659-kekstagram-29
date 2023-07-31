const isEscapeKey = (evt) => evt.key === 'Escape';


/**
 * функция debounce
 * @param callback
 * @param {number} timeDelay - задержка в миллисекундах
 * @returns
 */
function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);//устанавливаем время задержки с вызовом callback на эту же задержку
  };
}

export { isEscapeKey, debounce };
