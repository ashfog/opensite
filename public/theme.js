(function(){
  var root=document.documentElement,b=document.getElementById('theme');if(!b)return;
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  b.onclick=function(e){
    var dark=root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches,next=dark?'light':'dark';
    var set=function(){root.dataset.theme=next;try{localStorage.setItem('kudew-theme',next)}catch(_){}};
    if(!document.startViewTransition||reduce){set();return}
    var x=e.clientX,y=e.clientY,r=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
    root.classList.add('vt-theme');var vt=document.startViewTransition(set);vt.finished.finally(function(){root.classList.remove('vt-theme')});vt.ready.then(function(){root.animate({clipPath:['circle(0px at '+x+'px '+y+'px)','circle('+r+'px at '+x+'px '+y+'px)']},{duration:600,easing:'cubic-bezier(.22,1,.36,1)',pseudoElement:'::view-transition-new(root)'})});
  };
})();
