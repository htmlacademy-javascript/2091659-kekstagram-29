import {getPhotoData} from './data.js';
import {renderGallery} from './gallery.js';
import { setOnFormSubmit, uploadPicture, closeEditorPicture } from './upload-picture.js';
renderGallery(getPhotoData());
uploadPicture();
