/* Ilves P2018 – Talven muut pelit 2026–27 (staattinen lista) */
(function () {
  'use strict';

  /* Lisää uudet tapahtumat tähän listaan aikajärjestyksessä. */
  var EVENTS = [
    {date: 'la 14.11.2026', name: 'Vapari 3v3', venue: 'Vaparihalli', teams: [
      {name: 'Ilves P2018', players: ['Altti Lehtinen','Edvin Aalto','Elmeri Taskinen','Josef Al-Bayati','Julius Leppäkoski','Lukas Riponiemi','Moses Toppi','Otso Jokilehto']}
    ]},
    {date: 'la–su 21.–22.11.2026', name: 'Miniliiga P9 – HJK', venue: 'Helsinki', teams: [
      {name: 'Ilves A', players: ['Henrik Fischer','Lemmy Pitkänen','Leo Mayomi','Nooa Kemppainen','Noel Lamminen','Patrick Kyllönen','Thomas Tienvieri','Vilho Keisu']},
      {name: 'Ilves B', players: ['Elias Mattila','Heikki Lähteenmäki','Jasper Havia','Oiva Rossi','Venni Tauriainen','Verneri Vatanen','Viljami Hanski','Vilho Anttila']}
    ]},
    {date: 'su 22.11.2026 klo 13–16', name: 'Talviliiga – JJK', venue: 'Huhtahalli, Jyväskylä', teams: [
      {name: 'Ryhmä 1', players: ['An-nur Aminu','Eeli Huotari','Eeli Saunamäki','Emil Kruus','Emil Paloniemi','Justus Tiainen','Veikko Aaltonen','Viljo Konttinen']},
      {name: 'Ryhmä 2', players: ['Elias Nieminen','Gad Niyokwizerwa','Jamiel Akalazu','Lakindu Gamlath','Mikael Leino','Mikke Laaksonen','Oliver Mäkiranta','Ruben Elomaa']}
    ]},
    {date: 'su 22.11.2026', name: 'Talvisarja', venue: 'Tammela', teams: [
      {name: 'Ilves (taso 1)', players: ['Eliel Vaine','Elmeri Taskinen','Leevi Mäkinen','Matts Dunder','Oliver Kauppinen','Pauli Ahonen','Roger Wolanen','Walter Capone']},
      {name: 'Ilves Keltainen (taso 2)', players: ['Aaron Melander','Altti Lehtinen','Atila Nikkhouyabgarm','Kevin Kytökorpi','Leevi Demin','Milo Hermans','Otso Miranda','Thomas Saresvaara']}
    ]},
    {date: 'la 28.11.2026', name: 'Vapari 3v3', venue: 'Vaparihalli', teams: [
      {name: 'Ilves P2018', players: ['Edvin Järvinen','Kasper-veli Räihä','Matts Dunder','Milo Hermans','Oliver Kauppinen','Onni Muranen','Tapio Oinas','Valo Saarimäki','Vilho Anttila']}
    ]},
    {date: 'su 6.12.2026', name: 'Talvisarja', venue: 'Tammela', teams: [
      {name: 'Ilves (taso 1)', players: ['Edvin Järvinen','Einari Orispää','Lukas Bassina','Lukas Riponiemi','Mert Efe Özkan','Otso Jokilehto','Rasmus Lähteenmäki','Santtu Sulonen']},
      {name: 'Ilves Keltainen (taso 2)', players: ['Edvin Aalto','Eino Innanen','Elmo Lovén','Hugo Ulmanen','Joel Aro','Josef Al-Bayati','Moses Toppi','Tapio Oinas']}
    ]}
  ];

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  /* ── PELAAJAHAKU ── */
  var FUTSAL = null;
  function parseDate(str) { var m = /(\d{1,2})\.(\d{1,2})\.(\d{4})/.exec(str); return m ? new Date(+m[3], +m[2] - 1, +m[1]) : null; }
  function lastDate(str) { var ms = str.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/g) || []; var all = str.match(/(\d{1,2})\.(\d{1,2})\./g) || []; var y = (/(\d{4})/.exec(str) || [])[1];
    if (!all.length) { return null; } var last = all[all.length - 1].split('.'); return new Date(+y, +last[1] - 1, +last[0]); }

  function allPlayers() {
    var set = {};
    EVENTS.forEach(function (ev) { ev.teams.forEach(function (t) { t.players.forEach(function (p) { set[p] = 1; }); }); });
    if (FUTSAL) { FUTSAL.teams.forEach(function (t) { (t.players || []).forEach(function (p) { set[p] = 1; }); }); }
    return Object.keys(set).sort(function (a, b) { return a.localeCompare(b, 'fi'); });
  }

  function playerEvents(name) {
    var rows = [];
    if (FUTSAL) {
      FUTSAL.teams.forEach(function (t) {
        if ((t.players || []).indexOf(name) < 0) { return; }
        var byDay = {};
        t.matches.forEach(function (m) {
          var key = m.d || m.open;
          if (!byDay[key]) { byDay[key] = {key: key, open: !m.open ? false : true, games: [], arena: m.arena || ''}; }
          byDay[key].games.push((m.t ? m.t + ' ' : '') + m.h + ' \u2013 ' + m.a);
        });
        Object.keys(byDay).forEach(function (k) {
          var g = byDay[k];
          rows.push({sort: g.open ? parseDate(k) : parseDate(k), date: (g.open ? 'Sovittava kierros ' : '') + k, name: 'Futsal \u2013 ' + t.name + ' (' + t.div + ')', venue: g.arena, detail: g.games.join(' \u00b7 '), futsal: true});
        });
      });
    }
    EVENTS.forEach(function (ev) {
      ev.teams.forEach(function (t) {
        if (t.players.indexOf(name) >= 0) { rows.push({sort: lastDate(ev.date), date: ev.date, name: ev.name, venue: ev.venue, detail: t.name}); }
      });
    });
    rows.sort(function (a, b) { return (a.sort || 0) - (b.sort || 0); });
    return rows;
  }

  function renderSearch() {
    var players = allPlayers();
    var html = '<div class="team-card open search-card"><div class="team-header" style="cursor:default"><span class="team-name">&#128269; Pelaajahaku</span></div><div class="round-group">';
    html += '<input id="player-input" list="player-list" class="player-input" placeholder="Kirjoita tai valitse pelaaja\u2026" autocomplete="off">';
    html += '<datalist id="player-list">';
    players.forEach(function (p) { html += '<option value="' + esc(p) + '">'; });
    html += '</datalist><div id="player-result"></div></div></div>';
    document.getElementById('search').innerHTML = html;
    var input = document.getElementById('player-input');
    function show() {
      var name = input.value.trim();
      var out = document.getElementById('player-result');
      if (players.indexOf(name) < 0) { out.innerHTML = ''; return; }
      var rows = playerEvents(name);
      var h = '<div class="player-events">';
      if (!rows.length) { h += '<div class="players-empty">Ei pelej\u00e4 listoilla.</div>'; }
      rows.forEach(function (r) {
        h += '<div class="pe-row' + (r.futsal ? ' pe-futsal' : '') + '"><div class="pe-date">' + esc(r.date) + '</div><div class="pe-body"><div class="pe-name">' + esc(r.name) + (r.venue ? ' <span class="pe-venue">' + esc(r.venue) + '</span>' : '') + '</div><div class="pe-detail">' + esc(r.detail) + '</div></div></div>';
      });
      h += '</div><div class="pe-count">' + rows.length + ' pelitapahtumaa</div>';
      out.innerHTML = h;
    }
    input.addEventListener('input', show);
    input.addEventListener('change', show);
    var hash = decodeURIComponent(location.hash.replace('#', ''));
    if (hash) { input.value = hash; show(); }
  }

  function loadFutsal() {
    fetch('data/futsal.json').then(function (r) { return r.json(); }).then(function (d) { FUTSAL = d; renderSearch(); })
      .catch(function () { renderSearch(); });
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
        html += '<div class="team-card open"><div class="team-header" style="cursor:default"><span class="team-name">' + esc(t.name) + '</span><span class="team-count">' + players.length + ' pelaajaa</span></div>';
        html += '<div class="round-group"><div class="players-list">';
        for (var p = 0; p < players.length; p++) { html += '<span class="player-name">' + esc(players[p]) + '</span>'; }
        html += '</div></div></div>';
      }
    }
    document.getElementById('content').innerHTML = html;
  }

  render();
  loadFutsal();
})();
