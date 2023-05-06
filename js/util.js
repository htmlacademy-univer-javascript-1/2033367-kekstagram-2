const getRandomNumber = function (leftEdge, rightEdge) {
  const minimum = Math.ceil(Math.min(Math.abs(leftEdge), Math.abs(rightEdge)));
  const maximum = Math.floor(Math.max(Math.abs(leftEdge), Math.abs(rightEdge)));
  return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
};

const checkStringLength = (checkedString, maxLength) => checkedString.length <= maxLength;

const isEscapeKey = (evt) => evt.key === 'Escape';

export { getRandomNumber, checkStringLength, isEscapeKey };
