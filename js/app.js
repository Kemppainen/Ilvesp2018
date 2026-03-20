(function () {
  'use strict';

  function isIlves(name) {
    return name && name.toLowerCase().indexOf('ilves') !== -1;
  }

  function tag(name) {
    if (isIlves(name)) {
      return '<span class="ilves">' + esc(name) + '</span>';
    }
    return esc(name);
  }

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function renderTeam(team, taso) {
    var t2 = (taso === 2);
    var ms = team.matches || [];
    var html = '';

    html += '<div class="team-card">';
    html += '<div class="team-header' + (t2 ? ' taso2' : '') + '">';
    html += '<div class="team-dot' + (t2 ? ' taso2' : '') + '"></div>';
    html += '<div class="team-name">' + esc(team.name) + '</div>';
    html += '<div class="team-meta">' + esc(team.meta) + '</div>';
    html += '<div class="match-count">' + ms.length + ' ottelua</div>';
    html += '</div>';
    html += '<div class="round-group">';

    var days = [];
    var dayMap = {};
    var i, m, dk;

    for (i = 0; i < ms.length; i++) {
      m = ms[i];
      dk = m.d;
      if (!dayMap[dk]) {
        dayMap[dk] = [];
        days.push(dk);
      }
      dayMap[dk].push(m);
    }

    var di, dm, pv, venues, vk, k, hi, rowCls, timeCls, hasScore, scoreCls;

    for (di = 0; di < days.length; di++) {
      dk = days[di];
      dm = dayMap[dk];
      pv = (dm[0].pv) ? dm[0].pv.toLowerCase() : '';

      html += '<div class="date-group">';
      html += '<div class="date-venue-row">';
      html += '<div class="date-badge">' + pv + ' &nbsp;' + esc(dk) + '</div>';

      venues = {};
      for (k = 0; k < dm.length; k++) {
        if (dm[k].v) { venues[dm[k].v] = 1; }
      }
      vk = Object.keys(venues);

      if (vk.length === 1) {
        html += '<div class="venue-tag"><span class="pin">\uD83D\uDCCD</span> ' + esc(vk[0]) + '</div>';
      }

      html += '</div>';
      html += '<table class="match-table">';

      for (k = 0; k < dm.length; k++) {
        m = dm[k];
        hi = isIlves(m.h);
        rowCls = hi ? 'home-match' : 'away-match';
        timeCls = 'col-time' + (t2 ? ' taso2' : '');
        hasScore = (m.s && m.s.trim() !== '' && m.s.trim() !== '\u2013' && m.s.trim() !== '-');
        scoreCls = 'col-score' + (hasScore ? ' played' : '');

        html += '<tr class="' + rowCls + '">';
        html += '<td class="' + timeCls + '">' + esc(m.t) + '</td>';
        html += '<td class="col-home">' + tag(m.h) + '</td>';
        html += '<td class="col-vs">\u2014</td>';
        html += '<td class="col-away">' + tag(m.a) + '</td>';
        html += '<td class="' + scoreCls + '">' + (hasScore ? esc(m.s) : '\u2014') + '</td>';

        if (vk.length > 1) {
          html += '<td style="font-size:11px;color:var(--text-muted)">\uD83D\uDCCD ' + esc(m.v) + '</td>';
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

  function render(data) {
    var el = document.getElementById('content');
    var html = '';
    var divs = data.divisions || [];
    var i, j, div, t2, teams;

    for (i = 0; i < divs.length; i++) {
      div = divs[i];
      t2 = (div.taso === 2);

      html += '<div class="division-header">';
      html += '<div class="division-pill' + (t2 ? ' taso2' : '') + '">' + esc(div.pill) + '</div>';
      html += '<div class="division-title">' + esc(div.title) + '</div>';
      html += '</div>';

      teams = div.teams || [];
      for (j = 0; j < teams.length; j++) {
        html += renderTeam(teams[j], div.taso);
      }
    }

    el.innerHTML = html;

    var upd = document.getElementById('updated-date');
    if (upd && data.updated) {
      upd.textContent = data.updated;
    }
  }

  function load() {
    fetch('data/matches.json?t=' + Date.now())
      .then(function (r) { return r.json(); })
      .then(function (data) {
        document.getElementById('loading').classList.add('hidden');
        render(data);
      })
      .catch(function (err) {
        document.getElementById('loading').innerHTML = '<div style="color:#F5B000">\u26A0\uFE0F Ottelutietoja ei voitu ladata.</div><div style="margin-top:8px;font-size:12px">' + err.message + '</div>';
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }
})();
