const appDiv = document.createElement("div");
appDiv.id = "pre-loading";
const loadingDiv = document.createElement("div");
loadingDiv.id = "loading";
const h1 = document.createElement("h1");
h1.textContent = "Loading... | 正在加载...";
const p1 = document.createElement("p");
p1.textContent =
  "Please wait a moment and refresh the page if the app doesn't load.";
const p2 = document.createElement("p");
p2.textContent = "请稍等片刻，如果应用未加载成功，请刷新页面。";
const hr = document.createElement("hr");
const p3 = document.createElement("p");
p3.textContent = "Yunhan Troupe | 云翰社";
p3.style.textAlign = "center";
const p4 = document.createElement("p");
p4.textContent = "#.NUT Studio © 2024 All Rights Reserved.";
p4.style.textAlign = "center";
const progressBar = document.createElement("div");
progressBar.id = "progress-bar";
loadingDiv.appendChild(h1);
loadingDiv.appendChild(p1);
loadingDiv.appendChild(p2);
loadingDiv.appendChild(hr);
loadingDiv.appendChild(p3);
loadingDiv.appendChild(p4);
loadingDiv.appendChild(progressBar);
appDiv.appendChild(loadingDiv);
document.getElementById('app').appendChild(appDiv);

let _progressBar = document.getElementById("progress-bar");
let startTime = new Date().getTime();
let forward = 1;
const update = () => {
  if (new Date().getTime() - startTime > 1000) {
    _progressBar.style.left = forward > 0 ? "90%" : "0%";
    forward = -forward;
    startTime = new Date().getTime();
  }
  requestAnimationFrame(update);
};
requestAnimationFrame(update);
function isSupportedBrowser() {
  const ua = navigator.userAgent;
  const browsers = [
    { name: "Chrome", version: 61 },
    { name: "Firefox", version: 60 },
    { name: "Safari", version: 10.1 },
    { name: "Edge", version: 16 },
  ];

  for (let i = 0; i < browsers.length; i++) {
    const browser = browsers[i];
    const match = ua.match(new RegExp(`${browser.name}/(\\d+(\\.\\d+)?)`));
    if (match && parseFloat(match[1]) >= browser.version) {
      return true;
    }
  }

  return false;
}
if (!isSupportedBrowser()) {
  alert(
    "你的浏览器版本过低，或我们无法识别你的浏览器，您可能无法正常使用本软件。\n" +
      "Your browser version is too low, or we cannot identify your browser, you may not be able to use this software normally.\n" +
      "请使用最新版本的 Chrome、Firefox、Safari 或 Edge 浏览器访问本网站。\n" +
      "Please use the latest version of Chrome, Firefox, Safari or Edge browser to access this website"
  );
}
