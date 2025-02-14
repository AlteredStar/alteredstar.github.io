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
}

$("#real").on('click', function() {
  choose(Status.REAL);
});

$("#fake").on('click', function() {
  choose(Status.FAKE);
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

  clearDisplay();
});

$("#defaultButtons").on('click', function() {
  $('#buttonPicker').html("Default Buttons");

  $('#defaultButtonGroup').show();
  //$('#').hide();
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
  else {
    generateNovel();
    setTimeout(function (){
      clearDisplay();
    }, 300);
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
