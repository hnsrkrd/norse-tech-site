
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
