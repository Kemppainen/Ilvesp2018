/*  Ilves P2018 – Otteluohjelma
    Lataa data/matches.json ja renderöi sivun.
    Päivitä otteludata muokkaamalla vain JSON-tiedostoa.  */

(function () {
  'use strict';

  var DS = ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la'];

  function isIlves(name) {
    return name && name.toLowerCase().indexOf('ilves') !== -1;
  }

  function tag(name, cls) {
    return isIlves(name) ? '<span class="ilves">' + esc(name) + '</span>' : esc(name);
  }

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  /* ── Render one team card ── */
  function renderTeam(team, taso) {
    var t2 = taso === 2;
    var ms = team.matches || [];

    var html = '<div class="team-card">';
    html += '<div class="team-header' + (t2 ? ' taso2' : '') + '">';
    html += '<div class="team-dot' + (t2 ? ' taso2' : '') + '"></div>';
    html += '<div class="team-name">' + esc(team.name) + '</div>';
    html += '<div class="team-meta">' + esc(team.meta) + '</div>';
    html += '<div class="match-count">' + ms.length + ' ottelua</div>';
    html += '</div>';
    html += '<div class="round-group">';

    /* Group matches by date */
    var days = [], dayMap = {};
    for (var i = 0; i < ms.length; i++) {
      var m = ms[i], dk = m.d;
      if (!dayMap[dk]) { dayMap[dk] = []; days.push(dk); }
      dayMap[dk].push(m);
    }

    for (var di = 0; di < days.length; di++) {
      var dk = days[di], dm = dayMap[dk];
      var pv = dm[0].pv ? dm[0].pv.toLowerCase() : '';

      html += '<div class="date-group">';
      html += '<div class="date-venue-row">';
      html += '<div class="date-badge">' + pv + ' &nbsp;' + esc(dk) + '</div>';

      /* Common venue? */
      var venues = {};
      for (var k = 0; k < dm.length; k++) { if (dm[k].v) venues[dm[k].v] = 1; }
      var vk = Object.keys(venues);
      if (vk.length === 1) {
        html += '<div class="venue-tag"><span class="pin">📍</span> ' + esc(vk[0]) + '</div>';
      }
      html += '</div>'; /* /date-venue-row */

      html += '<table class="match-table">';
      for (var k = 0; k < dm.length; k++) {
        var m = dm[k];
        var hi = isIlves(m.h);
        var rowCls = hi ? 'home-match' : 'away-match';
        var timeCls = 'col-time' + (t2 ? ' taso2' : '');
        var hasScore = m.s && m.s.trim() !== '' && m.s.trim() !== '–' && m.s.trim() !== '-';
        var scoreCls = 'col-score' + (hasScore ? ' played' : '');

        html += '<tr class="' + rowCls + '">';
        html += '<td class="' + timeCls + '">' + esc(m.t) + '</td>';
        html += '<td class="col-home">' + tag(m.h) + '</td>';
        html += '<td class="col-vs">—</td>';
        html += '<td class="col-away">' + tag(m.a) + '</td>';
        html += '<td class="' + scoreCls + '">' + (hasScore ? esc(m.s) : '—') + '</td>';

        /* Extra venue column if multiple venues on same day */
        if (vk.length > 1) {
          html += '<td style="font-size:11px;color:var(--text-muted)">📍 ' + esc(m.v) + '</td>';
        }
        html += '</tr>';
      }
      html += '</table></div>'; /* /date-group */
    }

    html += '</div></div>'; /* /round-group, /team-card */
    return html;
  }

  /* ── Render everything ── */
  function render(data) {
    var el = document.getElementById('content');
    var html = '';

    var divs = data.divisions || [];
    for (var i = 0; i < divs.length; i++) {
      var div = divs[i];
      var t2 = div.taso === 2;

      html += '<div class="division-header">';
      html += '<div class="division-pill' + (t2 ? ' taso2' : '') + '">' + esc(div.pill) + '</div>';
      html += '<div class="division-title">' + esc(div.title) + '</div>';
      html += '</div>';

      var teams = div.teams || [];
      for (var j = 0; j < teams.length; j++) {
        html += renderTeam(teams[j], div.taso);
      }
    }

    el.innerHTML = html;

    /* Update footer date */
    var upd = document.getElementById('updated-date');
    if (upd && data.updated) upd.textContent = data.updated;
  }

  /* ── Load JSON ── */
  function load() {
    fetch('data/matches.json?t=' + Date.now())
      .then(function (r) { return r.json(); })
      .then(function (data) {
        document.getElementById('loading').classList.add('hidden');
        render(data);
      })
      .catch(function (err) {
        document.getElementById('loading').innerHTML =
          '<div style="color:#F5B000">⚠️ Ottelutietoja ei voitu ladata.</div>' +
          '<div style="margin-top:8px;font-size:12px">' + err.message + '</div>';
      });
  }

  /* ── Init ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }
})();
