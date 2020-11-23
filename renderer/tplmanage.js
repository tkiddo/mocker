const tplAddBtn = document.querySelector('.add-tpl');
const { showForm } = require('./form.js');

tplAddBtn.addEventListener('click', () => {
  showForm();
});
