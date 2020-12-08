/*
 * @Author: tkiddo
 * @Date: 2020-12-02 15:29:36
 * @LastEditors: tkiddo
 * @LastEditTime: 2020-12-08 14:42:52
 * @Description:提示语
 */

const toast = document.querySelector('.common-toast');

const hideToast = () => {
  toast.classList.remove('fade-in');
};

exports.showToast = (msg) => {
  toast.innerText = msg;
  toast.classList.add('fade-in');
  setTimeout(() => {
    hideToast();
  }, 1000);
};
