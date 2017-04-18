 /* Copyright (C) 2013 - Raphael Quintao - http://quintao.info
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details. A copy of the can 
 * found at http://www.gnu.org/licenses/gpl.html
 */

function iconAnimator(strPath){
	var icon = document.createElement("img");
	icon.setAttribute('src', strPath);
	var canvas = document.createElement("canvas");
	canvas.setAttribute('width', '19');
	canvas.setAttribute('height', '19');
	var canvasContext = canvas.getContext('2d');
	var time = 0;
	
	this.set = function() {
		chrome.browserAction.setIcon({path: { "19": strPath }});
	}
	function ease(x) {
		return (1-Math.sin(Math.PI/2+x*Math.PI))/2;
	}
	
	this.rotate = function() {
		var rotation = 0;
		var animationFrames = 60;
		var animationSpeed = 5;
		
		function drawIconAtRotation() {
			var width = canvas.width -2;
			var height = canvas.height-2;
			canvasContext.save();
			canvasContext.clearRect(0, 0, canvas.width, canvas.height);
			canvasContext.translate( Math.ceil(canvas.width/2), Math.ceil(canvas.height/2));
			canvasContext.rotate(2*Math.PI*ease(rotation));
			canvasContext.drawImage(icon,  -Math.ceil(width/2), -Math.ceil(height/2), width, height);
			canvasContext.restore();
			chrome.browserAction.setIcon({imageData:canvasContext.getImageData(0, 0, canvas.width,canvas.height)});
		}
		
		function Do(){
			rotation += 1/animationFrames;
			drawIconAtRotation();
			if (rotation <= 1) {
				setTimeout(Do, animationSpeed);
			} else {
				rotation = 0;
				chrome.browserAction.setIcon({path: { "19": icon.src }});
			}
		}
		Do();
	};
	
	this.flipHorizontal = function() {
		var rotation = -2;
		var animationFrames = 60;
		var animationSpeed = 1;
		
		function drawIconAtRotation() {
			canvasContext.save();
			canvasContext.clearRect(0, 0, canvas.width, canvas.height);
			canvasContext.translate( Math.ceil(canvas.width/2), Math.ceil(canvas.height/2));
			canvasContext.scale(ease(rotation),1);
			canvasContext.drawImage(icon,  -Math.ceil(canvas.width/2), -Math.ceil(canvas.height/2), canvas.width, canvas.height);
			canvasContext.restore();
			chrome.browserAction.setIcon({imageData:canvasContext.getImageData(0, 0, canvas.width,canvas.height)});
		}
		
		function Do(){
			rotation += 1/animationFrames;
			drawIconAtRotation();
			if (rotation <= 1) {
				setTimeout(Do, animationSpeed);
			} else {
				rotation = -2;
				chrome.browserAction.setIcon({path: { "19": icon.src }});
			}
		}
		Do();
	};
	this.flipVertical = function() {
		var rotation = -2;
		var animationFrames = 60;
		var animationSpeed = 1;
		
		function drawIconAtRotation() {
			canvasContext.save();
			canvasContext.clearRect(0, 0, canvas.width, canvas.height);
			canvasContext.translate( Math.ceil(canvas.width/2), Math.ceil(canvas.height/2));
			canvasContext.scale(1,ease(rotation));
			canvasContext.drawImage(icon,  -Math.ceil(canvas.width/2), -Math.ceil(canvas.height/2), canvas.width, canvas.height);
			canvasContext.restore();
			chrome.browserAction.setIcon({imageData:canvasContext.getImageData(0, 0, canvas.width,canvas.height)});
		}
		
		function Do(){
			rotation += 1/animationFrames;
			drawIconAtRotation();
			if (rotation <= 1) {
				setTimeout(Do, animationSpeed);
			} else {
				rotation = -2;
				chrome.browserAction.setIcon({path: { "19": icon.src }});
			}
		}
		Do();
	};
	this.pulse = function() {
		var rotation = -3;
		var animationFrames = 60;
		var animationSpeed = 2;
		
		function drawIconAtRotation() {
			canvasContext.save();
			canvasContext.clearRect(0, 0, canvas.width, canvas.height);
			canvasContext.translate( Math.ceil(canvas.width/2), Math.ceil(canvas.height/2));
			canvasContext.scale(ease(rotation),ease(rotation));
			canvasContext.drawImage(icon,  -Math.ceil(canvas.width/2), -Math.ceil(canvas.height/2), canvas.width, canvas.height);
			canvasContext.restore();
			chrome.browserAction.setIcon({imageData:canvasContext.getImageData(0, 0, canvas.width,canvas.height)});
		}
		
		function Do(){
			rotation += 1/animationFrames;
			drawIconAtRotation();
			if (rotation <= 1) {
				setTimeout(Do, animationSpeed);
			} else {
				rotation = -3;
				chrome.browserAction.setIcon({path: { "19": icon.src }});
			}
		}
		Do();
	};

	this.flipHorizontalChange = function(Icon) {
		var rotation = -1;
		var animationFrames = 35;
		var animationSpeed = 7;
		var i = 0;
		
		
		var newIcon = document.createElement("img");
		newIcon.setAttribute('src', Icon);
		
		function drawIconAtRotation() {
			canvasContext.save();
			canvasContext.clearRect(0, 0, canvas.width, canvas.height);
			canvasContext.translate( Math.ceil(canvas.width/2), Math.ceil(canvas.height/2));
			
			canvasContext.scale(rotation,1);
			
			if(rotation > 0)
				canvasContext.drawImage(newIcon,  -Math.ceil(canvas.width/2), -Math.ceil(canvas.height/2), canvas.width, canvas.height);
			else
				canvasContext.drawImage(icon,  -Math.ceil(canvas.width/2), -Math.ceil(canvas.height/2), canvas.width, canvas.height);
			
			canvasContext.restore();
			chrome.browserAction.setIcon({imageData:canvasContext.getImageData(0, 0, canvas.width,canvas.height)});
		}
		
		function Do(){
			rotation += 1/animationFrames;
			//console.log(i + " - " +rotation);
			drawIconAtRotation();
			i++;
			if (rotation <= 1) {
				setTimeout(Do, animationSpeed);
			} else {
				rotation = -1;
				chrome.browserAction.setIcon({path: { "19": newIcon.src }});
				icon = newIcon;
			}
		}
		Do();
	};

	this.slideRightChange = function(Icon) {
		var rotation = 0;
		var animationFrames = 60;
		var animationSpeed = 10;
		
		var newIcon = document.createElement("img");
		newIcon.setAttribute('src', Icon);
		function drawIconAtRotation() {
			canvasContext.save();
			canvasContext.clearRect(0, 0, canvas.width + canvas.width, canvas.height);
			var position = canvas.width* rotation;
			canvasContext.translate(position,0);
			canvasContext.drawImage(icon,  0, 0, canvas.width, canvas.height);
			canvasContext.drawImage(newIcon, -canvas.width, 0, canvas.width, canvas.height);
			canvasContext.restore();
			chrome.browserAction.setIcon({imageData:canvasContext.getImageData(0, 0, canvas.width,canvas.height)});
		}
		
		function Do(){
			drawIconAtRotation();
			rotation += 1/animationFrames;
			if (rotation <= 1) {
				setTimeout(Do, animationSpeed);
			} else {
				rotation = 0;
				chrome.browserAction.setIcon({path: { "19": newIcon.src }});
				icon = newIcon;
			}
		}
		Do();
	};

	this.slideLeftChange = function(Icon) {
		var rotation = 0;
		var animationFrames = 60;
		var animationSpeed = 10;
		
		var newIcon = document.createElement("img");
		newIcon.setAttribute('src', Icon);
		function drawIconAtRotation() {
			canvasContext.save();
			canvasContext.clearRect(0, 0, canvas.width + canvas.width, canvas.height);
			var position = canvas.width* rotation;
			canvasContext.translate(position,0);
			canvasContext.drawImage(icon,  0, 0, canvas.width, canvas.height);
			canvasContext.drawImage(newIcon, canvas.width, 0, canvas.width, canvas.height);
			canvasContext.restore();
			chrome.browserAction.setIcon({imageData:canvasContext.getImageData(0, 0, canvas.width,canvas.height)});
		}
		
		function Do(){
			drawIconAtRotation();
			rotation -= 1/animationFrames;
			if (rotation >= -1) {
				setTimeout(Do, animationSpeed);
			} else {
				rotation = 0;
				chrome.browserAction.setIcon({path: { "19": newIcon.src }});
				icon = newIcon;
			}
		}
		Do();
	};
}
