(function () {
  'use strict';

  var TEAMS = [
    {id: '35213605', key: 'Z4QDRKWRTR', name: 'Ilves/P2018/A', div: 'P9', divTitle: 'Pojat 2017 \u2013 Piirisarja P9', taso: 1, divIdx: 0, players: ['Nooa Kemppainen','Mikke Laaksonen','Verneri Vatanen','Leo Mayomi','Noel Lamminen','Aslan Virtanen','Heikki L\u00e4hteenm\u00e4ki','Lukas Bassina']},
    {id: '35213607', key: 'R8C3ZUZPBX', name: 'Ilves/P2018/B', div: 'P9', divTitle: 'Pojat 2017 \u2013 Piirisarja P9', taso: 1, divIdx: 0, players: ['Justus Tiainen','Vilho Keisu','Lemmy Pitk\u00e4nen','Henrik Fischer','Patrick Kyll\u00f6nen','Jasper Havia','Venni Tauriainen','Emil Kruus']},
    {id: '35213608', key: '2CNSGFS7V5', name: 'Ilves/Keltainen A', div: 'P8', divTitle: 'Pojat 2018 \u2013 Piirisarja P8', taso: 1, divIdx: 1, players: ['Eeli Huotari #66','Oliver M\u00e4kiranta','Thomas Tienvieri','Elias Mattila','Eetu Palander','Oiva Rossi','Tapio Oinas','Elias Nieminen']},
    {id: '35213611', key: 'K9N7PPBTBF', name: 'Ilves/Keltainen B', div: 'P8', divTitle: 'Pojat 2018 \u2013 Piirisarja P8', taso: 1, divIdx: 1, players: ['Viljami Hanski','Elias Juutilainen','Santtu Sulonen','An-nur Aminu','Mert Efe \u00d6zkan','Mikael Leino','Oliver Kauppinen','Pauli Ahonen']},
    {id: '35213613', key: 'NKW75YPCGN', name: 'Ilves/Keltavihre\u00e4 A', div: 'P8', divTitle: 'Pojat 2018 \u2013 Piirisarja P8', taso: 1, divIdx: 1, players: ['Leevi M\u00e4kinen','Vilho Anttila','Roger Wolanen','Jamiel Akalazu','Otso Miranda','Disuneth Withanage','Emil N\u00e4ttinen','Rasmus L\u00e4hteenm\u00e4ki','Matts Dunder']},
    {id: '35213615', key: 'SGTRRP6YUB', name: 'Ilves/Keltavihre\u00e4 B', div: 'P8', divTitle: 'Pojat 2018 \u2013 Piirisarja P8', taso: 1, divIdx: 1, players: ['Lukas Riponiemi','Veikko Aaltonen','Ruben Elomaa','Milo Hermans','Moses Toppi','Emil Paloniemi','Eliel Vaine','Erik Lindberg']},
    {id: '35213617', key: 'ZV5D4CPTYF', name: 'Ilves/Vihre\u00e4 A', div: 'P8', divTitle: 'Pojat 2018 \u2013 Piirisarja P8', taso: 2, divIdx: 1, players: ['Elmeri Taskinen','Einari Orisp\u00e4\u00e4','Eeli Saunam\u00e4ki','Adam Pyysalo','Josef Al-Bayati','Leevi Demin','Otso Jokilehto','Edvin J\u00e4rvinen #48','Eeli Tahvanainen']}
  ];

  var TAMPERE_VENUES = ['kauppi','tesoma','tammela','hervanta','hakamets','kissanmaa','pyynikki','kaleva','linnainmaa','multisilta','peltolammi','nekala','kaukaj\u00e4rvi','lukonm\u00e4ki','rahola','ahvenisj\u00e4rvi','keskuskentt','yl\u00f6j\u00e4rven ilves','lamminrahka','hakkari','harjuniitty','suorama'];

  function isTampereVenue(v) {
    if (!v) { return true; } /* default to local if unknown */
    var low = v.toLowerCase();
    for (var i = 0; i < TAMPERE_VENUES.length; i++) {
      if (low.indexOf(TAMPERE_VENUES[i]) >= 0) { return true; }
    }
    return false;
  }

  function getGatherMinutes(venue) {
    return isTampereVenue(venue) ? 30 : 45;
  }

  var VENUE_MAP_OVERRIDES = {
    'keskuskentt\u00e4': 'Pirkkalan+keskuskentt\u00e4+Pirkkala'
  };

  function getMapQuery(arenaName) {
    var low = arenaName.toLowerCase();
    for (var key in VENUE_MAP_OVERRIDES) {
      if (low.indexOf(key) >= 0) { return VENUE_MAP_OVERRIDES[key]; }
    }
    return arenaName;
  }

  var allResults = [];

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s || '';
    return d.innerHTML;
  }

  function isOurTeam(n, teamName) {
    if (!n || !teamName) { return false; }
    return n.trim().toLowerCase() === teamName.trim().toLowerCase();
  }

  function tag(n, teamName) {
    if (isOurTeam(n, teamName)) { return '<span class="ilves">' + esc(n) + '</span>'; }
    return esc(n);
  }

  function splitVenue(v) {
    if (!v) { return {arena: '', detail: ''}; }
    var m = v.match(/^(.+?)\s+(TN\s*.+|N\s+[A-Z].*)$/i);
    if (m) { return {arena: m[1].trim(), detail: m[2].trim()}; }
    return {arena: v, detail: ''};
  }

  function fetchWidget(teamId, teamKey) {
    var url = 'https://spl.torneopal.fi/torneopal/ajax/[torneopal:team_schedule:team=' + teamId + String.fromCharCode(38) + 'key=' + teamKey + ']';
    return fetch(url, {cache: 'no-store'})
      .then(function (r) { return r.text(); })
      .then(function (txt) {
        var m = txt.match(/innerHTML\s*=\s*"([\s\S]*?)";/);
        if (!m) { return []; }
        var html = m[1].replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\\\/g, '\\');
        var tmp = document.createElement('div');
        tmp.innerHTML = html;
        return parseTable(tmp);
      })
      .catch(function () { return []; });
  }

  function parseTable(container) {
    var rows = container.querySelectorAll('tr');
    var matches = [];
    for (var i = 0; i < rows.length; i++) {
      var cells = rows[i].querySelectorAll('td');
      if (cells.length < 6) { continue; }
      var dateText = (cells[1] || {}).textContent || '';
      var timeText = (cells[2] || {}).textContent || '';
      var venueText = (cells[3] || {}).textContent || '';
      var homeText = (cells[4] || {}).textContent || '';
      var awayText = (cells[5] || {}).textContent || '';
      var scoreText = (cells[6] || {}).textContent || '';
      dateText = dateText.trim(); timeText = timeText.trim();
      homeText = homeText.trim(); awayText = awayText.trim();
      scoreText = scoreText.trim(); venueText = venueText.trim();
      if (!homeText && !awayText) { continue; }
      var pvMatch = dateText.match(/^(ma|ti|ke|to|pe|la|su)\s+/i);
      var pv = pvMatch ? pvMatch[1].toLowerCase() : '';
      var dateOnly = dateText.replace(/^(ma|ti|ke|to|pe|la|su)\s+/i, '').trim();
      matches.push({d: dateOnly, pv: pv, t: timeText, h: homeText, a: awayText, s: scoreText, v: venueText});
    }
    return matches;
  }

  /* ── ICS CALENDAR GENERATION ── */

  function pad2(n) { return n < 10 ? '0' + n : '' + n; }

  function parseMatchDate(dateStr, timeStr) {
    var dp = dateStr.split('.');
    if (dp.length < 3) { return null; }
    var day = parseInt(dp[0], 10);
    var mon = parseInt(dp[1], 10);
    var year = parseInt(dp[2], 10);
    if (year < 100) { year += 2000; }
    var hour = 0, min = 0;
    if (timeStr) {
      var tp = timeStr.split(':');
      hour = parseInt(tp[0], 10) || 0;
      min = parseInt(tp[1], 10) || 0;
    }
    return new Date(year, mon - 1, day, hour, min, 0);
  }

  function toICSDate(dt) {
    return dt.getFullYear() +
      pad2(dt.getMonth() + 1) +
      pad2(dt.getDate()) + 'T' +
      pad2(dt.getHours()) +
      pad2(dt.getMinutes()) + '00';
  }

  function icsEscape(s) {
    return (s || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
  }

  function calcGatherTime(earliest, gatherMin) {
    return new Date(earliest.getTime() - gatherMin * 60 * 1000);
  }

  function formatTime(dt) {
    return pad2(dt.getHours()) + ':' + pad2(dt.getMinutes());
  }

  function generateICS(teamIdx) {
    var team = TEAMS[teamIdx];
    var matches = allResults[teamIdx] || [];
    if (!matches.length) { return; }

    var lines = [];
    lines.push('BEGIN:VCALENDAR');
    lines.push('VERSION:2.0');
    lines.push('PRODID:-//IlvesP2018//Ottelukalenteri//FI');
    lines.push('CALSCALE:GREGORIAN');
    lines.push('X-WR-CALNAME:' + icsEscape(team.name));

    var days = [], dayMap = {};
    for (var i = 0; i < matches.length; i++) {
      var dk = matches[i].d;
      if (!dayMap[dk]) { dayMap[dk] = []; days.push(dk); }
      dayMap[dk].push(matches[i]);
    }

    var now = new Date();
    now.setHours(0, 0, 0, 0);

    for (var di = 0; di < days.length; di++) {
      var dayMatches = dayMap[days[di]];
      var earliest = null, latest = null;
      for (var k = 0; k < dayMatches.length; k++) {
        var dt = parseMatchDate(dayMatches[k].d, dayMatches[k].t);
        if (!dt) { continue; }
        if (!earliest || dt < earliest) { earliest = dt; }
        if (!latest || dt > latest) { latest = dt; }
      }
      if (!earliest) { continue; }
      if (earliest < now) { continue; }

      var gatherMin = getGatherMinutes(dayMatches[0].v);
      var gatherStart = calcGatherTime(earliest, gatherMin);
      var end = new Date((latest || earliest).getTime() + 60 * 60 * 1000);
      var location = dayMatches[0].v || '';

      var descLines = [];
      descLines.push('Kokoontuminen klo ' + formatTime(gatherStart));
      descLines.push('');
      for (var m = 0; m < dayMatches.length; m++) {
        var dm = dayMatches[m];
        descLines.push(dm.t + '  ' + dm.h + ' - ' + dm.a + (dm.v ? '  (' + dm.v + ')' : ''));
      }
      var description = descLines.join('\\n');

      var summary = 'Piirisarja ' + team.name;

      lines.push('BEGIN:VEVENT');
      lines.push('DTSTART:' + toICSDate(gatherStart));
      lines.push('DTEND:' + toICSDate(end));
      lines.push('SUMMARY:' + icsEscape(summary));
      if (location) { lines.push('LOCATION:' + icsEscape(location)); }
      lines.push('DESCRIPTION:' + icsEscape(description));
      lines.push('UID:ilves-p2018-' + team.id + '-day-' + di + '@ottelukalenteri');
      lines.push('END:VEVENT');
    }

    lines.push('END:VCALENDAR');

    var blob = new Blob([lines.join('\r\n')], {type: 'text/calendar;charset=utf-8'});
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = team.name.replace(/[\/\\]/g, '-') + '-ottelut.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 5000);
  }

  /* ── PDF GENERATION ── */

  window.generatePDF = function () {
    if (!allResults.length) { return; }
    var jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF({orientation: 'portrait', unit: 'mm', format: 'a4'});
    var pw = 210, ph = 297;
    var ml = 14, mr = 14, mt = 14;
    var cw = pw - ml - mr;

    var GREEN = [10, 92, 47];
    var YELLOW = [245, 176, 0];
    var DARK = [30, 30, 30];
    var MUTED = [100, 100, 100];
    var LIGHT_BG = [255, 252, 240];

    for (var ti = 0; ti < TEAMS.length; ti++) {
      if (ti > 0) { doc.addPage(); }
      var team = TEAMS[ti];
      var matches = allResults[ti] || [];
      var y = mt;

      /* Header bar */
      doc.setFillColor(YELLOW[0], YELLOW[1], YELLOW[2]);
      doc.rect(0, 0, pw, 28, 'F');
      doc.setFillColor(GREEN[0], GREEN[1], GREEN[2]);
      doc.rect(0, 28, pw, 2, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16); doc.setTextColor(DARK[0], DARK[1], DARK[2]);
      doc.text(team.name, ml, 13);

      doc.setFontSize(10); doc.setTextColor(GREEN[0], GREEN[1], GREEN[2]);
      doc.text(team.divTitle, ml, 20);

      doc.setFontSize(9); doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
      doc.text('Kev\u00e4t 2026', pw - mr, 13, {align: 'right'});
      doc.text(matches.length + ' ottelua', pw - mr, 20, {align: 'right'});

      y = 34;

      /* Players */
      if (team.players && team.players.length > 0) {
        doc.setFont('helvetica', 'bold'); doc.setFontSize(8);
        doc.setTextColor(GREEN[0], GREEN[1], GREEN[2]);
        doc.text('Pelaajat:', ml, y);
        doc.setFont('helvetica', 'normal'); doc.setFontSize(7.5);
        doc.setTextColor(DARK[0], DARK[1], DARK[2]);
        var playerStr = team.players.join(', ');
        var playerLines = doc.splitTextToSize(playerStr, cw - 18);
        doc.text(playerLines, ml + 18, y);
        y += playerLines.length * 3.5 + 4;
      } else {
        y += 2;
      }

      /* Group by date */
      var days = [], dayMap = {};
      for (var j = 0; j < matches.length; j++) {
        var dk = matches[j].d;
        if (!dayMap[dk]) { dayMap[dk] = []; days.push(dk); }
        dayMap[dk].push(matches[j]);
      }

      /* Table header */
      doc.setFillColor(GREEN[0], GREEN[1], GREEN[2]);
      doc.rect(ml, y, cw, 7, 'F');
      doc.setFont('helvetica', 'bold'); doc.setFontSize(7.5);
      doc.setTextColor(255, 255, 255);
      doc.text('PVM', ml + 2, y + 5);
      doc.text('KOKOONT.', ml + 30, y + 5);
      doc.text('KELLO', ml + 50, y + 5);
      doc.text('KOTI', ml + 66, y + 5);
      doc.text('VIERAS', ml + 116, y + 5);
      doc.text('KENTT\u00c4', ml + 152, y + 5);
      y += 9;

      var rowH = 6.2;
      var alt = false;

      for (var di = 0; di < days.length; di++) {
        var dk2 = days[di];
        var dm = dayMap[dk2];
        var pv = dm[0].pv || '';

        /* Gather time */
        var gMin = getGatherMinutes(dm[0].v);
        var gH = 0, gM = 0;
        if (dm[0].t) {
          var ftP = dm[0].t.split(':');
          gH = parseInt(ftP[0], 10) || 0;
          gM = parseInt(ftP[1], 10) || 0;
          gM -= gMin;
          if (gM < 0) { gM += 60; gH--; }
          if (gH < 0) { gH = 0; gM = 0; }
        }
        var gatherStr = pad2(gH) + ':' + pad2(gM);

        for (var k = 0; k < dm.length; k++) {
          var mx = dm[k];

          if (alt) {
            doc.setFillColor(LIGHT_BG[0], LIGHT_BG[1], LIGHT_BG[2]);
            doc.rect(ml, y, cw, rowH, 'F');
          }

          /* Date + gather on first match */
          if (k === 0) {
            doc.setFont('helvetica', 'bold'); doc.setFontSize(7.5);
            doc.setTextColor(DARK[0], DARK[1], DARK[2]);
            doc.text(pv + ' ' + dk2, ml + 2, y + 4.2);

            doc.setFont('helvetica', 'bold'); doc.setFontSize(7);
            doc.setTextColor(GREEN[0], GREEN[1], GREEN[2]);
            doc.text(gatherStr, ml + 30, y + 4.2);
          }

          /* Time */
          doc.setFont('helvetica', 'bold'); doc.setFontSize(7.5);
          doc.setTextColor(GREEN[0], GREEN[1], GREEN[2]);
          doc.text(mx.t, ml + 50, y + 4.2);

          /* Home */
          var isH = mx.h.trim().toLowerCase() === team.name.trim().toLowerCase();
          doc.setFont('helvetica', isH ? 'bold' : 'normal');
          doc.setTextColor(isH ? DARK[0] : MUTED[0], isH ? DARK[1] : MUTED[1], isH ? DARK[2] : MUTED[2]);
          doc.text(mx.h, ml + 66, y + 4.2);

          /* Away */
          var isA = mx.a.trim().toLowerCase() === team.name.trim().toLowerCase();
          doc.setFont('helvetica', isA ? 'bold' : 'normal');
          doc.setTextColor(isA ? DARK[0] : MUTED[0], isA ? DARK[1] : MUTED[1], isA ? DARK[2] : MUTED[2]);
          doc.text(mx.a, ml + 116, y + 4.2);

          /* Venue */
          doc.setFont('helvetica', 'normal'); doc.setFontSize(6.5);
          doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
          doc.text(mx.v || '', ml + 152, y + 4.2);

          y += rowH;
          alt = !alt;
        }

        /* Day separator */
        if (di < days.length - 1) {
          doc.setDrawColor(230, 220, 190);
          doc.line(ml, y, ml + cw, y);
          y += 2;
        }
      }

      /* Footer */
      doc.setDrawColor(GREEN[0], GREEN[1], GREEN[2]);
      doc.line(ml, ph - 12, ml + cw, ph - 12);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(7);
      doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
      doc.text('tulospalvelu.palloliitto.fi', ml, ph - 8);
      doc.text('Ilves P2018 \u00b7 Kev\u00e4t 2026', pw - mr, ph - 8, {align: 'right'});
    }

    doc.save('Ilves-P2018-Otteluohjelmat-2026.pdf');
  };

  /* ── RENDERING ── */

  function renderTeamCard(team, matches, taso, teamIdx) {
    var t2 = (taso === 2);
    var tName = team.name;
    var html = '';

    /* count upcoming match days */
    var upcoming = 0;
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var countedDays = {};
    for (var u = 0; u < matches.length; u++) {
      var mDate = parseMatchDate(matches[u].d, matches[u].t);
      if (mDate && mDate >= today && !countedDays[matches[u].d]) {
        countedDays[matches[u].d] = true;
        upcoming++;
      }
    }

    html += '<div class="team-card">';
    html += '<div class="team-header">';
    html += '<div class="team-name">' + esc(team.name) + '</div>';
    html += '<div class="team-meta">' + esc(team.div) + '</div>';
    html += '<div class="match-count">' + matches.length + ' ottelua</div>';
    html += '<div class="accordion-arrow">\u25BE</div>';
    html += '</div>';

    html += '<div class="round-group collapsed">';

    /* ── Players accordion ── */
    html += '<div class="players-section">';
    html += '<div class="players-header">';
    html += '<span class="players-icon">\u26BD</span>';
    html += '<span class="players-title">Pelaajat (' + (team.players ? team.players.length : 0) + ')</span>';
    html += '<span class="players-arrow">\u25BE</span>';
    html += '</div>';
    html += '<div class="players-content">';
    if (team.players && team.players.length > 0) {
      html += '<div class="players-list">';
      for (var p = 0; p < team.players.length; p++) {
        html += '<span class="player-name">' + esc(team.players[p]) + '</span>';
      }
      html += '</div>';
    } else {
      html += '<div class="players-empty">Pelaajatietoja ei ole viel\u00e4 lis\u00e4tty.</div>';
    }
    html += '</div>';
    html += '</div>';

    /* ── Match days ── */
    var days = [], dayMap = {};
    for (var i = 0; i < matches.length; i++) {
      var dk = matches[i].d;
      if (!dayMap[dk]) { dayMap[dk] = []; days.push(dk); }
      dayMap[dk].push(matches[i]);
    }

    var di, dk2, dm, pv, venues, vk, k, k2, mx, hi, rowCls, timeCls, hasScore, scoreCls, vSplit, detailHtml, arenaName;

    for (di = 0; di < days.length; di++) {
      dk2 = days[di];
      dm = dayMap[dk2];
      pv = dm[0].pv || '';

      html += '<div class="date-group">';
      html += '<div class="date-venue-row">';
      html += '<div class="date-badge">' + pv + ' \u00a0' + esc(dk2) + '</div>';

      venues = {};
      for (k = 0; k < dm.length; k++) {
        if (dm[k].v) {
          arenaName = splitVenue(dm[k].v).arena;
          venues[arenaName] = 1;
        }
      }
      vk = Object.keys(venues);
      if (vk.length >= 1) {
        html += '<a class="venue-tag" href="https://www.google.com/maps/search/' + encodeURIComponent(getMapQuery(vk[0])) + '" target="_blank" rel="noopener"><span class="pin">\uD83D\uDCCD</span> ' + esc(vk[0]) + '</a>';
      }
      html += '</div>';

      /* Gathering time before first match */
      var firstTime = dm[0].t;
      if (firstTime) {
        var gMin = getGatherMinutes(dm[0].v);
        var ftParts = firstTime.split(':');
        var ftH = parseInt(ftParts[0], 10) || 0;
        var ftM = parseInt(ftParts[1], 10) || 0;
        ftM -= gMin;
        if (ftM < 0) { ftM += 60; ftH -= 1; }
        if (ftH < 0) { ftH = 0; ftM = 0; }
        var gatherTime = pad2(ftH) + ':' + pad2(ftM);
        html += '<div class="gather-time">\uD83D\uDCE2 Kokoontuminen klo ' + gatherTime + '</div>';
      }

      html += '<div class="match-list">';
      for (k2 = 0; k2 < dm.length; k2++) {
        mx = dm[k2];
        hi = isOurTeam(mx.h, tName);
        rowCls = 'match-row ' + (hi ? 'home-match' : 'away-match');
        timeCls = 'col-time';
        hasScore = mx.s && mx.s.trim() !== '' && mx.s.trim() !== '-' && mx.s.trim() !== '\u2013' && mx.s.trim().toLowerCase() !== 'ennakko';
        scoreCls = 'col-score' + (hasScore ? ' played' : '');
        vSplit = splitVenue(mx.v);
        detailHtml = vSplit.detail ? '<span class="field-detail">' + esc(vSplit.detail) + '</span>' : '';

        html += '<div class="' + rowCls + '">';
        html += '<div class="match-row-top">';
        html += '<span class="' + timeCls + '">' + esc(mx.t) + '</span>';
        html += detailHtml;
        html += '</div>';
        html += '<div class="match-row-bottom">';
        html += '<span class="col-home">' + tag(mx.h, tName) + '</span>';
        html += '<span class="col-vs">\u2014</span>';
        html += '<span class="col-away">' + tag(mx.a, tName) + '</span>';
        html += '<span class="' + scoreCls + '">' + (hasScore ? esc(mx.s) : '\u2014') + '</span>';
        html += '</div>';
        html += '</div>';
      }
      html += '</div>';
      html += '</div>';
    }

    /* ── Calendar export button ── */
    if (upcoming > 0) {
      html += '<div class="cal-export-wrap">';
      html += '<button class="cal-export-btn" data-team-idx="' + teamIdx + '">';
      html += '<svg class="cal-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="4" width="16" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M2 8h16" stroke="currentColor" stroke-width="1.5"/><path d="M6 2v4M14 2v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
      html += '<span class="cal-text">Vie ' + upcoming + (upcoming === 1 ? ' pelitapahtuma' : ' pelitapahtumaa') + ' kalenteriin</span>';
      html += '</button>';
      html += '</div>';
    }

    html += '</div>'; /* close round-group */
    html += '</div>'; /* close team-card */
    return html;
  }

  function renderAll(results) {
    allResults = results;
    var el = document.getElementById('content');
    var html = '';
    var lastDivIdx = -1;

    for (var i = 0; i < TEAMS.length; i++) {
      var team = TEAMS[i];
      var matches = results[i] || [];

      if (team.divIdx !== lastDivIdx) {
        var t2x = (team.taso === 2);
        html += '<div class="division-header">';
        html += '<div class="division-pill' + (t2x ? ' taso2' : '') + '">' + esc(team.div) + '</div>';
        html += '<div class="division-title">' + esc(team.divTitle) + '</div>';
        html += '</div>';
        lastDivIdx = team.divIdx;
      }

      html += renderTeamCard(team, matches, team.taso, i);
    }

    el.innerHTML = html;

    /* Event delegation */
    el.addEventListener('click', function (e) {
      var calBtn = e.target.closest('.cal-export-btn');
      if (calBtn) {
        e.stopPropagation();
        var idx = parseInt(calBtn.getAttribute('data-team-idx'), 10);
        generateICS(idx);
        return;
      }

      var plHeader = e.target.closest('.players-header');
      if (plHeader) {
        e.stopPropagation();
        var section = plHeader.closest('.players-section');
        if (section) { section.classList.toggle('open'); }
        return;
      }

      var header = e.target.closest('.team-header');
      if (header) {
        var card = header.closest('.team-card');
        if (card) { card.classList.toggle('open'); }
        return;
      }

      var row = e.target.closest('.match-row');
      if (!row) { return; }
      if (window.innerWidth > 650) { return; }
      row.classList.toggle('expanded');
    });

    var upd = document.getElementById('updated-date');
    if (upd) {
      var now = new Date();
      upd.textContent = now.getDate() + '.' + (now.getMonth() + 1) + '.' + now.getFullYear();
    }

    var pdfBtn = document.getElementById('pdf-btn');
    if (pdfBtn) { pdfBtn.style.display = 'inline-block'; }
  }

  function load() {
    var promises = [];
    for (var i = 0; i < TEAMS.length; i++) {
      promises.push(fetchWidget(TEAMS[i].id, TEAMS[i].key));
    }

    Promise.all(promises)
      .then(function (results) {
        document.getElementById('loading').classList.add('hidden');
        renderAll(results);
      })
      .catch(function (err) {
        document.getElementById('loading').innerHTML = '<div style="color:#F5B000">\u26A0\uFE0F Ottelutietoja ei voitu ladata.</div><div style="margin-top:8px;font-size:12px">' + esc(err.message) + '</div>';
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }
})();
