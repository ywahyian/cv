(function () {
  var root = document.documentElement;

  // Theme toggle (remembers choice, otherwise follows the system setting)
  var toggle = document.querySelector('.theme-toggle');
  function current() {
    return root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
  if (!root.getAttribute('data-theme')) root.setAttribute('data-theme', current());
  if (toggle) {
    toggle.setAttribute('aria-pressed', String(current() === 'dark'));
    toggle.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      toggle.setAttribute('aria-pressed', String(next === 'dark'));
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // Print / save as PDF
  document.querySelectorAll('[data-print]').forEach(function (b) {
    b.addEventListener('click', function () { window.print(); });
  });

  // Footer year
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();

  // Highlight the nav link of the section in view
  var links = Array.prototype.slice.call(document.querySelectorAll('.topnav ul a'));
  if ('IntersectionObserver' in window && links.length) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && byId[e.target.id]) {
          links.forEach(function (a) { a.removeAttribute('aria-current'); });
          byId[e.target.id].setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) obs.observe(el);
    });
  }
})();
