import { isEscapeKey } from '../util.js';

const bigPicture = document.querySelector('.big-picture');
const image = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const descriptionNode = bigPicture.querySelector('.social__caption');
const showedCommentsCount = bigPicture.querySelector('.showed-comments-count');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const revealMoreButton = document.querySelector('.comments-loader');

function revealComments(comments) {
  let counter = 0;
  comments.forEach((comment) => {
    const commentNode = commentTemplate.cloneNode(true);
    const commentImage = commentNode.querySelector('img');
    commentImage.src = comment.avatar;
    commentImage.alt = comment.name;
    commentNode.querySelector('p').textContent = comment.message;

    commentsList.append(commentNode);
    counter++;
  });
  return counter;
}

const revealPicture = function(url, likes, comments, description) {
  let revealedCommentsCount = 0;
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  commentsList.innerHTML = '';
  image.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  descriptionNode.textContent = description;
  showedCommentsCount.textContent = 0;

  revealMoreButton.addEventListener('click', () => {
    revealedCommentsCount += revealComments(comments.slice(revealedCommentsCount, revealedCommentsCount + 5));
    showedCommentsCount.textContent = revealedCommentsCount;
    if (comments.length === revealedCommentsCount) {
      revealMoreButton.classList.add('hidden');
    } else {
      revealMoreButton.classList.remove('hidden');
    }
  });

  revealMoreButton.click();
};

const closePicture = function() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

closeButton.addEventListener('click', closePicture);
document.body.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePicture();
  }
});

export { revealPicture };
