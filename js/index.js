
function initSlider(){

  var range_els = document.querySelectorAll('[class*=webkit] input[type=range]'),
      n_els, style_el, styles, units, base_sel, track_sel, _thumb_sel, a, b;

  if(range_els) {
    style_el = document.createElement('style');
    document.body.appendChild(style_el);

    n_els = range_els.length;

    styles = [];
    units = ['Parrafos', ['MB', 'GB'], 'GB'];

    base_sel = '.js input[type=range]';
    track_sel = ['::-webkit-slider-runnable-track', ' /deep/ #track'];
    thumb_sel = ['::-webkit-slider-thumb', ' /deep/ #thumb'];
    a = ':after';
    b = ':before';

    for(var i = 0; i < n_els; i++) {
      styles.push('');

      range_els[i].addEventListener('input', function() {
        var idx = ~~this.id.split('r')[1],
            min = this.min || 0,
            max = this.max || 100,
            perc = ~~(100*(this.value - min)/(max - min)),
            val = ~~this.value,
            u = units[idx - 1],
            curr_sel = base_sel + '[id=r' + idx + ']',
            str = '';

        if(idx == 2) {
          u = u[(val < 3)?0:1];
          val = (val < 3) ? Math.pow(2, 7 + val) : (val - 2);
        }

        str += curr_sel + track_sel[0] + '{background-size:' + perc + '% 100%}';
        str += curr_sel + thumb_sel[0] + b + ',' + curr_sel + thumb_sel[1] + b +
          '{content:"' + val + '"}';
        str += curr_sel + thumb_sel[0] + a + ',' + curr_sel + thumb_sel[1] + a +
          '{content:"' + u + '"}';

        styles[idx] = str;

        style_el.textContent = styles.join('');
      }, false);
    }
  }

}

function getRandomInt(min, max) {
    var rand = Math.floor(Math.random() * (max + 1 - min) + min);
    return rand;
}

function generateFacts(facts){

  var paragraph = '';

  for (var i = 0; i < 6; i++) {
      if (i === 5) {
          paragraph += facts[getRandomInt(0, facts.length - 1)] + '.';
      } else {
          paragraph += facts[getRandomInt(0, facts.length - 1)] + '. ';
      }
  }

  return paragraph;

}

function buildParagraphs(paragraphsNumber, data){

  var factsContainer = document.querySelector('.facts')

  while (factsContainer.firstChild) {
      factsContainer.removeChild(factsContainer.firstChild);
  }

  for(var i=0; i<paragraphsNumber; i++){

    var p = document.createElement('p');

    p.classList.add('fact')

    p.textContent = generateFacts(data.spanish);

    factsContainer.appendChild(p);

  }

}

function generateLorem(paragraphsNumber) {

    var request = new XMLHttpRequest();
    request.open('GET', 'facts.json', true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // Success
            buildParagraphs(paragraphsNumber, JSON.parse(request.responseText));
        } else {
            console.error('Error ' + request.status);
        }
    };

    request.onerror = function () {
        // There was a connection error of some sort
        console.error('Connection Error');
    };
    request.send();
}


function initClipboard(){

  var clipboard = new Clipboard('.copy');

}

function initLipsum(){

  document.querySelector('#r1').addEventListener('change', function(e){

    generateLorem(e.target.value);

  });

  document.querySelector('#r1').addEventListener('click', function(e){

    generateLorem(e.target.value);

  });

  generateLorem(1);
}

function easterEgg(){

  var keys = 0;

  var onKeydown = function(event){

    // if(event.keyCode === 27) return Array.from(document.querySelectorAll('.egg')).forEach(function(gif){ gif.style.display = 'none';});
    if(event.keyCode === 27) document.querySelector('.easter-egg').style.display = 'none';

    keys++;

  };

  var onKeyup = function(event){

    // if(keys > 3) Array.from(document.querySelectorAll('.egg')).forEach(function(gif){ gif.style.display = 'inline-block';});
    if(keys > 3) document.querySelector('.easter-egg').style.display = 'block';

    keys = 0;

  }

  document.addEventListener('keydown', onKeydown);

  document.addEventListener('keyup', onKeyup);

}

function init(){

  initSlider();

  initLipsum();

  initClipboard();

  easterEgg();
}


init();
