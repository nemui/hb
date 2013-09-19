var i = 0,
	j = 0,
	x = 0,
	y = 0,
	len = 0,
	HEIGHT = 0,
	WIDTH = 0,
	contains = false,
	letters = new Array(),
	coords_x = new Array(),
	coords_y = new Array(),
	coords_len = 0;
	
function hole(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}

hole.prototype.contains = function(x, y){
    return !((x < this.x || x > this.x + this.w) || (y < this.y || y > this.y + this.h));    
}

function letter(l, x, y, size, one2, one4, three4, three8){
	
	switch (l){
		case "a": {
			this.holes = [				
				new hole(x, 			y,			three4, one4),
				new hole(x, 			y + one2,	three4, one4),
				new hole(x, 			y, 			one4, 	size),
				new hole(x + three4, 	y, 			one4, 	size)
			];
			break;
		}
		case "b": {
			this.holes = [				
				new hole(x, 			y,			one4, 	size),
				new hole(x, 			y + three8,	size, 	one4),
				new hole(x + three4, 	y + one2,	one4, 	one2),
				new hole(x, 			y + three4,	size, 	one4)
			];
			break;
		}
		case "d": {
			this.holes = [
				new hole(x, 			y + one4,	three4,	one4),
				new hole(x,				y + one4,	one4,	three4),
				new hole(x,				y + three4,	three4,	one4),	
				new hole(x + three4,	y,			one4,	size)
				
			];
			break;		
		}
		case "e": {
			this.holes = [
				new hole(x, 			y,			size, 	one4),
				new hole(x, 			y + three8,	size, 	one4),
				new hole(x, 			y + three4,	size, 	one4),
				new hole(x, 			y, 			one4, 	three4)
			];
			break;
		}
		case "g": {
			this.holes = [
				new hole(x, 			y,			size, 	one4),
				new hole(x, 			y,			one4, 	size),
				new hole(x, 			y + three4,	size, 	one4),
				new hole(x + three4, 	y + one2, 	one4, 	one4)
			];
			break;
		}
		case "h": {
			this.holes = [
				new hole(x, 			y,			one4, 	size),
				new hole(x + three4, 	y,			one4, 	size),
				new hole(x, 			y + one2,	three4,	one4),				
			];
			break;
		}			
		case "i": {
			this.holes = [
				new hole(x + three8, 	y,			one4, 	size),				
				new hole(x + one4, 		y,			one2, 	one4),
				new hole(x + one4, 	y + three4,	one2, 	one4),
			];
			break;
		}		
		case "n": {
			this.holes = [
				new hole(x, 			y,			three4,	one4),
				new hole(x, 			y,			one4, 	size),
				new hole(x + three4, 	y + one4,	one4, 	three4)
			];
			break;		
		}
		case "p": {
			this.holes = [
				new hole(x, 			y,			one4, 	size),
				new hole(x, 			y,			size,	one4),				
				new hole(x + three4, 	y,			one4,	three4),
				new hole(x, 			y + one2,	three4,	one4)
			];
			break;		
		}
		case "r": {
			this.holes = [
				new hole(x + three8, 	y,			one2,	one4),
				new hole(x + three8,	y,			one4,	size)				
			];
			break;		
		}
		case "t": {
			this.holes = [
				new hole(x, 			y,			size,	one4),
				new hole(x + three8,	y,			one4,	size)				
			];
			break;		
		}
		case "u": {
			this.holes = [
				new hole(x, 			y,			one4,	size),
				new hole(x + three4, 	y,			one4, 	size),
				new hole(x, 			y + three4,	size, 	one4)
			];
			break;		
		}
		case "w": {
			this.holes = [
				new hole(x, 			y,			one4,	size),
				new hole(x + three8,	y,			one4,	size),
				new hole(x + three4, 	y,			one4, 	size),
				new hole(x, 			y + three4,	size, 	one4)				
			];
			break;		
		}
		case "y": {
			this.holes = [
				new hole(x, 			y,			one4,	one2),
				new hole(x + three4,	y,			one4,	one2),
				new hole(x,				y + one2,	size,	one4),
				new hole(x + three8,	y + one2,	one4,	one2)
			];
			break;		
		}
		case "z": {
			this.holes = [
				new hole(x, 			y,			one2,	one4),
				new hole(x + three8,	y,			one4,	size),
				new hole(x,				y + three8,	three4,	one4),
				new hole(x + three8,	y + three4,	one2,	one4)
			];
			break;		
		}				
	}
	
}

letter.prototype.contains = function(x, y){
	var result = false;
	for (i in this.holes){            
		if (this.holes[i].contains(x, y)){
			result = true;					
			break;
		}
	}
	return result;
}

	
function punch_text(txt, x, y, size){
	var	one2 = ~~(size / 2),
		one4 = ~~(size / 4),
		three4 = ~~(size * 3 / 4 ),
		three8 = ~~(three4 / 2),
		space = size + one4;
	
	one4 = (one4 < 10) ? 10 : one4;
	
	//self.postMessage({cmd: "log", text: one2 + " " + one4 + " " + three4 + " " + three8});	
	
	for (i = 0, j = 0, len = txt.length; i < len; i++){		
		if (txt.charAt(i) == ' '){	
			if (txt.charAt(i+1)){
				j += ~~(space*0.5);
				letters.push( new letter(txt.charAt(i+1), x + j, y, size, one2, one4, three4, three8) );
				i++;				
			}
		}
		else{
			letters.push( new letter(txt.charAt(i), x + j, y, size, one2, one4, three4, three8) );			
		}
		j += space;
	}
}

function generate_coords_space(){
	for (y = 0, len_y = HEIGHT - 10; y < len_y; y++){		
		for (x = 0, len_x = WIDTH - 10; x < len_x; x++){
			
			contains = false;
			for (i in letters){            
				if (letters[i].contains(x, y)){
					contains = true;					
					break;
				}
			}
			if (!contains) {
				coords_x.push(x);
				coords_y.push(y);
			}
		}
	}
}

self.addEventListener("message", function(e){
	//self.postMessage({cmd: "log", text: JSON.stringify(e.data)});
	
	switch(e.data.cmd){
		case "settings":{
			WIDTH = e.data.width;
			HEIGHT = e.data.height;			
			break;
		}
		case "text":{
			punch_text(e.data.text, e.data.x, e.data.y, e.data.size);			
			break;
		}
		case "start":{
			generate_coords_space();
			self.postMessage({cmd: "result", x: coords_x, y : coords_y, len: coords_x.length});
			self.close();
			break;
		}
	}
}, false);