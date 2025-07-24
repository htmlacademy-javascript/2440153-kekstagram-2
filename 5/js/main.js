import { photosData } from './mock';
import { setThumbnails } from './photos';

const container = document.querySelector('.pictures');

setThumbnails(photosData, container);
