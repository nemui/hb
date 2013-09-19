var WIDTH = 500,
	HEIGHT = 150,
	canvas = 0,
	ctx = 0,	
	i = 0, 
	j = 0,	
	noise = 5000,
	steps = 100,
	increment = Math.PI/2 / steps,
	half_increment = increment / 2,
	counter = 0,
	len = Math.sin(counter)*noise,
	t_step = 25,
	t_pile = 0,
	then = Date.now(),
	now = 0,
	quarter_pi = Math.PI / 4,	
	coords_x = new Array(),
	coords_y = new Array(),
	coords_len = 0,		
	currentWidth = WIDTH,
	currentHeight = HEIGHT,
	scale = 1,
	ratio = WIDTH / HEIGHT,
	offset = {top: 0, left: 0},
	worker = null;

window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame     || 
		  window.webkitRequestAnimationFrame || 
		  window.mozRequestAnimationFrame    || 
		  window.oRequestAnimationFrame      || 
		  window.msRequestAnimationFrame     || 
		  function( callback ){
				window.setTimeout(callback, 1000 / 60);
		  };
})();

function resize() {
	var width_ratio = WIDTH / window.innerWidth;
	var height_ratio = HEIGHT / window.innerHeight;

	if (height_ratio > width_ratio){
		currentHeight = window.innerHeight;
		currentWidth = currentHeight * ratio;
	}
	else{
		currentWidth = window.innerWidth;
		currentHeight = currentWidth / ratio;
	}		
	
	canvas.style.width = currentWidth + "px";
	canvas.style.height = currentHeight + "px";		

	scale = currentWidth / WIDTH;
	offset.top = container.offsetTop;
	offset.left = container.offsetLeft;		
}

function draw(){}
function update(){}

function draw(){
	ctx.clearRect(~~(Math.random()*(WIDTH-10)), ~~(Math.random()*(HEIGHT-10)), 10, 10);
}

function update(){}

function loop(){
	now = Date.now();
	dt = now - then;
	
	update(dt);
	draw();		

	then = now;
	requestAnimFrame( loop );    
}

function init(){
	canvas = document.getElementById("world");
	ctx = canvas.getContext("2d");
	ctx.fillStyle="#000000";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	
	window.addEventListener('resize', resize, false);
	resize();		
	
	worker = new Worker("worker.js");
	worker.addEventListener("message", function(e){
			
		switch(e.data.cmd){
			case "log":{
				console.log("Worker said: " + e.data.text);
				break;
			}
			case "result":{
				coords_x = e.data.x;
				coords_y = e.data.y;
				coords_len = e.data.len;
				
				draw = function(){
					ctx.clearRect(0, 0, WIDTH, HEIGHT);    
					for (i = 0; i < len; i++){
						j = ~~(Math.random()*coords_len);		
						ctx.fillRect(coords_x[j], coords_y[j], 10, 10);         
					}
				};
				
				update = function(dt){
					/*
					t_pile += dt;
					
					if (t_pile >= t_step){
						t_step = 25;
						t_pile = 0;
						counter += (counter > quarter_pi) ? increment : half_increment;
						if (counter > Math.PI) {
							counter -= Math.PI;
							t_step = 500;
						}
						len = Math.sin(counter)*noise;
					} 
					*/
				};
				break;
			}
		}
	}, false);
	
	worker.postMessage({cmd: "settings", width: WIDTH, height: HEIGHT});
	worker.postMessage({cmd: "text", text: "happy", x: 120, y: 25, size: 40});
	worker.postMessage({cmd: "text", text: "birthday", x: 60, y: 80, size: 40});
	worker.postMessage({cmd: "start"});	
	len = Math.sin(Math.PI / 2)*noise;
	loop();	
}

window.addEventListener('load', init, false);