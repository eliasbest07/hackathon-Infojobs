var resultados=[];

chrome.action.onClicked.addListener((tab) => {
  chrome.windows.create({
    url: 'popup.html',
    type: 'popup',
    width: 500,
    height: 400
  });
});

self.addEventListener('message', event => {
  console.log(event.data);
if(event.data.type === 'results') {
  resultados=event.data.data;
  if (resultados && resultados.length > 0) {
    chrome.storage.local.set({ resultados: resultados }, function() {
      console.log('Resultados guardados en el almacenamiento local.');
    });
}
}
  if(event.data.type === 'openLink') {
    const link = event.data.data;
    chrome.tabs.create({ url: link });
  }

});

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.obtenerDatos) {
    chrome.storage.local.get(['resultados'], function(data) {
      if(data.resultados && data.resultados.length > 0){
        resultados = data.resultados;
      }
    });
      sendResponse({ results: resultados });
    return true;
  }
});
