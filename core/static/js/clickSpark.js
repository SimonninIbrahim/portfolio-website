function initClickSpark(canvasId="spark-canvas"){

const canvas=document.getElementById(canvasId);
if(!canvas) return;

const ctx=canvas.getContext('2d');

/* FORCE SPARKS ABOVE EVERYTHING */
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "999999";

/* SPARK DATA */
let sparks=[];

const sparkPalette = [
    "#ffb682",
    "#fb966b",
    "#f9d3c3",
    "#F5F5F7"
];

const sparkSize=14;
const sparkRadius=45;
const sparkCount=9;
const duration=500;

/* RESIZE */
function resizeCanvas(){
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize',resizeCanvas);

/* DRAW LOOP */
function draw(timestamp){
ctx.clearRect(0,0,canvas.width,canvas.height);

sparks=sparks.filter(s=>{
const elapsed=timestamp-s.startTime;
if(elapsed>=duration) return false;

const progress=elapsed/duration;
const eased=progress*(2-progress);
const dist=eased*sparkRadius;
const len=sparkSize*(1-eased);

const x1=s.x+dist*Math.cos(s.angle);
const y1=s.y+dist*Math.sin(s.angle);
const x2=s.x+(dist+len)*Math.cos(s.angle);
const y2=s.y+(dist+len)*Math.sin(s.angle);

/* USE EACH SPARK COLOR */
ctx.strokeStyle = s.color;
ctx.lineWidth=5;

/* OPTIONAL GLOW */
ctx.shadowBlur = 12;
ctx.shadowColor = s.color;

ctx.beginPath();
ctx.moveTo(x1,y1);
ctx.lineTo(x2,y2);
ctx.stroke();

return true;
});

requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

/* CREATE SPARKS */
window.addEventListener('click',(e)=>{
const now=performance.now();

for(let i=0;i<sparkCount;i++){
sparks.push({
x:e.clientX,
y:e.clientY,
angle:(2*Math.PI*i)/sparkCount,
startTime:now,
color: sparkPalette[Math.floor(Math.random()*sparkPalette.length)]
});
}
});

}
