const Status = Object.freeze({
  REAL: 0,
  FAKE: 1
});

var novelTitles, currentStatus = -1, currentNovel = -1;
var autoReroll = document.getElementById("toggleReroll");
var rerollSpeed = 2000;

window.onload = async function() {
  let csv = "";
  await fetch('../js/novel_titles_real_or_fake.csv')
    .then(res => res.text())
    .then(data => csv = data);
  
  novelTitles = parse(csv);

  generateNovel();
  clearDisplay();
}

$("#real").on('click', selectReal);
$("#amongUsReal").on('click', selectReal);
$("#robinReal").on('click', selectReal);
$("#mobaReal").on('click', selectReal);
$("#eldenRingReal").on('click', selectReal);
function selectReal() {
  choose(Status.REAL);
}

$("#fake").on('click', selectFake);
$("#amongUsFake").on('click', selectFake);
$("#robinFake").on('click', selectFake);
$("#mobaFake").on('click', selectFake);
$("#eldenRingFake").on('click', selectFake);
function selectFake() {
  choose(Status.FAKE);
}

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


//button skin settings
$("#defaultButtons").on('click', function() {
  $('#buttonPicker').html("Default Buttons");

  hideButtonsExcept("default");
});

$("#amongUsButtonGroup").on('click', function() {
  $('#buttonPicker').html("Among Us Buttons");

  hideButtonsExcept("among us");
});

$("#robinButtonGroup").on('click', function() {
  $('#buttonPicker').html("Robin (HSR) Buttons");

  hideButtonsExcept("robin");
});

$("#mobaButtonGroup").on('click', function() {
  $('#buttonPicker').html("MOBA Buttons");

  hideButtonsExcept("moba");
});

$("#eldenRingButtonGroup").on('click', function() {
  $('#buttonPicker').html("Elden Ring Buttons");

  hideButtonsExcept("elden ring");
});

function hideButtonsExcept(buttonGroup) {
  $('#defaultButtonGroup').hide();
  $('#amongUsButtonGroup').hide();
  $('#robinButtonGroup').hide();
  $('#mobaButtonGroup').hide();
  $('#eldenRingButtonGroup').hide();

  switch (buttonGroup) {
    case "default":
      $('#defaultButtonGroup').show();
      break;
    case "among us":
      $('#amongUsButtonGroup').show();
      break;
    case "robin":
      $('#robinButtonGroup').show();
      break;
    case "moba":
      $('#mobaButtonGroup').show();
      break;
    case "elden ring":
      $('#eldenRingButtonGroup').show();
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

function choose(status) {
  if (currentStatus == status) {
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

function randomStatus() {
  return Math.floor(Math.random() * 1);
}

function randomNovel() {
  return Math.floor(Math.random() * (novelTitles.length - 1)) + 1;
}

function generateNovel() {
  [currentStatus, currentNovel] = [randomStatus(), randomNovel()];
  $('#novelTitleDisplay').html(novelTitles[currentNovel][currentStatus]);
}

function clearDisplay() {
  $('#answerDisplay').html("");
  $('#answerDisplay').removeClass("text-success");
  $('#answerDisplay').removeClass("text-danger");
}
