const { Application } = require('spectron');
const assert = require('assert');
const electronPath = require('electron'); // Require Electron from the binaries included in node_modules.
const path = require('path');

const app = new Application({
  path: electronPath,
  args: [path.join(__dirname, '..')]
});

describe('Application launch', function () {
  this.timeout(10000);

  beforeEach(async function () {
    return await app.start();
  });

  afterEach(async function () {
    if (app && app.isRunning()) {
      return await app.stop();
    }
  });

  it('shows an initial window', async function () {
    const count = await app.client.getWindowCount();
    return assert.equal(count, 1);
  });
});
