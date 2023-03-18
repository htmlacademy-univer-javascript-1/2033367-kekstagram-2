const mockMessages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const mockNames = [
  'Анна',
  'Антон',
  'Анастасия',
  'Андрей',
  'Алексей',
  'Василий',
  'Владислав',
  'Георгий',
  'Данилл',
  'Елена',
];


const getRandomNumber = function (leftEdge, rightEdge) {
  const minimum = Math.ceil(Math.min(Math.abs(leftEdge), Math.abs(rightEdge)));
  const maximum = Math.floor(Math.max(Math.abs(leftEdge), Math.abs(rightEdge)));
  return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
};

const checkStringLength = (checkedString, maxLength) => checkedString.length <= maxLength;

const createMockComments = (commentsCount) => {
  const comments = [];
  for (let i = 0; i < commentsCount; i++) {
    const commentObj = {
      id: i,
      avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
      message:
      `${mockMessages[getRandomNumber(0, mockMessages.length - 1)]}
      ${mockMessages[getRandomNumber(0, mockMessages.length - 1)]}`,
      name: mockNames[getRandomNumber(0, mockNames.length - 1)],
    };
    comments.push(commentObj);
  }

  return comments;
};

const createMockDescriptions = (rowsCount) => {
  const descriptions = [];
  for (let i = 1; i <= rowsCount; i++) {
    const descriptionObj = {
      id: rowsCount,
      url: `photos/${rowsCount}.jpg`,
      description: 'Крутая фотография моего кота',
      likes: getRandomNumber(15, 200),
      comments: createMockComments(getRandomNumber(1, 10)),
    };
    descriptions.push(descriptionObj);
  }

  return descriptions;
};

checkStringLength('qwerty', 7);
createMockDescriptions(25);
