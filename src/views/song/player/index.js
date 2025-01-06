
import { Snackbar } from "@varlet/ui";

/**
 *
 * @param {String} url 要打开的 URL
 */
export const open = (url) => {
  window.open(url, "_blank");
};

export const isNeedToTip = () => {
  if (
    localStorage.getItem("yunhan-songPlayer-tip") ||
    localStorage.getItem("yunhan-songPlayer-tip") === "true"
  ) {
    return false;
  } else {
    return true;
  }
};

export function fetchData(
  songMetaData,
  data,
  songURL,
  selectedAlbum,
  selectedSong
) {
  Snackbar.loading("正在获取歌曲信息");
  fetch(
    "https://api.injahow.cn/meting/?type=song&&id=" +
      songMetaData[selectedAlbum.value].songs[selectedSong.value].id
  )
    .then((response) => response.json())
    .then((_data) => {
      data.value = _data;
      songURL.value = _data[0].url;
      Snackbar.success("歌曲信息获取成功");
      console.log(_data);
      fetch(_data[0].pic, {
      }).then((response) => {
        const url = new URL(response.url);
        url.searchParams.set("param", "");
      });
    })
    .catch((error) => {
      console.error(error);
      Snackbar.error("歌曲信息获取失败");
    });
}

export function download(songURL) {
  fetch(songURL.value)
    .then((response) => response.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none"; // 隐藏 <a> 标签
      document.body.appendChild(a); // 将 <a> 标签添加到 body 中
      a.href = url;
      a.download = `${songMetaData[selectedAlbum.value].name} - ${songMetaData[selectedAlbum.value].songs[selectedSong.value].name
        }.mp3`;
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      Snackbar.success("下载成功");
    })
    .catch((error) => {
      Snackbar.error("下载失败：" + error.message);
    });
}