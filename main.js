window.onload = function() {
  const DisplayInput = document.getElementById('DisplayInput');
  
  const SavedText = localStorage.getItem('SavedText')
  
  if (SavedText && DisplayInput) {
  DisplayInput.textContent = SavedText;
  }
}

function MoveText() {
const Input = document.getElementById('UserInput');
const DisplayInput = document.getElementById('DisplayInput');
    
DisplayInput.textContent = Input.value;

localStorage.setItem('SavedText', Input.value);

Input.value = '';
  }