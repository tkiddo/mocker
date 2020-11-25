const tplTabs = document.querySelector('.tpl-tabs');

exports.addTab = ({ name }) => {
  const fragment = document.createDocumentFragment();
  const wrapper = document.createElement('div');
  wrapper.classList.add('tpl-tab');
  const nameElement = document.createElement('div');
  nameElement.classList.add('tpl-tab-name');
  nameElement.innerText = name;
  wrapper.appendChild(nameElement);
  fragment.appendChild(wrapper);
  tplTabs.appendChild(wrapper);
};

exports.changeActiveTab = () => {};
