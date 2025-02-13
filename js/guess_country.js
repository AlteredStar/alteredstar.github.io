const Country = Object.freeze({
  JP: 0,
  CN: 1,
  KR: 2
});

var novelTitles, currentCountry = -1, currentNovel = -1;
var autoReroll = document.getElementById("toggleReroll");

window.onload = async function() {
  let csv = "";
  await fetch('../js/novel_titles.csv')
    .then(res => res.text())
    .then(data => csv = data);
  
  novelTitles = parse(csv);

  generateNovel();
}

document.getElementById("JP").addEventListener('click', function() {
  choose(Country.JP);
});

document.getElementById("CN").addEventListener('click', function() {
  choose(Country.CN);
});

document.getElementById("KR").addEventListener('click', function() {
  choose(Country.KR);
});

document.getElementById("reroll").addEventListener('click', function() {
  generateNovel();
});

document.getElementById("toggleReroll").addEventListener('click', function() {
  if (autoReroll.checked) {
    document.getElementById('reroll').style.visibility = 'hidden';
  }
  else {
    document.getElementById('reroll').style.visibility = 'visible';
  }
});

function choose(country) {
  if (currentCountry == country) {
    $('#answerDisplay').html("CORRECT");
    $('#answerDisplay').addClass("text-success");
    $('#answerDisplay').removeClass("text-danger");
  }
  else {
    $('#answerDisplay').html("WRONG");
    $('#answerDisplay').addClass("text-danger");
    $('#answerDisplay').removeClass("text-success");
  }

  if (autoReroll.checked) {
    setTimeout(function (){
      generateNovel();
    }, 3000);
  }
}

function randomCountry() {
  return Math.floor(Math.random() * 3);
}

function randomNovel() {
  return Math.floor(Math.random() * (novelTitles.length - 1)) + 1;
}

function generateNovel() {
  [currentCountry, currentNovel] = [randomCountry(), randomNovel()];
  $('#novelTitleDisplay').html(novelTitles[currentNovel][currentCountry]);
  
  $('#answerDisplay').html("");
  $('#answerDisplay').removeClass("text-success");
  $('#answerDisplay').removeClass("text-danger");
}
