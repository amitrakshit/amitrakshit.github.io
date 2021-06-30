// Following Code is use for adaptation of the device width and height
if (screen.width / screen.height < 9 / 16) {
  screenScaleRatio = 1080 / screen.width;
}
else {
  screenScaleRatio = 1920 / screen.height;
}
var metaData = document.getElementsByName('viewport');
metaData[0].content = "width=device-width, initial-scale=" + 1 / screenScaleRatio.toString();


// Following code is for question tab and observation tab transition
var navigation_bar = document.getElementsByClassName('navigation_bar');
var question_tab = navigation_bar[0].children[1];
var observation_tab = navigation_bar[0].children[0];
var movable_parent = document.getElementsByClassName('movable_parent')[0];

question_tab.onclick = function () {
  buttonAudio_Click.play();
  buttonAudio_Click.playbackRate = 3;
  movable_parent.style = "left: -1080rem;";
  observation_tab.classList.remove('nav_selected');
  question_tab.classList.add('nav_selected2');
}

observation_tab.onclick = function () {
  buttonAudio_Click.play();
  buttonAudio_Click.playbackRate = 3;
  movable_parent.style = "left: 0rem";
  observation_tab.classList.add('nav_selected');
  question_tab.classList.remove('nav_selected2');
}

var x1; var x2; var x3; var y2; var y; var last_slider_value; var xp; var yp; var xl; var last_slider; var last_theta1; var last_theta2;


var sound_oninput = document.getElementById("slider_oninput");
var sound_onchange = document.getElementById("slider_onchange");



// Calculating theta for A and B
var thetaA = Math.PI - Math.acos(173 / 250);
var thetaB = Math.acos(175 / 250);

// For filling the major segment
var circle1 = document.getElementById("fill_canvas").getContext("2d");
circle1.beginPath();
circle1.arc(475, 275, 250, thetaA, thetaB, false);
// circle1.fillStyle = "rgba(196,196,196,0.5)";
circle1.fillStyle = "#C4C4C440";
circle1.fill();
circle1.strokeStyle = "#C4C4C440";
circle1.lineWidth = 5;
circle1.stroke();

// For drawing a first angle
var tan1 = (450 - 40) / (650 - 400); var theta1 = Math.atan(tan1);
var tan2 = (450 - 40) / (Math.abs(294 - 400)); var theta2 = Math.PI - (Math.atan(tan2));
var theta = Math.floor((theta2 - theta1) * (180 / Math.PI));

var angle1 = document.getElementById("tri1canvas").getContext("2d");
angle1.beginPath();
angle1.arc(400, 40, 55, theta1, theta2);
angle1.lineTo(400, 40);
angle1.closePath();
angle1.fillStyle = "#EFCACA";
// angle1.fillStyle = "#E050F4";
angle1.fill();
angle1.strokeStyle = "transparent";
angle1.stroke();

var label1 = document.getElementById("tri1canvas").getContext("2d");
label1.beginPath();
label1.moveTo(25, 203);
label1.lineTo(120, 203);
label1.lineTo(390, 80);
label1.strokeStyle = "#FFFFFF";
label1.lineWidth = 3;
label1.stroke();

document.getElementsByClassName("anglep")[0].innerHTML = theta + "&deg";

var label2 = document.getElementById("tri2canvas").getContext("2d");
label2.beginPath();
label2.moveTo(895, 100);
label2.lineTo(800, 100);
label2.lineTo(550, 80);
label2.strokeStyle = "white";
label2.lineWidth = 3;
label2.stroke();

// For drawing a second angle
tan1 = (450 - 40) / (650 - 550); theta1 = Math.atan(tan1);
tan2 = (450 - 40) / (Math.abs(294 - 550)); theta2 = Math.PI - (Math.atan(tan2));


var angle2 = document.getElementById("tri2canvas").getContext("2d");


angle2.beginPath();
angle2.arc(550, 45, 50, theta1, theta2);
angle2.lineTo(550, 40);
angle2.closePath();
angle2.fillStyle = "#EFCACA";
angle2.fill();
angle2.strokeStyle = "transparent";
angle2.stroke();

document.getElementsByClassName("angleq")[0].innerHTML = theta + "&deg";
// For drawing a first triangle
var triangle1 = document.getElementById("tri1canvas").getContext("2d");
triangle1.beginPath();
triangle1.moveTo(294, 450);
triangle1.lineTo(400, 40);
triangle1.lineTo(650, 450);
triangle1.closePath();
triangle1.strokeStyle = "#FFFFFF";
triangle1.lineWidth = 5;
triangle1.stroke();

// For drawing a second triangle
var triangle2 = document.getElementById("tri2canvas").getContext("2d");
triangle2.beginPath();
triangle2.moveTo(294, 450);
triangle2.lineTo(550, 40);
triangle2.lineTo(650, 450);
triangle2.closePath();
triangle2.strokeStyle = "#FFFFFF";
triangle2.lineWidth = 5;
triangle2.stroke();





var for_point = document.getElementById("point_change");
var for_chord = document.getElementById("chord_change");
var feedback_box = document.getElementsByClassName("feedback_bar")[0];


// Update the input slider value (each time you drag the slider handle)
for_chord.oninput = function () {


  this.innerHTML = this.value;

  change_chord();
}

for_chord.onchange = function () {
  sound_onchange.play();
  feedback_box.style.opacity = 1;

  feedback_box.style.transition = "opacity 1s";

  document.getElementsByClassName("next_button")[0].style.top = "1717rem";
  document.getElementsByClassName("next_button")[0].style.transition = "top 0.5s";

}


for_point.oninput = function () {
  this.innerHTML = this.value;
  change_point();
}

for_point.onchange = function () {
  sound_onchange.play();
  feedback_box.style.opacity = 1;
  feedback_box.style.transition = "opacity 1s";
  document.getElementById("p").style.color = "aliceblue";

  document.getElementsByClassName("next_button")[0].style.top = "1717rem";
  document.getElementsByClassName("next_button")[0].style.transition = "top 0.5s";

  if (parseInt(for_chord.value) == 1) {
    x1 = 294;
    x3 = 650;
    y = 450;
  }






  tan1 = (y - 40) / (x3 - 550); theta1 = Math.atan(tan1);
  tan2 = (y - 40) / (Math.abs(x1 - 550)); theta2 = Math.PI - (Math.atan(tan2));




  angle2.beginPath();
  angle2.arc(550, 45, 48, theta1, theta2);
  angle2.lineTo(550, 40);
  angle2.closePath();
  angle2.fillStyle = "#EFCACA";
  angle2.fill();
  angle2.strokeStyle = "transparent";
  angle2.stroke();

  triangle2.beginPath();
  triangle2.moveTo(x1, y);
  triangle2.lineTo(550, 40);
  triangle2.lineTo(x3, y);
  triangle2.closePath();
  triangle2.strokeStyle = "#FFFFFF";
  triangle2.lineWidth = 5;
  triangle2.stroke();


  angle1.beginPath();
  angle1.arc(xp, yp, 55, last_theta1, last_theta2);
  angle1.lineTo(xp, yp);
  angle1.closePath();
  angle1.fillStyle = "#00DBB3";
  angle1.fill();
  angle1.strokeStyle = "transparent";
  angle1.stroke();

  triangle1.beginPath();
  triangle1.moveTo(x1, y);
  triangle1.lineTo(xp, yp);
  triangle1.lineTo(x3, y);
  triangle1.closePath();
  triangle1.strokeStyle = "#FFFFFF";
  triangle1.lineWidth = 5;
  triangle1.stroke();

}


// For drawing a circle
var circle = document.getElementById("mycanvas").getContext("2d");
circle.beginPath();
circle.arc(475, 275, 255, 0, 2 * Math.PI);
circle.strokeStyle = "#FFFFFF";
circle.lineCap = "round";
circle.lineJoin = "round";
circle.lineWidth = 5;
circle.stroke();

// document.getElementById("chord_change").max = parseInt ((y-yp)/1.5);


function change_chord() {

  document.getElementById("p").style.color = "aliceblue";

  // var max_set = (125 / yp) * for_chord.value;
  // y = 450 - max_set;
  if (parseInt(for_point.value) == 75 && document.getElementById("point_change").max == 150) {
    xp = 400;
    yp = 40;
  }
  // if (parseInt(yp) < 100) {
  //   y = 450 - 1.5 * for_chord.value;
  // }
  
  y = 450 - 1.5 * for_chord.value;

  if (for_chord.value == 1) {
    y = 450;
  }

  else if (for_chord.value == 150)
  {
    y = 225;
  }
  
  triangle1.clearRect(0, 0, tri1canvas.width, tri1canvas.height);
  triangle2.clearRect(0, 0, tri2canvas.width, tri2canvas.height);
  circle1.clearRect(0, 0, fill_canvas.width, fill_canvas.height);


  x1 = 475 - Math.sqrt((250 ** 2) - ((y - 275) ** 2));
  x3 = 475 + Math.sqrt((250 ** 2) - ((y - 275) ** 2));

  
  

console.log (x1, x3, y);
  thetaA = Math.acos((475 - x1) / 250);
  thetaB = Math.acos((475 - x3) / 250);


  if (parseInt(y) >= 275) {
    thetaA = Math.acos((475 - x1) / 250);
    thetaB = Math.acos((475 - x3) / 250);

    circle1 = document.getElementById("fill_canvas").getContext("2d");
    circle1.beginPath();
    circle1.arc(475, 275, 250, thetaA, thetaB, true);
    circle1.fillStyle = "#C4C4C440";
    circle1.fill();
    circle1.strokeStyle = "#C4C4C440";
    circle1.lineWidth = 5;
    circle1.stroke();

  }



  else {

    thetaA = 2 * Math.PI - Math.acos((475 - x1) / 250);
    thetaB = 2 * Math.PI - Math.acos((475 - x3) / 250);


    circle1 = document.getElementById("fill_canvas").getContext("2d");
    circle1.beginPath();
    circle1.arc(475, 275, 250, thetaA, thetaB, true);
    circle1.fillStyle = "#C4C4C440";
    circle1.fill();
    circle1.strokeStyle = "#C4C4C440";
    circle1.lineWidth = 5;
    circle1.stroke();



  }

  if (for_chord.value == 1) {
    x1  = 294;
    x3 = 650;
  }

  else if (for_chord.value == 150)

  {
    x1 = 230;
    x3 = 720;
  }
  tan1 = (y - yp) / (x3 - xp); theta1 = Math.atan(tan1);
  tan2 = (y - yp) / (x1 - xp); theta2 = Math.PI + (Math.atan(tan2));

  


  if (theta1 < 0) { theta1 = Math.PI + Math.atan(tan1); }


  if (theta2 > 4) { theta2 = Math.atan(tan2); }

  label1.beginPath();
  label1.moveTo(25, 203);
  label1.lineTo(120, 203);
  label1.lineTo(xp, yp + 30);
  label1.strokeStyle = "#FFFFFF";
  label1.lineWidth = 3;
  label1.stroke();

  theta = Math.floor((theta2 - theta1) * (180 / Math.PI));
  if (for_chord.value == 150)
  {
    document.getElementsByClassName("anglep")[0].innerHTML = "102&deg";
    document.getElementsByClassName("angleq")[0].innerHTML = "102&deg";
  }
  else {
  document.getElementsByClassName("anglep")[0].innerHTML = theta + "&deg";
  document.getElementsByClassName("angleq")[0].innerHTML = theta + "&deg";
  }
 
 
  
 
  angle1.beginPath();
  angle1.arc(xp, yp, 55, theta1, theta2);
  angle1.lineTo(xp, yp);
  angle1.closePath();
  angle1.fillStyle = "#EFCACA";
  angle1.fill();
  angle1.strokeStyle = "transparent";
  angle1.stroke();
  

  label2.beginPath();
  label2.moveTo(895, 100);
  label2.lineTo(800, 100);
  label2.lineTo(550, 80);
  label2.strokeStyle = "#FFFFFF";
  label2.lineWidth = 3;
  label2.stroke();

  tan1 = (y - 40) / (x3 - 550); theta1 = Math.atan(tan1);
  tan2 = (y - 40) / (Math.abs(x1 - 550)); theta2 = Math.PI - (Math.atan(tan2));

  


  angle2.beginPath();
  angle2.arc(550, 45, 50, theta1, theta2);
  angle2.lineTo(550, 40);
  angle2.closePath();
  angle2.fillStyle = "#EFCACA";
  angle2.fill();
  angle2.strokeStyle = "transparent";
  angle2.stroke();

  triangle1.beginPath();
  triangle1.moveTo(x1, y);
  triangle1.lineTo(xp, yp);
  triangle1.lineTo(x3, y);
  triangle1.strokeStyle = "#FFFFFF";
  triangle1.lineWidth = 5;
  triangle1.stroke();



  triangle2.globalAlpha = 1;
  triangle2.beginPath();
  triangle2.moveTo(x1, y);
  triangle2.lineTo(550, 40);
  triangle2.lineTo(x3, y);
  triangle2.strokeStyle = "#FFFFFF";
  triangle2.lineWidth = 5;
  triangle2.stroke();


 


  // label1.lineTo(xp,170);
  // label1.lineTo(xp,yp+40);



  var line1 = document.getElementById("tri1canvas").getContext("2d");
  line1.beginPath();
  line1.moveTo(x1, y);
  line1.lineTo(x3, y);
  line1.strokeStyle = "#FD715D";
  line1.lineWidth = 5;
  line1.stroke();

  document.getElementById("a").style.top = (y - 60) + "rem";
  document.getElementById("a").style.left = (x1 + 5) + "rem";
  document.getElementById("b").style.top = (y - 60) + "rem";
  document.getElementById("b").style.left = (x3 - 30) + "rem";
  

  //     document.getElementById("chord_change").max = parseInt (150 - (yp/2.5));
  // console.log(for_chord.value);

  
if (theta == 90) 
{
  document.getElementsByClassName("diameter")[0].style.opacity = "1";
  document.getElementsByClassName("diameter").style.transition = "opacity 2s";
}
else {
  document.getElementsByClassName("diameter")[0].style.opacity = "0";
  document.getElementsByClassName("diameter").style.transition = "opacity 2s";
}

}





function change_point() {

  // document.getElementById("p").style.color = "#E050F4";

  if (parseInt(for_chord.value) == 1) {
    x1 = 294;
    x3 = 650;
    y = 450;
  }
  // document.getElementById("point_change").max = parseInt(y / 3);

 
  // console.log(for_chord.value);


  triangle1.clearRect(0, 0, tri1canvas.width, tri1canvas.height);
  triangle2.clearRect(0, 0, tri2canvas.width, tri2canvas.height);

  tan1 = (y - 40) / (x3 - 550); theta1 = Math.atan(tan1);
  tan2 = (y - 40) / (Math.abs(x1 - 550)); theta2 = Math.PI - (Math.atan(tan2));
  // document.getElementsByClassName("angleq")[0].innerHTML = theta + "&deg";
  angle2.beginPath();
  angle2.arc(550, 45, 50, theta1, theta2);
  angle2.lineTo(550, 40);
  angle2.closePath();
  angle2.fillStyle = "#EFCACA50";
  angle2.fill();
  angle2.strokeStyle = "transparent";
  angle2.stroke();


  if (parseInt(for_point.value) >= 75) {
    y2 = (25 + (for_point.value - 75));
    x2 = 475 + Math.sqrt((250 ** 2) - ((y2 - 275) ** 2));
    var xl = x2 - 10;


    // document.getElementById("p").style.top = (y2 - 50) + "rem";
    // document.getElementById("p").style.left = (x2 - 5) + "rem";







    tan1 = (y - y2) / (x3 - x2); theta1 = Math.atan(tan1);
    tan2 = (y - y2) / (x1 - x2); theta2 = Math.PI + (Math.atan(tan2));

    

    if (theta1 < 0) { theta1 = Math.PI + Math.atan(tan1); }



  }

  else {
    y2 = (25 + (75 - for_point.value) );
    var x2 = 475 - Math.sqrt((250 ** 2) - ((y2 - 275) ** 2));
    var xl = x2 + 10;


    // tan1 = (y - y2) / (x3 - x2); theta1 = Math.atan(tan1);

    tan1 = (y - y2) / (x3 - x2); theta1 = Math.atan(tan1);
    tan2 = (y - y2) / (x1 - x2); theta2 = Math.PI + (Math.atan(tan2));

    if (theta2 > 4) { theta2 = Math.atan(tan2); }

  }



  // console.log(x2, y2);

  if (parseInt(x2) > 513 && parseInt(x2) < 569) {
    document.getElementById("p").style.left = (513 - 5) + "rem";
    document.getElementById("p").style.top = (28 - 50) + "rem";
  }
  else {
    document.getElementById("p").style.left = (x2 - 5) + "rem";
    document.getElementById("p").style.top = (y2 - 50) + "rem";
  }




  label1.beginPath();
  label1.moveTo(25, 203);
  label1.lineTo(120, 203);
  label1.lineTo(xl, y2 + 30);
  label1.strokeStyle = "#FFFFFF";
  label1.lineWidth = 3;
  label1.stroke();

  // label1.beginPath();
  // label1.moveTo(120, 170);
  // label1.lineTo(xl,170);
  // label1.lineTo(xl,y2+30);
  // label1.strokeStyle = "#FFFFFF80";
  // label1.lineWidth = 5;
  // label1.stroke();
  last_theta1 = theta1; last_theta2 = theta2;

  theta = Math.floor((theta2 - theta1) * (180 / Math.PI));
  // document.getElementsByClassName("anglep")[0].innerHTML = theta + "&deg";

  
   
  angle1.beginPath();
  angle1.arc(x2, y2, 55, theta1, theta2);
  angle1.lineTo(x2, y2);
  angle1.closePath();
  angle1.fillStyle = "#00DBB3";
  angle1.fill();
  angle1.strokeStyle = "transparent";
  angle1.stroke();
  




  triangle1.beginPath();
  triangle1.moveTo(x1, y);
  triangle1.lineTo(x2, y2);
  triangle1.lineTo(x3, y);
  triangle1.closePath();
  triangle1.strokeStyle = "#FFFFFF";
  triangle1.lineWidth = 5;
  triangle1.stroke();


  triangle2.beginPath();
  triangle2.moveTo(x1, y);
  triangle2.lineTo(550, 40);
  triangle2.lineTo(x3, y);
  triangle2.closePath();
  triangle2.strokeStyle = "#FFFFFF40";
  triangle2.lineWidth = 5;
  triangle2.stroke();


  label2.beginPath();
  label2.moveTo(895, 100);
  label2.lineTo(800, 100);
  label2.lineTo(550, 80);
  label2.strokeStyle = "#FFFFFF";
  label2.lineWidth = 3;
  label2.stroke();


  xp = x2;
  yp = y2;

  // console.log(y2);
  // document.getElementById("chord_change").max = parseInt (150 - (yp/2.5));

}


function next_instruction() {
  buttonAudio_Click.play();
  buttonAudio_Click.playbackRate = 3;


  movable_parent.style = "left: -1080rem;";
  observation_tab.classList.remove('nav_selected');
  question_tab.classList.add('nav_selected2');
}


