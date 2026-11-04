(function(){
var root=document.documentElement,$=function(s){return document.querySelector(s)};
var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches||(navigator.hardwareConcurrency||8)<4;
var logo=$("#logo"),svg=$("#logoSvg");
addEventListener("pointermove",function(e){var b=logo.getBoundingClientRect(),dx=e.clientX-(b.left+b.width/2),dy=e.clientY-(b.top+b.height/2),d=Math.hypot(dx,dy),k=d<220?1:0;svg.style.setProperty("--px",k?Math.max(-1,Math.min(1,dx/120)):0);svg.style.setProperty("--py",k?Math.max(-1,Math.min(1,dy/120)):0)},{passive:true});
logo.addEventListener("pointerdown",function(){var s=document.createElement("span");s.className="rip";logo.appendChild(s);setTimeout(function(){s.remove()},950)});

var cv=$("#dew"),cx=cv.getContext("2d"),hero=$("#hero"),W=0,H=0,D=[],run=false,last=0,amb=0,lx=-99,ly=-99;
function size(){var dpr=Math.min(devicePixelRatio||1,2);W=cv.clientWidth;H=cv.clientHeight;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0)}
function add(x,y,r){if(D.length>=30)D.shift();D.push({x:x,y:y,y0:y,r:r,age:0,vy:0,fall:false})}
function pos(e){var b=cv.getBoundingClientRect();return[e.clientX-b.left,e.clientY-b.top]}
function draw(){var c=getComputedStyle(root).getPropertyValue("--brand").trim()||"#648A73";cx.clearRect(0,0,W,H);
D.forEach(function(d){var a=d.fall?1:Math.min(1,(9-d.age)/2),g=Math.min(1,d.age/.5),r=d.r*(1-Math.pow(1-g,3));if(a<=0)return;
if(d.fall){cx.globalAlpha=.18;cx.strokeStyle=c;cx.lineWidth=1;cx.beginPath();cx.moveTo(d.x,d.y0);cx.lineTo(d.x,d.y);cx.stroke()}
cx.globalAlpha=.12*a;cx.fillStyle=c;cx.beginPath();cx.arc(d.x,d.y,r,0,6.2832);cx.fill();
cx.globalAlpha=.5*a;cx.strokeStyle=c;cx.lineWidth=1;cx.stroke();
cx.globalAlpha=.85*a;cx.fillStyle="#fff";cx.beginPath();cx.arc(d.x-r*.3,d.y-r*.35,Math.max(.6,r*.2),0,6.2832);cx.fill()});cx.globalAlpha=1}
function tick(t){if(!run)return;var dt=Math.min(.05,(t-last)/1000||0);last=t;amb+=dt;
if(amb>1.1){amb=0;if(D.length<12)add(Math.random()*W,Math.random()*H*.9,3+Math.random()*6)}
for(var i=D.length-1;i>=0;i--){var d=D[i];d.age+=dt;if(d.fall){d.vy+=700*dt;d.y+=d.vy*dt;if(d.y>H+20){D.splice(i,1);continue}}else if(d.age>9){D.splice(i,1);continue}}
for(var i=0;i<D.length;i++)for(var j=i+1;j<D.length;j++){var a=D[i],b=D[j];if(a.fall||b.fall)continue;if(Math.hypot(a.x-b.x,a.y-b.y)<(a.r+b.r)*.7){var A=a.r*a.r,B=b.r*b.r;a.x=(a.x*A+b.x*B)/(A+B);a.y=(a.y*A+b.y*B)/(A+B);a.y0=a.y;a.r=Math.min(16,Math.sqrt(A+B));a.age=Math.min(a.age,3);D.splice(j,1);j--}}
draw();requestAnimationFrame(tick)}
function start(on){if(on&&!run&&!reduce){run=true;last=performance.now();requestAnimationFrame(tick)}else if(!on)run=false}
size();addEventListener("resize",size);
if(reduce){for(var k=0;k<7;k++)add(Math.random()*W,Math.random()*H*.9,3+Math.random()*7);D.forEach(function(d){d.age=1});draw()}
else{
hero.addEventListener("pointermove",function(e){var p=pos(e);if(Math.hypot(p[0]-lx,p[1]-ly)>30){lx=p[0];ly=p[1];add(p[0]+Math.random()*10-5,p[1]+Math.random()*10-5,2+Math.random()*5)}},{passive:true});
hero.addEventListener("click",function(e){var p=pos(e);for(var i=D.length-1;i>=0;i--){var d=D[i];if(!d.fall&&Math.hypot(d.x-p[0],d.y-p[1])<d.r+12){d.fall=true;d.y0=d.y;break}}});
new IntersectionObserver(function(en){start(en[0].isIntersecting&&!document.hidden)}).observe(hero);
document.addEventListener("visibilitychange",function(){start(!document.hidden)})}
})();
