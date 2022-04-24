//Please don't look at this, it's just a three.js cube and a "pixel-placer" i wrote like 7 years ago

onmousemove = function(e){
	const color = generateColor();
	var rgb = hslToRgb(frame/1000%1, 0.5, 0.5);
	color.r = rgb[0] * 0.04;
	color.g = rgb[1] * 0.04;
	color.b = rgb[2] * 0.04;
    splat(e.screenX/canvas.width, (canvas.height-e.clientY)/canvas.height, 0, 1, color);
}


//create scene
const scene = new THREE.Scene();

//create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

//create renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor( 0xffffff, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.position = "absolute";
renderer.domElement.style.top = 0;
renderer.domElement.style.left = 0;
document.body.appendChild(renderer.domElement);

//create geom & mat for cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({color: 0x505fff});

//create cube
const cube = new THREE.Mesh(geometry, material);
cube.scale.x = 1.5;
cube.scale.y = 1.5;
cube.scale.z = 1.5;
cube.rotation.x = 1;
cube.rotation.y = 3;
cube.rotation.z = 1;
scene.add(cube);

//create point light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 50, 50);
scene.add(pointLight);

//create ambient light
const abientLight = new THREE.AmbientLight(0x444444);
scene.add(abientLight);

//create canvas
var letterCanvas = document.createElement("canvas");
letterCanvas.width = 1025;
//letterCanvas.width = 1920;
letterCanvas.height = 220;
letterCanvas.style.position = "absolute";
letterCanvas.style.zIndex = 99;
document.body.insertBefore(letterCanvas, document.body.childNodes[0]);

//reposition elements on resize
window.onresize = resize;
function resize(){
	//set renderer size
	renderer.setSize(window.innerWidth, window.innerHeight);
	
	//set renderer dom element size
	renderer.domElement.style.width = window.innerWidth;
	renderer.domElement.style.height = window.innerHeight;
	
	//set camera aspect, update matrix
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	
	//center letter canvas
	letterCanvas.style.left = (window.innerWidth / 2) - (letterCanvas.width / 2) + "px";
}
resize();

//some crazy shit i came up with 7 years ago
var LetterPixArr = {
//letter: [width, top, skip, stride, skip, stride, skip, stride, skip...]
	a: [11, 7, 2, 7, 3, 10, 1, 2, 6, 2, 9, 2, 9, 2, 3, 8, 1, 13, 6, 4, 7, 5, 5, 14, 2, 6, 1, 2], 
	b: [12, 0, 0, 2, 10, 2, 10, 2, 10, 2, 10, 2, 10, 2, 10, 2, 10, 2, 1, 6, 3, 11, 1, 4, 4, 3, 1, 3, 6, 5, 8, 4, 8, 4, 8, 4, 8, 5, 6, 7, 4, 3, 1, 11, 1, 2, 1, 6], 
	c: [11, 7, 3, 6, 3, 10, 1, 3, 4, 6, 6, 4, 9, 2, 9, 2, 9, 2, 9, 3, 6, 2, 1, 3, 4, 3, 1, 10, 3, 6],
	d: [12, 0, 10, 2, 10, 2, 10, 2, 10, 2, 10, 2, 10, 2, 10, 2, 3, 6, 1, 2, 1, 11, 1, 3, 4, 7, 6, 5, 8, 4, 8, 4, 8, 4, 8, 5, 6, 3, 1, 3, 4, 4, 1, 11, 3, 6, 1, 2],
	e: [12, 7, 3, 6, 4, 10, 2, 3, 4, 3, 1, 3, 6, 6, 6, 29, 10, 2, 11, 2, 10, 11, 3, 9],
	f: [12, 0, 4, 6, 5, 8, 4, 3, 3, 3, 2, 3, 5, 2, 2, 2, 10, 2, 10,2, 10, 2, 8, 8, 4, 8, 6, 2, 10, 2, 10, 2, 10, 2, 10, 2, 10, 2, 10, 2, 10, 2, 10, 2],
	g: [12, 7, 3, 6, 4, 11, 1, 3, 4, 7, 6, 5, 8, 4, 8, 4, 8, 4, 8, 5, 6, 3, 1, 3, 4, 4, 1, 11, 3, 6, 1, 2, 10, 2, 10, 2, 10, 2, 1, 2, 6, 3, 1, 3, 4, 3, 2, 10, 4],
	h: [12, 0, 0, 2, 10, 2, 10, 2, 10, 2, 10, 2, 10, 2, 10, 2, 10, 2, 1, 6, 3, 11, 1, 4, 4, 3, 1, 3, 6, 5, 8, 4, 8, 4, 8, 4, 8, 4, 8, 4, 8, 4, 8, 4, 8, 2], 
	i: [2, 0, 0, 4, 10, 24], 
	l: [2, 0, 0, 38], 
	m: [20, 7, 0, 2, 1, 5, 4, 5, 3, 10, 1, 8, 1, 4, 3, 6, 3, 3, 1, 3, 5, 4, 5, 5, 7, 2, 7, 4, 7, 2, 7, 4, 7, 2, 7, 4, 7, 2, 7, 4, 7, 2, 7, 4, 7, 2, 7, 4, 7, 2, 7, 4, 7, 2, 7, 2],
	n: [11, 7, 0, 2, 1, 5, 3, 10, 1, 4, 3, 3, 1, 3, 5, 5, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 2], 
	o: [12, 7, 3, 6, 4, 10, 2, 3, 4, 3, 1, 3, 6, 5, 8, 4, 8, 4, 8, 4, 8, 5, 6, 3, 1, 3, 4, 3, 2, 10, 4, 6],
	r: [11, 7, 0, 2, 1, 6, 2, 15, 4, 6, 6, 4, 9, 2, 9, 2, 9, 2, 9, 2, 9, 2, 9, 2, 9, 2], 
	s: [10, 7, 2, 6, 3, 12, 5, 4, 8, 3, 8, 6, 6, 6, 8, 3, 8, 4, 5, 12, 3, 6],
	t: [12, 0, 5, 2, 10, 2, 10, 2, 10, 2, 10, 2, 10, 2, 10, 2, 5, 24, 5, 2, 10, 2, 10, 2, 10, 2, 10, 2, 10, 2, 10, 2, 10, 2, 10, 2, 10, 2], 
	u: [11, 7, 0, 2, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 5, 5, 3, 1, 3, 3, 4, 1, 10, 3, 5, 1, 2],
	w: [17, 7, 0, 2, 13, 4, 5, 3, 5, 4, 5, 3, 5, 2, 1, 2, 4, 3, 4, 2, 2, 2, 3, 2, 1, 2, 3, 2, 2, 2, 3, 2, 1, 2, 3, 2, 3, 2, 2, 2, 1, 2, 2, 2, 4, 2, 1, 2, 3, 2, 1, 2, 4, 2, 1, 2, 3, 2, 1, 2, 5, 4, 3, 4, 6, 3, 5, 3, 6, 3, 5, 3], 
	x: [12, 7, 0, 2, 8, 5, 6, 3, 1, 3, 4, 3, 3, 3, 2, 3, 5, 6, 7, 4, 8, 4, 7, 6, 5, 3, 2, 3, 3, 3, 4, 3, 1, 3, 6, 5, 8, 2], 
	y: [11, 7, 0, 2, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 5, 5, 3, 1, 3, 3, 4, 1, 10, 3, 5, 1, 2, 9, 2, 9, 2, 9, 4, 6, 6, 4, 3, 1, 10, 3, 6],
	1: [2, 17, 0, 4]
}

var outlineColor = [0, 0, 0]
var highlightColor = [0.9212962962962963, 0.7826086956521738, 0.5490196078431373]
var baseColor = [0.893939393939394, 1, 0.892156862745098]

var shadow1Color = [0.8840579710144928, 1, 0.9549019607843137]
var shadow2Color = baseColor
var shadow3Color = [0.8966049382716049, 1, 0.788235294117647]
var shadow4Color = [0.8968253968253969, 1, 0.6705882352941177]
var shadow5Color = [0.8951734539969833, 1, 0.5666666666666667]
var shadow6Color = [0.9038759689922481, 0.9148936170212768, 0.5392156862745098]
var shadow7Color = [0.9043859649122807, 0.7851239669421488, 0.4745098039215686]

/*/COLORS:
var outlineColor = "rgb(0, 0, 0)"
var highlightColor = "rgb(230, 50, 135)"
var baseColor = "rgb(255, 200, 235)"

var shadow1Color = "rgb(255,232,248)"
var shadow2Color = baseColor
var shadow3Color = "rgb(255,147,214)"
var shadow4Color = "rgb(255,87,191)"
var shadow5Color = "rgb(255,34,173)"
var shadow6Color = "rgb(245,30,154)"
var shadow7Color = "rgb(216,26,135)"
*/

//scale of letters
var scale = 5;

//draws letters from a list of pixels
function drawFromPixelList(pixelList, posX, posY, colorHSL)
{
	//get canvas context
	var context = letterCanvas.getContext("2d");
	//set color
	//var color = hslToRgb((colorHSL[0] + 0.1 + frame/1000)%1, colorHSL[1], colorHSL[2])
	var color = hslToRgb(colorHSL[0] + 0.64, colorHSL[1]+0.3, colorHSL[2]-0.01)
	var color = hslToRgb(colorHSL[0], colorHSL[1], colorHSL[2])
	context.fillStyle = "rgb("+color[0]*255+","+color[1]*255+","+color[2]*255+")";
	
	//for every pixel
	for (var i = 0; i < pixelList.length; i++)
	{
		//position of letter + position of pixel
		var x = pixelList[i].x + posX
		var y = pixelList[i].y + posY
		
		//place pixel
		context.fillRect(x * scale, y * scale, scale, scale)
	}
}

function addPixelToList(x, y, pixelList, excludedLists)
{
	//this is stupid and ugly but only runs once per letter
	//it prevents duplicate pixels
	var canAdd = true;
	if (excludedLists != null)
	{
		for (var i = 0; i < excludedLists.length; i++)
			for (var j = 0; j < excludedLists[i].length; j++)
				if (excludedLists[i][j].x == x && excludedLists[i][j].y == y)
					canAdd = false;
	}
			
	//add pixel to list
	if (canAdd)
		pixelList[pixelList.length] = {x: x, y: y}
}

function addToPixelsByLength(start, y, stride, pixelList)
{
	//fills in pixels at a given start, y, and stride
	for (var i = 0; i < stride; i++)
		addPixelToList(start + i, y, pixelList)
}

function drawLetter(letter, posX, posY)
{
	var pixelsOfBase = [];
	
	//if the letter has not been created/cached
	if(letter.pixelsOfBase == null)
	{
		//create letter
		//i suspect this could be simplified
		//but it works as intended
		var width = letter[0];//width
		
		var x = letter[2];//starting x pos
		var y = 0;
		var flip = true;//draw mode rest<->stride
		for (i = 3; i < letter.length; i++)
		{
			var stride = letter[i];
			var len = Math.min(stride, (width - x));
			
			if(flip)
				//draw given length
				addToPixelsByLength(x, y, len, pixelsOfBase)
				
			if (stride + x >= width)//stride draws beyond width
			{
				var remainder = stride + x - width
				
				do 
				{
					y++;//move to next line
					x = 0;//reset x
					var len = Math.min(remainder, width);
					if(flip)
						//draw given length
						addToPixelsByLength(x, y, len, pixelsOfBase)
						
					x += len;
					
					remainder -= x;
				}while(remainder > 0)
			}
			else
				x += len;
			
			flip = !flip;//change mode rest<->stride
		}

		//The highlight adds a pixel to every edge of base pixels
		var pixelsOfHighlight = []
		for (var i = 0; i < pixelsOfBase.length; i++)
			for(var x = -1; x <= 1; x++)
				for(var y = -1; y <= 1; y++)
					if(Math.abs(x) != Math.abs(y))
						addPixelToList(pixelsOfBase[i].x + x, pixelsOfBase[i].y + y, pixelsOfHighlight, [pixelsOfBase, pixelsOfHighlight]);

		//The highlight adds a pixel to every edge AND CORNER of base pixels
		var pixelsOfOutline = []
		for (var i = 0; i < pixelsOfHighlight.length; i++)
			for(var x = -1; x <= 1; x++)
				for(var y = -1; y <= 1; y++)
					addPixelToList(pixelsOfHighlight[i].x - x, pixelsOfHighlight[i].y - y, pixelsOfOutline, [pixelsOfBase, pixelsOfHighlight, pixelsOfOutline]);

		//Cache letters for reference later
		letter["pixelsOfBase"] = pixelsOfBase
		letter["pixelsOfHighlight"] = pixelsOfHighlight
		letter["pixelsOfOutline"] = pixelsOfOutline
	}
	else
	{
		//Reference cached letters
		pixelsOfBase = letter.pixelsOfBase;
		pixelsOfHighlight = letter.pixelsOfHighlight;
		pixelsOfOutline = letter.pixelsOfOutline;
	}
	
	var shadowAnimTimer = Math.round(frame)%120;
	
	var shadows = 10;
	for(i = shadows; i > -1; i--)
	{
		var color = shadow7Color
		switch(shadowAnimTimer + (i + 2) - shadows){
			case 1:
			case 2:
				color = shadow1Color;
				break;
			case 3:
			case 4:
				color = shadow2Color;
				break;
			case 5:
			case 6:
				color = shadow3Color;
				break;
			case 7:
			case 8:
				color = shadow4Color;
				break;
			case 9:
			case 10:
				color = shadow5Color;
				break;
			case 11:
			case 12:
				color = shadow6Color;
				break;
			case 13:
			case 14:
				color = shadow7Color;
				break;
		}
		drawFromPixelList(pixelsOfOutline, posX + i, posY + i, color)
	}
	
	var outlinecolor = outlineColor;
	var highlightcolor = highlightColor;
	var basecolor = baseColor;
	
	if (shadowAnimTimer > shadows - 2 && shadowAnimTimer < shadows + 1)
	{
		basecolor = shadow1Color
		outlinecolor = shadow7Color;
		highlightcolor = shadow3Color;
		posX--;
		posY--;
		
		if (shadowAnimTimer >= shadows - 1 )
		{
			outlinecolor = shadow7Color;
			highlightcolor = shadow5Color;
		}
	}
	
	//draw shadow
	drawFromPixelList(pixelsOfOutline, posX, posY, outlinecolor);
	
	//draw highlight
	drawFromPixelList(pixelsOfHighlight, posX, posY, highlightcolor);
	
	//draw base
	drawFromPixelList(pixelsOfBase, posX, posY, basecolor);
}


function drawString(string)
{
	var runningWidth = 2;//2 pix pad highlight/shadow
	for(i = 0; i < string.length; i++)
	{
		var character = string[i];
		var letterPixArr = LetterPixArr[character];
		
		var letterWidth = letterPixArr[0];
		var letterTop = letterPixArr[1] + 2;//2 pix pad highlight/shadow
		
		drawLetter(letterPixArr, runningWidth, letterTop);
		
		runningWidth += letterWidth + 5;
		//total running width PLUS 5
		//5 = 4px highlight/shadow + 1xp space
	}
}

//getTime support function for animation loop
function getTime()
{
	if (window['performance'] && window['performance']['now'])
		return window['performance']['now']();
	else
		return +(new Date());
}
//probably from stackoverflow??

//definitely from stackoverflow:
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [r, g, b];
}
//https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion

//animation variables
var fps  = 25,
frame = 0,
lastFrame = 0,
lastTime = getTime();

//self-referencing animation loop
(function animloop(time)
{
	if(time != lastTime)//don't draw same time twice
	{
		var delta = (time - lastTime) / 1000;//delta time
		frame += (delta * fps);//total frame counter

		if (lastFrame < frame){//don't draw same frame twice
			//clear canvas
			letterCanvas.getContext('2d').clearRect(0, 0, letterCanvas.width, letterCanvas.height);
			
			//draw text
			//Need- jkpqvxz
			//drawString("ftabcdefghilmnorstuwy1");
			drawString("smudge1codes");
			
			//apply color to cube
			var color = hslToRgb(frame/1000%1, 0.5, 0.5);
			material.color.r = color[0];
			material.color.g = color[1];
			material.color.b = color[2];
			
			
			const ccolor = generateColor();
			var rgb = hslToRgb(frame/1000%1, 0.5, 0.5);
			ccolor.r = rgb[0] * 0.08;
			ccolor.g = rgb[1] * 0.08;
			ccolor.b = rgb[2] * 0.08;
			var x = 0.5+Math.sin(time/100) * 0.04;
			var y = 0.5+Math.cos(time/100) * 0.04;
			splat(x, y, 0, 1, ccolor);
			
			//apply rotation to cube;
			cube.rotation.x = Math.sin(time/10000) * 7;
			cube.rotation.y = Math.sin(time/11111) * 10;
			cube.rotation.z = Math.sin(time/13131) * 9;
			
			//render cube
			renderer.render(scene, camera);
			
			//update last frame
			lastFrame = frame;
		}
	}
	//update last time
	lastTime = time;
	
	//continue animation
	requestAnimationFrame(animloop);
	
})(getTime());//begin animation loop at current time