(function(){
var d=document,root=d.documentElement,zh=root.lang!=='en',base=zh?'':'/en',$=function(s,e){return (e||d).querySelector(s)};
var fine=matchMedia('(hover: hover) and (pointer: fine)').matches,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(fine){
  var pv=d.createElement('div');pv.className='pv';pv.setAttribute('aria-hidden','true');d.body.appendChild(pv);
  var x=0,y=0,tx=0,ty=0,on=false,raf=0;
  var loop=function(){x+=(tx-x)*.14;y+=(ty-y)*.14;var w=pv.offsetWidth,h=pv.offsetHeight,px=x+24,py=y+24;
    if(px+w>innerWidth-12)px=x-w-24;if(py+h>innerHeight-12)py=y-h-24;
    pv.style.transform='translate('+px+'px,'+py+'px) rotate('+(reduce?0:Math.max(-3,Math.min(3,(tx-x)*.05)))+'deg)';raf=on?requestAnimationFrame(loop):0};
  var show=function(r,e){pv.innerHTML=(r.dataset.c?'<img alt="" src="">':'')+'<b></b><p></p><small></small>';
    if(r.dataset.c)$('img',pv).src=r.dataset.c;$('b',pv).textContent=r.dataset.t;$('p',pv).textContent=r.dataset.s;$('small',pv).textContent=r.dataset.g||'';
    if(e){tx=x=e.clientX;ty=y=e.clientY}else{var b=r.getBoundingClientRect();tx=x=b.right-140;ty=y=b.top}
    on=true;pv.classList.add('on');if(!raf)loop()};
  var hide=function(){on=false;pv.classList.remove('on')};
  d.querySelectorAll('.row[data-t]').forEach(function(r){
    r.addEventListener('pointerenter',function(e){show(r,e)});r.addEventListener('pointermove',function(e){tx=e.clientX;ty=e.clientY});
    r.addEventListener('pointerleave',hide);r.addEventListener('focus',function(){show(r)});r.addEventListener('blur',hide)});
}
var dlg,list,inp,items=[],idx=0,data=null;
function acts(){var a=zh?'操作':'Action';return[
  {n:zh?'切换明暗主题':'Toggle theme',k:a,f:function(){$('#theme').click()}},
  {n:zh?'Switch to English':'切换到中文',k:a,f:function(){var l=$('.ctl a[hreflang]');if(l)location.href=l.href}},
  {n:zh?'首页':'Home',k:zh?'页面':'Page',h:base+'/'}]}
function mark(){[].forEach.call(list.children,function(li,i){li.setAttribute('aria-selected',i===idx)});inp.setAttribute('aria-activedescendant',items.length?'o'+idx:'')}
function render(){
  var q=inp.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  items=acts().concat(data||[]).filter(function(it){var s=(it.n+' '+(it.s||'')+' '+(it.g||'')).toLowerCase();return q.every(function(w){return s.indexOf(w)>-1})}).slice(0,8);
  idx=0;list.innerHTML=items.map(function(_,i){return'<li role="option" id="o'+i+'" data-i="'+i+'"><b></b><span></span><small></small></li>'}).join('');
  items.forEach(function(it,i){var li=list.children[i];$('b',li).textContent=it.n;$('span',li).textContent=it.s||'';$('small',li).textContent=it.k});mark()}
function go(it){if(!it)return;dlg.close();if(it.f)it.f();else if(it.ext)window.open(it.h,'_blank','noopener');else location.href=it.h}
function build(){
  dlg=d.createElement('dialog');dlg.className='pal';dlg.setAttribute('aria-label',zh?'搜索':'Search');
  dlg.innerHTML='<input type="text" role="combobox" aria-expanded="true" aria-controls="palList" autocomplete="off"><ul id="palList" role="listbox"></ul>';
  d.body.appendChild(dlg);inp=$('input',dlg);list=$('ul',dlg);inp.placeholder=zh?'搜索、跳转或执行…':'Search, jump or run…';
  inp.addEventListener('input',render);
  dlg.addEventListener('keydown',function(e){
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();if(items.length){idx=(idx+(e.key==='ArrowDown'?1:-1)+items.length)%items.length;mark()}}
    else if(e.key==='Enter'){e.preventDefault();go(items[idx])}});
  dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close();var li=e.target.closest&&e.target.closest('li');if(li)go(items[+li.dataset.i])})}
function open(){
  if(!dlg)build();
  if(!data){data=[];fetch(base+'/search.json').then(function(r){return r.json()}).then(function(j){data=j;render()}).catch(function(){})}
  inp.value='';render();dlg.showModal();inp.focus()}
d.addEventListener('keydown',function(e){
  var t=e.target,typing=t&&(/^(INPUT|TEXTAREA)$/.test(t.tagName)||t.isContentEditable);
  if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();open()}
  else if(e.key==='/'&&!typing&&!(dlg&&dlg.open)){e.preventDefault();open()}});
var pb=$('#pal');if(pb)pb.onclick=open;
var rb=$('#rnd');if(rb)rb.onclick=function(){var a=d.querySelectorAll('#links .row');if(a.length)window.open(a[Math.floor(Math.random()*a.length)].href,'_blank','noopener')};
if($('.prose')){
  var dl=d.createElement('div');dl.className='dl';dl.innerHTML='<i></i>';d.body.appendChild(dl);
  var up=function(){var m=root.scrollHeight-innerHeight;dl.style.setProperty('--p',(m>0?Math.min(100,scrollY/m*100):0)+'%')};
  addEventListener('scroll',up,{passive:true});up()}
})();
