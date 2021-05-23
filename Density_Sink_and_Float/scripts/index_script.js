// Following Code is use for adaptation of the device width and height
if (screen.width / screen.height < 9 / 16) {
   screenScaleRatio = 1080 / screen.width;
}
else {
   screenScaleRatio = 1920 / screen.height;
}
var metaData = document.getElementsByName('viewport');
metaData[0].content = "width=device-width, initial-scale=" + 1 / screenScaleRatio.toString();

// SFX files
var sliderAudio_oninput = new Audio();
sliderAudio_oninput.src = "sounds/Slider_oninput.mp3";
var sliderAudio_onchange = new Audio();
sliderAudio_onchange.src = "sounds/Slider_onchange.mp3";
var buttonAudio_Click = new Audio();
buttonAudio_Click.src = "sounds/buton_Click.mp3";
var sliderAudio_oninputForward = new Audio();
sliderAudio_oninputForward.src = "sounds/Slider_oninput_forward.mp3";
var sliderAudio_oninputBackward = new Audio();
sliderAudio_oninputBackward.src = "sounds/Slider_oninput_forward.mp3";

// Following code is for question tab and observation tab transition
var navigation_bar = document.getElementsByClassName('navigation_bar');
var question_tab = navigation_bar[0].children[1];
var observation_tab = navigation_bar[1].children[0];
var movable_parent = document.getElementsByClassName('movable_parent')[0];

question_tab.onclick = function () {
   buttonAudio_Click.play();
   buttonAudio_Click.playbackRate = 1.5;
   movable_parent.style = "left: -1080px;";
}

observation_tab.onclick = function () {
   buttonAudio_Click.play();
   buttonAudio_Click.playbackRate = 1.5;
   movable_parent.style = "left: 0px";
}

//water and honey top, overlayer declearation
var water_top = document.getElementsByClassName("water_top");
var water_overlayer = document.getElementsByClassName('water_overlayer');
var honey_top = document.getElementsByClassName("honey_top");
var honey_overlayer = document.getElementsByClassName('honey_overlayer');

//Next Button
var next_button = document.getElementsByClassName("next_button")[0];
next_button.onclick = function () {
   buttonAudio_Click.play();
   buttonAudio_Click.playbackRate = 1.5;
   movable_parent.style = "left: -1080px;";
}


var input_slider = document.getElementById("myrange");
var slide_value = document.getElementsByClassName("slider_value")[0];
// console.log(slide_value);
var ball_slider = document.getElementById("new_range");
var water_slider = document.getElementById("water_density");
var density_water = water_slider.value;
var honey_slider = document.getElementById("honey_density");
var density_honey = honey_slider.value;

// Update the input slider value (each time you drag the slider handle)
input_slider.oninput = function () {
   sliderAudio_oninput.play();
   sliderAudio_oninput.playbackRate = 1.5;
   this.innerHTML = this.value;
   update_slider();

}

input_slider.onchange = function () {
   sliderAudio_onchange.play();
   sliderAudio_onchange.playbackRate = 1.5;
}
update_slider();
// Update the ball slider value
function update_slider() {
   ball_slider.value = input_slider.value;
   ball_slider.oninput = function () {
      this.innerHTML = this.value;
   }
   color_change();
}

color_change();
//Update the color of slider bar
function color_change() {
   var new_value = ball_slider.value;
   var color = (new_value - 500) / 15;
   var n = color.toString();
   ball_slider.style.background = "linear-gradient(90deg, #E1BC27 " + n + "%, #677B97 " + n + "%) ";
   update_relative_density();
}

/* To check wheather the ball is sinked or just submerged */
var water_ball_sinked = undefined;
var honey_ball_sinked = undefined;

update_relative_density();

function update_relative_density() {
   //Update the position of the water ball
   var remarks = document.getElementById("para");
   var density_ball = ball_slider.value;
   var relative_water = density_ball / density_water;
   var immersed_water = relative_water * 60;
   var water_ball = document.getElementsByClassName("in_water");

   if (input_slider.value > 980 && input_slider.value < 1020) {
      // input_slider.value = 1000;
      input_slider.step = 100;
   }
   else if (input_slider.value > 1400 && input_slider.value < 1440) {
      input_slider.step = 92;
   }
   else {
      input_slider.step = 1;
   }

   if (density_ball <= parseInt(density_water)) {
      water_ball[0].style.transition = " top 1.1s";
      top_water = 275 + immersed_water / 2;
      water_ball[0].style.top = top_water.toString() + 'px';
      water_top[0].style.top = (318 - immersed_water / 2).toString() + 'px';

      water_overlayer[0].style.setProperty("--scaleYval", (1 + (immersed_water - 30) / 30 * 0.1399));

   }
   else {
      water_ball[0].style.transition = " top 1.5s";
      water_ball[0].style.top = "365px";
   }

   // Update the position of the honey ball
   var relative_honey = density_ball / density_honey;
   var immersed_honey = relative_honey * 60;
   var honey_ball = document.getElementsByClassName("in_honey");

   if (density_ball <= parseInt(density_honey)) {
      honey_ball[0].style.transition = " top 1.5s";
      top_honey = 265 + immersed_honey / 2;
      honey_ball[0].style.top = top_honey.toString() + 'px';
      honey_top[0].style.top = (315 - immersed_honey / 2).toString() + 'px';
      honey_overlayer[0].style.setProperty("--scaleYval", (1 + (immersed_water - 30) / 30 * 0.106));
   }
   else {
      honey_ball[0].style.transition = " top 2s";
      honey_ball[0].style.top = "365px";
   }


   /* To check wheather the ball is sinked or just submerged */
   
   if (input_slider.value < parseInt(density_water)) {
      water_ball_sinked = false;
      honey_ball_sinked = false;

   }
   else if (input_slider.value > parseInt(density_honey)) {
      water_ball_sinked = true;
      honey_ball_sinked = true;
   }
   else if (input_slider.value > parseInt(density_water) && input_slider.value < parseInt(density_honey)) {
      water_ball_sinked = true;
      honey_ball_sinked = false;
   }



   /* Area for all feedback messages */
   if (input_slider.value < parseInt(density_water)) {
      remarks.innerText = "Notice that the ball floats in both water and honey because of the density difference.";

   }
   else if (input_slider.value > parseInt(density_water) && input_slider.value < parseInt(density_honey)) {
      remarks.innerText = "Notice that the ball sinks in water but floats in honey because of the density difference.";
   }

   else if (input_slider.value == parseInt(density_water) && water_ball_sinked == false) {

      remarks.innerText = "The density of the ball is less than that of honey and equal to that of water. Hence, it floats on honey but just submerges in water.";

   }
   else if (input_slider.value == parseInt(density_water) && water_ball_sinked == true) {

      remarks.innerText = "The density of water and the ball is equal. Since there is no force acting on it, the ball stays at its previous position.";

   }

   else if (input_slider.value == parseInt(density_honey) && honey_ball_sinked == false) {

      remarks.innerText = "The density of ball is greater than that of water and equal to that of honey. Hence, it sinks in water but just submerges in honey.";
   }
   else if (input_slider.value == parseInt(density_honey) && honey_ball_sinked == true) {

      remarks.innerText = "The density of honey and the ball is equal. Since there is no force acting on the ball, it stays at its previous position.";
   }
   else {
      remarks.innerText = "Notice that the ball sinks both in water and  honey because of the density difference.";
   }
   update_value();
}

update_value();
function update_value() {
   slide_value.textContent = input_slider.value;
   slide_value.style.left = (((94 / 1500) * (input_slider.value - 500)) + 3.1).toString() + "%";

   // console.log(slide_value.style.left);
}

/*... for showing the feedback message...
function paragraph_show()
{
var remarks = document.getElementById("para");
if (input_slider.value <= parseInt(density_water))
{

 remarks.innerText = "The density of ball is less than that of water and honey, hence it floats on both the liquids.";

}
 else if (input_slider.value >= parseInt(density_water) && density_ball <= parseInt(density_honey))
   {
    remarks.innerText = "The density of ball is greater than that of water and lesser than that of honey, hence it floats on honey and sinks in water.";
   }
else {
   remarks.innerText = "The density of ball is greater than that of water and honey, hence it sinks in both the liquids.";}
}*/