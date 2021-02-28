import Fonts from './fonts.js';

document.addEventListener('DOMContentLoaded', () => {
  const fontSelection = document.getElementById('font-selection');

  // Add event listener for button in popup.html
  document.getElementById('change-btn').addEventListener('click', changeToSelectedFont);

  Fonts.fonts.forEach((font) => {
    var option = document.createElement('option');
    option.setAttribute('value', font);
    option.text = font;

    fontSelection.appendChild(option);
  });

  // Set selected option based on storage's value
  chrome.storage.sync.get('font', (result) => {
    const selectedFont = result.font;
    if (selectedFont !== null) fontSelection.value = selectedFont;
  });
});

// An listener that will set new font name to storage.
const changeToSelectedFont = () => {
  const selectedFont = document.getElementById('font-selection').value;
  chrome.storage.sync.set({ font: selectedFont }, () => {});
};
