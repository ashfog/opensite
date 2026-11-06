(function(){
var r=document.documentElement,$=function(i){return document.getElementById(i)},hero=$('hero'),mq=$('mqt'),stm=$('stm');
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,words=[],ly=scrollY,vel=0,sgn=1,x=0,busy=false,vis=true;
if(stm){
  var txt=stm.textContent.trim();stm.setAttribute('aria-label',txt);
  var seg=window.Intl&&Intl.Segmenter?Array.from(new Intl.Segmenter(r.lang==='en'?'en':'zh',{granularity:'word'}).segment(txt),function(s){return s.segment}):txt.split(/(\s+)/);
  stm.textContent='';
  seg.forEach(function(s){var e=document.createElement('span');e.textContent=s;if(s.trim()){e.className='w';words.push(e)}stm.appendChild(e)});
  if(!reduce)stm.classList.add('js');
}
function update(){
  busy=false;var y=scrollY,vh=innerHeight,max=r.scrollHeight-vh;
  r.style.setProperty('--sp',max>0?Math.min(1,y/max):0);
  if(hero)r.style.setProperty('--hp',reduce?0:Math.min(1,Math.max(0,y/(hero.offsetHeight*.8))));
  var d=y-ly;ly=y;vel+=(d-vel)*.25;if(d)sgn=d>0?1:-1;
  if(stm&&!reduce){var b=stm.getBoundingClientRect(),p=Math.min(1,Math.max(0,(vh*.85-b.top)/(b.height+vh*.2))),n=Math.round(p*words.length);
    words.forEach(function(w,i){w.classList.toggle('on',i<n)})}
}
addEventListener('scroll',function(){if(!busy){busy=true;requestAnimationFrame(update)}},{passive:true});
addEventListener('resize',update);update();
if(mq&&!reduce){
  new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(mq.parentNode);
  (function loop(){
    if(vis&&!document.hidden){vel*=.92;var h=mq.scrollWidth/2;x-=sgn*(.6+Math.min(40,Math.abs(vel))*.35);if(x<-h)x+=h;if(x>0)x-=h;mq.style.transform='translate3d('+x+'px,0,0)'}
    requestAnimationFrame(loop)})();
}
var links=document.querySelectorAll('.idx a');
if(links.length){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})})},{rootMargin:'-40% 0px -55% 0px'});
  links.forEach(function(a){var s=document.querySelector(a.getAttribute('href'));if(s)io.observe(s)});
}
})();
