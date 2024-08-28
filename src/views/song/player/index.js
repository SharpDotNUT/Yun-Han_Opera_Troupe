/**
 * 
 * @param {String} url 要打开的 URL
 */
export const open = (url) => {
  window.open(url, '_blank');
}

export const isNeedToTip = ()=>{
    if(localStorage.getItem('yunhan-songPlayer-tip') || localStorage.getItem('yunhan-songPlayer-tip') === 'true'){
        return false
    }
    else{
        return true
    }
}

export function fetchData(songMetaData,data,songURL, selectedAlbum, selectedSong) {
    console.log(selectedAlbum.value, selectedSong.value)
    fetch(
      "https://api.injahow.cn/meting/?type=song&&id=" +
        songMetaData[selectedAlbum.value].songs[selectedSong.value].id
    )
      .then((response) => response.json())
      .then((_data) => {
        data.value = _data;
        songURL.value = _data[0].url;
      })
      .catch((error) => console.error(error));
  }