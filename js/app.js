/*  Ilves P2018 – Otteluohjelma
    Lataa data/matches.json ja renderöi sivun.
    Päivitä otteludata muokkaamalla vain JSON-tiedostoa.  */

(function () {
    'use strict';

   var DS = ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la'];

   function isIlves(name) {
         return name && name.toLowerCase().indexOf('ilves') !== -1;
   }

   function tag(name) {
         return isIlves(name) ? '<span class="ilves">' + esc(name) + '</span>' : esc(name);
   }

   function esc(s) {
         var d = document.createElement('div');
         d.textContent = s;
         return d.innerHTML;
   }

   function renderTeam(team, taso) {
         var t2 = taso === 2;
         var ms = team.matches || [];
         var html = '<div class="team-card">';
         html += '<div class="team-header' + (t2 ? ' taso2' : '') + '">';
         html += '<div class="team-dot' + (t2 ? ' taso2' : '') + '"></div>';
         html += '<div class="team-name">' + esc(team.name) + '</div>';
         html += '<div class="team-meta">' + esc(team.meta) + '</div>';
         html += '<div class="match-count">' + ms.length + ' ottelua</div>';
         html += '</div><div class="round-group">';

      var days = [], dayMap = {};
         for (var i = 0; i < ms.length; i++) {
                 var m = ms[i], dk = m.d;
                 if (!dayMap[dk]) { dayMap[dk] = []; days.push(dk); }
                 dayMap[dk].push(m);
         }

      for (var di = 0; di < days.length; di++) {
              var dk = days[di], dm = dayMap[dk];
              var pv = dm[0].pv ? dm[0].pv.toLowerCase() : '';
              html += '<div class="date-group"><div class="date-venue-row">';
              html += '<div class="date-badge">' + pv + ' &nbsp;' + esc(dk) + '</div>';
              var venues = {};
              for (var k = 0; k < dm.length; k++) { if (dm[k].v) venues[dm[k].v] = 1; }
              var vk = Object.keys(venues);
              if (vk.length === 1) {
                        html += '<div class="venue-tag"><span class="pin">📍</span> ' + esc(vk[0]) + '</div>';
              }
              html += '</div><table class="match-table">';
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
                        if (vk.length > 1) {
                                    html += '<td style="font-size:11px;color:var(--text-muted)">📍 ' + esc(m.v) + '</td>';
                        }
                        html += '</tr>';
              }
              html += '</table></div>';
      }
         html += '</div></div>';
         return html;
   }

   function render(data) {
         var el = document.getElementById('content');
         var html = '';
         var divs = data.divisions || [];
         for (var i = 0; i < divs.length; i++) {
                 var div = divs[i];
                 var t2 = div.taso === 2;
                 html += '<div class="division-header">';
                 html += '<div class=/"*d i vIilsvieosn -Pp2i0l1l8'  – +O t(tte2l u?o h'j etlamsao
                   2 '   :  L'a't)a a+  d'a"t>a'/ m+a tecshce(sd.ijvs.opni ljla)  r+e n'd<e/rdöiiv >s'i;v
                   u n . 
                         h tPmäilv i+t=ä  'o<tdtievl ucdlaatsas =m"udoikvkiasaimoanl-ltai tvlaei"n> 'J S+O Ne-stci(eddiovs.ttoiat.l e )* /+

     '(<f/udnicvt>i'o;n
             ( )   { 
             h t'muls e+ =s t'r<i/cdti'v;>
               '
               ; 
             v a r   D Sv a=r  [t'esaum's,  =' mdai'v,. t'etaim's,  |'|k e['],; 
' t o ' ,   'fpoer' ,( v'alra 'j] ;=

           0 ;  fju n<c ttieoanm si.slIelnvgetsh(;n ajm+e+))  {{

                     r e t u rhnt mnla m+e=  &r&e nndaemreT.etaomL(otweearmCsa[sje](,) .diinvd.etxaOsfo()';i
             l v e s ' )  }!
             = =   - 1};

         } 
  e
     l . ifnunnecrtHiToMnL  t=a gh(tnmalm;e
     )   { 
       v a r  rueptdu r=n  dioscIulmveenst(.ngaemteE)l e?m e'n<tsBpyaInd (c'luapsdsa=t"eidl-vdeast"e>'') ;+
           e s c (infa m(eu)p d+  &'&< /dsaptaan.>u'p d:a teesdc)( nuapmde.)t;e
       x t C}o
     n
     t e nftu n=c tdiaotna .euspcd(ast)e d{;

                                          } 
  v
     a r  fdu n=c tdioocnu mleonatd.(c)r e{a
                                           t e E l efmeetncth((''ddiavt'a)/;m
                                                               a t c h eds..tjesxotnC?otn=t'e n+t  D=a tse;.
                                             n o w ( )r)e
t u r n   d ..itnhneenr(HfTuMnLc;t
                                           i o n} 
  (
    r )  f{u nrcettiuornn  rre.njdseornT(e)a;m (}t)e
a m ,   t a s.ot)h e{n
                     ( f u n cvtairo nt 2( d=a ttaa)s o{ 
                     = = =   2 ; 
                         d o cvuamre nmts. g=e ttEelaemm.emnattBcyhIeds( '|l|o a[d]i;n
                                                                        g ' ) . cvlaars shLtimslt .=a d'd<(d'ihvi dcdleans's)=;"
                           t e a m - c a r dr"e>n'd;e
                           r ( d a that)m;l
    + =   ' < d}i)v
                             c l a s s =."ctaetacmh-(hfeuandcetri'o n+  ((etr2r )?  {'
                             t a s o 2 '   :d o'c'u)m e+n t'."g>e't;E
                           l e m e nhttBmylI d+(=' l'o<addiivn gc'l)a.sisn=n"etreHaTmM-Ld o=t
                           '   +   ( t 2   ?   '' <tdaisvo 2s't y:l e'='")c o+l o'r":>#<F/5dBi0v0>0'";>
                     ⚠ ️  O t thetlmult i+e=t o'j<ad ievi  cvloaistsu= "ltaedaamt-an.a<m/ed"i>v'> '+  +e
  s c ( t e a m . n a m'e<)d i+v  's<t/ydliev=>"'m;a
  r g i n -httompl: 8+p=x ;'f<odnitv- scilzaes:s1=2"ptxe"a>m'- m+e tear"r>.'m e+s seasgce( t+e a'm<./mdeitva>)' ;+
    ' < / d i v}>)';;

} 

h t milf  +(=d o'c<udmievn tc.lraesasd=y"Smtaattceh -=c=o=u n'tl"o>a'd i+n gm's). l{e
  n g t h  d+o c'u moetntte.laudad<E/vdeinvt>L'i;s
t e n e rh(t'mDlO M+C=o n't<e/ndtiLvo>a<ddeidv' ,c llaosasd=)";r
  o u n}d -eglrsoeu p{"">';
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
          if (vk.length > 1) {
                      html += '<td style="font-size:11px;color:var(--text-muted)">📍 ' + esc(m.v) + '</td>';
          }
                    html += '</tr>';
}
                            html += '</table></div>';
                     }
    html += '</div></div>';
    return html;
}

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
        var upd = document.getElementById('updated-date');
        if (upd && data.updated) upd.textContent = data.updated;
  }

  function load() {
        fetch('data/matches.json?t=' + Date.now())
                .then(function (r) { return r.json(); })
                .then(function (data) {
                          document.getElementById('loading').classList.add('hidden');
                          render(data);
                      
> ' ; 

l o a d (v)a;r
                        d a}y
s} )=( )[;], dayMap = {};
    for (var i = 0; i < ms.length; i++) {
            var m = ms[i], dk = m.d;
            if (!dayMap[dk]) { dayMap[dk] = []; days.push(dk); }
            dayMap[dk].push(m);
    }

    for (var di = 0; di < days.length; di++) {
            var dk = days[di], dm = dayMap[dk];
            var pv = dm[0].pv ? dm[0].pv.toLowerCase() : '';
            html += '<div class="date-group"><div class="date-venue-row">';
            html += '<div class="date-badge">' + pv + ' &nbsp;' + esc(dk) + '</div>';
            var venues = {};
            for (var k = 0; k < dm.length; k++) { if (dm[k].v) venues[dm[k].v] = 1; }
            var vk = Object.keys(venues);
            if (vk.length === 1) {
                      html += '<div class="venue-tag"><span class="pin">📍</span> ' + esc(vk[0]) + '</div>';
            }
            html += '</div><table class="match-table
