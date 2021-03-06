/*
 * @Author: tkiddo
 * @Date: 2020-11-30 08:48:04
 * @LastEditors: tkiddo
 * @LastEditTime: 2020-12-09 14:31:19
 * @Description: 右侧编辑区
 */
// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcRenderer, shell } = require('electron');

const { showToast } = require('./toast');

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
/**
 * @description:生成数据
 * @param {String} _name
 * @return {*}
 */
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

/**
 * @description: 创建编辑区
 * @param {Object} item
 * @return {*}
 */
const createClone = (item) => {
  const { content } = detailTemplate;
  const { name } = item;
  const wrapper = content.querySelector('.detail-section');
  wrapper.setAttribute('data-name', name);
  const titleELe = content.querySelector('.detail-title');
  titleELe.innerText = name;
  const hrefEle = content.querySelector('.api-value');
  const link = `http://localhost:8080/mock/${name}`;
  hrefEle.setAttribute('href', link);
  hrefEle.innerText = link;
  const clone = document.importNode(content, true);
  const addBtn = clone.querySelector('.add-property-btn');
  addBtn.addEventListener('click', () => {
    showForm(name);
  });
  const genBtn = clone.querySelector('.gen-data-btn');
  genBtn.addEventListener('click', () => {
    generateData(name);
  });
  const aLink = clone.querySelector('.api-value');
  aLink.addEventListener('click', (event) => {
    event.preventDefault();
    shell.openExternal(link);
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
    ipcRenderer.send('remove-tpl-property', data);
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
  const result = ipcRenderer.sendSync('add-tpl-property', data);
  if (result) {
    addProperty(data);
  } else {
    showToast('属性已存在！');
  }

  hideForm();
});
