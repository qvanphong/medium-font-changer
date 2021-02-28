const head = document.head;

// Inject <style> to <head> with the font name in parameter.
// In case it's already injected, the function will replace it with the new one.
changeFont = (fontName) => {
  let innerHTMLFont = document.createTextNode(`
  p[data-selectable-paragraph], p[data-selectable-paragraph] *, strong, li { font-family : "${fontName}" !important}
  `);
  const existingInjectedHeader = head.querySelector('style[from-extension="999"]');

  if (existingInjectedHeader == null) {
    const fontElement = document.createElement('style');
    fontElement.setAttribute('type', 'text/css');
    fontElement.setAttribute('from-extension', true);
    fontElement.appendChild(innerHTMLFont);

    head.appendChild(fontElement);
  } else {
    existingInjectedHeader.replaceChild(innerHTMLFont, existingInjectedHeader.childNodes[0]);
  }
};

// content_script's listener to trigger the changeFont function.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  changeFont(request.message);
});

chrome.storage.sync.get('font', (result) => {
  let fontFromStorage = result.font || 'Cambria';
  changeFont(fontFromStorage);
});
