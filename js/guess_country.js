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
  clearDisplay();
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
  clearDisplay();
});

$("#toggleReroll").on('click', function() {
  if (autoReroll.checked) {
    document.getElementById("reroll").style.visibility = 'hidden';
  }
  else {
    document.getElementById("reroll").style.visibility = 'visible';
  }

  clearDisplay();
});


//buttons skin settings
$("#defaultButtons").on('click', function() {
  $('#buttonPicker').html("Default Buttons");

  hideButtonsExcept("default");
});

$("#aespaButtons").on('click', function() {
  $('#buttonPicker').html("Aespa Buttons");
  
  hideButtonsExcept("aespa");
});

$("#flagButtons").on('click', function() {
  $('#buttonPicker').html("Flag Buttons");
  
  hideButtonsExcept("flag");
});

$("#foodButtons").on('click', function() {
  $('#buttonPicker').html("Food Buttons");
  
  hideButtonsExcept("food");
});

$("#protagButtons").on('click', function() {
  $('#buttonPicker').html("Protagonist Buttons");
  
  hideButtonsExcept("protagonist");
});

function hideButtonsExcept(buttonGroup) {
  $('#defaultButtonGroup').hide();
  $('#aespaButtonGroup').hide();
  $('#flagButtonGroup').hide();
  $('#foodButtonGroup').hide();
  $('#protagButtonGroup').hide();

  switch (buttonGroup) {
    case "default":
      $('#defaultButtonGroup').show();
      break;
    case "aespa":
      $('#aespaButtonGroup').show();
      break;
    case "flag":
      $('#flagButtonGroup').show();
      break;
    case "food":
      $('#foodButtonGroup').show();
      break;
    case "protag":
      $('#protagButtonGroup').show();
      break;
    default:
      $('#defaultButtonGroup').show();
  }
}

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

  if (autoReroll.checked && rerollSpeed != 0) {
    setTimeout(function (){
      generateNovel();
      clearDisplay();
    }, rerollSpeed);
  }
  else if (autoReroll.checked) {
    generateNovel();
    setTimeout(function (){
      clearDisplay();
    }, 500);
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
}

function clearDisplay() {
  $('#answerDisplay').html("");
  $('#answerDisplay').removeClass("text-success");
  $('#answerDisplay').removeClass("text-danger");
}
