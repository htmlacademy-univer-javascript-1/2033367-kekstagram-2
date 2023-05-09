const fileInput = document.getElementById('upload-file');
const preview = document.querySelector('.img-upload__preview img');

const FILE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif'];

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];

  const matches = FILE_EXTENSIONS.some((extension) => file.name.toLowerCase().endsWith(extension));

  if(matches) {
    preview.src = URL.createObjectURL(file);
  }
});
