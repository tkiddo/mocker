const assert = require('assert');
const mocker = require('../renderer/mocker');

describe('mocker working', function () {
  this.timeout(10000);

  it('default locale should be en_US', () => {
    return assert.strictEqual(mocker.faker.locale, 'en_US');
  });

  it('should change locale successfully', () => {
    mocker.setLocale('zh');
    return assert.strictEqual(mocker.faker.locale, 'zh_CN');
  });

  it('should return undefined if catch error in generateData function', () => {
    const result = mocker.generateData('address');
    return assert.strictEqual(result, undefined);
  });
});
