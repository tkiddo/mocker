const Mock = require('mockjs');

const data = Mock.mock({
  'data|1-100': [
    {
      'id|+1': 1
    }
  ]
});

console.log(data);
