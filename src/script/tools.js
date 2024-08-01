
export function copyToClipboard(
  text,
  successCallback = () => {
    Snackbar.success("复制成功");
  },
  errorCallback = (error) => {
    Snackbar.error("复制失败：" + error.message);
  }
) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      successCallback();
    })
    .catch((error) => {
      errorCallback(error);
    });
}

export function progressiveColorAsPercent(rawColor = '#000000',color = '#000000',percent){
  const rawColorRGB = {
    r: parseInt(rawColor.slice(1, 3), 16),
    g: parseInt(rawColor.slice(3, 5), 16),
    b: parseInt(rawColor.slice(5, 7), 16)
  }
  const colorRGB = {
    r: parseInt(color.slice(1, 3), 16),
    g: parseInt(color.slice(3, 5), 16),
    b: parseInt(color.slice(5, 7), 16)
  }
  const resultRGB = {
    r: Math.round((colorRGB.r - rawColorRGB.r) * percent + rawColorRGB.r),
    g: Math.round((colorRGB.g - rawColorRGB.g) * percent + rawColorRGB.g),
    b: Math.round((colorRGB.b - rawColorRGB.b) * percent + rawColorRGB.b)
  }
  return '#' + resultRGB.r.toString(16) + resultRGB.g.toString(16) + resultRGB.b.toString(16)
}