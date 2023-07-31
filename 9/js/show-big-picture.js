const COMMENTS_PER_PORTION = 5;
const bigPicture = document.querySelector('.big-picture');//Ищем модалку
const bodyElement = document.querySelector('body'); //Ищем  тег <body>, чтобы присвоить класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле
const modalCloseButton = bigPicture.querySelector('.big-picture__cancel');//Внутри модалки ищем кнопку закрытия
const bigPictureComments = bigPicture.querySelector('.social__comments');//Ищем список комментариев
const commentElement = bigPicture.querySelector('.social__comment');//Ищем элемент списка комментариев
const commentsCount = bigPicture.querySelector('.social__comment-count');//счетчик количества комментариев
const commentsButttonLoad = document.querySelector('.social__comments-loader');//кнопка загрузки новой партии комментариев

let commentsShown = 0;
let comments = [];


/**
 * Создание одного коментария
 * @param {object}
 * @returns {object}
 */
const createComment = ({ avatar, name, message }) => {
  const comment = commentElement.cloneNode(true);
  const avatarPicture = comment.querySelector('.social__picture');
  avatarPicture.src = avatar;
  avatarPicture.alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};


/**
 * Создание массива/списка комментариев
 */
const renderComments = () => {
  commentsShown += COMMENTS_PER_PORTION;
  if (commentsShown >= comments.length) {
    commentsButttonLoad.classList.add('hidden');
    commentsShown = comments.length;
  } else{
    commentsButttonLoad.classList.remove('hidden');
  }

  const commentsFragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const comment = createComment(comments[i]);
    commentsFragment.append(comment);
  }

  bigPictureComments.innerHTML = '';
  bigPictureComments.append(commentsFragment);
  commentsCount.textContent = `${commentsShown} из ${comments.length} комментариев`;
};


/**
 * Дейстия при закрытите модального окна
 */
const closeModalWindow = () => {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener ('keydown', documentKeydownHandler);
  modalCloseButton.removeEventListener('click', renderComments);
  commentsShown = 0;
};


/**
 * Событие нажатие клавиши, проверка что esc и закрытие модального окна
 * @param {*} evt  нажатие кнопки Esc
 */
function documentKeydownHandler(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeModalWindow();
  }
}


/**
 * функция по отбражению коментов, при нажатии на кнопку
 * @param {object} evt копка показать еще
 */
function commentsButttonLoadHandler (evt) {
  evt.preventDefault();
  renderComments();
}


/**
 * Функция по отрисовки карточки при открытии в модалке
 * @param {*} объект
 */
const renderPictureInformation = ({url, likes, description}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};


/**
 * Открытие модального окна
 * @param {*} data
 */
const showBigPicture = (data) => {
  comments = data.comments;
  bigPicture.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsButttonLoad.classList.remove('hidden');
  commentsCount.classList.remove('hidden');
  document.addEventListener ('keydown', documentKeydownHandler);
  commentsButttonLoad.addEventListener('click', commentsButttonLoadHandler);
  renderPictureInformation(data);
  renderComments(data.comments);

};


/**
 * закрытие модалки по клику на кнопку закрытия
 */
modalCloseButton.addEventListener('click', () => {
  closeModalWindow();
});

export {showBigPicture};
