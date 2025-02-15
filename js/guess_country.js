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
    await fetch('../js/novel_titles_test.csv')
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

const selectJP = () => {
  choose(Country.JP);
}

const selectCN = () => {
  choose(Country.CN);
}

const selectKR = () => {
  choose(Country.KR);
}

$('[data-button-type=JP]').on('click', selectJP);
$('[data-button-type=CN]').on('click', selectCN);
$('[data-button-type=KR]').on('click', selectKR);

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


//add click event listener to each dropdown button
$('[data-button-type="setting"]').on('click', button => {
  $('#buttonPicker').text($('#' + button.target.id).text());
  hideButtonsExcept(button.target.id);
});

function hideButtonsExcept(buttonGroup) {
  $('[data-button-type=group]').hide();
  $('#' + buttonGroup + 'Group').show();
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
  $('#answerDisplay').removeClass("text-success");
  $('#answerDisplay').removeClass("text-danger");

  if (currentCountry == country) {
    $('#answerDisplay').html("CORRECT");
    $('#answerDisplay').addClass("text-success");
  }
  else {
    $('#answerDisplay').html("WRONG");
    $('#answerDisplay').addClass("text-danger");
  }

  if (autoReroll.checked && rerollSpeed != 0) {
    setTimeout(() => {
      generateTitle();
      clearDisplay();
    }, rerollSpeed);
  }
  else if (autoReroll.checked) {
    generateTitle();
    setTimeout(() => {
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
