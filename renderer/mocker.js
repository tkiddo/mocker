const zhFaker = require('faker/locale/zh_CN');
const enFaker = require('faker/locale/en_US');

class Mocker {
  constructor() {
    this.faker = enFaker;
  }

  setLocale(locale) {
    this.faker = locale === 'zh' ? zhFaker : enFaker;
  }

  generateData(column, method) {
    try {
      return this.faker[column][method]();
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
}

const mocker = new Mocker();

module.exports = mocker;
