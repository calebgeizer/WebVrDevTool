//variables! YAY!
var speed=13;

//cus I feel like it lol
var started=false;
var right, left, fwd, back;
var right2, left2, fwd2,back2, speedX, speedZ, S, storeS;
var posX=posY=posZ=rotX=rotY=rotZ=crouch=0;
var transX = new Array();//X position
var transZ = new Array();//Y position
var faceW = new Array();//Width of object when facing front
var faceL = new Array();//Width of object when facing side
var selectedDiv;
var stopUpdate=false;
var posElX= 0;
var posElY = 0;
var posElZ = 0;

// Hook pointer lock state change events
document.addEventListener('pointerlockchange', changeCallback, false);
document.addEventListener('mozpointerlockchange', changeCallback, false);
document.addEventListener('webkitpointerlockchange', changeCallback, false);

//Div Counter
function countthis(){
	var top_level_div = document.getElementById('spinner');
	var count = top_level_div.getElementsByTagName('div').length;
	document.getElementById("divcount").innerHTML=count;
}

// Hook mouse move events
document.addEventListener("mousemove", this.moveCallback, false);
function changeCallback(){
	if(started){
		started=false
		document.getElementById("CtrlToggle").innerHTML="►"
	}else{
		setTimeout(function(){
			started=true
			document.getElementById("CtrlToggle").innerHTML="Esc"
		}, 20); 
	}
}

//OBJECTS-OBJECTS-OBJECTS-OBJECTS-OBJECTS-OBJECTS-OBJECTS-OBJECTS-OBJECTS-OBJECTS-OBJECTS-OBJECTS-
var objects;

create()
function create(){
	for(i=0;transX[i]!=null;i++){
		objects=i+1;
		var newdiv = document.createElement( 'div' );
		document.getElementById("spinner").appendChild( newdiv );
		newdiv.className = "base";
		newdiv.style.transform=newdiv.style.webkitTransform="translateX("+((transX[i]+200)*-1)+"px) translateY(0px) translateZ("+((transZ[i])*-1-100)+"px) rotateX(0deg)" ;
		newdiv.style.width=faceW[i]+"px"
		newdiv.style.height=faceL[i]+"px"
		newdiv.innerHTML=content[i]
	}
}


function textBoxInUse(){
	var boxes = document.getElementsByTagName('input');

	for(i = 0; i < boxes.length; i++) {
		if(boxes[i]===document.activeElement){
			return true
		}
	}
	return false
}

//OBJECTS-OBJECTS-OBJECTS-OBJECTS-OBJECTS-OBJECTS-OBJECTS-OBJECTS-OBJECTS-OBJECTS-OBJECTS-OBJECTS-
//keys below
document.addEventListener('keydown', function(event) {
	if(!textBoxInUse()){
		//2 key codes. WASD and arrow keys
		keyCode(1);

		//useful buttons
		if (event.keyCode == 88) {
			alert(posX+50)
		}
		if (event.keyCode == 90) {
			alert(posZ-1000)
		}
		if (event.keyCode == 89) {
			alert(rotY)
		}
		if (event.keyCode == 67) {
			selectedDiv=document.elementFromPoint(window.innerWidth/2, window.innerHeight/2);
			document.getElementById("classGiver").value=selectedDiv.className;
		}
		if (event.keyCode == 81) {
			selectedDiv=document.elementFromPoint(window.innerWidth/2, window.innerHeight/2);
			document.getElementById("spinner").removeChild(selectedDiv);
		}
	}
}, true);

document.addEventListener('keyup', function(event) {
	if (event.keyCode == 69) {
	    insert();
		console.log(drotX+"x,"+drotY+"y");
	};
},true);

//this time is keyup function
document.addEventListener('keyup', function(event) {
	keyCode(0);
}, true);

function keyCode(Bool){
	if (event.keyCode == 37){
		left=Bool;
	}
    if (event.keyCode == 39){
		right=Bool;
	}
	if (event.keyCode == 40){
		fwd=Bool;
	}
	if (event.keyCode == 38){
		back=Bool;
	}
	//rotate
	if (event.keyCode == 65) {
		left2=Bool;
	}
	if (event.keyCode == 68){
		right2=Bool;
	}
	if (event.keyCode == 83) {
		fwd2=Bool;
	}
	if (event.keyCode == 87) {
		back2=Bool;
	}
}

function move(){
	setInterval(function(){
		if(!stopUpdate){

			speedMath = speed*(Math.sin(rotX*(Math.PI/180)));
			speedMathRot = speed*(Math.sin((90-rotX)*(Math.PI/180)));

			if ((right2 || left2) && (fwd2 || back2)) {
				speedMath = (speed/2)*(Math.sin(rotX*(Math.PI/180)));
				speedMathRot = (speed/1.7)*(Math.sin((90-rotX)*(Math.PI/180)));
			}

			if(right2==1){
				speedZ=speedMath*-1;
				speedX=(speedMathRot*-1)/1.3;
				//wallCHK(speedZ,speedX);
				posZ=+posZ+speedZ;
				posX=+posX+speedX;
			}
			if(left2==1){
				speedZ=speedMath;
				speedX=speedMathRot/1.3;
				//wallCHK(speedZ,speedX);
				posZ=+posZ+speedZ;
				posX=+posX+speedX;
			}
			if(back2==1){
				speedX=speedMath*-1;
				speedZ=speedMathRot;
				//wallCHK(speedZ,speedX);
				posZ=+posZ+speedZ;
				posX=+posX+speedX;
			}
			if(fwd2==1){
				speedX=speedMath;
				speedZ=speedMathRot*-1;
				//wallCHK(speedZ,speedX);
				posZ=+posZ+speedZ;
				posX=+posX+speedX;
			}

			document.getElementById("spinner").setAttribute("style","-webkit-transform-origin:"+(+posX*-1+60)+"px "+posY+30+"px "+(+posZ*-1+1000)+"px;")
			document.getElementById("position").setAttribute("style","-webkit-transform-origin:"+(+posX*-1+60)+"px "+posY+30+"px "+(+posZ*-1+1000)+"px;")
			avatarPos();
		}
	},20);
}


// BROKEN BROKEN BROKEN BROKEN BROKEN BROKEN BROKEN BROKEN BROKEN BROKEN //

function wallCHK(Z,X){

	math1 = +transX[i]<+Math.round(+posX-60)+50;
	math2 = +faceW[i]+transX[i]>+Math.round(+posX-60)-50;
	math3 = +faceL[i]+transZ[i]>Math.round(+posZ-1000)-50;
	math4 = +transZ[i]<+Math.round(+posZ-1000)+50;

	var math = [math1,math2,math3,math4];

	//for the X
	if(+X>0){
		wallPosChk(S>speedX,speedX,math);
	}else if(+X<0){
		wallPosChk(S<speedX,speedX,math);
	}
	//for the Z
	if(+Z>0){
		wallPosChk(S>speedZ,speedZ,math);
	}else if(+Z<0){
		wallPosChk(S<speedZ,speedZ,math);
	}
}

// BROKEN BROKEN BROKEN BROKEN BROKEN BROKEN BROKEN BROKEN BROKEN BROKEN //

function wallPosChk(check,speedPos,math){
	for(i=0;i<objects;i++){
		storeS=speedX;	
		S=0;var pass=true;
		while(pass==true){
			if((math[0]&&math[1]&&math[2]&&math[3])||(check)){
				pass=false;S=S-.1
			}else{
				pass=true;S=S+.1;
			}
		}
		if(Math.abs(storeS)>Math.abs(S)){
			speedX=storeS=S
		}
	}
}

function avatarPos(){
	document.getElementById("spinner").style.transform=document.getElementById("spinner").style.webkitTransform="rotateY("+rotX+"deg)";
	document.getElementById("position").style.transform=document.getElementById("position").style.webkitTransform="translateZ("+posZ+"px)"+"translateX("+posX+"px)"+"translateY("+posY+30+"px)"+"rotateZ("+rotZ+"deg)"+"rotateX("+rotY+"deg)";
}

var mouse=1;
function init() {
	if (window.Event) {
		document.captureEvents(Event.MOUSEMOVE);
	}
	document.onmousemove = getCursorXY;
}

function getCursorXY(e) {
	if(mouse!=0&&started){
		rotX+=event.movementX/10
		rotY-=event.movementY/10
		rotY=rotY>70?70:rotY
		rotY=rotY<-70?-70:rotY
	}
	avatarPos();
}

function enterFP(self){
	if('pointerLockElement' in document ||'mozPointerLockElement' in document ||'webkitPointerLockElement' in document){
		var element=document.getElementById("stage");
		element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
		// Ask the browser to lock the pointer
		element.requestPointerLock();
	}else{alert("Your browser is not supported.(Download Google Chrome or Firefox!)")}
}

var classN="face1 wall";

function insert(){
	var drotX= Math.round(rotX/90)*90;
	var drotY = Math.round(rotY/90)*90;
	var newDiv = document.createElement('div');
	newDiv.className = classN;
	newDiv.setAttribute("style","-webkit-transform: translateX("+Math.round(-posX-50)+"px)translateY(0px)translateZ("+Math.round(-posZ+999)+"px) rotateY("+drotX+"deg)rotateX("+drotY+"deg);")
	newDiv.setAttribute("data-x",Math.round(-posX-50));
	newDiv.setAttribute("data-y",0);
	newDiv.setAttribute("data-z",Math.round(-posZ+999));
	newDiv.setAttribute("data-rx",drotY);
	newDiv.setAttribute("data-ry",drotX);
	newDiv.setAttribute("data-rz",0);
	newDiv.setAttribute("data-height",200);
	newDiv.setAttribute("data-width",200);
	document.getElementById("spinner").appendChild(newDiv);
	selectedDiv=newDiv;
}

var interval=1;
var rotateOn=false;
var forceRotOff=false;



function resize(x,y){
	selectedDiv.setAttribute("data-width",+(selectedDiv.getAttribute("data-width"))+interval*x);
	selectedDiv.setAttribute("data-height",+(selectedDiv.getAttribute("data-height"))+interval*y);
	selectedDiv.style.width=(selectedDiv.getAttribute("data-width"))+"px"
	selectedDiv.style.height=(selectedDiv.getAttribute("data-height"))+"px"
}
function resizeOpposite(x,y){
	selectedDiv.setAttribute("data-width",+(selectedDiv.getAttribute("data-width"))+interval*x);
	selectedDiv.setAttribute("data-height",+(selectedDiv.getAttribute("data-height"))+interval*y);
	forceRotOff=true;
	edit(-x,-y,0);
	forceRotOff=false;
	selectedDiv.style.width=(getAttribute("data-width"))+"px"
	selectedDiv.style.height=(getAttribute("data-height"))+"px"
}
function multiResize(n){
	if(n=="x"){
		resizeOpposite(1,0)
		resize(1,0)
	}else if(n=="y"){
		resizeOpposite(0,1)
		resize(0,1)
	}else if(n=="xy"){
		resizeOpposite(1,1)
		resize(1,1)
	}
}
function edit(x,y,z){
	if(!rotateOn||forceRotOff){
	selectedDiv.setAttribute("data-x",+(selectedDiv.getAttribute("data-x"))+x*interval);
	selectedDiv.setAttribute("data-y",+(selectedDiv.getAttribute("data-y"))+y*interval);
	selectedDiv.setAttribute("data-z",+(selectedDiv.getAttribute("data-z"))+z*interval);
	}else{
	selectedDiv.setAttribute("data-rx",+(selectedDiv.getAttribute("data-rx"))+x*interval);
	selectedDiv.setAttribute("data-ry",+(selectedDiv.getAttribute("data-ry"))+y*interval);
	selectedDiv.setAttribute("data-rz",+(selectedDiv.getAttribute("data-rz"))+z*interval);
	}
	updateItem(selectedDiv.getAttribute("data-x"),selectedDiv.getAttribute("data-y"),selectedDiv.getAttribute("data-z"),selectedDiv.getAttribute("data-rx"), selectedDiv.getAttribute("data-ry"), selectedDiv.getAttribute("data-rz"))
}

function setAttribute(get,change){
	selectedDiv.setAttribute(get,+(getAttribute(get))+change);
}

function getAttribute(get){
	selectedDiv.getAttribute(get);
}

function onIntChange(n){
	if(!isNaN(n/2)){
		interval=n
	}else{
	alert("Please input a number!")
	}
}
function onClassChange(n){
	classN=n;
}
function toggleRot(n){
	rotateOn=n;
}
function updateItem(x,y,z,rx, ry, rz){
	selectedDiv.style.webkitTransform=" translateX("+x+"px) translateY("+y+"px) translateZ("+z+"px) rotateZ("+rx+"deg) rotateY("+ry+"deg) rotateX("+rz+"deg)";
	selectedDiv.style.width=(selectedDiv.getAttribute("data-width"))+"px"
	selectedDiv.style.height=(selectedDiv.getAttribute("data-height"))+"px"
}
function exportTxt(self){
	self.parentNode.href = "data:text/plain;base64," + btoa(document.getElementById("spinner").innerHTML);
}
function importTxt(self){
	var reader = new FileReader();
	reader.onload = function (e) {
		document.getElementById("spinner").innerHTML = e.target.result;
    };//end onload()
    reader.readAsText(self.files[0]);
}

function pause(n){
	if(stopUpdate){
		n.innerHTML="&#10074&#10074"
		stopUpdate=false;
	}else{
		n.innerHTML="&#9658"
		stopUpdate=true;
	}
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0, direction = "";

  if (document.getElementById("left")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById("left").onmousedown = dragMouseDownX;
  }if (document.getElementById("right")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById("right").onmousedown = dragMouseDownX;
  }if (document.getElementById("up")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById("up").onmousedown = dragMouseDownY;
  }if (document.getElementById("down")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById("down").onmousedown = dragMouseDownY;
  }if (document.getElementById("fwd")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById("fwd").onmousedown = dragMouseDownZ;
  }if (document.getElementById("back")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById("back").onmousedown = dragMouseDownZ;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDownX(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDragX;
  }
  function dragMouseDownY(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDragY;
  }
  function dragMouseDownZ(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDragZ;
  }

  function elementDragX(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = 0;
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    //elmnt.style.top = (elmnt.offsetTop - pos2) + "px";

    playerPos = posZ*-1+1000;

    objectPos = posElX;

    if (playerPos < objectPos) {
    	posElX += pos1;
	    elmnt.style.transform=elmnt.style.webkitTransform = "translateZ("+posElZ + "px)translateY("+posElY + "px) translateX("+ posElX + "px)";
	}else{
	    posElX -= pos1;
	    elmnt.style.transform=elmnt.style.webkitTransform = "translateZ("+posElZ + "px)translateY("+posElY + "px) translateX("+ posElX + "px)";
	}	
  }

  function elementDragY(e){
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = 0;
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:

	posElY -= pos2;
    elmnt.style.transform=elmnt.style.webkitTransform = "translateZ("+posElZ + "px)translateY("+posElY + "px) translateX("+ posElX + "px)";
  }

  function elementDragZ(e){
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = 0;
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:

    playerPos = posZ*-1+1000;
    objectPos = posElX;

    if (playerPos < objectPos) {
		posElZ += pos2;
	    elmnt.style.transform=elmnt.style.webkitTransform = "translateZ("+posElZ + "px)translateY("+posElY + "px) translateX("+ posElX + "px)";
	}else{
		posElZ -= pos2;
	    elmnt.style.transform=elmnt.style.webkitTransform = "translateZ("+posElZ + "px)translateY("+posElY + "px) translateX("+ posElX + "px)";
	}
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
    init();
  }

}



//Make the DIV element draggagle:
document.addEventListener("click",dragElement(document.getElementById("movable")));
//onload below
window.onload = function() {
	move();
	init();
}
