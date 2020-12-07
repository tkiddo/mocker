<!--
 * @Description: README
 * @Author: tkiddo
 * @Date: 2020-11-26 15:20:27
 * @LastEditors: tkiddo
 * @LastEditTime: 2020-12-07 10:13:51
-->

# mocker

模拟数据生成，提供本地接口访问。

## 运行项目

```shell
npm install

cd mocker

npm run start
```

## 打包应用

```shell
npm run make
```

## 应用截图

![mocker](https://github.com/tkiddo/mocker/tree/main/assets/shortcut/mocker.png)

## 更多说明

- electron 安装

鉴于 npm 安装 electron 慢的情况，官方给出的一个解决办法是从[electron/electron/releases](https://github.com/electron/electron/releases)手动下载对应的软件包放到本地目录中替代网络下载。本项目中，需要下载`electron-v11.0.3-darwin-x64.zip`和`SHASUMS256.txt`两个文件，然后放到本地缓存目录（根据平台不同，缓存目录也会不同，mac 平台是在`～/Library/Caches/electron`，Windows 平台是：`~/AppData/local/electron/Cache`或者`%LOCALAPPDATA%/electron/Cache`）。

下载完成后，再使用 npm 安装 electron 即可

```shell
npm install electron -g
```
