/* Ilves P2018 – Talven muut pelit 2026–27: yhteinen tapahtumalista (etusivun kalenteri + talvi2026.html) */
(function () {
  'use strict';
  /* Lisää uudet tapahtumat tähän listaan aikajärjestyksessä. */
  /* Pelimäärien 3 mittaria: tarjotut pelitapahtumat, toteutuneet pelit, korvaajana pelatut pelit.
     subs   = korvaajana mukaan tulleet pelaajat: näkyvät kokoonpanossa; merkitään korvaajana pelattu peli, EI tarjottua tapahtumaa eikä varsinaista peliä
     absent = tapahtuma tarjottu, mutta pelaaja ei pelannut (korvattu): merkitään 1 tarjottu tapahtuma, ei peliä; ei näy kokoonpanossa */
  window.TALVI_EVENTS = [
    {date: 'la 14.11.2026', name: 'Vapari 3v3', venue: 'Vaparihalli', teams: [
      {name: 'Ilves A', time: 'klo 15.15–17.10', info: 'Lohko B: TamU, ViiPV, YIlves A · 3v3 + 4v4', players: ['Altti Lehtinen','Elmeri Taskinen','Josef Al-Bayati','Leevi Mäkinen','Moses Toppi','Otso Jokilehto']},
      {name: 'Ilves B', time: 'klo 12.45–14.40', info: 'Lohko A: LeKi-futis, Loiske, YIlves B · 3v3 + 4v4', players: ['Aaron Melander','Edvin Aalto','Eino Innanen','Hugo Ulmanen','Nooa Kemppainen','Patrick Kyllönen'], subs: ['Nooa Kemppainen','Patrick Kyllönen'], absent: ['Julius Leppäkoski']}
    ]},
    {date: 'su 22.11.2026', name: 'Miniliiga P9 – HJK', venue: 'Lehtikuusentien kenttä, Helsinki', teams: [
      {name: 'Ilves A', time: 'klo 11.00–13.10', info: '11.00 TPS A (k2) · 11.25 KäPa A (k3) · 12.00 Gnistan A (k3) · 12.25 Honka A (k2) · 12.50 HJK A (k1)', players: ['Henrik Fischer','Lemmy Pitkänen','Leo Mayomi','Nooa Kemppainen','Noel Lamminen','Patrick Kyllönen','Thomas Tienvieri','Vilho Keisu']},
      {name: 'Ilves B', time: 'klo 13.15–15.15', info: '13.15 TPS B (k2) · 13.40 KäPa B (k3) · 14.05 Gnistan B (k3) · 14.30 Honka B (k2) · 14.55 HJK B (k1)', players: ['Elias Mattila','Heikki Lähteenmäki','Jasper Havia','Oiva Rossi','Venni Tauriainen','Verneri Vatanen','Viljami Hanski','Vilho Anttila']}
    ]},
    {date: 'su 22.11.2026 klo 13–16', name: 'Talviliiga – JJK', venue: 'Huhtahalli, Jyväskylä', teams: [
      {name: 'Ryhmä 1', us: 'Ilves', info: '13.00 Ilves – Inter (Kenttä B) · 14.00 KuPS – Ilves (Kenttä A) · 15.00 Ilves – TuNL (Kenttä B) · 15.30 JJK – Ilves (Kenttä C)', players: ['Rasmus Lähteenmäki','Eeli Huotari','Eeli Saunamäki','Emil Kruus','Emil Paloniemi','Gad Niyokwizerwa','Veikko Aaltonen','Viljo Konttinen']},
      {name: 'Ryhmä 2', us: 'Ilves2', info: '13.00 JJK2 – Ilves2 (Kenttä D) · 13.30 Ilves2 – Inter2 (Kenttä D) · 14.30 TuNL2 – Ilves2 (Kenttä D) · Sijoitusottelu klo 15.00 (pronssi) tai 15.30 (finaali), Kenttä D', players: ['Edvin Järvinen','Elias Nieminen','Josef Al-Bayati','Lakindu Gamlath','Mikael Leino','Oliver Mäkiranta','Ruben Elomaa','Walter Capone']}
    ]},
    {date: 'su 22.11.2026', name: 'Talvisarja', venue: 'Tammela', teams: [
      {name: 'Ilves (P9 taso 1)', us: 'Ilves', time: 'klo 13.50–16.00', info: '13.50 FC Haka / Valkoinen – Ilves (k1) · 14.34 Ilves – YIlves/sininen (k1) · 15.18 Ilves – Ilves/Keltavihreä (k1) · 15.40 Ilves – YIlves (k2)', players: ['Eliel Vaine','Elmeri Taskinen','Elmo Lovén','Kasper-veli Räihä','Lukas Riponiemi','Moses Toppi','Roger Wolanen']},
      {name: 'Ilves Keltavihreä (P9 taso 1)', us: 'Ilves/Keltavihreä', time: 'klo 13.50–16.00', info: '13.50 Ilves/Keltavihreä – YIlves (k2) · 14.34 Ilves/Keltavihreä – TPV/Punainen (k2) · 15.18 Ilves – Ilves/Keltavihreä (k1) · 15.40 YIlves/sininen – Ilves/Keltavihreä (k1)', players: ['Eino Innanen','Hugo Ulmanen','Joel Aro','Julius Leppäkoski','Edvin Aalto','Leevi Mäkinen','Matts Dunder','Oliver Kauppinen']},
      {name: 'Ilves Keltainen (P9 taso 2)', us: 'Ilves Keltainen', time: 'klo 13.50–16.00', info: '13.50 FC Haka / Musta – Ilves Keltainen (k3) · 14.34 Ilves Keltainen – YIlves/valkoinen (k3) · 15.18 Ilves Keltainen – PJK/sininen (k3) · 15.40 Ilves Keltainen – YIlves/punainen (k4)', players: ['Aaron Melander','Altti Lehtinen','Justus Tiainen','Kevin Kytökorpi','Leevi Demin','Tapio Oinas','Thomas Saresvaara','Valo Saarimäki']}
    ]},
    {date: 'la 28.11.2026', name: 'Vapari 3v3', venue: 'Vaparihalli', teams: [
      {name: 'Ilves A', time: 'klo 12.45–14.55', info: '12.45 TamU (4v4) · 13.20 TamU (3v3) · 13.45 LeKi-futis 2017 (3v3) · 14.35 Ilves B (3v3)', players: ['Edvin Järvinen','Matts Dunder','Milo Hermans','Oliver Kauppinen','Tapio Oinas','Vilho Anttila']},
      {name: 'Ilves B', time: 'klo 14.10–16.35', info: '14.10 ViiPV (3v3) · 14.35 Ilves A (3v3) · 15.00 Loiske 2017 (3v3) · 16.05 Loiske 2017 (4v4)', players: ['Joel Aro','Kasper-veli Räihä','Onni Muranen','Thomas Saresvaara','Valo Saarimäki','Vilho Keisu']}
    ]},
    {date: 'la 28.11.2026 klo 14–18', name: 'Lahden harjoitusottelut', venue: 'Suurhalli Areena, Lahti', teams: [
      {name: 'Ilves A', players: ['Otso Jokilehto','An-nur Aminu','Jamiel Akalazu','Gad Niyokwizerwa','Lukas Bassina','Heikki Lähteenmäki','Venni Tauriainen','Eeli Huotari']},
      {name: 'Ilves B', players: ['Einari Orispää','Mikke Laaksonen','Otso Miranda','Veikko Aaltonen','Viljo Konttinen','Justus Tiainen','Henrik Fischer']}
    ]},
    {date: 'la 5.12.2026', name: 'Miniliiga P9 – Honka', venue: 'Matinkylän tekonurmi, Espoo', teams: [
      {name: 'Ilves A', time: 'klo 11.15–13.15', info: '11.15 Kasiysi/Red (k2) · 11.40 Honka A (k1) · 12.05 TPS A (k2) · 12.30 KäPa A (k3) · 12.55 HJK A (k3)', players: ['Lemmy Pitkänen','Leo Mayomi','Noel Lamminen','Patrick Kyllönen','Thomas Tienvieri','Veikko Aaltonen','Verneri Vatanen','Vilho Anttila']},
      {name: 'Ilves B', time: 'klo 13.20–15.20', info: '13.20 Kasiysi/White (k2) · 13.45 Honka B (k1) · 14.10 TPS B (k2) · 14.35 KäPa B (k3) · 15.00 HJK B (k3)', players: ['Eeli Huotari','Elias Mattila','Gad Niyokwizerwa','Henrik Fischer','Jasper Havia','Nooa Kemppainen','Oiva Rossi','Viljo Konttinen']}
    ]},
    {date: 'su 6.12.2026', name: 'Talvisarja', venue: 'Tammela', teams: [
      {name: 'Ilves (P9 taso 1)', players: ['Einari Orispää','Emil Kruus','Justus Tiainen','Mikael Leino','Otso Miranda','Rasmus Lähteenmäki','Ruben Elomaa','Santtu Sulonen']},
      {name: 'Ilves Keltavihreä (P9 taso 1)', players: ['An-nur Aminu','Eeli Saunamäki','Elias Nieminen','Emil Paloniemi','Jamiel Akalazu','Lukas Bassina','Mikke Laaksonen','Oliver Mäkiranta']},
      {name: 'Ilves Keltainen (P9 taso 2)', players: ['Eeli Hurske','Eliel Vaine','Leevi Demin','Lukas Riponiemi','Milo Hermans','Onni Muranen','Pauli Ahonen','Roger Wolanen']}
    ]}
  ];
})();
