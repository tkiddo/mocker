/*
 * @Description: toast
 * @Author: tkiddo
 * @Date: 2020-12-02 15:29:36
 * @LastEditTime: 2020-12-02 15:50:37
 * @LastEditors: tkiddo
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
