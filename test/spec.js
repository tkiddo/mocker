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

  beforeEach(async function () {
    app = await puppeteer.connect({ browserURL: 'http://localhost:9200' });
    [page] = await app.pages();
    page.setViewport({ width: 1080, height: 840 });
  });

  afterEach(async function () {
    if (app) {
      app.close();
    }
  });

  it('should have a button with class "add-tpl"', async () => {
    const element = await page.$$('.add-tpl');
    assert.strictEqual(element.length, 1);
  });
});
