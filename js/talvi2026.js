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
    {date: 'su 22.11.2026', name: 'Talviliiga', venue: '', teams: [
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
})();
