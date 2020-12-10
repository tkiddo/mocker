/*
 * @Author: tkiddo
 * @Date: 2020-12-08 21:32:26
 * @LastEditors: tkiddo
 * @LastEditTime: 2020-12-10 21:28:43
 * @Description: 
 */
// /*
//  * @Description: test
//  * @Author: tkiddo
//  * @Date: 2020-12-02 14:37:22
//  * @LastEditTime: 2020-12-07 09:53:13
//  * @LastEditors: tkiddo
//  */

// const Application = require('spectron').Application
// const assert = require('assert')
// const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
// const path = require('path')

// describe('Application launch', function () {
//   this.timeout(10000)

//   beforeEach(function () {
//     this.app = new Application({
//       // Your electron path can be any binary
//       // i.e for OSX an example path could be '/Applications/MyApp.app/Contents/MacOS/MyApp'
//       // But for the sake of the example we fetch it from our node_modules.
//       path: 'F:/sliver/mocker/dist/win-unpacked/mocker.exe',

//       // Assuming you have the following directory structure

//       //  |__ my project
//       //     |__ ...
//       //     |__ main.js
//       //     |__ package.json
//       //     |__ index.html
//       //     |__ ...
//       //     |__ test
//       //        |__ spec.js  <- You are here! ~ Well you should be.

//       // The following line tells spectron to look and use the main.js file
//       // and the package.json located 1 level above.
//       // args: [path.join(__dirname, '..')]
//     })
//     return this.app.start()
//   })

//   afterEach(function () {
//     if (this.app && this.app.isRunning()) {
//       return this.app.stop()
//     }
//   })

//   it('shows an initial window', function () {
//     return this.app.client.getWindowCount().then(function (count) {
//       assert.equal(count, 1)
//       // Please note that getWindowCount() will return 2 if `dev tools` are opened.
//       // assert.equal(count, 2)
//     })
//   })
// })