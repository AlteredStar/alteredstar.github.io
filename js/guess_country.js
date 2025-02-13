const Country = Object.freeze({
  JP: 0,
  CN: 1,
  KR: 2
});

var novelTitles, currentCountry = 0, currentNovel = 0;

window.onload = async function() {
  let csv = "";
  await fetch('../js/novel_titles.csv')
    .then(res => res.text())
    .then(contents => {
      csv = contents;
      console.log(csv);
    });
  
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
  generateNovel();
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
}
