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

function selectReal() {
  choose(Status.REAL);
}

function selectFake() {
  choose(Status.FAKE);
}

$('[data-button-type=real]').on('click', selectReal);
$('[data-button-type=fake]').on('click', selectFake);

$("#reroll").on('click', () => {
  generateNovel();
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

function choose(status) {
  $('#answerDisplay').removeClass("text-success");
  $('#answerDisplay').removeClass("text-danger");

  if (currentStatus == status) {
    $('#answerDisplay').html("CORRECT");
    $('#answerDisplay').addClass("text-success");
  }
  else {
    $('#answerDisplay').html("WRONG");
    $('#answerDisplay').addClass("text-danger");
  }

  if (autoReroll.checked) {
    setTimeout(() => {
      generateTitle();
    }, rerollSpeed);

    setTimeout(() => {
      clearDisplay();
    }, rerollSpeed != 0 ? rerollSpeed : 500);
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
