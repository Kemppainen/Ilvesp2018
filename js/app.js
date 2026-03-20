(function () {
  'use strict';

  var TEAMS = [
    {id: '35213605', key: 'Z4QDRKWRTR', name: 'Ilves/P2018/A', div: 'P9 \u00b7 Taso 1', divTitle: 'Pojat 2018 \u2013 Piirisarja Taso 1', taso: 1, divIdx: 0},
    {id: '35213607', key: 'R8C3ZUZPBX', name: 'Ilves/P2018/B', div: 'P9 \u00b7 Taso 1', divTitle: 'Pojat 2018 \u2013 Piirisarja Taso 1', taso: 1, divIdx: 0},
    {id: '35213608', key: '2CNSGFS7V5', name: 'Ilves/Keltainen A', div: 'P8 \u00b7 Taso 1', divTitle: 'Pojat 2018 \u2013 Piirisarja Taso 1', taso: 1, divIdx: 1},
    {id: '35213611', key: 'K9N7PPBTBF', name: 'Ilves/Keltainen B', div: 'P8 \u00b7 Taso 1', divTitle: 'Pojat 2018 \u2013 Piirisarja Taso 1', taso: 1, divIdx: 1},
    {id: '35213613', key: 'NKW75YPCGN', name: 'Ilves/Keltavihre\u00e4 A', div: 'P8 \u00b7 Taso 1', divTitle: 'Pojat 2018 \u2013 Piirisarja Taso 1', taso: 1, divIdx: 1},
    {id: '35213615', key: 'SGTRRP6YUB', name: 'Ilves/Keltavihre\u00e4 B', div: 'P8 \u00b7 Taso 1', divTitle: 'Pojat 2018 \u2013 Piirisarja Taso 1', taso: 1, divIdx: 1},
    {id: '35213617', key: 'ZV5D4CPTYF', name: 'Ilves/Vihre\u00e4 A', div: 'P8 \u00b7 Taso 2', divTitle: 'Pojat 2018 \u2013 Piirisarja Taso 2', taso: 2, divIdx: 2}
  ];

  /* store parsed matches per team index for calendar export */
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
      dateText = dateText.trim();
      timeText = timeText.trim();
      homeText = homeText.trim();
      awayText = awayText.trim();
      scoreText = scoreText.trim();
      venueText = venueText.trim();
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
    /* dateStr = "1.6.2026", timeStr = "10:00" */
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

    for (var i = 0; i < matches.length; i++) {
      var mx = matches[i];
      var start = parseMatchDate(mx.d, mx.t);
      if (!start) { continue; }

      /* skip past matches */
      var now = new Date();
      now.setHours(0, 0, 0, 0);
      if (start < now) { continue; }
      var end = new Date(start.getTime() + 60 * 60 * 1000); /* 1h duration */

      var summary = mx.h + ' \u2013 ' + mx.a;
      var location = mx.v || '';

      lines.push('BEGIN:VEVENT');
      lines.push('DTSTART:' + toICSDate(start));
      lines.push('DTEND:' + toICSDate(end));
      lines.push('SUMMARY:' + icsEscape(summary));
      if (location) { lines.push('LOCATION:' + icsEscape(location)); }
      lines.push('DESCRIPTION:' + icsEscape(team.div + ' \\n' + team.name));
      lines.push('UID:ilves-p2018-' + team.id + '-' + i + '@ottelukalenteri');
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

  /* ── RENDERING ── */

  function renderTeamCard(team, matches, taso, teamIdx) {
    var t2 = (taso === 2);
    var tName = team.name;
    var html = '';

    /* count upcoming matches */
    var upcoming = 0;
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    for (var u = 0; u < matches.length; u++) {
      var mDate = parseMatchDate(matches[u].d, matches[u].t);
      if (mDate && mDate >= today) { upcoming++; }
    }

    html += '<div class="team-card">';
    html += '<div class="team-header' + (t2 ? ' taso2' : '') + '">';
    html += '<div class="team-dot' + (t2 ? ' taso2' : '') + '"></div>';
    html += '<div class="team-name">' + esc(team.name) + '</div>';
    html += '<div class="team-meta">' + esc(team.div) + '</div>';
    html += '<div class="match-count">' + matches.length + ' ottelua</div>';
    html += '<div class="accordion-arrow">\u25BE</div>';
    html += '</div>';
    html += '<div class="round-group collapsed">';



    var days = [];
    var dayMap = {};
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
        html += '<a class="venue-tag" href="https://www.google.com/maps/search/' + encodeURIComponent(vk[0]) + '" target="_blank" rel="noopener"><span class="pin">\uD83D\uDCCD</span> ' + esc(vk[0]) + '</a>';
      }
      html += '</div>';

      html += '<div class="match-list">';
      for (k2 = 0; k2 < dm.length; k2++) {
        mx = dm[k2];
        hi = isOurTeam(mx.h, tName);
        rowCls = 'match-row ' + (hi ? 'home-match' : 'away-match');
        timeCls = 'col-time' + (t2 ? ' taso2' : '');
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

    /* Calendar export button at bottom */
    if (upcoming > 0) {
      html += '<div class="cal-export-wrap">';
      html += '<button class="cal-export-btn" data-team-idx="' + teamIdx + '">';
      html += '<svg class="cal-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="4" width="16" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M2 8h16" stroke="currentColor" stroke-width="1.5"/><path d="M6 2v4M14 2v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M6 11.5h2M9 11.5h2M12 11.5h2M6 14.5h2M9 14.5h2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>';
      html += '<span class="cal-text">Vie ' + upcoming + (upcoming === 1 ? ' ottelu' : ' ottelua') + ' kalenteriin</span>';
      html += '</button>';
      html += '</div>';
    }

    html += '</div>';
    html += '</div>';
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
      /* Calendar export */
      var calBtn = e.target.closest('.cal-export-btn');
      if (calBtn) {
        e.stopPropagation();
        var idx = parseInt(calBtn.getAttribute('data-team-idx'), 10);
        generateICS(idx);
        return;
      }

      /* Accordion: toggle team card */
      var header = e.target.closest('.team-header');
      if (header) {
        var card = header.closest('.team-card');
        if (card) {
          card.classList.toggle('open');
        }
        return;
      }

      /* Mobile: tap to expand name */
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
