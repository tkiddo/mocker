const tplAddBtn = document.querySelector('.add-tpl');
const form = document.querySelector('#tpl-add-form');
const cancelBtn = document.querySelector('#tpl-cancel-btn');
const sureBtn = document.querySelector('#tpl-sure-btn');

const showForm = () => {
  form.classList.replace('form-hide', 'form-show');
};

const hideForm = () => {
  form.classList.replace('form-show', 'form-hide');
};

cancelBtn.addEventListener('click', () => {
  hideForm();
});

tplAddBtn.addEventListener('click', () => {
  showForm();
});

sureBtn.addEventListener('click', () => {
  const formData = new FormData(form);
  console.log(formData.get('name'));
});
