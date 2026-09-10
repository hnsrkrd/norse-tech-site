// Canonical NORSE primary navigation: same links and same order on every page.
(function(){
  const nav=document.querySelector('.nav');
  if(!nav)return;

  const items=[
    ['your-ore.html','Your Ore'],
    ['process.html','Process'],
    ['responsible-gold-recovery.html','Responsible'],
    ['nmc.html','NMC'],
    ['technology.html','Technology'],
    ['miners.html','Miners'],
    ['authorities.html','Authorities'],
    ['partners.html','Partners'],
    ['about.html','About'],
    ['philosophy.html','Philosophy'],
    ['articles.html','Articles']
  ];

  const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const existing=Array.from(nav.querySelectorAll('a'));

  items.forEach(([href,label])=>{
    let link=existing.find(a=>{
      const raw=(a.getAttribute('href')||'').split('?')[0].split('#')[0].toLowerCase();
      return raw===href || raw.endsWith('/'+href);
    });

    if(!link){
      link=document.createElement('a');
      link.href=href;
    }

    link.textContent=label;
    link.classList.toggle('active',current===href);
    if(current===href){link.setAttribute('aria-current','page');}
    else{link.removeAttribute('aria-current');}

    nav.appendChild(link); // moves existing links into the canonical order
  });

  // Articles replaces Test Your Ore as the boxed primary-navigation item.
  Array.from(nav.querySelectorAll('a')).forEach(a=>{
    const raw=(a.getAttribute('href')||'').split('?')[0].split('#')[0].toLowerCase();
    if(raw==='test-your-ore.html' || raw.endsWith('/test-your-ore.html')) a.remove();
  });
  const articlesLink=nav.querySelector('a[href="articles.html"]');
  if(articlesLink) articlesLink.classList.add('nav-cta');

  // Remove obsolete/duplicate primary-nav links only if they duplicate a canonical target.
  const seen=new Set();
  Array.from(nav.querySelectorAll('a')).forEach(a=>{
    const raw=(a.getAttribute('href')||'').split('?')[0].split('#')[0].toLowerCase();
    const key=items.find(([href])=>raw===href || raw.endsWith('/'+href))?.[0];
    if(key){
      if(seen.has(key))a.remove();
      else seen.add(key);
    }
  });
})();

// Ensure Authorities is present in the primary navigation on every page
(function(){
  const nav=document.querySelector('.nav');
  if(!nav)return;
  const current=(location.pathname.split('/').pop()||'').toLowerCase();
  let authoritiesLink=nav.querySelector('a[href="authorities.html"]');
  if(!authoritiesLink){
    authoritiesLink=document.createElement('a');
    authoritiesLink.href='authorities.html';
    authoritiesLink.textContent='Authorities';
    const minersLink=nav.querySelector('a[href="miners.html"]');
    if(minersLink){minersLink.insertAdjacentElement('afterend',authoritiesLink);}
    else{
      const newsLink=nav.querySelector('a[href="news.html"]');
      if(newsLink)nav.insertBefore(authoritiesLink,newsLink);
      else nav.appendChild(authoritiesLink);
    }
  }
  if(current==='authorities.html'){
    nav.querySelectorAll('a.active').forEach(a=>a.classList.remove('active'));
    authoritiesLink.classList.add('active');
  }
})();

const toggle=document.querySelector('.menu-toggle');if(toggle){toggle.addEventListener('click',()=>document.querySelector('.nav').classList.toggle('open'));}
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.nav').classList.remove('open')));
function submitOre(ev){ev.preventDefault();const f=ev.target;const v=n=>f.elements[n]?.value||'';const body=[
'Reason for enquiry: '+v('interest'),'Name: '+v('name'),'Company / Mining Group: '+v('company'),'Country: '+v('country'),'Mining Area / Location: '+v('location'),'PML Number: '+v('pml'),'Email: '+v('email'),'Type of Material: '+v('material'),'Approximate Gold Grade: '+v('grade'),'Approximate Material Volume: '+v('volume'),'Current Processing Method: '+v('method'),'Has mercury been used on this material?: '+v('mercury'),'','Project / ore description:',''+v('message'),'','NOTE: Please manually attach any selected supporting files to this email before sending.'
].join('\n');const subject='Test Your Ore submission - '+(v('company')||v('name')||'New enquiry');window.location.href='mailto:Test-ore@Norse-Tech.se?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);document.getElementById('mail-note').hidden=false;return false;}

// Process page information modal
const processModal=document.getElementById('process-modal');
if(processModal){
  const content=document.getElementById('process-modal-content');
  let lastTrigger=null;
  const closeProcessModal=()=>{processModal.hidden=true;processModal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');if(lastTrigger)lastTrigger.focus();};
  document.querySelectorAll('[data-process-modal]').forEach(btn=>btn.addEventListener('click',()=>{
    const source=document.getElementById(btn.dataset.processModal);
    if(!source)return;
    lastTrigger=btn;content.innerHTML=source.innerHTML;processModal.hidden=false;processModal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');processModal.querySelector('.process-modal-close').focus();
  }));
  processModal.querySelectorAll('[data-process-close]').forEach(el=>el.addEventListener('click',closeProcessModal));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!processModal.hidden)closeProcessModal();});
}

// Preselect TSA enquiry when linked from the Miners page
const enquiryInterest=document.querySelector('select[name="interest"]');if(enquiryInterest){const params=new URLSearchParams(window.location.search);if(params.get('interest')==='tsa')enquiryInterest.value='tsa';}

// v0.28 leadership photo loader: accepts Adama.webp/.jpg/.jpeg/.png in /assets
document.querySelectorAll('[data-leadership-photo]').forEach(function(img){
  var name=img.getAttribute('data-leadership-photo');
  var candidates=['assets/'+name+'.webp','assets/'+name+'.jpg','assets/'+name+'.jpeg','assets/'+name+'.png'];
  var i=0;
  var slot=img.closest('.leadership-photo-slot');
  function tryNext(){
    if(i>=candidates.length){return;}
    img.onload=function(){ if(slot){slot.classList.add('photo-loaded');} };
    img.onerror=function(){ i++; tryNext(); };
    img.src=candidates[i];
  }
  tryNext();
});

// Philosophy page local typography correction
if(location.pathname.toLowerCase().endsWith('philosophy.html')){
  document.querySelectorAll('p').forEach(function(p){
    const t=p.textContent.trim();
    if(t.startsWith('We taught what we knew, but') || t.startsWith('We also made mistakes') || t.startsWith('We tried to improve equipment')){
      p.style.fontFamily='Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Arial, sans-serif';
      p.style.fontStyle='normal';
      p.style.fontWeight='400';
      p.style.fontSize='20px';
      p.style.lineHeight='1.5';
      p.style.letterSpacing='normal';
    }
    if(t.startsWith('We taught what we knew, but') || t.startsWith('We tried to improve equipment')){
      p.style.marginTop='0';
    }
  });
}

