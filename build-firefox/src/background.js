chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installée.");
});

// Injection du content.js quand l'utilisateur clique sur l'icône de l'extension
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  }).then(() => {
    console.log('content.js injecté');
  }).catch(err => {
    console.error('Erreur injection :', err);
  });
});

