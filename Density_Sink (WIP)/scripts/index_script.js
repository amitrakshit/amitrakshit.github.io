// Following Code is use for adaptation of the device width and height
if (screen.width / screen.height < 9 / 16) {
   screenScaleRatio = 1080 / screen.width;
}
else{
   screenScaleRatio = 1920 / screen.height;
}
var metaData = document.getElementsByName('viewport');
metaData[0].content = "width=device-width, initial-scale=" + 1 / screenScaleRatio.toString();


// Following code is for question tab and observation tab transition
var navigation_bar = document.getElementsByClassName('navigation_bar');
var question_tab = navigation_bar[0].children[1];
var observation_tab = navigation_bar[1].children[0];
var movable_parent = document.getElementsByClassName('movable_parent')[0];
question_tab.onclick = function () {
   movable_parent.style = "left: -1080px;";
}

observation_tab.onclick = function () {
   movable_parent.style = "left: 0px";
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
   this.innerHTML = this.value;
   update_slider();
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

update_relative_density();

function update_relative_density() {
   //Update the position of the water ball

   var density_ball = ball_slider.value;
   var relative_water = density_ball / density_water;
   var immersed_water = relative_water * 60;
   var water_ball = document.getElementsByClassName("in_water");

   if (density_ball <= parseInt(density_water)) {
      top_water = 282 + immersed_water;
      water_ball[0].style.top = top_water.toString() + 'px';
   }
   else {
      water_ball[0].style.transition = " top 2s";
      water_ball[0].style.top = "365px";
   }

   // Update the position of the honey ball
   var relative_honey = density_ball / density_honey;
   var immersed_honey = relative_honey * 60;
   var honey_ball = document.getElementsByClassName("in_honey");
   if (density_ball <= parseInt(density_honey)) {
      top_honey = 282 + immersed_honey;
      honey_ball[0].style.top = top_honey.toString() + 'px';
   }
   else {
      honey_ball[0].style.transition = " top 2s";
      honey_ball[0].style.top = "365px";
   }
   update_value();
}
update_value();
function update_value() {
   slide_value.textContent = input_slider.value;
   slide_value.style.left = (((100 / 1600) * (input_slider.value - 500))+3).toString() + "%";
   // console.log(slide_value.style.left);
}