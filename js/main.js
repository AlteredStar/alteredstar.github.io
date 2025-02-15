$(document).ready(() => {
  $('.nav-wraper').load('/common/nav.html');    
  $('.footer-wraper').load('/common/footer.html');
  showMode(getPreferredTheme());
});

const getStoredTheme = () => localStorage.getItem('theme');
const setStoredTheme = theme => localStorage.setItem('theme', theme);

const getPreferredTheme = () => {
  const storedTheme = getStoredTheme();
  if (storedTheme) {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const setTheme = theme => {
  if (theme === 'auto') {
    document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  } else {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }
}

setTheme(getPreferredTheme());

/* $("#autoMode").on('click', () => {
  console.log("HELLLOOOOO");
  setStoredTheme("auto");
  setTheme("auto");
  showMode("auto");
});

$("#lightMode").on('click', () => {
  console.log("HELLLOOOOO");
  setStoredTheme("light");
  setTheme("light");
  showMode("light");
});

$("#darkMode").on('click', () => {
  console.log("HELLLOOOOO");
  setStoredTheme("dark");
  setTheme("dark");
  showMode("dark");
}); */

function showMode(currentTheme) {
  console.log("here in show");
  $("#modeSymbol").removeClass("fa-solid fa-circle-half-stroke");
  $("#modeSymbol").removeClass("fa-solid fa-sun");
  $("#modeSymbol").removeClass("fa-solid fa-moon");

  switch (currentTheme) {
    case "auto":
      $("#modeSymbol").addClass("fa-solid fa-circle-half-stroke");
      $("#modeDisplay").html("Auto");
      break;
    case "light":
      $("#modeSymbol").addClass("fa-solid fa-sun");
      $("#modeDisplay").html("Light Mode");
      break;
    case "dark":
      $("#modeSymbol").addClass("fa-solid fa-moon");
      $("#modeDisplay").html("Dark Mode");
      break;
    default:
      $("#modeSymbol").addClass("fa-solid fa-circle-half-stroke");
      $("#modeDisplay").html("Auto");
  }
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  const storedTheme = getStoredTheme();
  if (storedTheme !== 'light' && storedTheme !== 'dark') {
    setTheme(getPreferredTheme());
  }
})
