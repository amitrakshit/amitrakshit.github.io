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

var x1; var x2; var x3; var y2; var y; var last_slider_value;

// Calculating theta for A and B
var thetaA = Math.PI - Math.acos(173 / 250);
var thetaB = Math.acos(175 / 250);

// For filling the major segment
var circle1 = document.getElementById("fill_canvas").getContext("2d");
circle1.beginPath();
circle1.arc(475, 275, 250, thetaA, thetaB, false);
circle1.fillStyle = "#017A6D";
circle1.fill();
circle1.strokeStyle = "transparent";
circle1.stroke();

// For filling the minor segment
var circle2 = document.getElementById("fill_canvas").getContext("2d");
circle2.beginPath();
circle2.arc(475, 275, 250, thetaA, thetaB, true);
circle2.fillStyle = "#1FA798";
circle2.fill();
circle2.strokeStyle = "transparent";
circle2.stroke();


// For drawing a first angle
var tan1 = (450 - 40) / (650 - 400); var theta1 = Math.atan(tan1);
var tan2 = (450 - 40) / (Math.abs(294 - 400)); var theta2 = Math.PI - (Math.atan(tan2));

var angle1 = document.getElementById("tri1canvas").getContext("2d");
angle1.beginPath();
angle1.arc(400, 40, 50, theta1, theta2);
angle1.strokeStyle = "#FF7477";
angle1.lineWidth = 5;
angle1.fill();
angle1.stroke();

angle1.beginPath();
angle1.arc(400, 40, 50, theta1, theta2);
angle1.lineTo(400, 40);
angle1.closePath();
angle1.fillStyle = "#F7A6A5";
angle1.fill();
angle1.strokeStyle = "transparent";
angle1.stroke();


// For drawing a second angle
tan1 = (450 - 40) / (650 - 550); theta1 = Math.atan(tan1);
tan2 = (450 - 40) / (Math.abs(294 - 550)); theta2 = Math.PI - (Math.atan(tan2));

var angle2 = document.getElementById("tri2canvas").getContext("2d");
angle2.beginPath();
angle2.arc(550, 45, 50, theta1, theta2);
angle2.strokeStyle = "#FF7477";
angle2.stroke();

angle2.beginPath();
angle2.arc(550, 45, 50, theta1, theta2);
angle2.lineTo(550, 40);
angle2.closePath();
angle2.fillStyle = "#F7A6A5";
angle2.fill();
angle2.strokeStyle = "transparent";
angle2.stroke();

// For drawing a first triangle
var triangle1 = document.getElementById("tri1canvas").getContext("2d");
triangle1.beginPath();
triangle1.moveTo(302, 450);
triangle1.lineTo(400, 40);
triangle1.lineTo(650, 450);
triangle1.closePath();
triangle1.strokeStyle = "#FFFFFF";
triangle1.lineWidth = 5;
triangle1.stroke();

// For drawing a second triangle
var triangle2 = document.getElementById("tri2canvas").getContext("2d");
triangle2.beginPath();
triangle2.moveTo(302, 450);
triangle2.lineTo(550, 40);
triangle2.lineTo(650, 450);
triangle2.closePath();
triangle2.strokeStyle = "#FFFFFF";
triangle2.lineWidth = 5;
triangle2.stroke();


var input_slider = document.getElementById("myrange");
var slide_value = document.getElementsByClassName("slider_value")[0];


// Update the input slider value (each time you drag the slider handle)
input_slider.oninput = function () {
  this.innerHTML = this.value;
  change_coordinates();
}

// For drawing a circle
var circle = document.getElementById("mycanvas").getContext("2d");
circle.beginPath();
circle.arc(475, 275, 255, 0, 2 * Math.PI);
circle.strokeStyle = "#00FFE4";
circle.lineCap = "round";
circle.lineJoin = "round";
circle.lineWidth = 10;
circle.stroke();



function change_coordinates() {
  // console.log (input_slider.value);
  if (document.getElementById("feed").innerText == "Move the slider to change the length of chord AB. Click on next button.") {
    triangle1.clearRect(0, 0, tri1canvas.width, tri1canvas.height);
    triangle2.clearRect(0, 0, tri2canvas.width, tri2canvas.height);
    circle1.clearRect(0, 0, fill_canvas.width, fill_canvas.height);

    y = 450 - 1.75 * input_slider.value;
    x1 = 475 - Math.sqrt((250 ** 2) - ((y - 275) ** 2));
    x3 = 475 + Math.sqrt((250 ** 2) - ((y - 275) ** 2));


    thetaA = Math.acos((475 - x1) / 250);
    thetaB = Math.acos((475 - x3) / 250);


    if (parseInt(y) >= 275) {
      thetaA = Math.acos((475 - x1) / 250);
      thetaB = Math.acos((475 - x3) / 250);

      circle1 = document.getElementById("fill_canvas").getContext("2d");
      circle1.beginPath();
      circle1.arc(475, 275, 250, thetaA, thetaB, true);
      circle1.fillStyle = "#017A6D";
      circle1.fill();
      circle1.strokeStyle = "transparent";
      circle1.stroke();

      circle2 = document.getElementById("fill_canvas").getContext("2d");
      circle2.beginPath();
      circle2.arc(475, 275, 250, thetaA, thetaB, false);
      circle2.fillStyle = "#1FA798";
      circle2.fill();
      circle2.strokeStyle = "transparent";
      circle2.stroke();

      tan1 = (y - 40) / (x3 - 400); theta1 = Math.atan(tan1);
      tan2 = (y - 40) / (Math.abs(x1 - 400)); theta2 = Math.PI - (Math.atan(tan2));

    }


    else {

      thetaA = 2 * Math.PI - Math.acos((475 - x1) / 250);
      thetaB = 2 * Math.PI - Math.acos((475 - x3) / 250);


      circle1 = document.getElementById("fill_canvas").getContext("2d");
      circle1.beginPath();
      circle1.arc(475, 275, 250, thetaA, thetaB, true);
      circle1.fillStyle = "#017A6D";
      circle1.fill();
      circle1.strokeStyle = "transparent";
      circle1.stroke();


      circle2 = document.getElementById("fill_canvas").getContext("2d");
      circle2.beginPath();
      circle2.arc(475, 275, 250, thetaA, thetaB, false);
      circle2.fillStyle = "#1FA798";
      circle2.strokeStyle = "transparent";
      circle2.fill();
      circle2.stroke();


      tan1 = (y - 40) / (x3 - 400); theta1 = Math.atan(tan1);
      tan2 = (y - 40) / (Math.abs(x1 - 400)); theta2 = Math.PI - (Math.atan(tan2));

    }

    tan1 = (y - 40) / (x3 - 400); theta1 = Math.atan(tan1);
    tan2 = (y - 40) / (Math.abs(x1 - 400)); theta2 = Math.PI - (Math.atan(tan2));

    angle1.beginPath();
    angle1.arc(400, 40, 50, theta1, theta2);
    angle1.strokeStyle = "#FF7477";
    angle1.stroke();

    angle1.beginPath();
    angle1.arc(400, 40, 50, theta1, theta2);
    angle1.lineTo(400, 40);
    angle1.closePath();
    angle1.fillStyle = "#F7A6A5";
    angle1.fill();
    angle1.strokeStyle = "transparent";
    angle1.stroke();


    tan1 = (y - 40) / (x3 - 550); theta1 = Math.atan(tan1);
    tan2 = (y - 40) / (Math.abs(x1 - 550)); theta2 = Math.PI - (Math.atan(tan2));

    angle2.beginPath();
    angle2.arc(550, 40, 50, theta1, theta2);
    angle2.strokeStyle = "#FF7477";
    angle2.stroke();

    angle2.beginPath();
    angle2.arc(550, 45, 50, theta1, theta2);
    angle2.lineTo(550, 40);
    angle2.closePath();
    angle2.fillStyle = "#F7A6A5";
    angle2.fill();
    angle2.strokeStyle = "transparent";
    angle2.stroke();

    triangle1.beginPath();
    triangle1.moveTo(x1, y);
    triangle1.lineTo(400, 40);
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
    triangle2.strokeStyle = "#FFFFFF";
    triangle2.lineWidth = 5;
    triangle2.stroke();

    

    document.getElementById("a").style.top = (y - 40) + "rem";
    document.getElementById("a").style.left = (x1 + 5) + "rem";
    document.getElementById("b").style.top = (y - 40) + "rem";
    document.getElementById("b").style.left = (x3 - 30) + "rem";
  }


  else if (document.getElementById("feed").innerText == "Change the position of P. See, ∠APB = ∠AQB") {
    
    
  if (parseInt(last_slider_value) > 56) 
    {
    if (parseInt(input_slider.value) >= y/6) {
      y2 = (25 + (input_slider.value - y/6) * 3);
      x2 = 475 + Math.sqrt((250 ** 2) - ((y2 - 275) ** 2));
      document.getElementById("p").style.top = (y2 - 50) + "rem";
      document.getElementById("p").style.left = (x2 - 30) + "rem";
        tan1 = (y - y2) / (x3 - x2); theta1 = Math.atan(tan1);
        tan2 = (y - y2) / (x1 - x2); theta2 = Math.PI + (Math.atan(tan2));
      }

    else {
      y2 = (25 + (y/6 - input_slider.value) * 3);
      var x2 = 475 - Math.sqrt((250 ** 2) - ((y2 - 275) ** 2));
      document.getElementById("p").style.top = (y2 - 50) + "rem";
      document.getElementById("p").style.left = (x2 - 5) + "rem";
      tan1 = (y - y2) / (x3 - x2); theta1 = Math.atan(tan1);
      tan2 = (y - y2) / (x1 - x2); theta2 = Math.PI + (Math.atan(tan2));
    }
  }
  else {
    // console.log(y);
    // console.log(y2);
    // console.log(y-y2);
    if (parseInt(input_slider.value) >= y/6) {
      y2 = (25 + (input_slider.value - y/6) * 3);
      x2 = 475 + Math.sqrt((250 ** 2) - ((y2 - 275) ** 2));
      document.getElementById("p").style.top = (y2 - 50) + "rem";
      document.getElementById("p").style.left = (x2 - 30) + "rem";
       

      // if (parseInt(y-y2) < 155) {
      //   tan1 = (y - y2) / (x3 - x2); theta1 = Math.PI + Math.atan(tan1);
      //   tan2 = (y - y2) / (x1 - x2); theta2 = Math.PI + (Math.atan(tan2));
      // }
      // else {
        tan1 = (y - y2) / (x3 - x2); theta1 =  Math.atan(tan1);
        tan2 = (y - y2) / (x1 - x2); theta2 = Math.PI + (Math.atan(tan2));
          if (theta1 < 0)
          {theta1 = Math.PI + Math.atan(tan1);}
        
      // }

    }

    else {
      y2 = (25 + (y/6 - input_slider.value) * 3);
      var x2 = 475 - Math.sqrt((250 ** 2) - ((y2 - 275) ** 2));
      document.getElementById("p").style.top = (y2 - 50) + "rem";
      document.getElementById("p").style.left = (x2 - 5) + "rem";
      tan1 = (y - y2) / (x3 - x2); theta1 = Math.atan(tan1);
      // if (parseInt(y-y2) < 155) {
      //   tan1 = (y - y2) / (x3 - x2); theta1 =  Math.atan(tan1);
      //   tan2 = (y - y2) / (x1 - x2); theta2 = (Math.atan(tan2));
      // }
      // else {
        tan1 = (y - y2) / (x3 - x2); theta1 =  Math.atan(tan1);
        tan2 = (y - y2) / (x1 - x2); theta2 = Math.PI + (Math.atan(tan2));
      // }
        //  console.log (theta1, theta2);
      if (theta2 > 4)
      {theta2 = Math.atan(tan2);}

    }
  }
     
    triangle1.clearRect(0, 0, tri1canvas.width, tri1canvas.height);

    angle1.beginPath();
    angle1.arc(x2, y2, 50, theta1, theta2);
    angle1.strokeStyle = "#FF7477";
    angle1.stroke();

    angle1.beginPath();
    angle1.arc(x2, y2, 50, theta1, theta2);
    angle1.lineTo(x2, y2);
    angle1.closePath();
    angle1.fillStyle = "#F7A6A5";
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
     
   


  }
}
function next_instruction() {
  buttonAudio_Click.play();
  buttonAudio_Click.playbackRate = 3;
  if (document.getElementById("feed").innerText == "Move the slider to change the length of chord AB. Click on next button.") {
    document.getElementById("feed").innerText = "Change the position of P. See, ∠APB = ∠AQB";
     if (parseInt(input_slider.value) ==1)
     {
x1 = 302; 
x3 = 650;
y = 450;
     }
    // triangle1.clearRect(0, 0, tri1canvas.width, tri1canvas.height);
    // triangle2.clearRect(0, 0, tri2canvas.width, tri2canvas.height);

    // document.getElementById("a").style.top = "410rem";
    // document.getElementById("a").style.left = "260rem";
    // document.getElementById("b").style.top = "410rem";
    // document.getElementById("b").style.left = "660rem";
last_slider_value = input_slider.value;
document.getElementById("myrange").max = parseInt(y/3);
    input_slider.value = y/6;

    // triangle1.beginPath();
    // triangle1.moveTo(294,450);
    // triangle1.lineTo(400,40);
    // triangle1.lineTo(650,450);
    // triangle1.closePath();
    // triangle1.strokeStyle = "#FFFFFF";
    // triangle1.lineWidth = 5;
    // triangle1.stroke();

    // var tan1 = (450-40)/(650-400); var theta1 = Math.atan(tan1);
    // var tan2 = (450-40)/(Math.abs(294-400)); var theta2 = Math.PI-(Math.atan(tan2));

    // angle1.beginPath();
    // angle1.arc(400, 40, 50, theta1,theta2);
    // angle1.strokeStyle = "#FF7477";
    // angle1.stroke();


    // angle1.beginPath();
    // angle1.arc(400, 40, 50, theta1,theta2);
    // angle1.lineTo(400,40);
    // angle1.closePath();
    // angle1.fillStyle = "#F7A6A5";
    // angle1.fill();
    // angle1.strokeStyle = "transparent";
    // angle1.stroke();


    // triangle2.beginPath();
    // triangle2.moveTo(294,450);
    // triangle2.lineTo(550,40);
    // triangle2.lineTo(650,450);
    // triangle2.closePath();
    // triangle2.strokeStyle = "#FFFFFF";
    // triangle2.lineWidth = 5;
    // triangle2.stroke();


    // tan1 = (450-40)/(650-550); theta1 = Math.atan(tan1);
    // tan2 = (450-40)/(Math.abs(294-550)); theta2 = Math.PI-(Math.atan(tan2));


    // angle2.beginPath();
    // angle2.arc(550, 45, 50, theta1, theta2);
    // angle2.strokeStyle = "#FF7477";
    // angle2.stroke();

    // angle2.beginPath();
    // angle2.arc(550, 45, 50, theta1, theta2);
    // angle2.lineTo(550,40);
    // angle2.closePath();
    // angle2.fillStyle = "#F7A6A5";
    // angle2.fill();
    // angle2.strokeStyle = "transparent";
    // angle2.stroke();

    // var thetaA  = Math.PI - Math.acos(181/250);
    // var thetaB = Math.acos(175/250);

    // // For filling the major segment
    //  var circle1 = document.getElementById("fill_canvas").getContext("2d");
    //  circle1.beginPath();
    //  circle1.arc(475,275,250, thetaA , thetaB, false);
    //  circle1.fillStyle = "#017A6D";
    // circle1.fill();
    //  circle1.stroke();

    // // For filling the minor segment
    //  var circle2 = document.getElementById("fill_canvas").getContext("2d");
    //  circle2.beginPath();
    //  circle2.arc(475,275,250, thetaA , thetaB, true);
    //  circle2.fillStyle = "#1FA798";
    // circle2.fill();
    //  circle2.stroke();
  }

  else {

    movable_parent.style = "left: -1080rem;";
    observation_tab.classList.remove('nav_selected');
    question_tab.classList.add('nav_selected2');
  }


}
