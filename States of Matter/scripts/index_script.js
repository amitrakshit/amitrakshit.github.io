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

function next_instruction() {
  buttonAudio_Click.play();
  buttonAudio_Click.playbackRate = 3;
  movable_parent.style = "left: -1080rem;";
  observation_tab.classList.remove('nav_selected');
  question_tab.classList.add('nav_selected2');
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var visual_div = document.getElementsByClassName("visual_area")[0];

var canvas = document.getElementById("mycanvas");
var c = canvas.getContext("2d");


canvas.width = (window.getComputedStyle(visual_div).width.slice(0, -2));
canvas.height = 1.1 * ((window.getComputedStyle(visual_div).height.slice(0, -2)));


var label_top = document.getElementsByClassName("label_matter")[0];
var temp_change = document.getElementById("temp_change");
var slider_control = document.getElementsByClassName("temp_slider")[0];

var min_temp = document.getElementsByClassName("min_temp")[0];
var max_temp = document.getElementsByClassName("max_temp")[0];
var label = document.getElementsByClassName("label")[0];

var marker_1 = document.getElementsByClassName("marker")[0];
var marker_2 = document.getElementsByClassName("marker")[1];



var sound_onchange = document.getElementById("slider_onchange");

var solid_button = document.getElementsByClassName("Solid")[0];
var liquid_button = document.getElementsByClassName("Liquid")[0];
var gas_button = document.getElementsByClassName("Gas")[0];

var feedback_box = document.getElementsByClassName("feedback_bar")[0];
var next_button = document.getElementsByClassName("next_button")[0];
var remarks = document.getElementById("message");

var solid_normal = document.getElementsByClassName("normal_ball")[0];
var solid_hot = document.getElementsByClassName("hot_ball")[0];
var solid_cold = document.getElementsByClassName("cold_ball")[0];

var water_normal = document.getElementsByClassName("normal_water")[0];
var water_hot = document.getElementsByClassName("hot_water")[0];
var water_cold = document.getElementsByClassName("cold_water")[0];

var gas_container = document.getElementsByClassName("gas_container")[0];

var zoom_box = document.getElementsByClassName("zoom_container")[0];

var normal_interior = document.getElementsByClassName("interior_normal")[0];
var hot_interior = document.getElementsByClassName("interior_hot")[0];
var cold_interior = document.getElementsByClassName("interior_cold")[0];


var scalar; var temp_mult_solid; var stop_animation; var last_value = 25; var ang = 0; var angle = 0; var animation_running = false; var plusx; var plusY; var temp_mult_liquid; var temp_mult_gas;
var temp_value = 25; var for_await = false; var solid_clicked = false;
temp_change.disabled = true;
slider_control.style.opacity = "0";
min_temp.style.opacity = "0";
max_temp.style.opacity = "0";
label.style.opacity = "0";

temp_change.oninput = async function () {
  this.innerHTML = this.value;
  temp_value = parseInt(this.value);
 

  if (gas_button.disabled == true) {

    gas_changes();

  }

  else if (liquid_button.disabled == true) {

    liquid_changes();

  }
  else if (solid_button.disabled == true) {
    solid_changes();
  }

  if (last_value <= temp_value) {

    if (gas_button.disabled == true || liquid_button.disabled == true) {




      if (temp_value == 55)
      { 
 feedback_box.style = "opacity:0; top: 60%;";
 feedback_box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)"
 setTimeout(() => {

   remarks.innerHTML = "On addition of heat, the energy of the particles increases and they start to move faster.";
   feedback_box.style = "opacity:1; top: 58.3%;";
   feedback_box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)";

 }, 300);
}

    
           else if (temp_value == 85)
           { 
      feedback_box.style = "opacity:0; top: 60%;";
      feedback_box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)"
      setTimeout(() => {

        remarks.innerHTML = "On adding heat, the energy of the particles increases, hence they move faster.";
        feedback_box.style = "opacity:1; top: 58.3%;";
        feedback_box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)";

      }, 300);
    }

        
        

         


     
      }
    

    else if (solid_button.disabled == true) {


      if (temp_value == 55) {


      

         
           
        feedback_box.style = "opacity:0; top: 60%;";
        feedback_box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)"
        setTimeout(() => {
  
          remarks.innerHTML = "On addition of heat, the energy of the particles increases and they start to vibrate faster.";
          feedback_box.style = "opacity:1; top: 58.3%;";
          feedback_box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)";
  
        }, 300);
  


        

       
        

      }


      else if (temp_value == 85) {





        
        feedback_box.style = "opacity:0; top: 60%;";
        feedback_box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)"
        setTimeout(() => {
  
  
          remarks.innerHTML = "On adding heat, the energy of the particles increases, hence they vibrate faster.";
          feedback_box.style = "opacity:1; top: 58.3%;";
          feedback_box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)";
  
        }, 300);
  
  

        

      
        }
      

    
    }


  }

  else {

    if (gas_button.disabled == true || liquid_button.disabled == true) {

           if (temp_value == 55) 
           {
      feedback_box.style = "opacity:0; top: 60%;";
      feedback_box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)"
      setTimeout(() => {

        remarks.innerHTML = "On removing heat, the energy of the particles decreases, hence they move slowly.";
        feedback_box.style = "opacity:1; top: 58.3%;";
        feedback_box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)";

      }, 300);

    }

        
    else if (temp_value == 25) 
    {
feedback_box.style = "opacity:0; top: 60%;";
feedback_box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)"
setTimeout(() => {

 remarks.innerHTML = "On removal of heat, the energy of the particles decreases, hence they move slowly.";
 feedback_box.style = "opacity:1; top: 58.3%;";
 feedback_box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)";

}, 300);

}     

        

    
    }



    else if (solid_button.disabled == true) {


      if (temp_value == 55) 

      {
      feedback_box.style = "opacity:0; top: 60%;";
      feedback_box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)"
      setTimeout(() => {


        remarks.innerHTML = "On removing heat, the energy of the particles decreases, hence they vibrate slowly.";
        feedback_box.style = "opacity:1; top: 58.3%;";
        feedback_box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)";

      }, 300);
    }

    else if (temp_value == 25)

{

  feedback_box.style = "opacity:0; top: 60%;";
  feedback_box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)"
  setTimeout(() => {


    remarks.innerHTML = "On removal of heat, the energy of the particles decreases, hence they vibrate slowly.";
    feedback_box.style = "opacity:1; top: 58.3%;";
    feedback_box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)";

  }, 300);

}
       

          


        

        
      
    


     
     
    }

  }

  last_value = temp_value;

}



temp_change.onchange = function () {
  sound_onchange.play();
 

}



function solid_outline() {

  solid_button.style.border = "3rem solid #FFFFFF";
}
function solid_remove() {
  solid_button.style.border = "none";
}
function liquid_outline() {

  liquid_button.style.border = "3rem solid #FFFFFF";
}
function liquid_remove() {
  liquid_button.style.border = "none";
}
function gas_outline() {
  gas_button.style.border = "3rem solid #FFFFFF";
}
function gas_remove() {
  gas_button.style.border = "none";
}

async function solid_instruction() {


  buttonAudio_Click.play();
 

  temp_change.value = "25";
  temp_value = parseInt(temp_change.value);
  last_value = 25;
 
  solid_button.disabled = true; liquid_button.disabled = false; gas_button.disabled = false;
  solid_button.style.border = "3rem solid #FFFFFF"; liquid_button.style.border = "none"; gas_button.style.border = "none";
  water_normal.style.opacity = "0"; water_normal.style.transition = "1s opacity";
  water_hot.style.opacity = "0"; water_hot.style.transition = "1s opacity";
  water_cold.style.opacity = "0"; water_cold.style.transition = "1s opacity";
  gas_container.style.opacity = "0"; gas_container.style.transition = "1s opacity";
  solid_cold.style.display = "inline"; solid_cold.style.transition = "1s display";

  normal_interior.style.opacity = "0"; normal_interior.style.transition = "1s opacity";
  hot_interior.style.opacity = "0"; hot_interior.style.transition = "1s opacity";
  cold_interior.style.opacity = "0.5"; cold_interior.style.transition = "1s opacity";
  solid_normal.style.opacity = "0.33"; solid_normal.style.transition = "1s opacity";

  solid_cold.style.opacity = "0.5"; solid_cold.style.transition = "1s opacity";




  if (for_await == false) {
    for_await = true;

    zoom_box.style.opacity = "1"; zoom_box.style.transition = "1s opacity";
    await sleep(1000);

  }
label_top.innerText = "Particles of Solid";
  temp_change.disabled = false;
  slider_control.style.opacity = "1"; slider_control.style.transition = "1s opacity";
  min_temp.style.opacity = "1"; min_temp.style.transition = "1s opacity";
  max_temp.style.opacity = "1"; max_temp.style.transition = "1s opacity";
  label.style.opacity = "1"; label.style.transition = "1s opacity";
  

  solid_changes();
  setup();
  if (animation_running == false) {
    animation_running = true;
    animate();
  }


      
  feedback_box.style = "opacity:0; top: 60%;";
  feedback_box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)"
  setTimeout(() => {

    remarks.innerHTML = "Due to the strong force of attraction, solid particles show very less movement." + "<br>" + "<b>" + "Move the slider to add and remove heat." + "</b>";
    feedback_box.style = "opacity:1; top: 58.3%;";
    feedback_box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)";

  }, 300);
 


}

async function liquid_instruction() {

  buttonAudio_Click.play();


  cold_interior.style.opacity = "0.5"; cold_interior.style.transition = "1s opacity";

  water_cold.style.opacity = "1"; water_cold.style.transition = "1s opacity";

  if (for_await == false) {
    for_await = true;

    zoom_box.style.opacity = "1"; zoom_box.style.transition = "1s opacity";
    await sleep(1000);

  }
  
  solid_button.click();
  label_top.innerText = "Particles of Liquid";

  solid_cold.style.display = "none";



  temp_change.value = "25";
  temp_value = parseInt(temp_change.value);
  last_value = 25;
 

  liquid_button.disabled = true; solid_button.disabled = false; gas_button.disabled = false;
  liquid_button.style.border = "3rem solid #FFFFFF"; gas_button.style.border = "none"; solid_button.style.border = "none";

  normal_interior.style.opacity = "0"; normal_interior.style.transition = "1s opacity";
  hot_interior.style.opacity = "0"; hot_interior.style.transition = "1s opacity";
  cold_interior.style.opacity = "0.5"; cold_interior.style.transition = "1s opacity";


  water_cold.style.opacity = "1"; water_cold.style.transition = "1s opacity";
  solid_normal.style.opacity = "0"; solid_normal.style.transition = "1s opacity";
  solid_cold.style.opacity = "0"; solid_cold.style.transition = "1s opacity";
  solid_hot.style.opacity = "0"; solid_hot.style.transition = "1s opacity";
  gas_container.style.opacity = "0"; gas_container.style.transition = "1s opacity";

  temp_change.disabled = false;
  slider_control.style.opacity = "1"; slider_control.style.transition = "1s opacity";
  min_temp.style.opacity = "1"; min_temp.style.transition = "1s opacity";
  max_temp.style.opacity = "1"; max_temp.style.transition = "1s opacity";
  label.style.opacity = "1"; label.style.transition = "1s opacity";
 





 
  liquid_changes();

  setup();

  if (animation_running == false) {

    animation_running = true;
    animate();
  }


  feedback_box.style = "opacity:0; top: 60%;";
  feedback_box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)"
  setTimeout(() => {

    remarks.innerHTML = "As compared to solids, liquid particles are spaced apart and show a lot of movement." + "<br>" + "<b>" + "Move the slider to add and remove heat." + "</b>";
    feedback_box.style = "opacity:1; top: 58.3%;";
    feedback_box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)";

  }, 300);
 


  
 




}
async function gas_instruction() {

  buttonAudio_Click.play();



  cold_interior.style.opacity = "0.5"; cold_interior.style.transition = "1s opacity";
  gas_container.style.opacity = "1"; gas_container.style.transition = "1s opacity";

  if (for_await == false) {
    for_await = true;

    zoom_box.style.opacity = "1"; zoom_box.style.transition = "1s opacity";
    await sleep(1000);
  }
  

  solid_button.click();
  label_top.innerText = "Particles of Gas";
  solid_cold.style.display = "none";


  temp_change.value = "25";
  temp_value = parseInt(temp_change.value);
  last_value = 25;
 
  gas_button.disabled = true; liquid_button.disabled = false; solid_button.disabled = false;
  gas_button.style.border = "3rem solid #FFFFFF"; solid_button.style.border = "none"; liquid_button.style.border = "none";

  normal_interior.style.opacity = "0"; normal_interior.style.transition = "1s opacity";
  cold_interior.style.opacity = "0.5"; cold_interior.style.transition = "1s opacity";
  hot_interior.style.opacity = "0"; hot_interior.style.transition = "1s opacity";

  gas_container.style.opacity = "1"; gas_container.style.transition = "1s opacity";
  solid_normal.style.opacity = "0"; solid_normal.style.transition = "1s opacity";
  solid_cold.style.opacity = "0"; solid_cold.style.transition = "1s opacity";
  solid_hot.style.opacity = "0"; solid_hot.style.transition = "1s opacity";
  water_normal.style.opacity = "0"; water_normal.style.transition = "1s opacity";
  water_cold.style.opacity = "0"; water_cold.style.transition = "1s opacity";
  water_hot.style.opacity = "0"; water_hot.style.transition = "1s opacity";

  temp_change.disabled = false;
  slider_control.style.opacity = "1"; slider_control.style.transition = "1s opacity";
  min_temp.style.opacity = "1"; min_temp.style.transition = "1s opacity";
  max_temp.style.opacity = "1"; max_temp.style.transition = "1s opacity";
  label.style.opacity = "1"; label.style.transition = "1s opacity";
 
  solid_cold.style.opacity = "0";







 

  gas_changes();
  setup();

  if (animation_running == false) {
    animation_running = true;
    animate();
  }





  feedback_box.style = "opacity:0; top: 60%;";
  feedback_box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)"
  setTimeout(() => {

    remarks.innerHTML = "As compared to solids & liquids, gas particles are much farther apart and move at much higher speeds." + "<br>" + "<b>" + "Move the slider to add and remove heat." + "</b>";
    feedback_box.style = "opacity:1; top: 58.3%;";
    feedback_box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)";

  }, 300);
  
  



}





function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

var particles_num;

function solid_changes() {



  if (temp_value % 7 == 0) { temp_value += 1; }

  else if ((temp_value - 3) % 7 == 0) {

    temp_value -= 1;
  }
  if (temp_value <= 55) {


    if (temp_value == 25)
    {
    scalar = temp_value / 4;
    plusx = temp_value / 100;
    plusY = temp_value / 5000;
    }

    else if (temp_value == 55)
    {
    scalar = temp_value / 6;
    plusx = temp_value / 100;
    plusY = temp_value / 5000;
    }

    

    temp_mult_solid = (55 - temp_value) * (1 / 30);
    solid_normal.style.opacity = 1 - temp_mult_solid / 1.5;
    solid_cold.style.opacity = temp_mult_solid / 2;
    solid_hot.style.opacity = "0";

    normal_interior.style.opacity = 1 - temp_mult_solid;
    cold_interior.style.opacity = temp_mult_solid / 2;
    hot_interior.style.opacity = "0";

  }
  else {

    // if (temp_value == 82) { temp_value += 1; }
    // else if (temp_value == 75) { temp_value += 1; }
    // else if (temp_value == 69 || temp_value == 70 || temp_value == 71) { temp_value = 68; }
    // else if (temp_value == 65 || temp_value == 66 || temp_value == 67 || temp_value == 61) { temp_value = 64; }

    scalar = temp_value / 5;
    plusx = temp_value / 70;
    plusY = temp_value / 3500;

    temp_mult_solid = (temp_value - 55) * (1 / 30);

    solid_cold.style.opacity = "0";
    solid_normal.style.opacity = 1 - temp_mult_solid / 1.5;
    solid_hot.style.opacity = temp_mult_solid / 2;

    cold_interior.style.opacity = "0";
    normal_interior.style.opacity = 1 - temp_mult_solid;
    hot_interior.style.opacity = temp_mult_solid / 2;
  }

}

function liquid_changes() {



  particles_num = 200;

 
  if (temp_value <= 55) {

    if (temp_value == 25)
    {scalar = temp_value / 3;}
    else if (temp_value == 55)
    {scalar = temp_value / 3.5;}
   
    temp_mult_liquid = (55 - temp_value) * (1 / 30);
    water_normal.style.opacity = 1 - temp_mult_liquid;
    water_cold.style.opacity = temp_mult_liquid;
    normal_interior.style.opacity = 1 - temp_mult_liquid;
    cold_interior.style.opacity = temp_mult_liquid / 2;
    hot_interior.style.opacity = "0";
    water_hot.style.opacity = "0";

  }
  else {

    scalar = temp_value / 3;
    temp_mult_liquid = (temp_value - 55) * (1 / 30);
    water_normal.style.opacity = 1 - temp_mult_liquid;
    water_hot.style.opacity = temp_mult_liquid;
    normal_interior.style.opacity = 1 - temp_mult_liquid;
    hot_interior.style.opacity = temp_mult_liquid / 2;
    cold_interior.style.opacity = "0";
    water_cold.style.opacity = "0";

  }

}


function gas_changes() {

  particles_num = 75;

  
  if (temp_value <= 55) {

    if (temp_value == 25)
    {scalar = temp_value / 1.5;}
    else if (temp_value == 55)
    {scalar = temp_value / 2;}

    
    temp_mult_gas = (55 - temp_value) * (1 / 30);
    normal_interior.style.opacity = 1 - temp_mult_gas;
    cold_interior.style.opacity = temp_mult_gas / 2;
    hot_interior.style.opacity = "0";
  }
  else {

    scalar = temp_value / 2;
    temp_mult_gas = (temp_value - 55) * (1 / 30);
    normal_interior.style.opacity = 1 - temp_mult_gas;
    hot_interior.style.opacity = temp_mult_gas / 2;
    cold_interior.style.opacity = "0";
  }



}










class particle {

  constructor(x, y, radius, color) {


    this.posX = x;
    this.posY = y;

    this.x = x;
    this.y = y;
    this.velocity = {
      x: (Math.random() - 0.5) * scalar,
      y: (Math.random() - 0.5) * scalar
    };
    this.radius = radius;
    this.color = color;
    this.mass = 1;
    this.phase = 100 * (Math.random()) * Math.PI;

  }

  draw() {


    var color = this.color;
    color = c.createRadialGradient(this.x, this.y, this.radius / 3, this.x, this.y, this.radius);
    color.addColorStop(0, '#FFFAFA');
    color.addColorStop(0.9, '#808080');



    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = color;
    c.stroke();
    c.fill();
    c.closePath();


  }

  draw_solid() {


    var color = this.color;
    color = c.createRadialGradient(this.posX, this.posY, this.radius / 3, this.posX, this.posY, this.radius);
    color.addColorStop(0, '#FFFAFA');
    color.addColorStop(0.9, '#808080');

    c.beginPath();
    c.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = color;
    c.stroke();
    c.fill();
    c.closePath();
  }

  update() {



    for (let i = 0; i < particles.length; i++) {
      if (this === particles[i]) {
        continue;
      }
      else if (distance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0) {


        if (solid_button.disabled == true) {
          continue;

        }

        else {
          checkCollision(this, particles[i]);
        }





      }
    }


    if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) { this.velocity.x = - this.velocity.x; }
    if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) { this.velocity.y = - this.velocity.y; }

    if (solid_button.disabled == true) {

      angle += plusx;
      ang += plusY;
      this.posX = this.x;
      this.posY = this.y;
      this.posX += 0.1 * scalar * Math.sin(this.phase * 7 + angle);
      this.posY += 0.07 * scalar * Math.sin(this.phase * 7 + ang);
      this.draw_solid();
    }
    else {
      this.x += 0.1 * scalar * this.velocity.x;
      this.y += 0.1 * scalar * this.velocity.y;
      this.draw();
    }
  }
}





function setup() {

  particles = [];

  if (solid_button.disabled == true) {

    for (let i = 0; i < 15; i++) {
      const radius = canvas.height / 35;
      let x = 2 * radius + 2.3 * i * radius;

      for (j = 0; j < 15; j++) {
        let y = 3 * radius + 2.3 * j * radius;
        var color = c.createRadialGradient(x, y, radius / 3, x, y, radius);
        color.addColorStop(0, '#FFFAFA');
        color.addColorStop(0.9, '#808080');
        particles.push(new particle(x, y, radius, color));
      }
    }
  }
  else {

    for (let i = 0; i < particles_num; i++) {
      const radius = canvas.height / 35;
      let x = randomIntFromRange(radius, canvas.width - radius);
      let y = randomIntFromRange(radius, canvas.height - radius);
      var color = c.createRadialGradient(x, y, radius / 3, x, y, radius);
      color.addColorStop(0, '#FFFAFA');
      color.addColorStop(0.9, '#808080');
      particles.push(new particle(x, y, radius, color));

    }
  }
}

async function animate() {

  while (animation_running == true) {

    await sleep(60);
    c.clearRect(0, 0, canvas.width, canvas.height);



    particles.forEach(particle => particle.update(particles));
  }
}






function rotate(velocity, angle) {

  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };

  return rotatedVelocities;
}



function checkCollision(particle, otherParticle) {
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  const xDiff = otherParticle.x - particle.x;
  const yDiff = otherParticle.y - particle.y;


  if (xVelocityDiff * xDiff + yVelocityDiff * yDiff >= 0) {


    const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);




    const u1 = rotate(particle.velocity, angle);
    const u2 = rotate(otherParticle.velocity, angle);


    const v1 = { x: u2.x, y: u1.y };
    const v2 = { x: u1.x, y: u2.y };


    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);


    particle.velocity.x = vFinal1.x;
    particle.velocity.y = vFinal1.y;

    otherParticle.velocity.x = vFinal2.x;
    otherParticle.velocity.y = vFinal2.y;
  }
}


