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

var canvas = document.getElementById("mycanvas");
var c = canvas.getContext("2d");

var small_canvas = document.getElementById("liquid_canvas");
var liquid_particle = small_canvas.getContext("2d");

var smallest_canvas = document.getElementById("solid_canvas");
var solid_particle = smallest_canvas.getContext("2d");

var temp_change = document.getElementById("temp_change");
var slider_control = document.getElementsByClassName("temp_slider")[0];

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


var scalar; var temp_mult; var stop_animation; var cancel_animation;

temp_change.disabled = true;
slider_control.style.opacity = "0.3";

temp_change.oninput = function () {
  this.innerHTML = this.value;

  feedback_box.style.opacity = "0";
  feedback_box.style.transition = "opacity 2s";


  zoom_into();


  // else if (solid_button.disabled == true)
  // {zoom_into_solid();}
}

temp_change.onchange = function () {
  sound_onchange.play();
  feedback_box.style.opacity = "1.0";
  feedback_box.style.transition = "opacity 2s";



  if (gas_button.disabled == true) {
    if (temp_change.value <= 55) {
      remarks.innerText = "Due to minimal force of attraction between the particles, gas particles are very far from each other and thus occupy the whole space of the container.";
    }


    else if (temp_change.value > 55 && temp_change.value <= 70) {

      remarks.innerText = "On increasing the temperature, kinetic energy of the particles increases and thus the movement speed of particles also increases.";

    }

    else if (temp_change.value >= 70 && temp_change.value <= 85) {

      remarks.innerText = "On further increase in temperature, the movement and vibration of particles becomes even more vigorous.";
    }
  }

  else if (liquid_button.disabled == true) {
    if (temp_change.value <= 55) {
      remarks.innerText = "Due to low force of attraction, liquid particles are spaced apart from each other and show a lot of movement.";
    }


    else if (temp_change.value > 55 && temp_change.value <= 70) {

      remarks.innerText = "Increasing the temperature increases the movement speed and vibration of the particles due to increase in kinetic energy.";

    }

    else if (temp_change.value >= 70 && temp_change.value <= 85) {

      remarks.innerText = "On further increase in temperature, the movement and vibration of particles becomes even more vigorous.";
    }
  }

  else if (solid_button.disabled == true) {

    if (temp_change.value <= 55) {
      remarks.innerText = " Due to very high force of attraction, solid particles show very less movement and stick close to each other.";
    }


    else if (temp_change.value > 55 && temp_change.value <= 70) {

      remarks.innerText = "On increasing the temperature, kinetic energy of the particles increases and thus the movement of particles also increases.";

    }

    else if (temp_change.value >= 70 && temp_change.value <= 85) {

      remarks.innerText = "On further increase in temperature, the movement and vibration of particles becomes even more vigorous.";
    }
  }
  next_button.style.top = "1717rem";
  next_button.style.transition = "top 1s";
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



  feedback_box.style.opacity = "0";
  feedback_box.style.transition = "opacity 2s";

  temp_change.value = "55";

  solid_button.disabled = true; liquid_button.disabled = false; gas_button.disabled = false;
  solid_button.style.border = "3rem solid #FFFFFF"; liquid_button.style.border = "none"; gas_button.style.border = "none";


  normal_interior.style.opacity = "1"; normal_interior.style.transition = "1s opacity";
  hot_interior.style.opacity = "0"; hot_interior.style.transition = "1s opacity";
  cold_interior.style.opacity = "0"; cold_interior.style.transition = "1s opacity";

  solid_normal.style.opacity = "1"; solid_normal.style.transition = "1s opacity";
  water_normal.style.opacity = "0"; water_normal.style.transition = "1s opacity";
  water_hot.style.opacity = "0"; water_hot.style.transition = "1s opacity";
  water_cold.style.opacity = "0"; water_cold.style.transition = "1s opacity";
  gas_container.style.opacity = "0"; gas_container.style.transition = "1s opacity";

  await sleep(1000);
  zoom_box.style.opacity = "1"; zoom_box.style.transition = "1s opacity";

  await sleep(1000);

  temp_change.disabled = false;
  slider_control.style.opacity = "1"; slider_control.style.transition = "1s opacity";

  zoom_into();

  feedback_box.style.opacity = "1.0";
  feedback_box.style.transition = "opacity 2s";
  remarks.innerText = " Due to very high force of attraction, solid particles show very less movement and stick close to each other.";


}

async function liquid_instruction() {



  feedback_box.style.opacity = "0";
  feedback_box.style.transition = "opacity 2s";


  temp_change.value = "55";

  liquid_button.disabled = true; solid_button.disabled = false; gas_button.disabled = false;
  liquid_button.style.border = "3rem solid #FFFFFF"; gas_button.style.border = "none"; solid_button.style.border = "none";

  normal_interior.style.opacity = "1"; normal_interior.style.transition = "1s opacity";
  hot_interior.style.opacity = "0"; hot_interior.style.transition = "1s opacity";
  cold_interior.style.opacity = "0"; cold_interior.style.transition = "1s opacity";


  water_normal.style.opacity = "1"; water_normal.style.transition = "1s opacity";
  solid_normal.style.opacity = "0"; solid_normal.style.transition = "1s opacity";
  solid_cold.style.opacity = "0"; solid_cold.style.transition = "1s opacity";
  solid_hot.style.opacity = "0"; solid_hot.style.transition = "1s opacity";
  gas_container.style.opacity = "0"; gas_container.style.transition = "1s opacity";

  await sleep(1000);
  zoom_box.style.opacity = "1"; zoom_box.style.transition = "1s opacity";

  cancelAnimationFrame(stop_animation);
  c.clearRect(0, 0, canvas.width, canvas.height);

  await sleep(1000);

  temp_change.disabled = false;
  slider_control.style.opacity = "1"; slider_control.style.transition = "1s opacity";

  zoom_into();

  feedback_box.style.opacity = "1.0";
  feedback_box.style.transition = "opacity 2s";
  remarks.innerText = "Due to low force of attraction, liquid particles are spaced apart from each other and show a lot of movement.";



}
async function gas_instruction() {



  feedback_box.style.opacity = "0";
  feedback_box.style.transition = "opacity 2s";

  temp_change.value = "55";

  gas_button.disabled = true; liquid_button.disabled = false; solid_button.disabled = false;
  gas_button.style.border = "3rem solid #FFFFFF"; solid_button.style.border = "none"; liquid_button.style.border = "none";

  normal_interior.style.opacity = "1"; normal_interior.style.transition = "1s opacity";
  cold_interior.style.opacity = "0"; cold_interior.style.transition = "1s opacity";
  hot_interior.style.opacity = "0"; hot_interior.style.transition = "1s opacity";

  gas_container.style.opacity = "1"; gas_container.style.transition = "1s opacity";
  solid_normal.style.opacity = "0"; solid_normal.style.transition = "1s opacity";
  solid_cold.style.opacity = "0"; solid_cold.style.transition = "1s opacity";
  solid_hot.style.opacity = "0"; solid_hot.style.transition = "1s opacity";
  water_normal.style.opacity = "0"; water_normal.style.transition = "1s opacity";
  water_cold.style.opacity = "0"; water_cold.style.transition = "1s opacity";
  water_hot.style.opacity = "0"; water_hot.style.transition = "1s opacity";



  await sleep(1000);

  zoom_box.style.opacity = "1"; zoom_box.style.transition = "1s opacity";

  await sleep(1000);

  temp_change.disabled = false;
  slider_control.style.opacity = "1"; slider_control.style.transition = "1s opacity";

  zoom_into();

  feedback_box.style.opacity = "1.0";
  feedback_box.style.transition = "opacity 2s";
  remarks.innerText = "Due to minimal force of attraction between the particles, gas particles are very far from each other and thus occupy the whole space of the container.";


}





// functions
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

  if (temp_change.value <= 55) {
    particles_num = 45;
    scalar = temp_change.value / 12;
    temp_mult = (55 - temp_change.value) * 1 / 30;
    solid_normal.style.opacity = 1 - temp_mult;
    solid_cold.style.opacity = temp_mult;
    normal_interior.style.opacity = 1 - temp_mult;
    cold_interior.style.opacity = temp_mult;
  }
  else {
    particles_num = 30;
    scalar = temp_change.value / 15;
    temp_mult = (temp_change.value - 55) * 1 / 30;
    solid_normal.style.opacity = 1 - temp_mult;
    solid_hot.style.opacity = temp_mult;
    normal_interior.style.opacity = 1 - temp_mult;
    hot_interior.style.opacity = temp_mult;
  }
}

function liquid_changes() {

  if (temp_change.value <= 55) {
    particles_num = 200;
    scalar = temp_change.value / 10;
    temp_mult = (55 - temp_change.value) * 1 / 30;
    water_normal.style.opacity = 1 - temp_mult;
    water_cold.style.opacity = temp_mult;
    normal_interior.style.opacity = 1 - temp_mult;
    cold_interior.style.opacity = temp_mult;
  }
  else {
    particles_num = 150;
    scalar = temp_change.value / 10;
    temp_mult = (temp_change.value - 55) * 1 / 30;
    water_normal.style.opacity = 1 - temp_mult;
    water_hot.style.opacity = temp_mult;
    normal_interior.style.opacity = 1 - temp_mult;
    hot_interior.style.opacity = temp_mult;
  }
}


function gas_changes() {

  if (temp_change.value <= 55) {
    particles_num = 50;
    scalar = temp_change.value / 4;
    temp_mult = (55 - temp_change.value) * 1 / 30;
    normal_interior.style.opacity = 1 - temp_mult;
    cold_interior.style.opacity = temp_mult;
  }
  else {
    particles_num = 40;
    scalar = temp_change.value / 2;
    temp_mult = (temp_change.value - 55) * 1 / 30;
    normal_interior.style.opacity = 1 - temp_mult;
    hot_interior.style.opacity = temp_mult;
  }
}


function zoom_into() {




  if (gas_button.disabled == true) {
    gas_changes();

  }

  else if (liquid_button.disabled == true) {

    liquid_changes();

  }
  else if (solid_button.disabled == true) {
    solid_changes();
  }



  class particle {
    constructor(x, y, radius, color) {
      this.x = x;
      this.y = y;
      if (solid_button.disabled == true) {


        this.velocity = {
          x: (Math.random() - 0.5) * scalar,
          y: (Math.random() - 0.5) * scalar / 40
        };

      }
      else {
        this.velocity = {
          x: (Math.random() - 0.5) * scalar,
          y: (Math.random() - 0.5) * scalar
        };
      }
      this.radius = radius;
      this.color = color;
      this.mass = 1;
    }

    draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
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




          checkCollision(this, particles[i]);




        }
      }

      if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) { this.velocity.x = - this.velocity.x; }
      if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) { this.velocity.y = - this.velocity.y; }
      this.x += this.velocity.x;
      this.y += this.velocity.y;

      this.draw();
    }
  }


  let particles;

  function setup() {

    particles = [];

    if (solid_button.disabled == true) {

      for (let i = 0; i < particles_num; i++) {
        const radius = canvas.height / 30;
        let x = radius + 2.5 * i * radius;

        for (j = 0; j < 15; j++) {
          let y = radius + 2 * j * radius;
          const color = "rgb(173, 169, 169)";
          particles.push(new particle(x, y, radius, color));
        }
      }
    }
    else {

      for (let i = 0; i < particles_num; i++) {
        const radius = canvas.height / 30;
        let x = randomIntFromRange(radius, canvas.width - radius);
        let y = randomIntFromRange(radius, canvas.height - radius);
        const color = "rgb(173, 169, 169)";
        particles.push(new particle(x, y, radius, color));

      }
    }
  }


  function animate() {
    stop_animation = requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => particle.update());
  }

  setup();
  animate();


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


