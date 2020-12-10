/*
 * @Author: tkiddo
 * @Date: 2020-12-02 15:29:36
 * @LastEditors: tkiddo
 * @LastEditTime: 2020-12-10 14:39:30
 * @Description:提示语
 */

const toast:HTMLElement = document.querySelector('.common-toast') as HTMLElement;

const hideToast = () => {
  toast.classList.remove('fade-in');
};

export const showToast = (msg:string) => {
  toast.innerText = msg;
  toast.classList.add('fade-in');
  setTimeout(() => {
    hideToast();
  }, 1000);
};
