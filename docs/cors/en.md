## Why can't some features be used directly?

This is because browsers restrict cross-origin requests for security reasons, and cross-origin requests require server-side support for CORS (Cross-Origin Resource Sharing).
[What is CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS).

When this application accesses some APIs (for example, `bbs.miyoushe.com` `music.163.com/api`), since these API servers do not set CORS, the browser will block these requests, resulting in the inability to use them directly.

## How to solve it?

### Install the Tampermonkey plugin

First, please install the Tampermonkey (Tampermonkey script/monkey) plugin on your browser and then install this plugin.

- [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)
- [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- [Firefox](https://addons.mozilla.org/zh-CN/firefox/addon/tampermonkey/)
- [Safari](https://apps.apple.com/cn/app/tampermonkey/id1484078343)

> If you are using the phone, the Microsoft Edge Android version supports using Tampermonkey, please install the Microsoft Edge Android version.
> - [Google Play](https://play.google.com/store/apps/details?id=com.microsoft.emmx)
> - [App Store](https://apps.apple.com/cn/app/microsoft-edge/id1288723196)

### Install the script

Click [this link](/cors.user.js) to install the script.

After installation, refresh the page.
