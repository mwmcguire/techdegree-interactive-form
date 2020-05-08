// on page load focus on first text field
window.addEventListener('load', () => document.getElementById('name').focus());

// hide other job role text input / show when "other" option is selected from job role dropdown
const otherInput = document.getElementById('other-title');
const titleSelect = document.getElementById('title');

function showOtherInput() {
  if (titleSelect.options.selectedIndex === 5) {
    otherInput.style.display = 'block';
  } else {
    otherInput.style.display = 'none';
  }
}

showOtherInput();
