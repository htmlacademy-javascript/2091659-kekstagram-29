const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');//Находим содержимое шаблона.
const container = document.querySelector('.pictures');//Находим тэг по классу куда будем складывать созданные элементы с фотографиями.


/**
 * Создание ДОМ элеиента
 * @param {object}   используем параметры предоставленного объекта
 * @returns {object}
 */
const createThumbnail = ({ url, description, likes, comments, id }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true); //Клонирование шаблона
  const pictureImg = thumbnail.querySelector('.picture__img'); //Заполнение свойст объекта(карточки)
  pictureImg.src = url;
  pictureImg.alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.dataset.thumbnailId = id;
  return thumbnail;//Возвращаем созданную наполненнуб карточку(объект).
};


/**
 * Отрисовка созданного наполенного ДОМ элементами фрагмента. Фрагмент виртуальнвя сущность для единовреммной отрисовки всех созданных элементов
 */
const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });
  container.append(fragment);
};

const clearThumbnails = () => {
  container.querySelectorAll('.picture').forEach((thumbnailElement) => {
    thumbnailElement.remove();
  });
};

export { renderThumbnails, clearThumbnails };
