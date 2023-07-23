import {getPhotoData} from './data.js';
import {renderGallery} from './gallery.js';
import {renderAllSmallPhotos} from './small-photo-1.js';
renderAllSmallPhotos(getPhotoData);
renderGallery(getPhotoData());
