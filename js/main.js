$(document).ready(() => {
  $('.nav-wraper').load('/common/nav.html');    
  $('.footer-wraper').load('/common/footer.html');
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

function showMode(currentTheme) {
  $('#modeSymbol').toggleClass("fa-sun");
  $('#modeSymbol').toggleClass("fa-moon");

  if (currentTheme == "light") {
    $('#modeDisplay').html('<i class="fa-solid fa-sun px-2"></i>Light Mode');
    $('#modeSymbol').toggleClass("fa-sun");
  }
  else if (currentTheme == "dark") {
    $('#modeDisplay').html('<i class="fa-solid fa-sun px-2"></i>Dark Mode');
    $('#modeSymbol').toggleClass("fa-moon");
  }
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  const storedTheme = getStoredTheme();
  if (storedTheme !== 'light' && storedTheme !== 'dark') {
    setTheme(getPreferredTheme());
    showMode(getPreferredTheme());
  }
})
