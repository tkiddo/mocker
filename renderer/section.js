/*
 * @Description: 内容展示区
 * @Author: tkiddo
 * @Date: 2020-11-28 15:10:02
 * @LastEditors: tkiddo
 * @LastEditTime: 2020-12-03 10:30:28
 */
// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcRenderer } = require('electron');

const rightContent = document.querySelector('.right-content');
const detailTemplate = document.querySelector('#tpl-detail');
const protertyTemplate = document.querySelector('#tpl-property');
const form = document.querySelector('#property-add-form');
const cancelBtn = form.querySelector('#property-cancel-btn');
const sureBtn = form.querySelector('#property-sure-btn');

/**
 * @description: 显示表单
 * @param {*}
 * @return {*}
 */
const showForm = (tpl) => {
  form.querySelector('input[name="tpl"]').value = tpl;
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

const generateData = (_name) => {
  const section = document.querySelector(`.detail-section[data-name='${_name}']`);
  const tbody = section.querySelector('tbody');
  const tr = tbody.querySelectorAll('tr');
  const template = {};
  Array.prototype.forEach.call(tr, (item) => {
    const td = item.querySelectorAll('td');
    const name = td[0].textContent;
    const type = td[1].textContent;
    template[name] = type;
  });

  ipcRenderer.send('mock-data', { name: _name, template });
};

const saveTpl = (_name) => {
  const section = document.querySelector(`.detail-section[data-name='${_name}']`);
  const tbody = section.querySelector('tbody');
  const tr = tbody.querySelectorAll('tr');
  const properties = [];
  Array.prototype.forEach.call(tr, (item) => {
    const td = item.querySelectorAll('td');
    const name = td[0].textContent;
    const type = td[1].textContent;
    properties.push({ name, type });
  });
  ipcRenderer.send('update-tpl-item', { name: _name, properties });
};

const createClone = (item) => {
  const { content } = detailTemplate;
  const { name } = item;
  const wrapper = content.querySelector('.detail-section');
  wrapper.setAttribute('data-name', name);
  const titleELe = content.querySelector('.detail-title');
  titleELe.innerText = name;
  const hrefEle = content.querySelector('.api-value');
  hrefEle.innerText = `http://localhost:8080/mock/${name}`;
  const clone = document.importNode(content, true);
  const addBtn = clone.querySelector('.add-property-btn');
  addBtn.addEventListener('click', () => {
    showForm(name);
  });
  const saveBtn = clone.querySelector('.save-tpl-btn');
  saveBtn.addEventListener('click', () => {
    saveTpl(name);
  });
  const genBtn = clone.querySelector('.gen-data-btn');
  genBtn.addEventListener('click', () => {
    generateData(name);
  });

  return clone;
};
/**
 * @description: 添加属性
 * @param {Object} data
 * @return {*}
 */
const addProperty = (data) => {
  const { content } = protertyTemplate;
  const td = content.querySelectorAll('td');
  const { tpl, name, type } = data;
  td[0].textContent = name;
  td[1].textContent = type;
  const clone = document.importNode(content, true);
  const deleteBtn = clone.querySelector('.delete-property-btn');
  deleteBtn.addEventListener('click', (event) => {
    const { currentTarget } = event;
    const tr = currentTarget.parentNode.parentNode;
    tr.parentNode.removeChild(tr);
  });
  const tplWrapper = document.querySelector(`.detail-section[data-name='${tpl}']`);
  const tbody = tplWrapper.querySelector('tbody');
  tbody.appendChild(clone);
};

// 创建内容块
exports.createSection = (item) => {
  const clone = createClone(item);
  rightContent.appendChild(clone);
  if (item.properties && item.properties.length > 0) {
    item.properties.forEach((property) => {
      addProperty({ tpl: item.name, ...property });
    });
  }
};
// 设置激活块
exports.setActiveSection = (name) => {
  const allElements = rightContent.children;
  Array.prototype.forEach.call(allElements, (ele) => {
    if (ele.getAttribute('data-name') === name) {
      ele.classList.add('detail-section-active');
    } else {
      ele.classList.remove('detail-section-active');
    }
  });
};
// 删除内容块
exports.removeSection = (name) => {
  const section = document.querySelector(`.detail-section[data-name='${name}']`);
  rightContent.removeChild(section);
};

// 取消按钮点击事件
cancelBtn.addEventListener('click', () => {
  hideForm();
});

// 确认按钮点击事件
sureBtn.addEventListener('click', () => {
  const formData = new FormData(form);
  const data = {
    tpl: formData.get('tpl'),
    name: formData.get('name'),
    type: formData.get('type')
  };
  addProperty(data);
  hideForm();
});
