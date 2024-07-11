
export function copyToClipboard(text, successCallback, errorCallback){
    navigator.clipboard.writeText(text)
       .then(() => {
            successCallback();
        })
       .catch((error) => {
            errorCallback(error);
       });
}