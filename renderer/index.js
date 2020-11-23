const mocker = require('./mocker');

console.log(mocker.generateData('address', 'country'));

mocker.setLocale('zh');

console.log(mocker.generateData('random', 'uuid'));

require('./tplmanage.js');
