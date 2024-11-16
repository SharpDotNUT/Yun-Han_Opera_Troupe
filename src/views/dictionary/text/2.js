// 注册 Service Worker 时的回调函数
self.addEventListener("install", function (event) {
  console.log("Service Worker 安装成功");
});

self.addEventListener("message", (event) => {
  if (event.data.action == "cache") {
    caches.open("my-cache").then((cache) => {
      fetch(event.data.url).then((response) => {
        cache.put(event.data.url, response);
      });
    });
  } else {
    caches.open("my-cache").then((cache) => {
      cache
        .match(event.data.url)
        .then((response) => {
          return response.text();
        })
        .then((response) => {
          console.log(response);
        });
    });
  }
});
