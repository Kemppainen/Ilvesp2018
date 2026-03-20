(function () {
  'use strict';

  var KEY = 'Z4QDRKWRTR';

  var TEAMS = [
    {id: '35213605', name: 'Ilves/P2018/A', div: 'P9 \u00b7 Taso 1', divTitle: 'Pojat 2018 \u2013 Piirisarja Taso 1', taso: 1, divIdx: 0},
    {id: '35213607', name: 'Ilves/P2018/B', div: 'P9 \u00b7 Taso 1', divTitle: 'Pojat 2018 \u2013 Piirisarja Taso 1', taso: 1, divIdx: 0},
    {id: '35213608', name: 'Ilves/Keltainen A', div: 'P8 \u00b7 Taso 1', divTitle: 'Pojat 2018 \u2013 Piirisarja Taso 1', taso: 1, divIdx: 1},
    {id: '35213611', name: 'Ilves/Keltainen B', div: 'P8 \u00b7 Taso 1', divTitle: 'Pojat 2018 \u2013 Piirisarja Taso 1', taso: 1, divIdx: 1},
    {id: '35213613', name: 'Ilves/Keltavihre\u00e4 A', div: 'P8 \u00b7 Taso 1', divTitle: 'Pojat 2018 \u2013 Piirisarja Taso 1', taso: 1, divIdx: 1},
    {id: '35213615', name: 'Ilves/Keltavihre\u00e4 B', div: 'P8 \u00b7 Taso 1', divTitle: 'Pojat 2018 \u2013 Piirisarja Taso 1', taso: 1, divIdx: 1},
    {id: '35213617', name: 'Ilves/Vihre\u00e4 A', div: 'P8 \u00b7 Taso 2', divTitle: 'Pojat 2018 \u2013 Piirisarja Taso 2', taso: 2, divIdx: 2}
  ];

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

  function fetchWidget(teamId) {
    var url = 'https://spl.torneopal.fi/torneopal/ajax/[torneopal:team_schedule:team=' + teamId + String.fromCharCode(38) + 'key=' + KEY + ']';
    return fetch(url)
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
      var homeText = (cells[3] || {}).textContent || '';
      var awayText = (cells[4] || {}).textContent || '';
      var scoreText = (cells[5] || {}).textContent || '';
      var venueText = (cells[6]) ? cells[6].textContent : '';
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

  function renderTeamCard(team, matches, taso) {
    var t2 = (taso === 2);
    var tName = team.name;
    var html = '';
    html += '<div class="team-card">';
    html += '<div class="team-header' + (t2 ? ' taso2' : '') + '">';
    html += '<div class="team-dot' + (t2 ? ' taso2' : '') + '"></div>';
    html += '<div class="team-name">' + esc(team.name) + '</div>';
    html += '<div class="team-meta">' + esc(team.div) + '</div>';
    html += '<div class="match-count">' + matches.length + ' ottelua</div>';
    html += '</div>';
    html += '<div class="round-group">';

    var days = [];
    var dayMap = {};
    for (var i = 0; i < matches.length; i++) {
      var dk = matches[i].d;
      if (!dayMap[dk]) { dayMap[dk] = []; days.push(dk); }
      dayMap[dk].push(matches[i]);
    }

    for (var di = 0; di < days.length; di++) {
      var dk2 = days[di];
      var dm = dayMap[dk2];
      var pv = dm[0].pv || '';

      html += '<div class="date-group">';
      html += '<div class="date-venue-row">';
      html += '<div class="date-badge">' + pv + ' \u00a0' + esc(dk2) + '</div>';

      var venues = {};
      for (var k = 0; k < dm.length; k++) { if (dm[k].v) { venues[dm[k].v] = 1; } }
      var vk = Object.keys(venues);
      if (vk.length === 1) {
        html += '<div class="venue-tag"><span class="pin">\uD83D\uDCCD</span> ' + esc(vk[0]) + '</div>';
      }
      html += '</div>';

      html += '<table class="match-table">';
      for (var k2 = 0; k2 < dm.length; k2++) {
        var mx = dm[k2];
        var hi = isOurTeam(mx.h, tName);
        var rowCls = hi ? 'home-match' : 'away-match';
        var timeCls = 'col-time' + (t2 ? ' taso2' : '');
        var hasScore = mx.s && mx.s.trim() !== '' && mx.s.trim() !== '-' && mx.s.trim() !== '\u2013';
        var scoreCls = 'col-score' + (hasScore ? ' played' : '');

        html += '<tr class="' + rowCls + '">';
        html += '<td class="' + timeCls + '">' + esc(mx.t) + '</td>';
        html += '<td class="col-home">' + tag(mx.h, tName) + '</td>';
        html += '<td class="col-vs">\u2014</td>';
        html += '<td class="col-away">' + tag(mx.a, tName) + '</td>';
        html += '<td class="' + scoreCls + '">' + (hasScore ? esc(mx.s) : '\u2014') + '</td>';
        if (vk.length > 1) {
          html += '<td style="font-size:11px;color:var(--text-muted)">\uD83D\uDCCD ' + esc(mx.v) + '</td>';
        }
        html += '</tr>';
      }
      html += '</table>';
      html += '</div>';
    }

    html += '</div>';
    html += '</div>';
    return html;
  }

  function renderAll(results) {
    var el = document.getElementById('content');
    var html = '';
    var lastDivIdx = -1;

    for (var i = 0; i < TEAMS.length; i++) {
      var team = TEAMS[i];
      var matches = results[i] || [];

      if (team.divIdx !== lastDivIdx) {
        var t2 = (team.taso === 2);
        html += '<div class="division-header">';
        html += '<div class="division-pill' + (t2 ? ' taso2' : '') + '">' + esc(team.div) + '</div>';
        html += '<div class="division-title">' + esc(team.divTitle) + '</div>';
        html += '</div>';
        lastDivIdx = team.divIdx;
      }

      html += renderTeamCard(team, matches, team.taso);
    }

    el.innerHTML = html;

    var upd = document.getElementById('updated-date');
    if (upd) {
      var now = new Date();
      upd.textContent = now.getDate() + '.' + (now.getMonth() + 1) + '.' + now.getFullYear();
    }
  }

  function load() {
    var promises = [];
    for (var i = 0; i < TEAMS.length; i++) {
      promises.push(fetchWidget(TEAMS[i].id));
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
