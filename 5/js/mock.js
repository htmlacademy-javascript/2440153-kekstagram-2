import { generateId, getRandomNumber, getRandomArrayElement } from './utils';

const DESCRIPTIONS = ['Яркий рассвет', 'Задумчивый кот', 'Шумный водопад', 'Старая книга', 'Одинокая скамейка', 'Сонный кактус', 'Горячий кофе', 'Туманный лес', 'Веселый щенок', 'Ржавый велосипед', 'Бескрайнее море', 'Забытый ключ', 'Сочный арбуз', 'Золотые поля', 'Загадочная тень', 'Искрящийся иней', 'Высокий небоскреб', 'Свежий дождь', 'Грустный клоун', 'Горящий камин', 'Цветущий сад', 'Пустой перрон', 'Лунная дорожка', 'Пестрый попугай', 'Исчезающий след'];
const AUTORS = ['Александр', 'София', 'Дмитрий', 'Анастасия', 'Максим', 'Мария', 'Иван', 'Екатерина', 'Кирилл'];
const COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const MAX_PHOTOS_LENGTH = 25;
const MAX_COMMENTS_LENGTH = 30;
const MIN_LIKES_LENGTH = 15;
const MAX_LIKES_LENGTH = 200;
const MIN_AVATAR_NUMBER = 1;
const MAX_AVATAR_NUMBER = 6;

const photoId = generateId();
const commentId = generateId();

const generateComment = () => ({
  id: commentId(),
  avatar: `img/avatar-${getRandomNumber(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER)}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(AUTORS),
});

const generatePhoto = () => {
  const id = photoId();

  return {
    id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomNumber(MIN_LIKES_LENGTH, MAX_LIKES_LENGTH),
    comments: Array.from({ length: getRandomNumber(MAX_COMMENTS_LENGTH) }, generateComment),
  };
};

export const photosData = Array.from({ length: MAX_PHOTOS_LENGTH }, generatePhoto);

