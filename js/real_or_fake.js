const Status = Object.freeze({
  REAL: 0,
  FAKE: 1
});

var titles;
var [currentStatus, currentTitle] = [-1, -1];
const rerollIsAuto = document.getElementById("toggleReroll");
var rerollSpeed = 2000;
var [amountCorrect, currentlyAnswered] = [0, false];
const history = [[], []];

window.onload = async function() {
  let csv = "";

  await fetch('../js/' + $("#titleDisplay").data("title-type") + '_titles.csv')
    .then(res => res.text())
    .then(data => csv = data);
  
  titles = parse(csv);

  generateTitle();
  clearDisplay();
}

function selectReal() {
  choose(Status.REAL);
}

function selectFake() {
  choose(Status.FAKE);
}

//checks click for all button skins
$('[data-button-type=real]').on('click', selectReal);
$('[data-button-type=fake]').on('click', selectFake);

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

//add click event listener to each dropdown button
$('[data-button-type=setting]').on('click', button => {
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
  $('[data-button-type=real]').prop("disabled", true);
  $('[data-button-type=fake]').prop("disabled", true);
}

function enableButtons() {
  currentlyAnswered = false;
  $('[data-button-type=real]').prop("disabled", false);
  $('[data-button-type=fake]').prop("disabled", false);
}

//history
function addToHistory(status) {
  history[currentStatus].push(currentTitle);

  const answerStatusCode = titles[0][status];
  const currentStatusCode = titles[0][currentStatus];

  let answerStatus = "danger";

  if (answerStatusCode == currentStatusCode) {
    answerStatus = "success"
    amountCorrect++;
  }

  let attemptCount = history[0].length + history[1].length;

  $("#historyTable").append(`\
    <tbody>
      <tr>
        <th scope="row">${attemptCount}</th>
        <td>${titles[currentTitle][currentStatus]}</td>
        <td class="text-${answerStatus}">${answerStatusCode}</td>
        <td class="text-success">${currentStatusCode}</td>
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

function choose(status) {
  disableButtons();

  addToHistory(status);

  if (currentStatus == status) {
    $('#answerDisplay').html("CORRECT");
    $('#answerDisplay').addClass("text-success");
  }
  else {
    $('#answerDisplay').html("WRONG");
    $('#answerDisplay').addClass("text-danger");
    
    $('#correctAnswerDisplay').html("Correct: " + titles[0][currentStatus]);
  }

  if (rerollIsAuto.checked) {
    autoReroll();
  }
}

function randomStatus() {
  return Math.floor(Math.random() * 1);
}

function randomTitle() {  
  while (true) {
    currentTitle = Math.floor(Math.random() * (titles.length - 1)) + 1;
    if (history[currentStatus] === undefined || !history[currentStatus].includes(currentTitle) || history[currentStatus].length > titles.length - 2) {
      break;
    }
  }
}

function generateTitle() {
  randomStatus();
  randomTitle();
  $('#titleDisplay').html(titles[currentTitle][currentStatus]);
}

function clearDisplay() {
  $('#answerDisplay').html("");
  $('#answerDisplay').removeClass("text-success");
  $('#answerDisplay').removeClass("text-danger");

  $('#correctAnswerDisplay').html("");
}
