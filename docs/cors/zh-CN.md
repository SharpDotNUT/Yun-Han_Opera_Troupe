 
## 为什么有些功能无法直接使用？

因为浏览器出于安全考虑，限制了跨域请求，而跨域请求需要服务器端支持CORS（跨域资源共享）。
[什么是跨域](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)。

而当本应用程序访问一些 API 时（例如 `bbs.miyoushe.com` `music.163.com/api`），
由于这些 API 的服务器端没有设置 CORS，所以浏览器会阻止这些请求，导致无法直接使用。

## 如何解决？

### 安装 Tampermonkey 插件

首先请现在您的浏览器上安装 Tampermonkey （油猴脚本/篡改猴）插件，然后安装本插件。

- [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)
- [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- [Firefox](https://addons.mozilla.org/zh-CN/firefox/addon/tampermonkey/)
- [Safari](https://apps.apple.com/cn/app/tampermonkey/id1484078343)

> 如果您是手机，Microsoft Edge 的安卓版本 支持使用Tampermonkey，请安装 Microsoft Edge 的安卓版本。
> - [Google Play](https://play.google.com/store/apps/details?id=com.microsoft.emmx)
> - [App Store](https://apps.apple.com/cn/app/microsoft-edge/id1288723196)
> - [Coolapk (酷安)](https://www.coolapk.com/apk/com.microsoft.emmx)

### 安装脚本

点击[这个链接](/cors.user.js)安装脚本。

安装完成后刷新页面。