const electron = require('electron');
const puppeteer = require('puppeteer-core');
const { spawn } = require('child_process');
const assert = require('assert');

let spawnProcess = spawn(electron, ['.', `--remote-debugging-port=9200`], {
  shell: true
});

let app = null;
let page = null;

describe('Application launch', function () {
  this.timeout(10000);

  before(async function () {
    app = await puppeteer.connect({ browserURL: 'http://localhost:9200' });
    [page] = await app.pages();
    page.setViewport({ width: 1080, height: 840 });
  });

  after(async function () {
    if (app) {
      app.close();
    }
  });

  it('should have a button with class "add-tpl"', async () => {
    const btns = await page.$$('.add-tpl');
    assert.strictEqual(btns.length, 1);
  });

  it('should show form successfully', async () => {
    const tplAddBtn = await page.$('.add-tpl');
    await tplAddBtn.click();
    const className = await page.$eval('.form', (el) => el.getAttribute('class'));
    const isShow = className.indexOf('form-show') !== -1;
    assert.strictEqual(isShow, true);
  });
});
