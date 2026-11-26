// ✏️ UBAH DI SINI SAJA: nama, umur, panggilan
const BIRTHDAY_CONFIG={name:"NAMA",age:25,nickname:"MR. SPECIAL",year:new Date().getFullYear()};
const C=BIRTHDAY_CONFIG,A=C.age,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],rnd=a=>a[Math.random()*a.length|0],vib=n=>navigator.vibrate&&navigator.vibrate(n);
$$('[data-age]').forEach(e=>e.textContent=A);$$('[data-name]').forEach(e=>e.textContent=C.name);$$('[data-nick]').forEach(e=>e.textContent=C.nickname);$$('[data-year]').forEach(e=>e.textContent=C.year);
$('#yr').innerHTML=[...String(C.year)].map(d=>`<span>${d}</span>`).join('');$('#vb').innerHTML=[...'BIRTHDAY'].map(d=>`<span>${d}</span>`).join('');
$('#bars').innerHTML=Array.from({length:40},()=>`<i style="width:${1+Math.random()*3|0}px"></i>`).join('');
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(t.h);t.h=setTimeout(()=>t.classList.remove('show'),3000)}
// confetti (monokrom)
const cv=$('#cf'),x=cv.getContext('2d');let Q=[],run=0;const rs=()=>{cv.width=innerWidth;cv.height=innerHeight};rs();addEventListener('resize',rs);
function burst(px,py,n=80){const cols=['#efece6','#8b8b8b','#d8a6a6','#fff','#555'];for(let i=0;i<n;i++)Q.push({x:px,y:py,vx:(Math.random()-.5)*15,vy:-Math.random()*12-3,r:Math.random()*7+4,c:cols[i%5],a:1,t:Math.random()*6,vt:(Math.random()-.5)*.3,k:i%3});if(!run){run=1;loop()}}
function loop(){x.clearRect(0,0,cv.width,cv.height);Q=Q.filter(p=>p.a>.02);Q.forEach(p=>{p.vy+=.28;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.t+=p.vt;p.a-=.007;x.save();x.globalAlpha=Math.max(p.a,0);x.translate(p.x,p.y);x.rotate(p.t);x.fillStyle=x.strokeStyle=p.c;x.lineWidth=2;if(p.k==0)x.fillRect(-p.r/2,-p.r/4,p.r,p.r/2);else if(p.k==1){x.beginPath();x.moveTo(-p.r/2,0);x.lineTo(p.r/2,0);x.moveTo(0,-p.r/2);x.lineTo(0,p.r/2);x.stroke()}else{x.beginPath();x.arc(0,0,p.r/3,0,7);x.fill()}x.restore()});Q.length?requestAnimationFrame(loop):run=0}
const mid=()=>burst(innerWidth/2,innerHeight/2,130);
setInterval(()=>{if(document.hidden)return;const h=document.createElement('span');h.className='fh';h.textContent=rnd(['+','·','×']);const d=8+Math.random()*6;h.style.cssText=`left:${Math.random()*100}%;font-size:${14+Math.random()*16}px;animation-duration:${d}s;--dx:${(Math.random()-.5)*100}px`;$('#fx').appendChild(h);setTimeout(()=>h.remove(),d*1000)},900);
function pop(px,py){const e=document.createElement('span');e.className='pp';e.textContent=rnd(['+','★','✦','×']);e.style.left=px+'px';e.style.top=py+'px';document.body.appendChild(e);setTimeout(()=>e.remove(),900)}
addEventListener('pointerdown',e=>{if(!e.target.closest('.dg,#ui'))pop(e.clientX,e.clientY)});
// slides
const S=$$('.slide');let c=0;const dots=$('#dots');S.forEach((_,i)=>{const b=document.createElement('b');b.onclick=()=>go(i);dots.appendChild(b)});
function go(n){if(n<0||n>=S.length)return;c=n;S.forEach((s,i)=>{s.classList.toggle('active',i==n);s.classList.toggle('before',i<n);s.classList.toggle('after',i>n)});[...dots.children].forEach((b,i)=>b.classList.toggle('on',i==n));$('#prev').disabled=n==0;$('#next').disabled=n==S.length-1;$('#num').textContent=String(n+1).padStart(2,'0')+'/0'+S.length;if(n==6)startLetter();vib(10)}
$('#prev').onclick=()=>go(c-1);$('#next').onclick=()=>go(c+1);$('#rp').onclick=()=>go(0);
addEventListener('keydown',e=>{if(e.key=='ArrowRight')go(c+1);if(e.key=='ArrowLeft')go(c-1)});
let tx=0;addEventListener('touchstart',e=>tx=e.target.closest('.dg,#mn,.hs')?null:e.touches[0].clientX,{passive:true});addEventListener('touchend',e=>{if(tx==null)return;const d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>70)go(c+(d<0?1:-1))});
// slide 1: collage
$$('.t[data-m]').forEach(t=>t.onclick=e=>{t.classList.toggle('on');t.classList.contains('bw')||t.id=='ag'||0;const m=t.id=='ag'?`Edisi ke-${A}. Dan masih terus naik.`:t.dataset.m;toast(m);vib(15);if(t.id=='ag')burst(e.clientX,e.clientY,60)});
$$('.t.b,.t.c,.t.f').forEach(t=>t.style.filter='none');
const mn=$('#mn');function sl(e){const r=mn.getBoundingClientRect();mn.style.setProperty('--s',Math.max(0,Math.min(100,(e.clientX-r.left)/r.width*100))+'%')}
let dr=0;mn.onpointerdown=e=>{dr=1;mn.setPointerCapture(e.pointerId);sl(e);e.stopPropagation()};mn.onpointermove=e=>{if(dr)sl(e)};mn.onpointerup=()=>{dr=0;vib(10)};
// slide 2: age
let ac=0;$('#age').onclick=e=>{const a=$('#age');a.classList.remove('bn');void a.offsetWidth;a.classList.add('bn');a.classList.toggle('f');ac++;burst(e.clientX,e.clientY,50);vib(20);if(ac==3)toast('Tiga kali mengetuk? Kamu pembaca yang teliti.')};
// slide 3: hotspots
const HS=[['TATAPAN','Tenang, tetapi selalu tahu apa yang ia inginkan. Itu cukup untuk membuat orang memperhatikan.'],['GAYA','Sederhana, rapi, dan tak pernah terlihat berusaha keras. Justru itu yang bikin berkesan.'],['PRESENCE','Hadir tanpa perlu berisik. Orang yang tepat akan selalu merasakannya.']];
$$('.hs').forEach(b=>b.onclick=e=>{const k=b.dataset.k;$$('.hs').forEach(h=>h.classList.remove('on'));b.classList.add('on');$('#pc').innerHTML=`<b>${HS[k][0]}</b><span>${HS[k][1]}</span>`;$('.ph').classList.add('on');burst(e.clientX,e.clientY,30);vib(15)});
$('.ph').onclick=()=>$('.ph').classList.toggle('on');
// slide 4: index
const IX=[['KETENANGAN','Bukan karena tidak ada badai, tapi karena ia sudah belajar berdiri di tengahnya.'],['KONSISTENSI','Melakukan hal kecil dengan benar, berulang kali, tanpa menunggu tepuk tangan.'],['LOYALITAS','Sekali ia memilih, ia tinggal. Itu langka.'],['HUMOR','Tipis, tepat sasaran, dan selalu muncul di waktu yang tidak diduga.'],['KERJA KERAS','Banyak yang tidak terlihat. Semuanya tetap dihitung.'],['HATI','Tersembunyi di balik sikap tenang, tetapi hangatnya terasa.']];let ox=0;
$('#ix').innerHTML=IX.map((v,i)=>`<li><h4><small>0${i+1}</small>${v[0]}</h4><p>${v[1]}</p></li>`).join('');
$$('#ix li').forEach(li=>li.onclick=e=>{if(!li.classList.contains('on')){ox++;$('#ic').textContent=ox+'/6';if(ox==6){mid();toast('Semua catatan redaksi sudah dibaca.')}}li.classList.toggle('on');vib(10)});
// slide 5: wish
const ck=$('#ck');let lit=0;
function light(e){if(lit)return;lit=1;ck.classList.add('lit');$('#lg').style.display='none';$('#bl').classList.add('show');if(e)burst(e.clientX,e.clientY,30);toast('Lilin menyala. Pejamkan mata, buat satu permintaan.')}
$('#lg').classList.add('show');$('#lg').onclick=light;ck.onclick=light;
function blow(){if(!lit||ck.classList.contains('out'))return;ck.classList.add('out');$('#bl').classList.remove('show');setTimeout(()=>{mid();$('#wm').classList.add('show')},500)}
$('#bl').onclick=blow;
$('#mic').onclick=async()=>{light();try{const st=await navigator.mediaDevices.getUserMedia({audio:true}),ac=new AudioContext(),an=ac.createAnalyser(),d=new Uint8Array(an.fftSize);ac.createMediaStreamSource(st).connect(an);toast('Tiup pelan ke mic.');(function t(){an.getByteTimeDomainData(d);let m=0;d.forEach(v=>m=Math.max(m,Math.abs(v-128)));if(m>70){blow();st.getTracks().forEach(k=>k.stop());return}if(!ck.classList.contains('out'))requestAnimationFrame(t)})()}catch(e){toast('Mic tidak tersedia, pakai tombol saja.')}};
// slide 6: interview
const QA=[['Apa yang paling kamu butuhkan tahun ini?','Istirahat yang cukup, dan alasan untuk tertawa lebih sering.'],['Apa yang orang lain jarang tahu tentangmu?','Seberapa keras kamu berusaha, dan seberapa dalam kamu peduli.'],['Satu hal yang ingin kamu dengar hari ini?','"Aku bangga padamu." Dan itu benar.'],['Resep sederhana untuk tahun yang baik?','Makan teratur, tidur cukup, dan dikelilingi orang yang tulus.'],['Pesan untuk dirimu setahun lalu?','Kamu lebih kuat dari yang kamu kira. Lanjutkan.']];let qn=0;
$('#qa').innerHTML=QA.map(q=>`<div class="q">${q[0]}<small>${q[1]}</small></div>`).join('');
$$('.q').forEach(q=>q.onclick=e=>{if(!q.classList.contains('on')){qn++;$('#qc').textContent=qn+'/5';burst(e.clientX,e.clientY,25);if(qn==5)setTimeout(mid,400)}q.classList.toggle('on');vib(10)});
// slide 7: letter
const PG=[`Aku tidak pandai menulis panjang, jadi kubuat sederhana. Terima kasih sudah menjadi orang yang bisa kuandalkan, bahkan di hari-hari ketika kamu sendiri sedang lelah.`,`Di usia ${A} ini, kamu sudah melalui banyak hal yang tidak semuanya kamu ceritakan. Aku melihatnya, dan aku bangga.`,`Semoga tahun ini lebih ramah padamu. Semoga kamu lebih sayang pada dirimu sendiri. Selamat ulang tahun, ${C.name}.`];let pg=0;
function showPg(){$('#tw').innerHTML=PG[pg].split(' ').map((w,i)=>`<span style="animation-delay:${i*.06+.2}s">${w}</span> `).join('');$('#tn').textContent=pg<PG.length-1?'LANJUT ›':'KE HALAMAN TERAKHIR →'}
function startLetter(){pg=0;showPg()}
$('#tn').onclick=()=>{if(pg<PG.length-1){pg++;showPg();burst(innerWidth/2,innerHeight*.6,30)}else go(7)};
// slide 8
$('#hbd').onclick=e=>{$('#hbd').classList.toggle('f');burst(e.clientX,e.clientY,100);vib([20,30,20])};
// draggable
$$('.dg').forEach(e=>{let sx,sy,ox,oy;e.onpointerdown=v=>{v.stopPropagation();e.setPointerCapture(v.pointerId);sx=v.clientX;sy=v.clientY;ox=e.offsetLeft;oy=e.offsetTop;e.style.right='auto';e.style.left=ox+'px';e.style.top=oy+'px';e.classList.add('hold');e.onpointermove=m=>{e.style.left=ox+m.clientX-sx+'px';e.style.top=oy+m.clientY-sy+'px'};e.onpointerup=()=>{e.classList.remove('hold');e.onpointermove=null;burst(e.getBoundingClientRect().left+15,e.getBoundingClientRect().top+15,10)}}});
go(0);
