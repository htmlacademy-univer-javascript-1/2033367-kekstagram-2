const getPhotos = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => { onSuccess(photos); })
    .catch(() => {
      onFail('Не удалось получить данные от сервера, попробуйте ещё раз!');
    });
};

const postPhoto = (onSuccess, onFail, body) => {
  fetch('https://26.javascript.pages.academy/kekstagram', 
  {
    method: 'POST',
    body,
    // headers: {
    //   'Content-Type': 'multipart/form-data', 
    // },
    // mode: 'no-cors',
  })
    .then((response) => {
      if(response.ok) {
        onSuccess('Фотография успешно загружена!');
      } else {
        onFail('При загрузке фото произошла ошибка, попробуйте ещё раз!');
      }
    })
    .catch(() => {
      onFail('При загрузке фото произошла ошибка, попробуйте ещё раз!');
    });
};

export { getPhotos, postPhoto }