const mt19937 = Random.engines.mt19937();
const container = document.getElementById('container');
const limit = 10;

const search = location.search;
let seed;
let currentRec;
let newSearch;
if (!search) {
  currentRec = 0;
  seed = +(new Date());
} else {
  const x = search.substr(1);
  const params = x.split(',');
  currentRec = parseInt(params[0]);
  seed = parseInt(params[1]);
}
mt19937.seed(seed);
newSearch = (currentRec + 1) + ',' + seed;

const randBin = Random.integer(0, 255);
for (let i = 0; i < currentRec; i++) {
  for (let j = 0; j < 9; j++) {
    randBin(mt19937);
  }
}

if (currentRec <= limit) {
  const elem = document.createElement('iframe');
  elem.src = '?' + newSearch;
  container.appendChild(elem);
} else {
  const elem = document.createElement('div');
  container.appendChild(elem);
}


const divs = document.querySelectorAll('#container > div');
let animationCallback;
let stacked = -1;
function cb(e) {
  stacked += 1;
  if (window.animationCallback) {
    while (stacked > 0) {
      window.animationCallback();
      stacked -= 1;
    }
  }
  for (let i = 0; i < 3; i++) {
    const rgb = [randBin(mt19937), randBin(mt19937), randBin(mt19937)];
    const l = 0.2126*rgb[0] + 0.7152*rgb[1] + 0.0722*rgb[2];
    divs[i].style.backgroundColor = 'rgb(' + rgb.join(', ') + ')';
    divs[i].style.color = l >= 128 ? 'black' : 'white';
  }
}

cb();
if (parent != window) {
  parent.animationCallback = cb;
}
