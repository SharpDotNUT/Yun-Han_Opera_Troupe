async function fetchWithProgress(
  url: RequestInfo | URL,
  options?: object,
  onProgress?: Function
): Promise<any> {
  const res = await fetch(url, options);
  const _res = res.clone();
  const reader = res.body?.getReader();
  const contentLength = res.headers.get("Content-Length");
  let receivedLength = 0;
  let chunks = [];
  if (reader) {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        onProgress &&
          onProgress({
            loaded: receivedLength,
            total: contentLength ? parseInt(contentLength) : null,
            done: true,
          });
        break;
      }
      chunks.push(value);
      receivedLength += value.length;
      onProgress &&
        onProgress({
          loaded: receivedLength,
          total: contentLength ? parseInt(contentLength) : null,
          done: false,
        });
    }
  }
    return await _res.json();
}

export { fetchWithProgress };
