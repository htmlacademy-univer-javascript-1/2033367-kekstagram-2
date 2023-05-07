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
let currentComments = undefined;


const revealComments = function(offset) {
  let revealedCommentsCount = +showedCommentsCount.textContent;
  currentComments.slice(revealedCommentsCount, revealedCommentsCount + offset).forEach(comment => { 
    const commentNode = commentTemplate.cloneNode(true);
    const commentImage = commentNode.querySelector('img');
    commentImage.src = comment.avatar;
    commentImage.alt = comment.name;
    commentNode.querySelector('p').textContent = comment.message;

    commentsList.append(commentNode);
    revealedCommentsCount++;
  });

  showedCommentsCount.textContent = revealedCommentsCount;
  if (currentComments.length === revealedCommentsCount) {
    document.querySelector('.comments-loader').classList.add('hidden');
  } else {
    document.querySelector('.comments-loader').classList.remove('hidden');
  }
}

const revealMiniature = function(url, likes, comments, description) {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  commentsList.innerHTML = '';
  image.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  descriptionNode.textContent = description;
  showedCommentsCount.textContent = 0;
  currentComments = comments;
  revealComments(5);

  document.querySelector('.comments-loader').addEventListener('click', () => {
    revealComments(5);  
  });
};

const closeMiniature = function() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

closeButton.addEventListener('click', closeMiniature);
document.body.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMiniature();
  }
});

export { revealMiniature };
