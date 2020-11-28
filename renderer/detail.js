/*
 * @Description: 内容展示区
 * @Author: tkiddo
 * @Date: 2020-11-28 15:10:02
 * @LastEditors: tkiddo
 * @LastEditTime: 2020-11-28 16:12:14
 */

const rightContent = document.querySelector('.right-content');
const template = document.querySelector('#tpl-detail');

const createClone = (item) => {
  const wrapper = template.content.querySelector('.detail-section');
  wrapper.setAttribute('data-name', item.name);
  const main = template.content.querySelector('main');
  main.innerText = item.name;
  return document.importNode(template.content, true);
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
  const section = document.querySelector(`.detail-section[data-name=${name}]`);
  rightContent.removeChild(section);
};
