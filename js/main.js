// eslint-disable-next-line no-unused-vars
let userComents = [
  "Всё отлично",
  "В целом всё неплохо.Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !",
];

function userDescriptionPhotography() {
  let userPhotographyList = [];

  for (let i = 0; i < 25; i++) {
    userPhotographyList[i] = {
      id: i + 1,
      url: `photos/${i + 1}.jpg`,
      description: 'Тут я пытаюсь выполнить 4 доамшнее задание!)',
      likes: 5 * (i + 10),
      comments: {
        id: 5 * (i + 5),
        avatar: `img/avatar-${i + 1}.svg`,
        message: userComents[Math.floor(Math.random() * (userComents.length))],
        name: 'Артём'
      },
    };
  }
  return userPhotographyList;
}

console.log(userDescriptionPhotography());

// ф-ия id и url делаем через замыкание!
// для лайков ф-ия рандомное число!
// для

