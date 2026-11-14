/* Ilves P2018 – Talven muut pelit 2026–27: yhteinen tapahtumalista (etusivun kalenteri + talvi2026.html) */
(function () {
  'use strict';
  /* Lisää uudet tapahtumat tähän listaan aikajärjestyksessä. */
  /* subs = korvaajana mukaan tulleet pelaajat: näkyvät kokoonpanossa, mutta tapahtumaa EI lasketa heidän pelimääräänsä */
  window.TALVI_EVENTS = [
    {date: 'la 14.11.2026', name: 'Vapari 3v3', venue: 'Vaparihalli', teams: [
      {name: 'Ilves A', time: 'klo 15.15–17.10', info: 'Lohko B: TamU, ViiPV, YIlves A · 3v3 + 4v4', players: ['Altti Lehtinen','Elmeri Taskinen','Josef Al-Bayati','Leevi Mäkinen','Moses Toppi','Otso Jokilehto']},
      {name: 'Ilves B', time: 'klo 12.45–14.40', info: 'Lohko A: LeKi-futis, Loiske, YIlves B · 3v3 + 4v4', players: ['Aaron Melander','Edvin Aalto','Eino Innanen','Hugo Ulmanen','Julius Leppäkoski','Nooa Kemppainen'], subs: ['Nooa Kemppainen']}
    ]},
    {date: 'su 22.11.2026', name: 'Miniliiga P9 – HJK', venue: 'Lehtikuusentien kenttä, Helsinki', teams: [
      {name: 'Ilves A', time: 'klo 11.00–13.10', info: '11.00 TPS A (k2) · 11.25 KäPa A (k3) · 12.00 Gnistan A (k3) · 12.25 Honka A (k2) · 12.50 HJK A (k1)', players: ['Henrik Fischer','Lemmy Pitkänen','Leo Mayomi','Nooa Kemppainen','Noel Lamminen','Patrick Kyllönen','Thomas Tienvieri','Vilho Keisu']},
      {name: 'Ilves B', time: 'klo 13.15–15.15', info: '13.15 TPS B (k2) · 13.40 KäPa B (k3) · 14.05 Gnistan B (k3) · 14.30 Honka B (k2) · 14.55 HJK B (k1)', players: ['Elias Mattila','Heikki Lähteenmäki','Jasper Havia','Oiva Rossi','Venni Tauriainen','Verneri Vatanen','Viljami Hanski','Vilho Anttila']}
    ]},
    {date: 'su 22.11.2026 klo 13–16', name: 'Talviliiga – JJK', venue: 'Huhtahalli, Jyväskylä', teams: [
      {name: 'Ryhmä 1', players: ['Rasmus Lähteenmäki','Eeli Huotari','Eeli Saunamäki','Emil Kruus','Emil Paloniemi','Gad Niyokwizerwa','Veikko Aaltonen','Viljo Konttinen']},
      {name: 'Ryhmä 2', players: ['Edvin Järvinen','Elias Nieminen','Josef Al-Bayati','Lakindu Gamlath','Mikael Leino','Oliver Mäkiranta','Ruben Elomaa','Walter Capone']}
    ]},
    {date: 'su 22.11.2026', name: 'Talvisarja', venue: 'Tammela', teams: [
      {name: 'Ilves (P9 taso 1)', players: ['Atila Nikkhouyabgarm','Eliel Vaine','Elmeri Taskinen','Elmo Lovén','Kasper-veli Räihä','Lukas Riponiemi','Moses Toppi','Roger Wolanen']},
      {name: 'Ilves Keltainen (P9 taso 1)', players: ['Eino Innanen','Hugo Ulmanen','Joel Aro','Julius Leppäkoski','Edvin Aalto','Leevi Mäkinen','Matts Dunder','Oliver Kauppinen']},
      {name: 'Ilves Keltavihreä (P9 taso 2)', players: ['Aaron Melander','Altti Lehtinen','Justus Tiainen','Kevin Kytökorpi','Leevi Demin','Tapio Oinas','Thomas Saresvaara','Valo Saarimäki']}
    ]},
    {date: 'la 28.11.2026', name: 'Vapari 3v3', venue: 'Vaparihalli', teams: [
      {name: 'Ilves A', players: ['Edvin Järvinen','Matts Dunder','Milo Hermans','Oliver Kauppinen','Tapio Oinas','Vilho Anttila']},
      {name: 'Ilves B', players: ['Joel Aro','Kasper-veli Räihä','Onni Muranen','Thomas Saresvaara','Valo Saarimäki','Vilho Keisu']}
    ]},
    {date: 'la 28.11.2026 klo 14–18', name: 'Lahden harjoitusottelut', venue: 'Suurhalli Areena, Lahti', teams: [
      {name: 'Ilves A', players: ['Otso Jokilehto','An-nur Aminu','Jamiel Akalazu','Gad Niyokwizerwa','Lukas Bassina','Heikki Lähteenmäki','Venni Tauriainen','Eeli Huotari']},
      {name: 'Ilves B', players: ['Einari Orispää','Mert Efe Özkan','Mikke Laaksonen','Otso Miranda','Veikko Aaltonen','Viljo Konttinen','Justus Tiainen','Henrik Fischer']}
    ]},
    {date: 'la–su 5.–6.12.2026', name: 'Miniliiga P9 – Honka', venue: 'Espoo', teams: [
      {name: 'Ilves A', players: []},
      {name: 'Ilves B', players: []}
    ]},
    {date: 'su 6.12.2026', name: 'Talvisarja', venue: 'Tammela', teams: [
      {name: 'Ilves (P9 taso 1)', players: []},
      {name: 'Ilves Keltainen (P9 taso 1)', players: []},
      {name: 'Ilves Keltavihreä (P9 taso 2)', players: []}
    ]}
  ];
})();
