// nav.js — included by every page. Builds nav + language switcher.
// Requires data.js to be loaded first (for I18N, LANG, setLang, t).

(function () {
  // Determine path depth: pages/ = '../', root = ''
  const isRoot = !window.location.pathname.includes('/pages/');
  const base = isRoot ? 'pages/' : '';
  const home = isRoot ? 'index.html' : '../index.html';

  function link(file, labelKey) {
    const href = file === 'index.html' ? home : base + file;
    const current = window.location.pathname.split('/').pop();
    const active = (current === file || (file === 'index.html' && (current === '' || current === 'index.html'))) ? ' class="active"' : '';
    return `<li><a href="${href}"${active}>${t(labelKey)}</a></li>`;
  }

  const navHTML = `
    <div class="nav-logo">Linear B<span>Mycenaean Greek Script</span></div>
    <ul class="nav-links">
      ${link('index.html','nav_home')}
      ${link('syllabary.html','nav_syllabary')}
      ${link('transliterator.html','nav_translit')}
      ${link('tablets.html','nav_tablets')}
      ${link('grammar.html','nav_grammar')}
      ${link('vocabulary.html','nav_vocab')}
      ${link('numbers.html','nav_numbers')}
      ${link('quiz.html','nav_quiz')}
      ${link('decode.html','nav_decode')}
      ${link('translator.html','nav_translate')}
    </ul>
    <div class="lang-switcher" id="lang-sw"></div>`;

  document.addEventListener('DOMContentLoaded', function () {
    const nav = document.querySelector('.nav');
    if (nav) nav.innerHTML = navHTML;

    // Build lang switcher
    const sw = document.getElementById('lang-sw');
    if (sw) {
      ['en', 'fr', 'gr'].forEach(l => {
        const btn = document.createElement('button');
        btn.className = 'lang-btn' + (LANG === l ? ' active' : '');
        btn.textContent = I18N[l].lang;
        btn.title = I18N[l].flag + ' ' + I18N[l].lang;
        btn.addEventListener('click', () => setLang(l));
        sw.appendChild(btn);
      });
    }
  });
})();
