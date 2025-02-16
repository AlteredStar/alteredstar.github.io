const Country = Object.freeze({
  JP: 0,
  CN: 1,
  KR: 2
});

var titles;
var [currentCountry, currentTitle] = [-1, -1];
const [rerollIsAuto, rerollOnWrong] = [document.getElementById("toggleReroll"), document.getElementById("rerollOnWrong")];
var rerollSpeed = 2000;
var [amountCorrect, currentlyAnswered] = [0, false];
const history = [[], [], []];

window.onload = async function() {
  let csv = "";

  await fetch('../js/' + $("#titleDisplay").data("title-type") + '_titles_test.csv')
    .then(res => res.text())
    .then(data => csv = data);
  
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

//checks click for all button skins
$('[data-button-type=JP]').on('click', selectJP);
$('[data-button-type=CN]').on('click', selectCN);
$('[data-button-type=KR]').on('click', selectKR);

//checks if user toggles auto reroll and conditionally hides the reroll button
$("#toggleReroll").on('click', () => {
  if (rerollIsAuto.checked) {
    document.getElementById("reroll").style.visibility = 'hidden';
    if (currentlyAnswered) {
      reroll();
    }
  }
  else {
    document.getElementById("reroll").style.visibility = 'visible';
    $('#reroll').prop("disabled", true);
    setTimeout(() => {
      $('#reroll').prop("disabled", false);
    }, rerollSpeed != 0 ? rerollSpeed : 500);
  }
});

//adds a click event listener to each dropdown button
$('[data-button-type="setting"]').on('click', button => {
  $('#buttonPicker').text($('#' + button.target.id).text());
  hideButtonsExcept(button.target.id);
});

function hideButtonsExcept(buttonGroup) {
  $('[data-button-type=group]').hide();
  $('#' + buttonGroup + 'Group').show();
}

//adjusts reroll speed from 0 to 3 seconds
$("#rerollSpeedSlider").on('input change', button => {
  let rerollSpeedValue = $('#' + button.target.id).val();

  if (rerollSpeedValue == 1) {
    $("#rerollSpeedDisplay").html(rerollSpeedValue + " Second");
  }
  else {
    $("#rerollSpeedDisplay").html(rerollSpeedValue + " Seconds");
  }
  rerollSpeed = rerollSpeedValue * 1000;
});

function disableButtons() {
  currentlyAnswered = true;
  $('[data-button-type=JP]').prop("disabled", true);
  $('[data-button-type=CN]').prop("disabled", true);
  $('[data-button-type=KR]').prop("disabled", true);
}

function enableButtons() {
  currentlyAnswered = false;
  $('[data-button-type=JP]').prop("disabled", false);
  $('[data-button-type=CN]').prop("disabled", false);
  $('[data-button-type=KR]').prop("disabled", false);
}

//history
function addToHistory(country) {
  history[currentCountry].push(currentTitle);

  const answerCountryCode = titles[0][country];
  const currentCountryCode = titles[0][currentCountry];

  let answerStatus = "danger";

  if (answerCountryCode == currentCountryCode) {
    answerStatus = "success"
    amountCorrect++;
  }

  let attemptCount = history[0].length + history[1].length + history[2].length;

  $("#historyTable").append(`\
    <tbody>
      <tr>
        <th scope="row">${attemptCount}</th>
        <td>${titles[currentTitle][currentCountry]}</td>
        <td class="text-${answerStatus}">${answerCountryCode}</td>
        <td class="text-success">${currentCountryCode}</td>
      </tr>
    </tbody>\
  `);

  $('#accuracyDisplay').html("Accuracy: " + (amountCorrect * 1.0 / attemptCount).toFixed(2) * 100 + "%")
}

//manual reroll
function reroll() {
  generateTitle();
  clearDisplay();
  enableButtons();
}

$("#reroll").on('click', () => {
  reroll();
});

//auto reroll
function autoReroll() {
  setTimeout(() => {
    generateTitle();
  }, rerollSpeed);

  setTimeout(() => {
    clearDisplay();
  }, rerollSpeed != 0 ? rerollSpeed : 500);

  enableButtons();
}

function choose(country) {
  disableButtons();

  addToHistory(country);

  if (currentCountry == country) {
    $('#answerDisplay').html("CORRECT");
    $('#answerDisplay').addClass("text-success");

    if (rerollIsAuto.checked) {
      autoReroll();
      return;
    }
  }
  else {
    $('#answerDisplay').html("WRONG");
    $('#answerDisplay').addClass("text-danger");
    
    $('#correctAnswerDisplay').html("Correct: " + titles[0][currentCountry]);
  }

  if (rerollIsAuto.checked && rerollOnWrong.checked) {
    autoReroll();
  }
}

function randomCountry() {
  currentCountry = Math.floor(Math.random() * 3);
}

function randomTitle() {  
  while (true) {
    currentTitle = Math.floor(Math.random() * (titles.length - 1)) + 1;
    if (history[currentCountry] === undefined || !history[currentCountry].includes(currentTitle) || history[currentCountry].length > titles.length - 2) {
      break;
    }
  }
}

function generateTitle() {
  randomCountry();
  randomTitle();
  $('#titleDisplay').html(titles[currentTitle][currentCountry]);
}

function clearDisplay() {
  $('#answerDisplay').html("");
  $('#answerDisplay').removeClass("text-success");
  $('#answerDisplay').removeClass("text-danger");

  $('#correctAnswerDisplay').html("");
}
