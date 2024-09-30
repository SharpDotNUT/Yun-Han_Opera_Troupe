// ==UserScript==
// @name         云翰跨域工具
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
                resolve(response);
            },
            onerror: function(error) {
                reject(error);
            }
        });
    });
}

// 将函数添加到 window 对象上，以便全局访问
unsafeWindow._yunhan_cors_version = '0.0';
unsafeWindow.fFetch = fFetch;