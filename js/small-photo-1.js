/**
 * Находим содержимое шаблона.
 */
const smallPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

/**
 * Находим тэг по классу куда будем складывать созданные элементы с фотографиями.
 */
const smallPhotoContainer = document.querySelector('.pictures');

/**
 * Создание ДОМ элеиента
 * @param {object}   используем параметры предоставленного объекта
 * @returns {object}
 */
const makeOneSmallPhoto = ({url, description, likes, comments, id}) => {
  //Клонирование шаблона
  const smallPhoto = smallPhotoTemplate.cloneNode(true);
  //Заполнение свойст объекта(карточки)
  smallPhoto.querySelector('.picture__img').src = url;
  smallPhoto.querySelector('.picture__img').alt = description;
  smallPhoto.querySelector('.picture__likes').textContent = likes;
  smallPhoto.querySelector('.picture__comments').textContent = comments.length;
  smallPhoto.dataset.smallPhotoId = id;
  //Возвращаем созданную наполненнуб карточку(объект).
  return smallPhoto;
};

/**
 * Отрисовка созданного наполенного ДОМ элементами фрагмента. Фрагмент виртуальнвя сущность для единовреммной отрисовки всех созданных элементов
 */
const renderAllSmallPhotos = (pictures) => {
  const fragment = document.createDocumentFragment();
  const transformPictures = Array.from(pictures);
  transformPictures.forEach((picture) => {
    const smallPhoto = makeOneSmallPhoto(picture);
    fragment.append(smallPhoto);
  });

  smallPhotoContainer.append(fragment);
};

export {renderAllSmallPhotos};
