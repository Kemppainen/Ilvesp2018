/* Ilves P2018 – Talven muut pelit 2026–27 (staattinen lista) */
(function () {
  'use strict';

  /* Lisää uudet tapahtumat tähän listaan aikajärjestyksessä. */
  var EVENTS = [
    {date: 'la 14.11.2026', name: 'Vapari 3v3', venue: 'Vaparihalli', teams: [
      {name: 'Ilves P2018', players: ['Altti Lehtinen','Edvin Aalto','Elmeri Taskinen','Josef Al-Bayati','Julius Leppäkoski','Lukas Riponiemi','Moses Toppi','Otso Jokilehto']}
    ]},
    {date: 'su 22.11.2026', name: 'Miniliiga P9 – HJK', venue: 'Helsinki', teams: [
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

  function rangeOf(key) { var p = key.split('\u2013'); var e = p[1].split('.'); var s = p[0].split('.'); var y = +e[2]; if (+s[1] > +e[1]) { y--; }
    return [new Date(y, +s[1] - 1, +s[0]), new Date(+e[2], +e[1] - 1, +e[0])]; }
  function restKeyMatches(key, k, isOpen) {
    if (key === k) { return true; }
    if (!isOpen && key.indexOf('\u2013') >= 0) { var d = parseDate(k); var r = rangeOf(key); return d >= r[0] && d <= r[1]; }
    return false;
  }

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
          if (m.t) { byDay[key].times = byDay[key].times || []; byDay[key].times.push(m.t); }
        });
        Object.keys(byDay).forEach(function (k) {
          var g = byDay[k];
          var resting = (t.rests || []).some(function (r) { return restKeyMatches(r.key, k, !!g.open) && r.players.indexOf(name) >= 0; });
          if (resting) { rows.push({sort: parseDate(k), day: null, rest: true, date: (g.open ? 'Sovittava kierros ' : '') + k, name: 'Futsal \u2013 ' + t.name + ' (' + t.div + ')', venue: g.arena, detail: 'Huilivuoro', futsal: true}); return; }
          rows.push({sort: parseDate(k), day: g.open ? null : parseDate(k), times: g.times || null, open: !!g.open, date: (g.open ? 'Sovittava kierros ' : '') + k, name: 'Futsal \u2013 ' + t.name + ' (' + t.div + ')', venue: g.arena, detail: g.games.join(' \u00b7 '), futsal: true});
        });
      });
    }
    EVENTS.forEach(function (ev) {
      ev.teams.forEach(function (t) {
        if (t.players.indexOf(name) >= 0) {
          var tm = /klo\s*(\d{1,2})(?:[.:](\d{2}))?\s*[\u2013-]\s*(\d{1,2})(?:[.:](\d{2}))?/.exec(ev.date);
          rows.push({sort: lastDate(ev.date), day: lastDate(ev.date), span: tm ? [+tm[1], +(tm[2] || 0), +tm[3], +(tm[4] || 0)] : null, date: ev.date, name: ev.name, venue: ev.venue, detail: t.name});
        }
      });
    });
    rows.sort(function (a, b) { return (a.sort || 0) - (b.sort || 0); });
    return rows;
  }

  /* ── ICS ── */
  function pad2(n) { return n < 10 ? '0' + n : '' + n; }
  function toICS(dt) { return dt.getFullYear() + pad2(dt.getMonth() + 1) + pad2(dt.getDate()) + 'T' + pad2(dt.getHours()) + pad2(dt.getMinutes()) + '00'; }
  function toICSDate(dt) { return dt.getFullYear() + pad2(dt.getMonth() + 1) + pad2(dt.getDate()); }
  function icsEsc(x) { return (x || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n'); }
  var TAMPERE = ['kauppi','tesoma','tammela','hervanta','hakamets','kissanmaa','pyynikki','kaleva','vehmai','pirkkahalli','vapari','tampere','ylöjärv','lamminrahka','kangasala','lempäälä','nokia','pirkkala'];
  function gatherMinutes(v) { var low = (v || '').toLowerCase(); for (var i = 0; i < TAMPERE.length; i++) { if (low.indexOf(TAMPERE[i]) >= 0) { return 30; } } return v ? 45 : 30; }
  function gatherStr(dt) { return pad2(dt.getHours()) + ':' + pad2(dt.getMinutes()); }

  function exportICS(name, rows) {
    var lines = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//IlvesP2018//Talvi//FI','CALSCALE:GREGORIAN','X-WR-CALNAME:' + icsEsc(name + ' \u2013 Ilves P2018')];
    var n = 0;
    rows.forEach(function (r, i) {
      if (!r.day) { return; } /* sovittavat kierrokset ohitetaan */
      var uid = 'ilves-p2018-talvi-' + i + '-' + toICSDate(r.day) + '-' + encodeURIComponent(name) + '@ottelukalenteri';
      var summary = r.name + (r.detail && !r.futsal ? ' (' + r.detail + ')' : '');
      var desc = [];
      if (r.futsal && r.times && r.times.length) {
        var t = r.times.slice().sort(); var f = t[0].split(':'); var l = t[t.length - 1].split(':');
        var first = new Date(r.day.getFullYear(), r.day.getMonth(), r.day.getDate(), +f[0], +f[1]);
        var last = new Date(r.day.getFullYear(), r.day.getMonth(), r.day.getDate(), +l[0], +l[1]);
        var start = new Date(first.getTime() - 30 * 60000);
        var end = new Date(last.getTime() + 45 * 60000);
        desc.push('Kokoontuminen klo ' + gatherStr(start), '', r.detail);
        lines.push('BEGIN:VEVENT','DTSTART:' + toICS(start),'DTEND:' + toICS(end));
      } else if (r.span) {
        var s0 = new Date(r.day.getFullYear(), r.day.getMonth(), r.day.getDate(), r.span[0], r.span[1]);
        var e0 = new Date(r.day.getFullYear(), r.day.getMonth(), r.day.getDate(), r.span[2], r.span[3]);
        var st = new Date(s0.getTime() - gatherMinutes(r.venue) * 60000);
        desc.push('Kokoontuminen klo ' + gatherStr(st), '', r.detail);
        lines.push('BEGIN:VEVENT','DTSTART:' + toICS(st),'DTEND:' + toICS(e0));
      } else {
        var next = new Date(r.day.getTime() + 86400000);
        desc.push(r.detail, '', 'Kellonaika tarkentuu.');
        lines.push('BEGIN:VEVENT','DTSTART;VALUE=DATE:' + toICSDate(r.day),'DTEND;VALUE=DATE:' + toICSDate(next));
      }
      lines.push('SUMMARY:' + icsEsc(summary));
      if (r.venue) { lines.push('LOCATION:' + icsEsc(r.venue)); }
      lines.push('DESCRIPTION:' + icsEsc(desc.join('\n')),'UID:' + uid,'END:VEVENT');
      n++;
    });
    lines.push('END:VCALENDAR');
    var blob = new Blob([lines.join('\r\n')], {type: 'text/calendar;charset=utf-8'});
    var url = URL.createObjectURL(blob); var a = document.createElement('a');
    a.href = url; a.download = name.replace(/[\/\\ ]+/g, '-') + '-pelit.ics';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    return n;
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
        h += '<div class="pe-row' + (r.futsal ? ' pe-futsal' : '') + (r.rest ? ' pe-rest' : '') + '"><div class="pe-date">' + esc(r.date) + '</div><div class="pe-body"><div class="pe-name">' + esc(r.name) + (r.venue ? ' <span class="pe-venue">' + esc(r.venue) + '</span>' : '') + '</div><div class="pe-detail">' + esc(r.detail) + '</div></div></div>';
      });
      var fixed = rows.filter(function (r) { return r.day; }).length;
      var played = rows.filter(function (r) { return !r.rest; }).length;
      h += '</div><div class="pe-footer"><span class="pe-count">' + played + ' pelitapahtumaa' + (rows.length - played ? ' + ' + (rows.length - played) + ' huilivuoroa' : '') + '</span>';
      if (fixed) { h += '<button type="button" class="cal-export-btn" id="pe-cal">&#128197; Vie kalenteriin (' + fixed + ')</button>'; }
      h += '</div>';
      out.innerHTML = h;
      var b = document.getElementById('pe-cal');
      if (b) { b.addEventListener('click', function () { exportICS(name, rows); }); }
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
        html += '<div class="team-card"><div class="team-header"><span class="team-name">' + esc(t.name) + '</span><span class="team-meta"><span class="match-count">' + players.length + ' pelaajaa</span></span><div class="accordion-arrow">\u25BE</div></div>';
        html += '<div class="round-group collapsed"><div class="players-list">';
        for (var p = 0; p < players.length; p++) { html += '<span class="player-name">' + esc(players[p]) + '</span>'; }
        html += '</div></div></div>';
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
