// /*
//  * @Description: test
//  * @Author: tkiddo
//  * @Date: 2020-12-02 14:37:22
//  * @LastEditTime: 2020-12-02 15:13:12
//  * @LastEditors: tkiddo
//  */

// const Application = require('spectron').Application;
// const assert = require('assert');
// const electronPath = require('electron'); // Require Electron from the binaries included in node_modules.
// const path = require('path');

// const app = new Application({
//   // Your electron path can be any binary
//   // i.e for OSX an example path could be '/Applications/MyApp.app/Contents/MacOS/MyApp'
//   // But for the sake of the example we fetch it from our node_modules.
//   path: electronPath,

//   // Assuming you have the following directory structure

//   //  |__ my project
//   //     |__ ...
//   //     |__ main.js
//   //     |__ package.json
//   //     |__ index.html
//   //     |__ ...
//   //     |__ test
//   //        |__ spec.js  <- You are here! ~ Well you should be.

//   // The following line tells spectron to look and use the main.js file
//   // and the package.json located 1 level above.
//   args: [path.join(__dirname, '..')]
// });

// describe('Application launch', function () {
//   this.timeout(10000);

//   beforeEach(function () {
//     return app.start();
//   });

//   afterEach(function () {
//     if (app && app.isRunning()) {
//       return app.stop();
//     }
//   });

//   it('shows an initial window', function () {
//     return app.client.getWindowCount().then(function (count) {
//       assert.strictEqual(count, 1);
//       // Please note that getWindowCount() will return 2 if `dev tools` are opened.
//       // assert.equal(count, 2)
//     });
//   });
// });
