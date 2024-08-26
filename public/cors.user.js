// ==UserScript==
// @name         跨域示例
// @namespace    http://sharpdotnut.top/
// @version      0.0
// @description  跨域
// @author       Chestnut
// @match        *://yunhan.sharpdotnut.top/*
// @match        *://localhost:*/*
// @connect      *.miyoushe.com
// @connect      bbs-api.miyoushe.com
// @grant        GM.xmlHttpRequest
// @grant        unsafeWindow
// ==/UserScript==

function fFetch(url, method = 'GET') {
    return new Promise((resolve, reject) => {
        GM.xmlHttpRequest({
            method: method,
            url: url,
            onload: function(response) {
                console.log(response.response);
                resolve(response);
            },
            onerror: function(error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    });
}

// 将函数添加到 window 对象上，以便全局访问
unsafeWindow._yunhan_cors_version = '0.0';
unsafeWindow.fFetch = fFetch;