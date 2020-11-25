const tplTabs = document.querySelector('.tpl-tabs');

exports.addTab = ({ name }) => {
  const t = document.querySelector('#tpl-tab');
  const nameElement = t.querySelector('.tpl-name');
  nameElement.textContent = name;
  const clone = document.importNode(t.textContent, true);
  tplTabs.appendChild(clone);
};

exports.changeActiveTab = () => {};
