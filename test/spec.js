/*
 * @Description:
 * @Author: tkiddo
 * @Date: 2020-11-26 15:20:27
 * @LastEditors: tkiddo
 * @LastEditTime: 2020-11-27 10:13:35
 */
const electron = require('electron');
const puppeteer = require('puppeteer-core');
const { spawn } = require('child_process');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

let spawnProcess = spawn(electron, ['.', `--remote-debugging-port=9200`], {
  shell: true
});

let app = null;
let page = null;

const emptyData = () => {
  fs.writeFileSync(path.join(__dirname, '../share/tplList.json'), JSON.stringify([], null, 2));
};

describe('Application launch', function () {
  this.timeout(10000);

  before(async function () {
    emptyData();
    app = await puppeteer.connect({ browserURL: 'http://localhost:9200' });
    [page] = await app.pages();
    page.setViewport({ width: 1080, height: 840 });
  });

  after(async function () {
    if (app) {
      app.close();
      emptyData();
    }
  });

  it('有一个添加数据模版按钮', async () => {
    const btns = await page.$$('.add-tpl');
    assert.strictEqual(btns.length, 1);
  });

  it('第一次运行时，数据模版列表为空', async () => {
    const len = await page.$eval('.tpl-list', (el) => el.children.length);
    assert.strictEqual(len, 0);
  });

  it('点击添加数据模版按钮，表单弹出', async () => {
    const tplAddBtn = await page.$('.add-tpl');
    await tplAddBtn.click();
    const className = await page.$eval('.form', (el) => el.getAttribute('class'));
    const isShow = className.indexOf('form-show') !== -1;
    assert.strictEqual(isShow, true);
  });

  it('添加数据模版操作后，列表中数据加一条', async () => {
    await (await page.$('.add-tpl')).click();
    await page.waitForSelector('#tpl-add-form', { visiable: true });
    await page.type('input[name = "name"]', 'example');
    const value = await page.$eval('input[name = "name"]', (el) => el.value);
    assert.strictEqual(value, 'example');
    await page.waitForSelector('#tpl-sure-btn');
    await page.evaluate(() => document.querySelector('#tpl-sure-btn').click());
    const len = await page.$eval('.tpl-list', (el) => el.children.length);
    assert.strictEqual(len, 1);
  });
});
