/*
 * @Description:左边模版列表维护
 * @Author: tkiddo
 * @Date: 2020-11-23 15:18:02
 * @LastEditTime: 2020-12-02 15:29:15
 * @LastEditors: tkiddo
 */

// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcRenderer } = require('electron');
const { createSection, setActiveSection, removeSection } = require('./section.js');

const tplAddBtn = document.querySelector('.add-tpl');
const form = document.querySelector('#tpl-add-form');
const cancelBtn = document.querySelector('#tpl-cancel-btn');
const sureBtn = document.querySelector('#tpl-sure-btn');
const tplList = document.querySelector('.tpl-list');

/**
 * @description: 显示表单
 * @param {*}
 * @return {*}
 */
const showForm = () => {
  form.classList.replace('form-hide', 'form-show');
};

/**
 * @description: 隐藏表单
 * @param {*}
 * @return {*}
 */
const hideForm = () => {
  form.classList.replace('form-show', 'form-hide');
};

/**
 * @description: 激活选中项
 * @param {String} name
 * @return {void}
 */
const setActiveItem = (name) => {
  const allElements = tplList.children;
  Array.prototype.forEach.call(allElements, (ele) => {
    if (ele.getAttribute('data-name') === name) {
      ele.classList.add('tpl-item-active');
    } else {
      ele.classList.remove('tpl-item-active');
    }
  });
  setActiveSection(name);
};

/**
 * @description:根据名字创建元素
 * @param {Object} item
 * @return {HTMLElement}
 */
const createElement = (item) => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('tpl-item');
  wrapper.setAttribute('data-name', item.name);
  const nameElement = document.createElement('div');
  nameElement.classList.add('tpl-name');
  nameElement.innerText = item.name;
  const icon = document.createElement('i');
  icon.classList.add('iconfont', 'icon-ashbin', 'my-icon');
  wrapper.appendChild(nameElement);
  wrapper.appendChild(icon);
  tplList.insertBefore(wrapper, tplList.firstElementChild);
  return wrapper;
};

/**
 * @description: 列表中添加项目
 * @param {Object} item
 * @return {void}
 */
const addItemToList = (item) => {
  ipcRenderer.send('add-tpl-item', item);
};
/**
 * @description: 删除对应元素
 * @param {HTMLElement} item
 * @return {*}
 */
const removeItem = (item) => {
  const previous = item.nextElementSibling;
  const name = previous.getAttribute('data-name');
  setActiveItem(name);
  tplList.removeChild(item);
};

/**
 * @description: 初始化列表
 * @param {*}
 * @return {*}
 */
const initList = () => {
  const result = ipcRenderer.sendSync('get-tpl-list');
  if (Array.isArray(result)) {
    result.forEach((item) => {
      createElement(item);
      createSection(item);
    });
  }

  setActiveItem('welcome');
  // 监听主进程事件，并创建页面元素
  ipcRenderer.on('tpl-item-added', (event, item) => {
    createElement(item);
    createSection(item);
    setActiveItem(item.name);
  });
};

// 取消按钮点击事件
cancelBtn.addEventListener('click', () => {
  hideForm();
});

// 添加按钮点击事件
tplAddBtn.addEventListener('click', () => {
  showForm();
});

// 确定按钮点击事件
sureBtn.addEventListener('click', () => {
  const formData = new FormData(form);
  const name = formData.get('name');
  addItemToList({ name });
  hideForm();
});

// 列表点击事件，代理列表项点击事件
tplList.addEventListener('click', (event) => {
  const { target } = event;
  if (target.getAttribute('class').indexOf('icon-ashbin') !== -1) {
    const selectedItem = target.parentElement;
    removeItem(selectedItem);
    removeSection(selectedItem.getAttribute('data-name'));
    ipcRenderer.send('remove-tpl-item', selectedItem.getAttribute('data-name'));
  } else if (target.getAttribute('class').indexOf('tpl-list') === -1) {
    const selectedItem = target.classList.contains('tpl-item') ? target : target.parentElement;
    const name = selectedItem.getAttribute('data-name');
    setActiveItem(name);
  }
});

initList();
