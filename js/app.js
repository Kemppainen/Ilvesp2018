/* Ilves P2018 – Futsal 2026–27 (Länsi Futsal) */
(function () {
  'use strict';

  /* Live-data Torneopal-widgetistä; data/futsal.json on varalla, jos haku epäonnistuu. */
  var FALLBACK_URL = 'data/futsal.json?v=' + Date.now();
  var P10 = 'P10 Futsal (2017) \u2013 L\u00e4nsi Futsal', P9 = 'P9 Futsal (2018) \u2013 L\u00e4nsi Futsal';
  var CONFIG = [
    {id: '35203235', key: 'AHFMT5XQ4G', name: 'Ilves P2018', div: 'P10', divTitle: P10, divIdx: 0, players: ['An-nur Aminu', 'Eeli Huotari', 'Emil Paloniemi', 'Gad Niyokwizerwa', 'Jamiel Akalazu', 'Lukas Bassina', 'Oiva Rossi', 'Viljami Hanski'], rests: [{'key': '8.11.2026', 'players': ['Lukas Bassina', 'Eeli Huotari']}, {'key': '16.11.–6.12.2026', 'players': ['An-nur Aminu']}, {'key': '7.2.2027', 'players': ['Jamiel Akalazu']}, {'key': '13.2.2027', 'players': ['Oiva Rossi']}, {'key': '21.3.2027', 'players': ['Emil Paloniemi']}]},
    {id: '35231528', key: 'P84NSEVYPQ', name: 'Ilves P2018 Alfa', div: 'P10', divTitle: P10, divIdx: 0, players: ['Eeli Saunamäki', 'Elias Nieminen', 'Jasper Havia', 'Lakindu Gamlath', 'Mikael Leino', 'Oliver Mäkiranta', 'Veikko Aaltonen', 'Viljo Konttinen'], rests: [{'key': '8.11.2026', 'players': ['Elias Nieminen']}, {'key': '16.11.–6.12.2026', 'players': ['Eeli Saunamäki']}, {'key': '7.2.2027', 'players': ['Jasper Havia']}, {'key': '13.2.2027', 'players': ['Lakindu Gamlath']}, {'key': '21.3.2027', 'players': ['Veikko Aaltonen']}]},
    {id: '35203236', key: 'D6QJHWX56G', name: 'Ilves', div: 'P9', divTitle: P9, divIdx: 1, players: ['Aaron Melander', 'Heikki Lähteenmäki', 'Leo Mayomi', 'Nooa Kemppainen', 'Otso Miranda', 'Rasmus Lähteenmäki', 'Thomas Saresvaara', 'Walter Capone'], rests: [{'key': '2.11.–29.11.2026', 'players': ['Heikki Lähteenmäki']}, {'key': '12.12.2026', 'players': ['Leo Mayomi']}, {'key': '4.1.–24.1.2027', 'players': ['Otso Miranda']}, {'key': '30.1.2027', 'players': ['Rasmus Lähteenmäki']}, {'key': '21.2.2027', 'players': ['Aaron Melander']}]},
    {id: '35203237', key: '66AFTD3BZC', name: 'Ilves Keltainen', div: 'P9', divTitle: P9, divIdx: 1, players: ['Einari Orispää', 'Eino Innanen', 'Eliel Vaine', 'Joel Aro', 'Kasper-veli Räihä', 'Mert Efe Özkan', 'Verneri Vatanen', 'Vilho Keisu'], rests: [{'key': '2.11.–29.11.2026', 'players': ['Einari Orispää']}, {'key': '12.12.2026', 'players': ['Mert Efe Özkan']}, {'key': '9.1.2027', 'players': ['Verneri Vatanen']}, {'key': '31.1.2027', 'players': ['Eliel Vaine']}, {'key': '20.2.2027', 'players': ['Eino Innanen']}]},
    {id: '35203238', key: '7G68W9AQ5N', name: 'Ilves Keltavihre\u00e4', div: 'P9', divTitle: P9, divIdx: 1, players: ['Atila Nikkhouyabgarm', 'Elias Mattila', 'Elmo Lovén', 'Hugo Ulmanen', 'Leevi Demin', 'Leevi Mäkinen', 'Lemmy Pitkänen', 'Pauli Ahonen', 'Santtu Sulonen'], rests: [{'key': '2.11.–29.11.2026', 'players': ['Elias Mattila', 'Lemmy Pitkänen']}, {'key': '30.11.–20.12.2026', 'players': ['Leevi Demin', 'Pauli Ahonen']}, {'key': '23.1.2027', 'players': ['Santtu Sulonen', 'Atila Nikkhouyabgarm']}, {'key': '7.2.2027', 'players': ['Elmo Lovén', 'Hugo Ulmanen']}, {'key': '15.2.–21.3.2027', 'players': ['Elias Mattila', 'Leevi Mäkinen']}]},
    {id: '35203239', key: '5VM23GMEX7', name: 'Ilves Vihre\u00e4', div: 'P9', divTitle: P9, divIdx: 1, players: ['Altti Lehtinen', 'Edvin Aalto', 'Elmeri Taskinen', 'Josef Al-Bayati', 'Justus Tiainen', 'Matts Dunder', 'Noel Lamminen', 'Patrick Kyllönen', 'Ruben Elomaa'], rests: [{'key': '7.11.2026', 'players': ['Elmeri Taskinen', 'Josef Al-Bayati']}, {'key': '12.12.2026', 'players': ['Matts Dunder', 'Noel Lamminen']}, {'key': '23.1.2027', 'players': ['Patrick Kyllönen', 'Ruben Elomaa']}, {'key': '30.1.2027', 'players': ['Altti Lehtinen', 'Edvin Aalto']}, {'key': '15.2.–21.3.2027', 'players': ['Noel Lamminen', 'Justus Tiainen']}]},
    {id: '35231529', key: 'R8GAEV5TZ7', name: 'Ilves Vihre\u00e4keltainen', div: 'P9', divTitle: P9, divIdx: 1, players: ['Henrik Fischer', 'Julius Leppäkoski', 'Kevin Kytökorpi', 'Lukas Riponiemi', 'Mikke Laaksonen', 'Moses Toppi', 'Otso Jokilehto', 'Roger Wolanen', 'Thomas Tienvieri'], rests: [{'key': '7.11.2026', 'players': ['Henrik Fischer', 'Moses Toppi']}, {'key': '12.12.2026', 'players': ['Otso Jokilehto', 'Roger Wolanen']}, {'key': '4.1.–17.1.2027', 'players': ['Thomas Tienvieri', 'Julius Leppäkoski']}, {'key': '23.1.2027', 'players': ['Kevin Kytökorpi', 'Lukas Riponiemi']}, {'key': '22.2.–14.3.2027', 'players': ['Henrik Fischer', 'Mikke Laaksonen']}]},
    {id: '35231530', key: 'TDVDTSX3MN', name: 'Ilves Vihre\u00e4keltainen B', div: 'P9', divTitle: P9, divIdx: 1, players: ['Edvin Järvinen', 'Emil Kruus', 'Milo Hermans', 'Oliver Kauppinen', 'Onni Muranen', 'Tapio Oinas', 'Valo Saarimäki', 'Venni Tauriainen', 'Vilho Anttila'], rests: [{'key': '14.11.2026', 'players': ['Emil Kruus', 'Venni Tauriainen']}, {'key': '20.12.2026', 'players': ['Edvin Järvinen', 'Milo Hermans']}, {'key': '16.1.2027', 'players': ['Oliver Kauppinen', 'Tapio Oinas']}, {'key': '18.1.–31.1.2027', 'players': ['Onni Muranen', 'Valo Saarimäki']}, {'key': '13.3.2027', 'players': ['Venni Tauriainen', 'Vilho Anttila']}]}
  ];

  var TAMPERE_VENUES = ['kauppi','pirkkahalli','vehmai','tesoma','tammela','hervanta','hakamets','kissanmaa','pyynikki','kaleva','linnainmaa','multisilta','peltolammi','nekala','kaukaj\u00e4rvi','lukonm\u00e4ki','rahola','ahvenisj\u00e4rvi','lamminrahka','hakkari','harjuniitty','suorama'];
  var MAP_QUERIES = {
    'pirkkahalli': 'Pirkkahalli+Tampere',
    'vehmaisten koulu': 'Vehmaisten+koulu+Tampere',
    'kauppi sports center': 'Kauppi+Sports+Center+Tampere'
  };
  var WEEKDAYS = ['su','ma','ti','ke','to','pe','la'];

  var TEAMS = [];

  function esc(s) { var d = document.createElement('div'); d.textContent = s || ''; return d.innerHTML; }
  function pad2(n) { return n < 10 ? '0' + n : '' + n; }
  function isOurTeam(n, teamName) { return !!n && !!teamName && n.trim().toLowerCase() === teamName.trim().toLowerCase(); }
  function tag(n, teamName) { return isOurTeam(n, teamName) ? '<span class="ilves">' + esc(n) + '</span>' : esc(n); }

  function isTampereVenue(v) {
    if (!v) { return true; }
    var low = v.toLowerCase();
    for (var i = 0; i < TAMPERE_VENUES.length; i++) { if (low.indexOf(TAMPERE_VENUES[i]) >= 0) { return true; } }
    return false;
  }
  function getGatherMinutes(v) { return 30; }
  function mapQuery(arena) {
    var low = (arena || '').toLowerCase();
    for (var k in MAP_QUERIES) { if (low.indexOf(k) >= 0) { return MAP_QUERIES[k]; } }
    return arena + ' Tampere';
  }

  function parseDate(d, t) {
    var p = d.split('.');
    var dt = new Date(parseInt(p[2], 10), parseInt(p[1], 10) - 1, parseInt(p[0], 10));
    if (t) { var tp = t.split(':'); dt.setHours(parseInt(tp[0], 10) || 0, parseInt(tp[1], 10) || 0); }
    return dt;
  }
  function weekday(d) { return WEEKDAYS[parseDate(d).getDay()]; }
  function shortDate(d) { var p = d.split('.'); return p[0] + '.' + p[1] + '.'; }
  function gatherTime(t, venue) {
    var tp = t.split(':'); var h = parseInt(tp[0], 10) || 0; var m = (parseInt(tp[1], 10) || 0) - getGatherMinutes(venue);
    while (m < 0) { m += 60; h--; }
    if (h < 0) { h = 0; m = 0; }
    return pad2(h) + ':' + pad2(m);
  }
  function openStart(range) {
    var parts = range.split('\u2013'); var end = parts[1].split('.'); var start = parts[0].split('.');
    var y = parseInt(end[2], 10); if (parseInt(start[1], 10) > parseInt(end[1], 10)) { y--; }
    return new Date(y, parseInt(start[1], 10) - 1, parseInt(start[0], 10));
  }

  /* Ryhmittely: pelipäivät ja avoimet aikaikkunat aikajärjestyksessä */
  function groupMatches(matches) {
    var groups = [], map = {};
    for (var i = 0; i < matches.length; i++) {
      var mx = matches[i]; var key = mx.open ? 'open:' + mx.open : mx.d;
      if (!map[key]) {
        map[key] = {key: key, open: mx.open || null, d: mx.d || null, sort: mx.open ? openStart(mx.open) : parseDate(mx.d), matches: []};
        groups.push(map[key]);
      }
      map[key].matches.push(mx);
    }
    groups.sort(function (a, b) { return a.sort - b.sort; });
    return groups;
  }

  /* ── ICS ── */
  function toICS(dt) { return dt.getFullYear() + pad2(dt.getMonth() + 1) + pad2(dt.getDate()) + 'T' + pad2(dt.getHours()) + pad2(dt.getMinutes()) + '00'; }
  function icsEsc(s) { return (s || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n'); }

  function generateICS(teamIdx) {
    var team = TEAMS[teamIdx]; var groups = groupMatches(team.matches);
    var lines = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//IlvesP2018//Futsal//FI','CALSCALE:GREGORIAN','X-WR-CALNAME:' + icsEsc(team.name + ' futsal')];
    var today = new Date(); today.setHours(0, 0, 0, 0);
    for (var gi = 0; gi < groups.length; gi++) {
      var g = groups[gi]; if (g.open) { continue; }
      var first = parseDate(g.d, g.matches[0].t); var last = parseDate(g.d, g.matches[g.matches.length - 1].t);
      if (first < today) { continue; }
      var venue = g.matches[0].arena;
      var start = new Date(first.getTime() - getGatherMinutes(venue) * 60000);
      var end = new Date(last.getTime() + 45 * 60000);
      var desc = ['Kokoontuminen klo ' + gatherTime(g.matches[0].t, venue), ''];
      var rn = restFor(team, g); if (rn.length) { desc.push('Huilaa: ' + rn.join(', '), ''); }
      for (var k = 0; k < g.matches.length; k++) { var m = g.matches[k]; desc.push(m.t + '  ' + m.h + ' - ' + m.a + (m.field ? '  (' + m.field + ')' : '')); }
      lines.push('BEGIN:VEVENT','DTSTART:' + toICS(start),'DTEND:' + toICS(end),'SUMMARY:' + icsEsc('Futsal ' + team.name),'LOCATION:' + icsEsc(venue + ', Tampere'),'DESCRIPTION:' + icsEsc(desc.join('\n')),'UID:ilves-p2018-futsal-' + team.id + '-' + g.d.replace(/\./g, '') + '@ottelukalenteri','END:VEVENT');
    }
    lines.push('END:VCALENDAR');
    var blob = new Blob([lines.join('\r\n')], {type: 'text/calendar;charset=utf-8'});
    var url = URL.createObjectURL(blob); var a = document.createElement('a');
    a.href = url; a.download = team.name.replace(/[\/\\ ]+/g, '-') + '-futsal.ics';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 5000);
  }

  /* ── PDF ── */
  window.generatePDF = function () {
    if (!TEAMS.length) { return; }
    var doc = new window.jspdf.jsPDF({orientation: 'portrait', unit: 'mm', format: 'a4'});
    var pw = 210, ph = 297, ml = 14, cw = pw - 28;
    var GREEN = [10,92,47], YELLOW = [245,176,0], DARK = [30,30,30], MUTED = [100,100,100], LIGHT = [255,252,240];
    function color(c) { doc.setTextColor(c[0], c[1], c[2]); }
    for (var ti = 0; ti < TEAMS.length; ti++) {
      if (ti > 0) { doc.addPage(); }
      var team = TEAMS[ti]; var groups = groupMatches(team.matches);
      doc.setFillColor(YELLOW[0], YELLOW[1], YELLOW[2]); doc.rect(0, 0, pw, 28, 'F');
      doc.setFillColor(GREEN[0], GREEN[1], GREEN[2]); doc.rect(0, 28, pw, 2, 'F');
      doc.setFont('helvetica', 'bold'); doc.setFontSize(16); color(DARK); doc.text(team.name, ml, 13);
      doc.setFontSize(10); color(GREEN); doc.text(team.divTitle, ml, 20);
      doc.setFontSize(9); color(MUTED); doc.text('Futsal 2026\u201327', pw - ml, 13, {align: 'right'}); doc.text(team.matches.length + ' ottelua', pw - ml, 20, {align: 'right'});
      var y = 34;
      if (team.players && team.players.length) {
        doc.setFont('helvetica', 'bold'); doc.setFontSize(8); color(GREEN); doc.text('Pelaajat:', ml, y);
        doc.setFont('helvetica', 'normal'); doc.setFontSize(7.5); color(DARK);
        var pl = doc.splitTextToSize(team.players.join(', '), cw - 18); doc.text(pl, ml + 18, y); y += pl.length * 3.5 + 4;
      } else { y += 2; }
      doc.setFillColor(GREEN[0], GREEN[1], GREEN[2]); doc.rect(ml, y, cw, 7, 'F');
      doc.setFont('helvetica', 'bold'); doc.setFontSize(7.5); doc.setTextColor(255, 255, 255);
      doc.text('PVM', ml + 2, y + 5); doc.text('KOKOONT.', ml + 32, y + 5); doc.text('KELLO', ml + 52, y + 5); doc.text('KOTI', ml + 68, y + 5); doc.text('VIERAS', ml + 112, y + 5); doc.text('PAIKKA', ml + 150, y + 5);
      y += 9;
      var rowH = 6.2, alt = false;
      for (var gi = 0; gi < groups.length; gi++) {
        var g = groups[gi];
        for (var k = 0; k < g.matches.length; k++) {
          var mx = g.matches[k];
          if (alt) { doc.setFillColor(LIGHT[0], LIGHT[1], LIGHT[2]); doc.rect(ml, y, cw, rowH, 'F'); }
          if (k === 0) {
            doc.setFont('helvetica', 'bold'); doc.setFontSize(7.5); color(DARK);
            doc.text(g.open ? 'Avoin ' + g.open : weekday(g.d) + ' ' + shortDate(g.d), ml + 2, y + 4.2);
            if (!g.open) { doc.setFontSize(7); color(GREEN); doc.text(gatherTime(mx.t, mx.arena), ml + 32, y + 4.2); }
          }
          doc.setFont('helvetica', 'bold'); doc.setFontSize(7.5); color(GREEN); doc.text(mx.t || '\u2013', ml + 52, y + 4.2);
          var hH = isOurTeam(mx.h, team.name), aH = isOurTeam(mx.a, team.name);
          doc.setFont('helvetica', hH ? 'bold' : 'normal'); color(hH ? DARK : MUTED); doc.text(mx.h, ml + 68, y + 4.2);
          doc.setFont('helvetica', aH ? 'bold' : 'normal'); color(aH ? DARK : MUTED); doc.text(mx.a, ml + 112, y + 4.2);
          doc.setFont('helvetica', 'normal'); doc.setFontSize(6.5); color(MUTED); doc.text(mx.arena ? mx.arena + (mx.field ? ' ' + mx.field : '') : 'ei viel\u00e4 sovittu', ml + 150, y + 4.2);
          y += rowH; alt = !alt;
        }
        var rn = restFor(team, g);
        if (rn.length) { doc.setFont('helvetica', 'italic'); doc.setFontSize(6.5); color(MUTED); doc.text('Huilaa: ' + rn.join(', '), ml + 2, y + 3.5); y += rowH - 1; }
        if (gi < groups.length - 1) { doc.setDrawColor(230, 220, 190); doc.line(ml, y, ml + cw, y); y += 2; }
      }
      doc.setDrawColor(GREEN[0], GREEN[1], GREEN[2]); doc.line(ml, ph - 12, ml + cw, ph - 12);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(7); color(MUTED);
      doc.text('tulospalvelu.palloliitto.fi', ml, ph - 8); doc.text('Ilves P2018 \u00b7 Futsal 2026\u201327', pw - ml, ph - 8, {align: 'right'});
    }
    doc.save('Ilves-P2018-Futsal-2026-27.pdf');
  };

  function restMatches(key, g) {
    if (key === (g.open || g.d)) { return true; }
    /* avoimelle kierrokselle annettu huili pätee myös, kun päivä on vahvistunut sen aikaikkunaan */
    if (!g.open && key.indexOf('\u2013') >= 0) { var d = parseDate(g.d); return d >= openStart(key) && d <= openEnd(key); }
    return false;
  }
  function openEnd(range) { var e = range.split('\u2013')[1].split('.'); return new Date(parseInt(e[2], 10), parseInt(e[1], 10) - 1, parseInt(e[0], 10)); }
  function restFor(team, g) {
    var rs = team.rests || [];
    for (var i = 0; i < rs.length; i++) { if (restMatches(rs[i].key, g)) { return rs[i].players; } }
    return [];
  }

  /* ── RENDERING ── */
  function renderTeamCard(team, teamIdx) {
    var groups = groupMatches(team.matches);
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var upcoming = 0;
    for (var u = 0; u < groups.length; u++) { if (!groups[u].open && groups[u].sort >= today) { upcoming++; } }

    var html = '<div class="team-card"><div class="team-header">';
    html += '<div class="team-name">' + esc(team.name) + '</div>';
    html += '<div class="team-meta">' + esc(team.div) + '</div>';
    html += '<div class="match-count">' + team.matches.length + ' ottelua</div>';
    html += '<div class="accordion-arrow">\u25BE</div></div>';
    html += '<div class="round-group collapsed">';

    html += '<div class="players-section"><div class="players-header"><span class="players-icon">\u26BD</span><span class="players-title">Pelaajat (' + team.players.length + ')</span><span class="players-arrow">\u25BE</span></div><div class="players-content">';
    if (team.players.length) { html += '<div class="players-list">'; for (var p = 0; p < team.players.length; p++) { html += '<span class="player-name">' + esc(team.players[p]) + '</span>'; } html += '</div>'; }
    else { html += '<div class="players-empty">Pelaajatietoja ei ole viel\u00e4 lis\u00e4tty.</div>'; }
    html += '</div></div>';

    for (var gi = 0; gi < groups.length; gi++) {
      var g = groups[gi];
      html += '<div class="date-group' + (g.open ? ' open-window' : '') + '"><div class="date-venue-row">';
      if (g.open) {
        html += '<div class="date-badge open-badge">Avoin \u00a0' + esc(g.open) + '</div></div>';
        html += '<div class="open-note">P\u00e4iv\u00e4 ja paikka sovitaan kotijoukkueen kanssa</div>';
      } else {
        var arena = g.matches[0].arena;
        html += '<div class="date-badge">' + weekday(g.d) + ' \u00a0' + esc(shortDate(g.d)) + '</div>';
        html += '<a class="venue-tag" href="https://www.google.com/maps/search/' + encodeURIComponent(mapQuery(arena)) + '" target="_blank" rel="noopener"><span class="pin">\uD83D\uDCCD</span> ' + esc(arena) + '</a></div>';
        html += '<div class="gather-time">\uD83D\uDCE2 Kokoontuminen klo ' + gatherTime(g.matches[0].t, arena) + '</div>';
      }
      var restNames = restFor(team, g);
      if (restNames.length) { html += '<div class="rest-note">\uD83D\uDECB Huilaa: ' + esc(restNames.join(', ')) + '</div>'; }
      html += '<div class="match-list">';
      for (var k = 0; k < g.matches.length; k++) {
        var mx = g.matches[k]; var hi = isOurTeam(mx.h, team.name);
        html += '<div class="match-row ' + (hi ? 'home-match' : 'away-match') + '">';
        html += '<div class="match-row-top"><span class="col-time">' + esc(mx.t || '\u2013') + '</span>' + (mx.field ? '<span class="field-detail">' + esc(mx.field) + '</span>' : '') + '</div>';
        html += '<div class="match-row-bottom"><span class="col-home">' + tag(mx.h, team.name) + '</span><span class="col-vs">\u2014</span><span class="col-away">' + tag(mx.a, team.name) + '</span><span class="col-score' + (hasScore(mx.s) ? ' played' : '') + '">' + (hasScore(mx.s) ? esc(mx.s) : '\u2014') + '</span></div>';
        html += '</div>';
      }
      html += '</div></div>';
    }

    if (upcoming > 0) {
      html += '<div class="cal-export-wrap"><button class="cal-export-btn" data-team-idx="' + teamIdx + '">';
      html += '<svg class="cal-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="4" width="16" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M2 8h16" stroke="currentColor" stroke-width="1.5"/><path d="M6 2v4M14 2v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
      html += '<span class="cal-text">Vie ' + upcoming + (upcoming === 1 ? ' pelitapahtuma' : ' pelitapahtumaa') + ' kalenteriin</span></button></div>';
    }
    html += '</div></div>';
    return html;
  }

  function renderAll(data) {
    TEAMS = data.teams;
    var el = document.getElementById('content'); var html = ''; var lastDiv = -1;
    for (var i = 0; i < TEAMS.length; i++) {
      var team = TEAMS[i];
      if (team.divIdx !== lastDiv) {
        html += '<div class="division-header"><div class="division-pill">' + esc(team.div) + '</div><div class="division-title">' + esc(team.divTitle) + '</div></div>';
        lastDiv = team.divIdx;
      }
      html += renderTeamCard(team, i);
    }
    el.innerHTML = html;

    el.addEventListener('click', function (e) {
      var calBtn = e.target.closest('.cal-export-btn');
      if (calBtn) { e.stopPropagation(); generateICS(parseInt(calBtn.getAttribute('data-team-idx'), 10)); return; }
      var pl = e.target.closest('.players-header');
      if (pl) { e.stopPropagation(); var s = pl.closest('.players-section'); if (s) { s.classList.toggle('open'); } return; }
      var header = e.target.closest('.team-header');
      if (header) { var card = header.closest('.team-card'); if (card) { card.classList.toggle('open'); } return; }
      var row = e.target.closest('.match-row');
      if (row && window.innerWidth <= 650) { row.classList.toggle('expanded'); }
    });

    var upd = document.getElementById('updated-date'); if (upd) { upd.textContent = data.updated || '\u2013'; }
    var pdfBtn = document.getElementById('pdf-btn'); if (pdfBtn) { pdfBtn.style.display = 'inline-block'; }
  }

  /* \u2500\u2500 WIDGET \u2500\u2500 */
  function hasScore(sc) { return !!sc && /\d+\s*[\u2013-]\s*\d+/.test(sc); }
  function seasonYear(month) { return month >= 8 ? 2026 : 2027; }

  /* "2.-29.11." / "4.-24.1.2027" / "30.11.-20.12." -> "2.11.\u201329.11.2026" */
  function normRange(txt) {
    var p = txt.replace(/\s/g, '').split('-');
    var b = p[1].split('.').filter(function (x) { return x !== ''; });
    var a = p[0].split('.').filter(function (x) { return x !== ''; });
    var bm = parseInt(b[1], 10); var by = b[2] ? parseInt(b[2], 10) : seasonYear(bm);
    if (by < 100) { by += 2000; }
    var am = a[1] ? parseInt(a[1], 10) : bm;
    return parseInt(a[0], 10) + '.' + am + '.\u2013' + parseInt(b[0], 10) + '.' + bm + '.' + by;
  }
  function normDate(txt) {
    var p = txt.replace(/^(ma|ti|ke|to|pe|la|su)\s+/i, '').split('.').filter(function (x) { return x !== ''; });
    var m = parseInt(p[1], 10); var y = p[2] ? parseInt(p[2], 10) : seasonYear(m);
    if (y < 100) { y += 2000; }
    return parseInt(p[0], 10) + '.' + m + '.' + y;
  }
  function splitVenue(v) {
    var m = v.match(/^(.+?)\s+(Futsal\s+.+)$/i);
    if (m) { return {arena: m[1].replace(/,.*$/, ''), field: m[2]}; }
    m = v.match(/^(.+?)\s+(\d+)$/);
    if (m) { return {arena: m[1], field: 'Kentt\u00e4 ' + m[2]}; }
    return {arena: v.replace(/,.*$/, ''), field: ''};
  }

  function fetchWidget(team) {
    var url = 'https://spl.torneopal.fi/torneopal/ajax/[torneopal:team_schedule:team=' + team.id + String.fromCharCode(38) + 'key=' + team.key + ']';
    return fetch(url, {cache: 'no-store'})
      .then(function (r) { return r.text(); })
      .then(function (txt) {
        var m = txt.match(/innerHTML\s*=\s*"([\s\S]*?)";/);
        if (!m) { throw new Error('no widget'); }
        var tmp = document.createElement('div');
        tmp.innerHTML = m[1].replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\\\/g, '\\');
        var rows = tmp.querySelectorAll('tr'); var out = [];
        for (var i = 0; i < rows.length; i++) {
          var c = rows[i].querySelectorAll('td'); if (c.length < 6) { continue; }
          var get = function (n) { return ((c[n] || {}).textContent || '').trim(); };
          var d = get(1), t = get(2), v = get(3), h = get(4), a = get(5), sc = get(6);
          if (!h && !a) { continue; }
          if (/canceled/.test(rows[i].className)) { continue; }
          if (d.indexOf('-') >= 0 || !/\d/.test(t)) {
            out.push({open: d.indexOf('-') >= 0 ? normRange(d) : normDate(d) + '\u2013' + normDate(d), h: h, a: a, s: sc});
          } else {
            var sv = splitVenue(v);
            out.push({d: normDate(d), t: t, arena: sv.arena, field: sv.field, h: h, a: a, s: sc});
          }
        }
        if (!out.length) { throw new Error('empty'); }
        return out;
      });
  }

  function load() {
    var fallback = null;
    function getFallback() {
      if (!fallback) { fallback = fetch(FALLBACK_URL, {cache: 'no-store'}).then(function (r) { return r.json(); }).catch(function () { return {teams: []}; }); }
      return fallback;
    }
    var jobs = CONFIG.map(function (team) {
      return fetchWidget(team).catch(function () {
        return getFallback().then(function (fb) {
          for (var i = 0; i < fb.teams.length; i++) { if (fb.teams[i].id === team.id) { return fb.teams[i].matches; } }
          return [];
        });
      }).then(function (matches) {
        return {id: team.id, name: team.name, div: team.div, divTitle: team.divTitle, divIdx: team.divIdx, players: team.players, rests: team.rests || [], matches: matches};
      });
    });
    Promise.all(jobs)
      .then(function (teams) {
        document.getElementById('loading').classList.add('hidden');
        var now = new Date();
        renderAll({teams: teams, updated: now.getDate() + '.' + (now.getMonth() + 1) + '.' + now.getFullYear()});
      })
      .catch(function () { document.getElementById('loading').innerHTML = '<div style="color:#F5B000">\u26A0\uFE0F Ottelutietoja ei voitu ladata.</div>'; });
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', load); } else { load(); }
})();
