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


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var visual_div = document.getElementsByClassName("visual_area")[0];

// var canvas = document.getElementById("mycanvas");
// var c = canvas.getContext("2d");
// canvas.width = (window.getComputedStyle(visual_div).width.slice(0, -2));
// canvas.height = 1.1 * ((window.getComputedStyle(visual_div).height.slice(0, -2)));







var sound_onchange = document.getElementById("slider_onchange");



var feedback_box = document.getElementsByClassName("feedback_bar")[0];
var next_button = document.getElementsByClassName("next_button")[0];
var remarks = document.getElementById("message");

var block = document.getElementsByClassName("block_div")[0];
var left_pos = 0; var animae; var i = 1; var speed =0; var last_value;

var velocity_slider = document.getElementsByClassName("velocity_slider")[0];
var force_slider = document.getElementsByClassName("force_slider")[0];
var reset_button = document.getElementsByClassName("reset_button")[0];

var velocity_change = document.getElementById("velocity_change");
var force_change = document.getElementById("force_change");
var distance_value = document.getElementsByClassName("distance")[0];
var velocity_value = 2; var force_value = 2;


var KE_bar = document.getElementsByClassName("fill_KE")[0];
var work_bar = document.getElementsByClassName("fill_work")[0];
var arrow = document.getElementsByClassName("arrow_div")[0];

var KE = 0.5*velocity_value*velocity_value;

velocity_change.oninput = function () {
  this.innerHTML = this.value;
  velocity_value = this.value;
}


velocity_change.onchange = function () {
  sound_onchange.play();
 }

 force_change.oninput = function () {
  this.innerHTML = this.value;
  force_value = this.value;
}


force_change.onchange = function () {
  sound_onchange.play();
 }



 function next_instruction() {
  buttonAudio_Click.play();
  buttonAudio_Click.playbackRate = 3;

  if (next_button.innerHTML == "Start")
  {
    block.style.left = "-10%";
    
    next_button.innerHTML = "Next";
    reset_button.style.opacity = "1";
    velocity_change.disabled = true;
    velocity_slider.style.opacity = "0";
    force_change.disabled = true;
    force_slider.style.opacity = "0";
    moving_block();

    KE = 0.5*velocity_value*velocity_value;


KE_bar.style.width = KE*(500/12.5) + "rem";
KE_bar.style.opacity = "1";
KE_bar.innerHTML = KE + "J";


    feedback_box.style = "opacity:0; top: 60%;";
         setTimeout(() => {
           remarks.style.color = "black";
            remarks.innerText = "The work done by the force of friction is equal to product of frictional force and the distance travelled which is equal to the change in K.E. of a body.";
         feedback_box.style = "opacity:1; top: 58.3%;";
         feedback_box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)"; 
          }, 400);
  }
else {
 
  movable_parent.style = "left: -1080rem;";
  observation_tab.classList.remove('nav_selected');
  question_tab.classList.add('nav_selected2');
}
}

function reset_instruction()
{
  buttonAudio_Click.play();
  buttonAudio_Click.playbackRate = 3;
  location.reload();
}

function moving_block()

{
  
  
  animae = setInterval(constant_motion,100);

  function constant_motion()
  {
   

  if (parseInt(left_pos) <= 250)
  {
    block.style.left = (40 + left_pos + velocity_value*4) + "rem";
    
    last_value = left_pos;
    left_pos = left_pos + velocity_value*5;
  
  }
  else {
   
    
      speed = velocity_value*3.75 - 0.35*force_value*(2*i - 1) ;
     
     
      if ( speed >= 0 )
    
{ 
      
      block.style.left = (40 + left_pos + speed )+ "rem";

      var num = (left_pos - last_value)/90;

      var n = num.toFixed(2);

      distance_value.style.left = (80 + left_pos + speed ) + "rem";

      distance_value.innerHTML = n + " m";

      arrow.style.width = (left_pos - last_value -5) + "rem";
      arrow.style.opacity = "1";
      
      left_pos = left_pos + speed;
     

      KE_bar.style.width = 1.3*speed*speed + "rem";
      
      work_bar.style.width = KE*(500/12.5) - 1.3*speed*speed + "rem";

      work_bar.style.opacity = "1";

      // var Kinetic = (1.3*speed*speed)/90;
      // KE_bar.innerHTML = Kinetic.toFixed(1) + "J";

    // var work =  (KE*(500/12.5) - speed*speed)/90;
    //   work_bar.innerHTML = work.toFixed(1) + "J";
    KE_bar.innerHTML = "";
      i = i + 0.235;

      
     
      
    }
    else {

var val = (0.5*velocity_value*velocity_value)/force_value;

v = val.toFixed(2);

KE_bar.style.width = "0rem";

      distance_value.innerHTML =  v + " m";

      KE_bar.innerHTML = "";
      work_bar.innerHTML = KE + "J";
    clearInterval(animae);
  
  }
  }
  
}
}

