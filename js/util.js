const getRandomNumber = function(leftEdge, rightEdge) {
  const minimum = Math.ceil(Math.min(Math.abs(leftEdge), Math.abs(rightEdge)));
  const maximum = Math.floor(Math.max(Math.abs(leftEdge), Math.abs(rightEdge)));
  return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
};

function getRandom(arr, n) {
  const result = new Array(n);
  let len = arr.length;
  const taken = new Array(len);
  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const isEscapeKey = (evt) => evt.key === 'Escape';

export { getRandom, getRandomNumber, debounce, isEscapeKey };
