const Country = Object.freeze({
  JP: 0,
  CN: 1,
  KR: 2
});

var novelTitles, currentCountry = -1, currentNovel = -1;
var autoReroll = document.getElementById("toggleReroll");
var rerollSpeed = 2000;

window.onload = async function() {
  let csv = "";
  await fetch('../js/novel_titles.csv')
    .then(res => res.text())
    .then(data => csv = data);
  
  novelTitles = parse(csv);

  generateNovel();
}

$("#JP").on('click', function() {
  choose(Country.JP);
});
$("#aespaJP").on('click', function() {
  choose(Country.JP);
});
$("#flagJP").on('click', function() {
  choose(Country.JP);
});

$("#CN").on('click', function() {
  choose(Country.CN);
});
$("#aespaCN").on('click', function() {
  choose(Country.CN);
});
$("#flagCN").on('click', function() {
  choose(Country.CN);
});

$("#KR").on('click', function() {
  choose(Country.KR);
});
$("#aespaKR").on('click', function() {
  choose(Country.KR);
});
$("#flagKR").on('click', function() {
  choose(Country.KR);
});

$("#reroll").on('click', function() {
  generateNovel();
});

$("#toggleReroll").on('click', function() {
  if (autoReroll.checked) {
    document.getElementById("reroll").style.visibility = 'hidden';
  }
  else {
    document.getElementById("reroll").style.visibility = 'visible';
  }
});

$("#defaultButtons").on('click', function() {
  $('#buttonPicker').html("Default Buttons");

  $('#defaultButtonGroup').show();
  $('#aespaButtonGroup').hide();
  $('#flagButtonGroup').hide();
});

$("#aespaButtons").on('click', function() {
  $('#buttonPicker').html("Aespa Buttons");
  
  $('#defaultButtonGroup').hide();
  $('#aespaButtonGroup').show();
  $('#flagButtonGroup').hide();
});

$("#flagButtons").on('click', function() {
  $('#buttonPicker').html("Flag Buttons");
  
  $('#defaultButtonGroup').hide();
  $('#aespaButtonGroup').hide();
  $('#flagButtonGroup').show();
});

$("#rerollSpeedSlider").on('input change', function() {
  if ($(this).val() == 1) {
    $("#rerollSpeedDisplay").html($(this).val() + " second");
  }
  else {
    $("#rerollSpeedDisplay").html($(this).val() + " seconds");
  }
  rerollSpeed = $(this).val() * 1000;
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
    }, rerollSpeed);
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
