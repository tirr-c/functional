window.seed = +(new Date());
window.currentRec = 0;

const functional = document.createElement('iframe');
functional.src = 'functional.html';

let animationCallback;
functional.addEventListener('animationiteration', () => {
  if (window.animationCallback) {
    window.animationCallback();
  }
}, false);

document.getElementById('window').appendChild(functional);
