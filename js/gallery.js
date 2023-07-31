import { showBigPicture } from './show-big-picture.js';
const container = document.querySelector('.pictures');

/**
 * отрисовка выбранной картинки в модалке
 * @param {*} pictures
 */
const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }
    evt.preventDefault();
    const picture = pictures.find(
      (itemPictures) => itemPictures.id === +thumbnail.dataset.thumbnailId
    );
    showBigPicture(picture);
  });
};

export { renderGallery };
