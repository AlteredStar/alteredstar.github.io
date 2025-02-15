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

const showMode = currentTheme => {
  if (currentTheme == "light") {
    $('#modeDisplay').html('<i class="fa-solid fa-sun px-2"></i>Light Mode');
  }
  else if (currentTheme == "dark") {
    $('#modeDisplay').html('<i class="fa-solid fa-sun px-2"></i>Dark Mode');
  }
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  const storedTheme = getStoredTheme();
  if (storedTheme !== 'light' && storedTheme !== 'dark') {
    setTheme(getPreferredTheme());
    showMode(getPreferredTheme());
  }
})
