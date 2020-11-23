const form = document.querySelector('.form');
const cancelBtn = document.querySelector('.cancel-btn');

exports.showForm = () => {
  form.classList.replace('form-hide', 'form-show');
};

exports.hideForm = () => {
  form.classList.replace('form-show', 'form-hide');
};

cancelBtn.addEventListener('click', () => {
  this.hideForm();
});
