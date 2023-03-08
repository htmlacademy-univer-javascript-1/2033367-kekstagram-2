const getRandomNumber = function (leftEdge, rightEdge) {
  if (rightEdge <= leftEdge) {
    return 'Левая граница диапазона больше или равна правой!';
  } else {
    leftEdge = Math.ceil(leftEdge);
    rightEdge = Math.floor(rightEdge);
    return Math.floor(Math.random() * (rightEdge - leftEdge) + leftEdge);
  }
};

const checkStringLength = (checkedString, maxLength) => checkedString.length <= maxLength;

getRandomNumber(10, 50);
checkStringLength("qwerty", 7);