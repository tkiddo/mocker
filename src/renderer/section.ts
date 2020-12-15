/*
 * @Author: tkiddo
 * @Date: 2020-11-30 08:48:04
 * @LastEditors: tkiddo
 * @LastEditTime: 2020-12-15 16:05:03
 * @Description: 右侧编辑区
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer, shell } from 'electron';

import { showToast } from './toast';

const rightContent = <HTMLElement>document.querySelector('.right-content');
const detailTemplate = <HTMLTemplateElement>document.querySelector('#tpl-detail');
const protertyTemplate = <HTMLTemplateElement>document.querySelector('#tpl-property');
const form = <HTMLFormElement>document.querySelector('#property-add-form');
const cancelBtn = <HTMLElement>form.querySelector('#property-cancel-btn');
const sureBtn = <HTMLElement>form.querySelector('#property-sure-btn');

import ITemplate from '../model/template';
import IProperty from '../model/property';

/**
 * @description: 显示表单
 * @param {*}
 * @return {*}
 */
const showForm = (tpl: string): void => {
  (<HTMLInputElement>form.querySelector('input[name="tpl"]')).value = tpl;
  form.classList.replace('form-hide', 'form-show');
};

/**
 * @description: 隐藏表单
 * @param {*}
 * @return {*}
 */
const hideForm = (): void => {
  form.classList.replace('form-show', 'form-hide');
};
/**
 * @description:生成数据
 * @param {String} _name
 * @return {*}
 */
const generateData = (_name: string): void => {
  const section = <HTMLElement>document.querySelector(`.detail-section[data-name='${_name}']`);
  const tbody = <HTMLElement>section.querySelector('tbody');
  const tr = tbody.querySelectorAll('tr');
  const template: { [key: string]: string } = {};
  Array.prototype.forEach.call(tr, (item: HTMLElement) => {
    const td = item.querySelectorAll('td');
    const name = td[0].textContent as string;
    const type = td[1].textContent as string;
    template[name] = type;
  });

  ipcRenderer.send('mock-data', { name: _name, template });
};

/**
 * @description: 创建编辑区
 * @param {Object} item
 * @return {*}
 */
const createClone = (item: ITemplate): DocumentFragment => {
  const { content } = detailTemplate;
  const { name } = item;
  const wrapper = <HTMLElement>content.querySelector('.detail-section');
  wrapper.setAttribute('data-name', name);
  const titleELe = <HTMLElement>content.querySelector('.detail-title');
  titleELe.innerText = name;
  const hrefEle = <HTMLElement>content.querySelector('.api-value');
  const link = `http://localhost:8080/mock/${name}`;
  hrefEle.setAttribute('href', link);
  hrefEle.innerText = link;
  const clone = <DocumentFragment>document.importNode(content, true);
  const addBtn = <HTMLElement>clone.querySelector('.add-property-btn');
  addBtn.addEventListener('click', () => {
    showForm(name);
  });
  const genBtn = <HTMLElement>clone.querySelector('.gen-data-btn');
  genBtn.addEventListener('click', () => {
    generateData(name);
  });
  const aLink = <HTMLElement>clone.querySelector('.api-value');
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
const addProperty = (tpl: string, data: IProperty): void => {
  const { content } = protertyTemplate;
  const td = content.querySelectorAll('td');
  const { name, type } = data;
  td[0].textContent = name;
  td[1].textContent = type;
  const clone = document.importNode(content, true);
  const deleteBtn = <HTMLElement>clone.querySelector('.delete-property-btn');
  deleteBtn.addEventListener('click', (event: Event) => {
    const { currentTarget } = event;
    const tr = <HTMLElement>(<HTMLElement>(<HTMLElement>currentTarget).parentNode).parentNode;
    (<HTMLElement>tr.parentNode).removeChild(tr);
    ipcRenderer.send('remove-tpl-property', { tpl, ...data });
  });
  const tplWrapper = <HTMLElement>document.querySelector(`.detail-section[data-name='${tpl}']`);
  const tbody = <HTMLElement>tplWrapper.querySelector('tbody');
  tbody.appendChild(clone);
};

// 创建内容块
export const createSection = (item: ITemplate): void => {
  const clone = createClone(item);
  rightContent.appendChild(clone);
  if (item.properties && item.properties.length > 0) {
    item.properties.forEach((property: IProperty) => {
      addProperty(item.name, property);
    });
  }
};
// 设置激活块
export const setActiveSection = (name: string): void => {
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
export const removeSection = (name: string): void => {
  const section = <HTMLElement>document.querySelector(`.detail-section[data-name='${name}']`);
  rightContent.removeChild(section);
};

// 取消按钮点击事件
cancelBtn.addEventListener('click', () => {
  hideForm();
});

// 确认按钮点击事件
sureBtn.addEventListener('click', () => {
  const formData = new FormData(form);
  const tpl = formData.get('tpl') as string;
  const name = formData.get('name') as string;
  const type = formData.get('type') as string;
  const result = ipcRenderer.sendSync('add-tpl-property', tpl, { name, type });
  if (result) {
    addProperty(tpl, { name, type });
  } else {
    showToast('属性已存在！');
  }

  hideForm();
});
