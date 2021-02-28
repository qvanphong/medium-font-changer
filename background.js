// Every time new font name changed, the listener will send message to content_script
// to re-inject and re-render with new selected font on every tabs that on medium.com.
storageOnChanged = (change) => {
  chrome.tabs.query({ currentWindow: true, url: 'https://*.medium.com/*' }, (tabs) => {
    for (let tab of tabs) {
      chrome.tabs.sendMessage(tab.id, { message: change.font.newValue });
    }
  });
};

chrome.storage.sync.onChanged.addListener(storageOnChanged);
