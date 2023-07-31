const BASE_URL = 'https://29.javascript.pages.academy/kekstagram'; //адрес удаленного сервера
const Route = { //выпор пути для метода отправки
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = { //методы для отправки
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = { //текст для показа ошибки
  GET_DATA: 'Обновите страницу, данные не загружены',
  SEND_DATA: 'Попробуйте снова, форма не отправлена.',
};

/**
 * функция загрузки данных
 * @param {string} route путь
 * @param {string} errorText текст ошибки
 * @param {string} method метод отправки
 * @param {any} body полезные данные, null по дефолту
 * @returns fetch - промис
 */
const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body }) //передается путь, аргумент настроек
    .then((response) => { //объект ответа
      if (!response.ok) { //сервер ответил кодом, кот не является положительным
        throw new Error(`Произошла ошибка ${response.status}: ${response.statusText}`);
      }
      return response.json(); //данные кот вернул сервер
    })
    .catch(() => { //если промис не разрешился, произошла ошибка
      throw new Error(errorText);
    });

/**
 * получение данных с сервера методом GET, при невозможности получить выдаст текст ошибки
 * @returns данные в формате JSON
 */
const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

/**
 * отправка формы при помощи POST
 * @param {*} body данные для отправки формы(путь, текст ошибки, метод)
 */
const sendData = (body) =>
  load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export { getData, sendData };
