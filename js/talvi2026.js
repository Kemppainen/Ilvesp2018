/* Ilves P2018 – Talven muut pelit 2026–27 (staattinen lista) */
(function () {
  'use strict';

  /* Tapahtumat ovat tiedostossa js/events.js */
  var EVENTS = window.TALVI_EVENTS || [];

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  function loadFutsal() {
    fetch('data/futsal.json').then(function (r) { return r.json(); }).then(function (d) { window.renderPlayerSearch(d); })
      .catch(function () { window.renderPlayerSearch(null); });
  }

  function render() {
    var html = '';
    for (var i = 0; i < EVENTS.length; i++) {
      var ev = EVENTS[i];
      html += '<div class="division-header"><span class="division-pill">' + esc(ev.date) + '</span><span class="division-title">' + esc(ev.name) + '</span></div>';
      if (ev.venue) { html += '<div class="event-meta">' + esc(ev.venue) + '</div>'; }
      for (var j = 0; j < ev.teams.length; j++) {
        var t = ev.teams[j];
        var players = t.players.slice().sort(function (a, b) { return a.localeCompare(b, 'fi'); });
        html += '<div class="team-card"><div class="team-header"><span class="team-name">' + esc(t.name) + (t.time ? ' <span class="team-time">' + esc(t.time) + '</span>' : '') + '</span><span class="team-meta"><span class="match-count">' + (players.length ? players.length + ' pelaajaa' : 'avoin') + '</span></span><div class="accordion-arrow">\u25BE</div></div>';
        html += '<div class="round-group collapsed">';
        if (t.info) { html += '<div class="team-info">' + esc(t.info) + '</div>'; }
        if (players.length) { html += '<div class="players-list">'; for (var p = 0; p < players.length; p++) { html += '<span class="player-name">' + esc(players[p]) + '</span>'; } html += '</div>'; }
        else { html += '<div class="players-empty">Pelaajat nimet\u00e4\u00e4n my\u00f6hemmin.</div>'; }
        html += '</div></div>';
      }
    }
    var el = document.getElementById('content');
    el.innerHTML = html;
    el.addEventListener('click', function (e) {
      var header = e.target.closest('.team-header');
      if (header) { var card = header.closest('.team-card'); if (card) { card.classList.toggle('open'); } }
    });
  }

  render();
  loadFutsal();
})();
