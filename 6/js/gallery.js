import {renderAllSmallPhotos} from './small-photo-1.js';
import {showBigPicture} from './show-big-picture.js';

const container = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const smallPicture = evt.target.closest('[data-small-photo-id]');
    if (!smallPicture) {
      return;
    }

    evt.preventDefault();
    const picture = pictures.find(
      (item) => item.id === +smallPicture.dataset.smallPhotoId
    );
    showBigPicture(picture);
  });

  renderAllSmallPhotos(pictures);
};

export {renderGallery};
