(function() {
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;

  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    btn.innerHTML = theme === 'dark' ? '&#9728;' : '&#9790;';
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  // Set initial icon based on current theme
  setTheme(getTheme());

  btn.addEventListener('click', function() {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
  });
})();
