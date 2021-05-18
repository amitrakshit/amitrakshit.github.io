var input_slider = document.getElementById("myrange");
var ball_slider = document.getElementById("new_range");
var water_slider = document.getElementById("water_density");
var density_water = water_slider.value;
var honey_slider = document.getElementById("honey_density");
var density_honey = honey_slider.value;
// Update the input slider value (each time you drag the slider handle)
input_slider.oninput = function() 
{
  this.innerHTML = this.value;
  update_slider();
}
update_slider();

// Update the ball slider value
function update_slider ()
{
ball_slider.value = input_slider.value;
ball_slider.oninput = function()
{
    this.innerHTML = this.value;
}
   color_change();
   update_relative_density();
}
   //Update the color of slider bar
     function color_change()
   {
    var new_value = ball_slider.value;
    var color = (new_value-500)/15;
    var n = color.toString();
    ball_slider.style.background = "linear-gradient(90deg, #E1BC27 " + n + "%, #677B97 " + n + "%) " ; 
    
   }
update_relative_density();

   function update_relative_density()
   {
      //Update the position of the water ball
   
   var density_ball = ball_slider.value;
   var relative_water = density_ball/density_water;
   var immersed_water = relative_water*60;
   var water_ball = document.getElementsByClassName("in_water");
   
   if (density_ball <= parseInt(density_water))
   { 
   top_water = 280 + immersed_water;
   water_ball[0].style.top = top_water.toString() + 'px';
   }
   else
   {
      water_ball[0].style.transition = " top 2s" ;
      water_ball[0].style.top =  "379px";
   }
   


   // Update the position of the honey ball
   var relative_honey = density_ball/density_honey;
   var immersed_honey = relative_honey*60;
   var honey_ball = document.getElementsByClassName("in_honey");
   if (density_ball <= parseInt(density_honey))
   {
   top_honey = 280 + immersed_honey;
   honey_ball[0].style.top = top_honey.toString() + 'px';
   }
   else
   { 
      honey_ball[0].style.transition = " top 2s" ;
      honey_ball[0].style.top =  "379px";
   }
   
}