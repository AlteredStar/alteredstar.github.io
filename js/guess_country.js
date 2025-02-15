const Country = Object.freeze({
  JP: 0,
  CN: 1,
  KR: 2
});

var titles, currentCountry = -1, currentTitle = -1;
var autoReroll = document.getElementById("toggleReroll");
var rerollSpeed = 2000;

window.onload = async function() {
  let csv = "";

  if ($("#titleDisplay").data("title-type") == "novel") {
    await fetch('../js/novel_titles.csv')
      .then(res => res.text())
      .then(data => csv = data);
  }
  else if ($("#titleDisplay").data("title-type") == "manhua") {
    await fetch('../js/manhua_titles.csv')
      .then(res => res.text())
      .then(data => csv = data);
  }
  
  titles = parse(csv);

  generateTitle();
  clearDisplay();
}

$("#JP").on('click', selectJP);
$("#manhuaJP").on('click', selectJP);
$("#aespaJP").on('click', selectJP);
$("#flagJP").on('click', selectJP);
$("#foodJP").on('click', selectJP);
$("#protagJP").on('click', selectJP);
$("#gachaJP").on('click', selectJP);
function selectJP() {
  choose(Country.JP);
}

$("#CN").on('click', selectCN);
$("#manhuaCN").on('click', selectCN);
$("#aespaCN").on('click', selectCN);
$("#flagCN").on('click', selectCN);
$("#foodCN").on('click', selectCN);
$("#protagCN").on('click', selectCN);
$("#gachaCN").on('click', selectCN);
function selectCN() {
  choose(Country.CN);
}

$("#KR").on('click', selectKR);
$("#manhuaKR").on('click', selectKR);
$("#aespaKR").on('click', selectKR);
$("#flagKR").on('click', selectKR);
$("#foodKR").on('click', selectKR);
$("#protagKR").on('click', selectKR);
$("#gachaKR").on('click', selectKR);
function selectKR() {
  choose(Country.KR);
}

$("#reroll").on('click', () => {
  generateTitle();
  clearDisplay();
});

$("#toggleReroll").on('click', () => {
  if (autoReroll.checked) {
    document.getElementById("reroll").style.visibility = 'hidden';
  }
  else {
    document.getElementById("reroll").style.visibility = 'visible';
  }

  clearDisplay();
});


//buttons skin settings
$("#defaultButtons").on('click', () => {
  $('#buttonPicker').html("Default Buttons");

  hideButtonsExcept("default");
});

$("#manhuaButtons").on('click', () => {
  $('#buttonPicker').html("Manhua Buttons");
  
  hideButtonsExcept("manhua");
});

$("#aespaButtons").on('click', () => {
  $('#buttonPicker').html("Aespa Buttons");
  
  hideButtonsExcept("aespa");
});

$("#flagButtons").on('click', () => {
  $('#buttonPicker').html("Flag Buttons");
  
  hideButtonsExcept("flag");
});

$("#foodButtons").on('click', () => {
  $('#buttonPicker').html("Food Buttons");
  
  hideButtonsExcept("food");
});

$("#protagButtons").on('click', () => {
  $('#buttonPicker').html("Protagonist Buttons");
  
  hideButtonsExcept("protag");
});

$("#gachaButtons").on('click', () => {
  $('#buttonPicker').html("Gacha Buttons");
  
  hideButtonsExcept("gacha");
});

function hideButtonsExcept(buttonGroup) {
  $('#defaultButtonGroup').hide();
  $('#manhuaButtonGroup').hide();
  $('#aespaButtonGroup').hide();
  $('#flagButtonGroup').hide();
  $('#foodButtonGroup').hide();
  $('#protagButtonGroup').hide();
  $('#gachaButtonGroup').hide();

  switch (buttonGroup) {
    case "default":
      $('#defaultButtonGroup').show();
      break;
    case "manhua":
      $('#manhuaButtonGroup').show();
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
    case "gacha":
      $('#gachaButtonGroup').show();
      break;
    default:
      $('#defaultButtonGroup').show();
  }
}

$("#rerollSpeedSlider").on('input change', () => {
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
      generateTitle();
      clearDisplay();
    }, rerollSpeed);
  }
  else if (autoReroll.checked) {
    generateTitle();
    setTimeout(function (){
      clearDisplay();
    }, 500);
  }
}

function randomCountry() {
  return Math.floor(Math.random() * 3);
}

function randomTitle() {
  return Math.floor(Math.random() * (titles.length - 1)) + 1;
}

function generateTitle() {
  [currentCountry, currentTitle] = [randomCountry(), randomTitle()];
  $('#titleDisplay').html(titles[currentTitle][currentCountry]);
}

function clearDisplay() {
  $('#answerDisplay').html("");
  $('#answerDisplay').removeClass("text-success");
  $('#answerDisplay').removeClass("text-danger");
}
