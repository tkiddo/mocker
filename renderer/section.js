/*
 * @Description: 内容展示区
 * @Author: tkiddo
 * @Date: 2020-11-28 15:10:02
 * @LastEditors: tkiddo
 * @LastEditTime: 2020-11-30 11:18:02
 */

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

const createClone = (item) => {
  const { content } = detailTemplate;
  const { name } = item;
  const wrapper = content.querySelector('.detail-section');
  wrapper.setAttribute('data-name', name);
  const titleELe = content.querySelector('.detail-title');
  titleELe.innerText = name;
  const clone = document.importNode(content, true);
  const addBtn = clone.querySelector('.add-property-btn');
  addBtn.addEventListener('click', () => {
    showForm(name);
  });
  return clone;
};

exports.createSection = (item) => {
  const clone = createClone(item);
  rightContent.appendChild(clone);
};

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

exports.removeSection = (name) => {
  const section = document.querySelector(`.detail-section[data-name='${name}']`);
  rightContent.removeChild(section);
};
/**
 * @description: 添加属性
 * @param {Object} data
 * @return {*}
 */
const addProperty = (data) => {
  const { content } = protertyTemplate;
  const td = content.querySelectorAll('td');
  const { tpl, name, type, remark } = data;
  td[0].textContent = name;
  td[1].textContent = type;
  td[2].textContent = remark;
  const clone = document.importNode(content, true);
  const tplWrapper = document.querySelector(`.detail-section[data-name='${tpl}']`);
  const tbody = tplWrapper.querySelector('tbody');
  console.log(tbody);
  tbody.appendChild(clone);
};

// 取消按钮点击事件
cancelBtn.addEventListener('click', () => {
  hideForm();
});

sureBtn.addEventListener('click', () => {
  const formData = new FormData(form);
  const data = {
    tpl: formData.get('tpl'),
    name: formData.get('name'),
    type: formData.get('type'),
    remark: formData.get('remark')
  };
  addProperty(data);
  hideForm();
});
