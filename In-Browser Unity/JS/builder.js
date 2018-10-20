var name,width,height;

function newrec() {
	name=document.getElementById('editname').value;
	width=document.getElementById('editwidth').value+"px";
	height=document.getElementById('editheight').value+"px";
	var everything=document.getElementById("spinner").innerHTML;
	var everything2=document.getElementById('blockname').innerHTML;
	document.getElementById("spinner").innerHTML = everything +"<div id='"+ name +"'style='width:"+ width +";height:"+height+";background:white;box-shadow:none;border:none;'></div>";
	document.getElementById('blockname').innerHTML = everything2 + '<p style="-webkit-margin-before: 0px;-webkit-margin-after: 0px;">'+name+'</p>';
	document.getElementById("NAswap").value = name;
	document.getElementById('WIswap').value = width;
	document.getElementById('HIswap').value = height;
}

function toggletri() {
	var styletri=document.getElementById('newtri').getAttribute('style');
	var styletri2="margin-top: 20px;border-left: 100px solid white;  width: 0;  height: 0;  border-top: 66px solid transparent;border-bottom: 0px solid transparent;border-right: 0px solid transparent;background: transparent;";
	if (styletri == styletri2){
		document.getElementById('newtri').setAttribute('style','margin-top: 20px;border-left: 100px solid white;  width: 0;  height: 0;  border-top: 33px solid transparent;  border-bottom: 33px solid transparent;    border-right: 0px solid transparent;background: transparent;');
	}
	if (styletri != styletri2){
		document.getElementById('newtri').setAttribute('style','margin-top: 20px;border-left: 100px solid white;  width: 0;  height: 0;  border-top: 66px solid transparent;border-bottom: 0px solid transparent;border-right: 0px solid transparent;background: transparent;');
	}
}

function newtri() {
	var styletri=document.getElementById('newtri').getAttribute('style');
	var styletri2="margin-top: 20px;border-left: 100px solid white;  width: 0;  height: 0;  border-top: 66px solid transparent;border-bottom: 0px solid transparent;border-right: 0px solid transparent;background: transparent;";

	if (styletri == styletri2){
	name=document.getElementById('editname').value;
	width=document.getElementById('editwidth').value+"px";
	height=document.getElementById('editheight').value+"px";
	height2=document.getElementById('editheight').value/2+"px";
	var everything=document.getElementById("spinner").innerHTML;
	document.getElementById("spinner").innerHTML = everything +"<div id='"+ name +"'style='width:0px;height:0px;border-left: "+width+" solid white;  width: 0;  height: 0;  border-top: "+height+" solid transparent;  border-bottom: 0px solid transparent;    border-right: 0px solid transparent;background: transparent;'></div>";
	var everything2=document.getElementById('blockname').innerHTML;
	document.getElementById('blockname').innerHTML = everything2 + '<p style="-webkit-margin-before: 0px;-webkit-margin-after: 0px;">'+name+'</p>';
	document.getElementById("NAswap").value = name;
	document.getElementById('WIswap').value = width;
	document.getElementById('HIswap').value = height;
}
	if (styletri != styletri2) {
	name=document.getElementById('editname').value;
	width=document.getElementById('editwidth').value+"px";
	height=document.getElementById('editheight').value+"px";
	height2=document.getElementById('editheight').value/2+"px";
	var everything=document.getElementById("spinner").innerHTML;

	document.getElementById("spinner").innerHTML = everything +"<div id='"+ name +"'style='width:0px;height:0px;border-left: "+width+" solid white;  width: 0;  height: 0;  border-top: "+height2+" solid transparent;  border-bottom: "+height2+" solid transparent;    border-right: 0px solid transparent;background: transparent;'></div>";
	var everything2=document.getElementById('blockname').innerHTML;
	document.getElementById('blockname').innerHTML = everything2 + '<p style="-webkit-margin-before: 0px;-webkit-margin-after: 0px;">'+name+'</p>';
	document.getElementById("NAswap").value = name;
	document.getElementById('WIswap').value = width;
	document.getElementById('HIswap').value = height;
	};
}

function newcir() {
	name=document.getElementById('editname').value;
	width=document.getElementById('editwidth').value+"px";
	height=document.getElementById('editheight').value+"px";
	height2=document.getElementById('editheight').value/2+"px";
	var everything=document.getElementById("spinner").innerHTML;

	document.getElementById("spinner").innerHTML = everything +"<div id='"+ name +"'style='width:"+ width +";height:"+height+";border-radius:"+height2+";background:white;box-shadow:none;border:none;'></div>";
	var everything2=document.getElementById('blockname').innerHTML;
	document.getElementById('blockname').innerHTML = everything2 + '<p style="-webkit-margin-before: 0px;-webkit-margin-after: 0px;">'+name+'</p>';
	document.getElementById("NAswap").value = name;
	document.getElementById('WIswap').value = width;
	document.getElementById('HIswap').value = height;
}


function rotateL() {
	rotMove(false,"XRswap","rotateX");
	console.log('yesworking');
}

function moveUp() {
	rotMove(true,"YTswap","translateY");
	console.log('yesworking2');
}

function rotateR() {
	rotMove(true,"XRswap","rotateX");
	console.log('yesworking3');
}

function moveLf() {
	rotMove(true,"ZTswap","translateZ");
	console.log('yesworking4');
}

function moveRt() {
	rotMove(false,"ZTswap","translateZ");
	console.log('yesworking5');
}

function moveDw() {
	rotMove(false,"YTswap","translateY");
	console.log('yesworking6');
}

function rotate2L() {
	rotMove(true,"ZRswap","rotateZ");
	console.log('yesworking7');
}

function rotate2R() {
	rotMove(false,"ZRswap","rotateZ");
	console.log('yesworking8');
}
function move2Lf() {
	rotMove(true,"XTswap","translateX");
	console.log('yesworking9');
}

function move2Rt() {
	rotMove(false,"XTswap","translateX");
	console.log('yesworking10');
}

function rotate3L() {
	rotMove(true,"YRswap","rotateY");
	console.log('yesworking11');
}

function rotate3R() {
	rotMove(false,"YRswap","rotateY");
	console.log('yesworking12');
}

function rotMove(degType,swap,rotMoveType){

	var disname=document.getElementById('disname').value;
	var editdegpx=document.getElementById('editdegpx').value;
	if (degType == true) {
		var editdegpx = editdegpx * -1 ;
	}

	document.getElementById(disname).style.webkitTransform=rotMoveType+"("+editdegpx+"deg)";
	document.getElementById(swap).value = editdegpx2;
}


function submit(){
	form = document.forms[0]
	form.submit();
}
