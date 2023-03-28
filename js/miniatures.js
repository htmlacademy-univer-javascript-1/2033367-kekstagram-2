const pictureTemplate = document.querySelector('#picture').content;
const picturesList = document.querySelector('.pictures');
const picturesListFragment = document.createDocumentFragment();

const createNewPicture = function(url, likes, comments) {
  let newPicture = pictureTemplate.cloneNode(true);
  newPicture.querySelector('.picture__img').src = url;
  newPicture.querySelector('.picture__likes').textContent = likes;
  newPicture.querySelector('.picture__comments').textContent = comments;

  picturesListFragment.appendChild(newPicture);
  picturesList.append(picturesListFragment);
};

export { createNewPicture };

