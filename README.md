# mocker

## 安装 electron

鉴于 npm 安装 electron 慢的情况，官方给出的一个解决办法是从[electron/electron/releases](https://github.com/electron/electron/releases)手动下载对应的软件包放到本地目录中替代网络下载。本项目中，需要下载`electron-v11.0.3-darwin-x64.zip`和`SHASUMS256.txt`两个文件，然后放到本地缓存目录（根据平台不同，缓存目录也会不同，mac 平台是在`～/Downloads/Caches/electron`）。

下载完成后，再使用 npm 安装 electron 即可

```
npm install electron -g
```
