const { ipcRenderer } = require('electron');
const { addTab } = require('./tabs');

const tplAddBtn = document.querySelector('.add-tpl');
const form = document.querySelector('#tpl-add-form');
const cancelBtn = document.querySelector('#tpl-cancel-btn');
const sureBtn = document.querySelector('#tpl-sure-btn');
const tplList = document.querySelector('.tpl-list');

const showForm = () => {
  form.classList.replace('form-hide', 'form-show');
};

const hideForm = () => {
  form.classList.replace('form-show', 'form-hide');
};

const setActiveItem = (target) => {
  const allElements = tplList.children;
  Array.prototype.forEach.call(allElements, (ele) => {
    ele.classList.remove('tpl-item-active');
  });
  target.classList.add('tpl-item-active');
};

const addItemToList = (item) => {
  ipcRenderer.send('add-tpl-item', item);
  ipcRenderer.once('task-done', () => {
    const element = document.createElement('div');
    element.classList.add('tpl-item');
    element.innerText = item.name;
    tplList.appendChild(element);
    setActiveItem(element);
  });
};

const initList = () => {
  const result = ipcRenderer.sendSync('get-tpl-list');
  if (Array.isArray(result)) {
    result.forEach((item) => {
      const element = document.createElement('div');
      element.classList.add('tpl-item');
      element.innerText = item.name;
      tplList.appendChild(element);
    });
  }
};

cancelBtn.addEventListener('click', () => {
  hideForm();
});

tplAddBtn.addEventListener('click', () => {
  showForm();
});

sureBtn.addEventListener('click', () => {
  const formData = new FormData(form);
  const name = formData.get('name');
  addItemToList({ name });
  // addTab({ name });
  hideForm();
});

tplList.addEventListener('click', (event) => {
  const { target } = event;
  setActiveItem(target);
});

initList();
