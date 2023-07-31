import { getData, sendData } from './data.js';
import { renderThumbnails } from './thumbnails.js';
//import { renderGallery } from './gallery.js';
import { setOnFormSubmit, closeEditorPicture } from './upload-picture.js';
import { showAlert } from './alert.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { renderFilteredPictures } from './filter-pictures.js';
import { debounce } from './util.js';


//отправляем форму
setOnFormSubmit(async (data) => {
  try {
    await sendData(data);//отправляем данные
    closeEditorPicture();//закрываем подложку
    showSuccessMessage();//сообщение при успешной отправке
  } catch {
    showErrorMessage();//сообщение при неудачной отправке
  }
});

try {
  const pictureData = await getData();//получаем данные
  const debouncedRenderThumbnails = debounce(renderThumbnails);
  renderThumbnails(pictureData);// отрисовываем первоначально полученные данные загрузки
  //renderGallery(pictureData);
  renderFilteredPictures(pictureData, debouncedRenderThumbnails);//рисуем отсортированные данные
} catch (error) {
  showAlert(error.message);//сообщение при ошибке
}
