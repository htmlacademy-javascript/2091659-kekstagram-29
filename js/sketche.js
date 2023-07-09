/**
 * Поиск содержимого шаблона.
 */
const sketcheTemplate = document.querySelector('#picture').content.querySelector('.picture');

/**
 * Поиск элемента(контейнера) куда будем складывать созданные элементы с фотографиями.
 */
const sketcheContainer = document.querySelector('.pictures');

/**
 * Создание элемента/ карточки фотографии
 * @param {object}   используем параметры предоставленного объекта
 * @returns {object}
 */
const createSketche = ({url, description, likes, comments}) => {
  /**
   * Клонирование шаблона
   */
  const C = sketcheTemplate.cloneNode(true);

  /**
   * Заполнение свойст объекта(карточки)
   */
  sketche.querySelector('.picture__img').scr = url;
  sketche.querySelector('.picture__img').alt = description;
  sketche.querySelector('.picture__likes').textContent = likes;
  sketche.querySelector('.picture__comments').textContent = comments.length;

  /**
   * Возвращаем созданную наполненнуб карточку(объект).
   */
  return sketche;
};

/**
 * Отрисовка карточек
 */
const renderSketches = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const sketche = createSketche(picture);
    fragment.append(sketche);
  });

  sketcheContainer.append(fragment);
};

export {renderSketches};
