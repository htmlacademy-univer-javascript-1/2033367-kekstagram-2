const bigPicture = document.querySelector('.big-picture');
const image = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const descriptionNode = bigPicture.querySelector('.social__caption');

const closeButton = bigPicture.querySelector('.big-picture__cancel');

const revealMiniature = function (url, likes, comments, description) {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');

  commentsList.innerHTML = '';
  image.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  descriptionNode.textContent = description;

  comments.forEach(comment => {
    let commentNode = commentTemplate.cloneNode(true);
    let commentImage = commentNode.querySelector('img');
    commentImage.src = comment.avatar;
    commentImage.alt = comment.name;
    commentNode.querySelector('p').textContent = comment.message;

    commentsList.append(commentNode);
  });  
};

const closeMiniature = function() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.querySelector('.social__comment-count').classList.remove('hidden');
  document.querySelector('.comments-loader').classList.remove('hidden');
};

closeButton.addEventListener('click', closeMiniature);
document.body.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMiniature();
});

export { revealMiniature };
