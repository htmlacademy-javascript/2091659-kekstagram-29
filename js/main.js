import { getData, sendData } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import { renderGallery } from './gallery.js';
import { setOnFormSubmit, closeEditorPicture } from './upload-picture.js';
import { showAlert } from './alert.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { renderFilteredPictures } from './filter-pictures.js';
import { debounce } from './util.js';

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeEditorPicture();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const pictureData = await getData();
  const debouncedRenderThumbnails = debounce(renderThumbnails);
  renderThumbnails(pictureData);
  renderGallery(pictureData);
  renderFilteredPictures(pictureData, debouncedRenderThumbnails);
} catch (error) {
  showAlert(error.message);
}
