
// SFX files
var Right_ANS = new Audio();
Right_ANS.src = "sounds/Right_ANS.mp3";
var Wrong_ANS = new Audio();
Wrong_ANS.src = "sounds/Wrong_ANS.mp3";
var buttonAudio_Click = new Audio();
buttonAudio_Click.src = "sounds/buton_Click.mp3";

//Dynamic_panel
var scrollable_dynamic_panel = document.getElementsByClassName('scrollable_dynamic_panel')[0];
var dynamic_panel_window = document.getElementsByClassName('dynamic_panel_window')[0];

//question_area
var question_area = document.getElementsByClassName("question_area")[0];

//geting the feedback bar
var feedback_bar = document.getElementsByClassName('feedback-bar')[0];

//geting the options into account
var option_container = document.getElementsByClassName("option-container")[0];
var options = document.getElementsByClassName("options");

//solution and footer
var solution = document.getElementsByClassName('solution')[0];
var footer = document.getElementsByTagName('footer')[0];

//changing the parameters of the options and other
var solution_clicked = false;
var which_button_clicked = 1;
for (let index = 0; index < options.length; index++) {
    options[index].onclick = function () {
        if (this.title == "solution" && solution_clicked == false) {
            options[which_button_clicked - 1].style = "background: white; color: black;"
            solution_clicked = true;
            feedback_bar.style.opacity = "1";
            feedback_bar.children[0].style = "color: #8DD43E;";
            feedback_bar.children[0].innerHTML = "Well Done!";
            feedback_bar.children[1].style = "color: #8DD43E;";
            feedback_bar.children[1].innerHTML = "You got the correct answer!";
            this.style = "background:linear-gradient(180deg, #3CA35A, #389B60); color: white;";
            dynamic_panel_window.style = "overflow-y:scroll;";
            dynamic_panel_window.scroll({ top: 800, behavior: "smooth" });
            footer.style = "bottom:0rem";
            Right_ANS.play();

            //Lo message
            buttonAudio_Click.play();
            LO_message.style = "z-index : 0;";
            LO_message.style.backgroundColor = '#000000cc';
            popup.style = 'opacity:1; top: 601rem'
            circle_stroke_animation();
            setTimeout(function () {
                close_button.style.opacity = 1;
            }, 1000)
        }
        else if (this.title !== "solution" && solution_clicked == false) {
            options[which_button_clicked - 1].style = "background: white; color: black;"
            this.style = "background:linear-gradient(180deg, #FB6F6F, #EB5151); color: white;";
            feedback_bar.style = "opacity:1; top: 1000rem";
            Wrong_ANS.play();
        }
        which_button_clicked = (this.id).charAt(this.id.length - 1);
    }
}

// Finish Button
// functionality added in LO_script

var mass_ball = 40;
//40
var mass_box = 230;
var ufriction = 0.1;
var normal = mass_ball*9.8;
var ball_initial_velocity =50;
var ball_velocity = ball_initial_velocity;
var friction_force = ufriction*normal;
var position = 150; // ball initial poistion
var position_at =0; // for ball 
// var position_at1 = 0;
var position_box = 0;
var position_box_at =0;
var box_initial_velocity;//Depends on the velocity at which ball coiildes.
var box_velocity = box_initial_velocity;
var mid1x;//ball
var mid1y;
var mid2x;//box
var mid2y;
var colliision_flag = 1; //tells ball collides the box 
var speed;//ball
var flag_box = 0; //
var speed_box;//tells when box stops moving
var mass_flag =1; //mass button not clicked
var velocity_flag = 1;//velocity button not clicked
var velocity_slider_flag = 1; // velocity slider not clicked
var mass_slider_flag = 1; // velocity slider not clicked
var rotation_angle = 0;
var display_mass_slider = 0;//when mass button is clicked the slider should take in mass value
var display_velocity_slider = 0;//when velocity button is clicked the slider should take in velocity value
var degrees = 0;
var collided = 1;// collision not yet occured
var nxt_clicked = 1;//next button not clicked
var mass_played = 1;//mass animation is not played yet
var recently_mass_tapped = 1; //mass button was tapped recently
var recently_velocity_tapped = 1//velocity button was tapped recently
var velocity_played = 1//velocity animation is not played yet.

function axis(){
// var c = document.getElementById("myCanvas");
// var ctx1 = c.getContext("2d");
// ctx1.beginPath();
// ctx1.moveTo(0, 600);
// ctx1.lineTo(1540, 600);
// ctx1.strokeStyle ='yellow';
// ctx1.lineWidth = 5;
// ctx1.stroke();

// ctx1.beginPath();
// ctx1.moveTo(650, 0);
// ctx1.lineTo(650, 820);
// ctx1.strokeStyle ='yellow';
// ctx1.lineWidth = 5;
// ctx1.stroke();
}
// axis();
// ball(position);
// box(position_box);
function ball (position){
var c = document.getElementById("myCanvas");
    var ctx1 = c.getContext("2d");
    // ctx1.clearRect(0, 0, c.width, c.height);
    var y1 = 600;
    var x1 = position;
    var angle = 90;
    var rad = angle *Math.PI/180;
    
    var x = x1 + mass_ball*Math.cos(rad);
    var y = y1 - mass_ball*Math.sin(rad);
    mid1x = x;
    mid1y = y;
   
    
    // ctx1.beginPath();
    // ctx1.fillStyle = "green";
    // ctx1.arc(x, y, mass_ball, 0, 2 * Math.PI);
    // // ctx1.strokeStyle ='green';
    // ctx1.globalAlpha = 1;
    // ctx1.fill();

    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    
    // ctx.rotate(20 * Math.PI / 180);
    var img = document.getElementById("ball");
    var width = img.width;
    var height =img.height;
    // drawRotated(90);
    // drawImage(img, mid1x-mass_ball-(3+(0.6*mass_ball)), mid1y-mass_ball-(1+(0.5*mass_ball)),1,2*Math.PI/180);
    // ctx.translate(width / 2,height / 2);
    // ctx.rotate (Math.PI);
    // ctx.beginPath();
    // ctx.drawImage(img, mid1x-mass_ball-3, mid1y-mass_ball-7.5,mass_ball+47,mass_ball+47);
    // ctx.drawImage(img, mid1x-mass_ball-5, mid1y-mass_ball-15.5,mass_ball+108,mass_ball+108);
    // ctx.drawImage(img, mid1x-mass_ball-(3+(0.6*mass_ball)), mid1y-mass_ball-(7.5+(1.9*mass_ball)),mass_ball+(47+1.22*mass_ball),mass_ball+(47+1.22*mass_ball));
//    var degrees = 20
//     ctx.save();
//     ctx.translate(c.width/2,c.height/2);
//     ctx.rotate(degrees*Math.PI/180);
//     ctx.drawImage(img,-img.width/2,-img.width/2);
//     ctx.restore();


{
    ctx.save();
    // ctx.translate( mid1x-mass_ball-(3+(0.6*mass_ball)), mid1y-mass_ball-(1+(0.5*mass_ball)));
    // ctx.translate(mid1x ,mid2x-(2.2*mass_ball));
    // ctx.translate(mid1x-mass_ball, mid1y-mass_ball)
    // ctx.translate( mid1x -(((26+1.22*mass_ball))/14),mid1y-(((26+1.22*mass_ball))/14));
    ctx.translate( mid1x -(((26+1.22*mass_ball))/14),mid1y-(((26+1.22*mass_ball))/14));
    ctx.rotate(degrees*Math.PI/180);
    ctx.translate( -mid1x -(((26+1.22*mass_ball))/14),- mid1y-(((26+1.22*mass_ball))/14));
    // ctx.translate(0,0);
    // ctx.drawImage(img,5,10,-img.width/2,-img.width/2);
    //  ctx.drawImage(img,  mid1x  -((mass_ball+(26+1.22*mass_ball))/2), mid1y-((mass_ball+(10+26+1.22*mass_ball))/2),mass_ball+(26+1.22*mass_ball),mass_ball+(26+1.22*mass_ball));
    if((degrees>=110 && degrees<230))//210
    ctx.drawImage(img,  mid1x  -((mass_ball+(26+1.22*mass_ball))/2), mid1y-((mass_ball+(-degrees/6+26+1.22*mass_ball))/2),mass_ball+(26+1.22*mass_ball),mass_ball+(26+1.22*mass_ball));
    else if((degrees>=200 && degrees<380))
    ctx.drawImage(img,  mid1x  -((mass_ball+(26+1.22*mass_ball))/2), mid1y-((mass_ball+(+26+1.22*mass_ball))/2),mass_ball+(26+1.22*mass_ball),mass_ball+(26+1.22*mass_ball));
    
    else
     ctx.drawImage(img,  mid1x  -((mass_ball+(26+1.22*mass_ball))/2), mid1y-((mass_ball+(26+1.22*mass_ball))/2),mass_ball+(26+1.22*mass_ball),mass_ball+(26+1.22*mass_ball));
    
    ctx.restore();
    if ((collided == 1) && (nxt_clicked==0))
    degrees = degrees + 0.6;
    // var output = document.getElementById("v1");
    // output.innerHTML = degrees;
    //     ball_initial_velocity = this.value;
    }
    
    // ctx.drawImage(img, mid1x-mass_ball-(3+(0.6*mass_ball)), mid1y-mass_ball-(1+(0.5*mass_ball)),mass_ball+(26+1.22*mass_ball),mass_ball+(26+1.22*mass_ball));
    // ctx.rotate(-20 * Math.PI / 180);
    var img = document.getElementById("table");
    ctx.drawImage(img, 0, 600,1540,220);

}
// var slider1 = document.getElementById("slider1");
// var slider2 = document.getElementById("slider2");

// slider1.oninput = function() {
// //     var output = document.getElementById("v1");
// // output.innerHTML = this.value/100;
//     ufriction = this.value/100;}

//     slider2.oninput = function() {
//     //     var output = document.getElementById("v2");
//     // output.innerHTML = this.value;
//         ball_initial_velocity = this.value;}



function box (position_box){
   

    var c = document.getElementById("myCanvas");
    var ctx1 = c.getContext("2d");
    var x1 = 650-100+position_box;//to draw a rectangle we have to pass the left topmost point on the rectangle
    var y1 = 525-75;
    mid2x = 650+position_box;
    mid2y= 600;
    // var angle = 90;
    // var rad = angle *Math.PI/180;
    
    // var x = x1 + 50*Math.cos(rad);
    // var y = y1 - 50*Math.sin(rad);
    // mid1x = x;
    // mid1y = y;
    
    // ctx1.beginPath();
    // ctx1.fillStyle = "green";
    // ctx1.rect(x1, y1, 200, 150);
    // // center = (650,525)
    // // ctx1.strokeStyle ='green';
    // ctx1.globalAlpha = 1;
    // ctx1.fill();
    
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("box");
    ctx.drawImage(img, mid2x-100, 455,200,150); 
    var img = document.getElementById("triangle");
    ctx.drawImage(img, 650-140, 590,100,90); 
    ctx.drawImage(img, mid2x+50, 590,100,90); 
}

    function distance(mid1x,mid1y,mid2x,mid2y){
        var xsquare = mid1x-mid2x;
        var ysquare = mid1y-mid2y;
        var distances = Math.sqrt((Math.pow(xsquare,2)) +(Math.pow(ysquare,2)));
        return distances;
    }

    //https://www.researchgate.net/publication/281666081_Effects_of_surface_roughness_on_rolling_friction
    // v=v0−µrgt
    // x=x0+v0t−0.5µrgt2
    // v*v - u*u = 2as ideal formula
    // s = -(v*v - u*u /2a) here a is negative
    function friction_velocity(time){// for ball
         speed = ball_initial_velocity - (ufriction*9.8*time);
        if (speed>0){ //ball has some velocity and is moving
        position_at =position +  (((speed*speed) - (ball_initial_velocity*ball_initial_velocity))/(-2*ufriction*9.8));
    //         var output = document.getElementById("v1");
    // output.innerHTML = speed;
}
        else // if ball stops before colliding
        {position_at =position -  (((0) - (ball_initial_velocity*ball_initial_velocity))/(2*ufriction*9.8));
            colliision_flag = 0;
        return;}

     


        
    //     var output = document.getElementById("v1");
    // output.innerHTML = speed;
        // if(speed>0)
        // return speed;
        // else
        // return 0;
    }
 
    function friction_velocity_box(time){// for box
        speed_box = box_initial_velocity - (ufriction*9.8*time);
       if (speed_box>=0){
       position_box_at =position_box +  ((((speed_box*speed_box) - (box_initial_velocity*box_initial_velocity))/(-2*ufriction*9.8))*5);
//            var output = document.getElementById("v1");
//    output.innerHTML = speed_box;
}
       else
       {
        //    position_box_at =position -  (((0) - (box_initial_velocity*box_initial_velocity))/(2*ufriction*mass_box*9.8));
           flag_box = 1;
       return;}

    


       
   //     var output = document.getElementById("v1");
   // output.innerHTML = speed;
       // if(speed>0)
       // return speed;
       // else
       // return 0;
   }



    // function ball_position(time){
    //     var speed = ball_initial_velocity - (ufriction*9.8*time);

    //     postition_at = position +(speed) + (0.5*ufriction*9.8*time*time);
    // }
    // sleep for animation
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }
// function pausecomp(millis)
// {
//     var date = new Date();
//     var curDate = null;
//     do { curDate = new Date(); }
//     while(curDate-date < millis);
// }

 async function animation(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    axis();
    ball(position);
    box(position_box);
  
    // for (let i =1; i<100;1++){
    //     position++;
    //      var c1 = document.getElementById("myCanvas");
    // var ctx1 = c1.getContext("2d");
    // ctx1.clearRect(0, 0, c.width, c.height);
    // axis();
    // ball(position);
    // box(position_box);
    // }
    var i =0;
    while( (distance(mid1x,mid1y,mid2x,mid2y)> (parseInt(mass_ball)+120)) && colliision_flag == 1){
       await sleep(5);
       document.getElementById("slider1").disabled = true;
       document.getElementsByClassName('velocity')[0].disabled = true;
       document.getElementsByClassName('mass')[0].disabled= true;
       document.getElementsByClassName('next_button')[0].disabled= true;
       document.getElementById("slider1").style.opacity = 0;
       document.getElementsByClassName('velocity')[0].style.opacity = 0.5;
       document.getElementsByClassName('mass')[0].style.opacity= 0.5;
       document.getElementsByClassName('next_button')[0].style.opacity= 0.5;
       document.getElementById('v2').style.opacity=0;
       document.getElementById('v3').style.opacity=0;
       document.getElementById('v4').style.opacity=0;
       document.getElementById('v5').style.opacity=0;
       document.getElementById('v6').style.opacity=0;
       document.getElementById('v7').style.opacity=0;
       document.getElementById('v8').style.opacity=0;
       document.getElementById('v9').style.opacity=0;
       i++;
    
    var c1 = document.getElementById("myCanvas");
    var ctx1 = c1.getContext("2d");
    ctx1.clearRect(0, 0, c.width, c.height);
    axis();
    friction_velocity(i/50);// dis function calculates and assigns the velocity and position of the ball at a given time
    // position_at1 = position_at;
    // position_at = (position + (ball_velocity*i/50));
    // ball_position(i/50);
    ball(position_at);//drawing ball at the given position calculated in friction_velocity function
    box(position_box);
    // var output = document.getElementById("v1");
    // output.innerHTML = distance(mid1x,mid1y,mid2x,mid2y);
    
    
    

    }
    // var output = document.getElementById("v1");
    // output.innerHTML = ball_velocity;
    if (distance(mid1x,mid1y,mid2x,mid2y)<= (parseInt(mass_ball)+120))
    collided = 0; 
    flag_box = 0;
    // degrees = 0;
    if (colliision_flag ==1){

        // mass_ball * velocity of ball = mass_box* velocity of box  condition for perfectly elastic collission

        box_initial_velocity = ((mass_ball*speed)/mass_box);
    //     var output = document.getElementById("v1");
    // output.innerHTML = box_initial_velocity;
        {
            var i =0;
            while(flag_box ==0){
                await sleep(5);
                i++;
                var c2 = document.getElementById("myCanvas");
    var ctx2 = c2.getContext("2d");
    ctx2.clearRect(0, 0, c.width, c.height);
    axis();
     friction_velocity_box(i/50);
    ball(position_at);
    // var output = document.getElementById("v1");
    // output.innerHTML = position_box_at;
    box(position_box_at);// draw the box at the given position

            }

        }


    }
    if (flag_box == 1){
        document.getElementById("slider1").disabled = false; 
    document.getElementById("slider1").style.opacity = 1; 
    document.getElementsByClassName('velocity')[0].disabled = false;
    document.getElementsByClassName('mass')[0].disabled= false;
    document.getElementsByClassName('next_button')[0].disabled= false;
    document.getElementsByClassName('velocity')[0].style.opacity = 1;
       document.getElementsByClassName('mass')[0].style.opacity= 1;
       document.getElementsByClassName('next_button')[0].style.opacity= 1;
       document.getElementById('v2').style.opacity=1;
       document.getElementById('v3').style.opacity=1;
       document.getElementById('v4').style.opacity=1;
       document.getElementById('v5').style.opacity=1;
       document.getElementById('v6').style.opacity=1;
       document.getElementById('v7').style.opacity=1;
       document.getElementById('v8').style.opacity=1;
       document.getElementById('v9').style.opacity=1;
    collided = 1;
    degrees = 0;
    nxt_clicked = 1;
}
return;

  }
    var next = document.getElementsByClassName('next_button')[0];
 next.onclick= function(){
     nxt_clicked = 0;
     buttonAudio_Click.play();
     
     if(mass_flag == 0 && mass_played >= 0 && recently_mass_tapped == 0){
         mass_played--;
        let ItemElement = document.createElement("p");
        document.getElementById("para").style.fontSize =" 40rem";
        document.getElementById("para").style.lineHeight =" 50rem";
        document.getElementById("para").style.paddingTop =" 10rem";
        document.getElementById("para").style.paddingLeft =" 20rem";
        // fade(document.getElementsByClassName('feedback_bar')[0]);
        // await sleep(5);
        unfade(document.getElementsByClassName('feedback_bar')[0]);
        document.getElementById("para").innerHTML="Ball transfers all of its kinetic energy to the block and displaces it. Use ball of different mass and compare kinetic energies. ";
        // document.getElementsByClassName('feedback_bar')[0].style.transition= "top 0.4s ease-out, opacity 0.4s";
        // let content = "Use ball of different mass and compare K E.";
        // document.getElementById("para").style.fontSize ="40rem";
        // let TitleElement = document.createElement("b");
        // TitleElement.style.fontSize="40rem";
        // TitleElement.style.paddingLeft="0rem";
        // TitleElement.textContent = content;
        // ItemElement.appendChild(TitleElement);
        // document.getElementById("para").appendChild(ItemElement);
        
    }
    else if(mass_played<0 && mass_flag == 0 && velocity_flag == 1 && recently_mass_tapped==0 ){
        let ItemElement = document.createElement("p");
        document.getElementById("para").style.fontSize =" 40rem";
        document.getElementById("para").style.lineHeight =" 50rem";
        document.getElementById("para").style.paddingTop =" 10rem";
        document.getElementById("para").style.paddingLeft =" 20rem";
        unfade(document.getElementsByClassName('feedback_bar')[0]);
        document.getElementById("para").innerHTML="As the mass of the ball increases its kinetic energy also increases.Tap on velocity button to check effects of velocity.";
        // document.getElementById("para").style.lineHeight =" 40rem";
        // let content = "Tap on velocity button to check effects of velocity.";
        // document.getElementById("para").style.fontSize ="40rem";
        // document.getElementById("para").style.lineHeight =" 45rem";
        // let TitleElement = document.createElement("b");
        // TitleElement.style.fontSize="34rem";
        // TitleElement.textContent = content;
        // ItemElement.appendChild(TitleElement);
        // document.getElementById("para").appendChild(ItemElement);

    }
    else if(mass_played<0 && mass_flag == 0 && velocity_flag == 0 && recently_mass_tapped==0 ){
        let ItemElement = document.createElement("p");
        document.getElementById("para").style.fontSize =" 40rem";
        document.getElementById("para").style.lineHeight =" 50rem";
        document.getElementById("para").style.paddingTop =" 10rem";
        document.getElementById("para").style.paddingLeft =" 20rem";
        unfade(document.getElementsByClassName('feedback_bar')[0]);
        document.getElementById("para").innerHTML="The kinetic energy of an object is directly proportional to the mass of the object.";
        // document.getElementById("para").style.lineHeight =" 40rem";
        // let content = "Tap on velocity button to check effects of velocity.";
        // document.getElementById("para").style.fontSize ="40rem";
        // document.getElementById("para").style.lineHeight =" 45rem";
        // let TitleElement = document.createElement("b");
        // TitleElement.style.fontSize="34rem";
        // TitleElement.textContent = content;
        // ItemElement.appendChild(TitleElement);
        // document.getElementById("para").appendChild(ItemElement);

    }
    else if(velocity_flag == 0 && velocity_played >= 0 && recently_velocity_tapped == 0){
        velocity_played--;
       let ItemElement = document.createElement("p");
       document.getElementById("para").style.fontSize =" 36.5rem";
       document.getElementById("para").style.lineHeight ="50rem";
       document.getElementById("para").style.paddingTop =" 10rem";
       document.getElementById("para").style.paddingLeft =" 20rem";
       unfade(document.getElementsByClassName('feedback_bar')[0]);
       document.getElementById("para").innerHTML="The ball hits the block it transfers all of its kinetic energy and displaces the block. Push ball with different velocities to observe its effect on K.E.";
    //    let content = "Push ball with different velocities to observe its effect on K.E";
    // //    document.getElementById("para").style.fontSize ="40rem";
    //    let TitleElement = document.createElement("b");
    //    TitleElement.style.fontSize="29rem";
    //    TitleElement.style.lineHeight="30rem";
    //    TitleElement.style.paddingLeft="0rem";
    //    TitleElement.textContent = content;
    //    ItemElement.appendChild(TitleElement);
    //    document.getElementById("para").appendChild(ItemElement);
       
   }

   else if(velocity_played<0 && velocity_flag == 0 && mass_flag == 1 && recently_velocity_tapped==0 ){
    let ItemElement = document.createElement("p");
    document.getElementById("para").style.fontSize =" 39.5rem";
    // document.getElementById("para").style.lineHeight =" 50rem";
    document.getElementById("para").style.paddingTop =" 10rem";
    document.getElementById("para").style.paddingLeft =" 20rem";
    unfade(document.getElementsByClassName('feedback_bar')[0]);
    document.getElementById("para").innerHTML="The K.E of an object is directly proportional to the square of the velocity of the object. Tap on mass button to check effects of mass.";
    // document.getElementById("para").style.lineHeight =" 40rem";
    // let content = "Tap on mass button to check effects of mass.";
    // document.getElementById("para").style.fontSize ="40rem";
    document.getElementById("para").style.lineHeight =" 50rem";
    // let TitleElement = document.createElement("b");
    // TitleElement.style.fontSize="39rem";
    // TitleElement.textContent = content;
    // ItemElement.appendChild(TitleElement);
    // document.getElementById("para").appendChild(ItemElement);

}
else if(velocity_played<0 && velocity_flag == 0 && mass_flag == 0 && recently_velocity_tapped==0 ){
    let ItemElement = document.createElement("p");
    document.getElementById("para").style.fontSize =" 40rem";
    // document.getElementById("para").style.lineHeight =" 50rem";
    document.getElementById("para").style.paddingTop =" 10rem";
    document.getElementById("para").style.paddingLeft =" 20rem";
    unfade(document.getElementsByClassName('feedback_bar')[0]);
    document.getElementById("para").innerHTML="The kinetic energy of an object is directly proportional to the square of the velocity of the object";
    document.getElementById("para").style.lineHeight =" 50rem";
    // let content = "Tap on mass button to check effects of mass.";
    // document.getElementById("para").style.fontSize ="40rem";
    // document.getElementById("para").style.lineHeight =" 45rem";
    // let TitleElement = document.createElement("b");
    // TitleElement.style.fontSize="39rem";
    // TitleElement.textContent = content;
    // ItemElement.appendChild(TitleElement);
    // document.getElementById("para").appendChild(ItemElement);

}
    animation();
    }


    // friction f = u*N
    // N = m*g


      // for (let i = 1; distance(mid1x,mid1y,mid2x,mid2y)>= 150 ; i++){
    //     sleep(5);

    //     ctx.clearRect(0, 0, c.width, c.height);
    //     axis();
    //     box(position_box);
    //     ball_position(i/50);
    //     ball(postition_at);


    // }

    var next1 = document.getElementsByClassName('mass')[0]; // mass button
    next1.onclick=function(){
        buttonAudio_Click.play();
        next2.style.border = "unset";
        next1.style.border="solid 2.5rem";
        ball_mass_change();
        recently_mass_tapped = 0; // mass button tapped recently
        recently_velocity_tapped = 1; // velocity button is not tapped recently
        mass_flag = 0;// mass button clicked
        display_mass_slider = 1;
        display_velocity_slider = 0;
     document.getElementById("slider1").style.opacity=1;// mass slider
    //  document.getElementById("slider2").style.opacity=0;// velocity slider
     document.getElementById("p1").style.opacity=1;
     document.getElementById("v2").style.opacity=1;
     document.getElementById("v2").innerHTML = "1 kg";
            document.getElementById("v3").style.opacity=1;
            document.getElementById("v3").innerHTML = "2 kg";
            document.getElementById("v4").style.opacity=1;
            document.getElementById("v4").innerHTML = "3 kg";
            document.getElementById("v5").style.opacity=1;
            document.getElementById("v5").innerHTML = "4 kg";
            document.getElementById("v6").style.opacity=1;
            document.getElementById("v7").style.opacity=1;
            document.getElementById("v8").style.opacity=1;
            document.getElementById("v9").style.opacity=1;
    //  document.getElementById("p1").innerHTML="Mass";
     if(mass_slider_flag == 1){
     document.getElementById("para").style.fontSize =" 40rem";
     document.getElementById("para").style.lineHeight =" 50rem";
     document.getElementById("para").style.paddingTop =" 10rem";
     unfade(document.getElementsByClassName('feedback_bar')[0]);
     document.getElementById("para").innerHTML=("Vary the mass of the ball using the slider and press play to observe how the kinetic energy of the ball is affected.");
    }
    //  else if(velocity_flag ==1){  //mass_slider_flag == 0

    //     let ItemElement = document.createElement("p");
    //     document.getElementById("para").style.fontSize =" 40rem";
    //     document.getElementById("para").style.lineHeight =" 50rem";
    //     document.getElementById("para").style.paddingTop =" 20rem";
    //     document.getElementById("para").style.paddingLeft =" 20rem";
    //     document.getElementById("para").innerHTML="The kinetic energy of an object is directly proportional to the mass of the object.";
    //     document.getElementById("para").style.lineHeight =" 40rem";
    //     let content = "Let’s explore how velocity affects the K E.";
    //     document.getElementById("para").style.fontSize ="40rem";
    //     document.getElementById("para").style.lineHeight =" 45rem";
    //     let TitleElement = document.createElement("b");
    //     TitleElement.style.fontSize="40rem";
    //     TitleElement.textContent = content;
    //     ItemElement.appendChild(TitleElement);
    //     document.getElementById("para").appendChild(ItemElement);

    //  }



    //  var output = document.getElementById("v1");
    //  output.innerHTML = ((mass_ball-40)*2)+"kg";

     var slider1 = document.getElementById("slider1");

     slider1.value = 1;//added
     mass_ball = 40;
     ball_mass_change();
     ball_initial_velocity = 50 ;

         slider1.oninput = function() {
            buttonAudio_Click.play();
             mass_slider_flag = 0;//mass slider clicked
    //     var output = document.getElementById("v1");
    // output.innerHTML = this.value+"kg";
       if (this.value < 5)
        this.value = 1;
      else if(this.value<=34)
          this.value = 34;
        else if (this.value>34 && this.value <= 70)
            this.value = 70;
        else 
           this.value = 100;
        mass_ball =  ((this.value/2) + 40) ;
        ball_mass_change();
        
    //     if (mass_slider_flag == 0){
    //     let ItemElement = document.createElement("p");
    //     document.getElementById("para").style.fontSize =" 65rem";
    //     document.getElementById("para").style.lineHeight =" 50rem";
    //     document.getElementById("para").style.paddingTop =" 20rem";
    //     document.getElementById("para").style.paddingLeft =" 20rem";
    //     document.getElementById("para").innerHTML="Ball transfers all of its kinetic energy . ";
    //     let content = "Use ball of different mass and compare K E.";
    //     document.getElementById("para").style.fontSize ="40rem";
    //     let TitleElement = document.createElement("b");
    //     TitleElement.style.fontSize="40rem";
    //     TitleElement.style.paddingLeft="0rem";
    //     TitleElement.textContent = content;
    //     ItemElement.appendChild(TitleElement);
    //     document.getElementById("para").appendChild(ItemElement);
    // }

//    else if (velocity_flag ==0){
//        if(mass_flag == 0){
//         let ItemElement = document.createElement("p");
//         document.getElementById("para").style.fontSize =" 40rem";
//         document.getElementById("para").style.lineHeight =" 50rem";
//         document.getElementById("para").style.paddingTop =" 20rem";
//         document.getElementById("para").style.paddingLeft =" 20rem";
//         document.getElementById("para").innerHTML="The kinetic energy of an object is directly proportional to the mass of the object.";
//         document.getElementById("para").style.lineHeight =" 40rem";
//         let content = "Let’s explore how velocity affects the K E.";
//         document.getElementById("para").style.fontSize ="40rem";
//         document.getElementById("para").style.lineHeight =" 45rem";
//         let TitleElement = document.createElement("b");
//         TitleElement.style.fontSize="40rem";
//         TitleElement.textContent = content;
//         ItemElement.appendChild(TitleElement);
//         document.getElementById("para").appendChild(ItemElement);}
        // else{
        //     let ItemElement = document.createElement("p");
        //     document.getElementById("para").style.fontSize =" 30rem";
        //     document.getElementById("para").innerHTML="The K.E of an object is directly proportional to the square of the velocity of the object. ";
        //     document.getElementById("para").style.lineHeight =" 40rem";
        //     let content = "Tap on mass button to check effects of mass.";
        //     document.getElementById("para").style.fontSize ="35rem";
        //     document.getElementById("para").style.lineHeight =" 40rem";
        //     let TitleElement = document.createElement("b");
        //     TitleElement.style.fontSize="32rem";
        //     TitleElement.textContent = content;
        //     ItemElement.appendChild(TitleElement);
        //     document.getElementById("para").appendChild(ItemElement);}
    }


        ball_mass_change();
    }

        


        var next2 = document.getElementsByClassName('velocity')[0];
        next2.onclick=function(){
            buttonAudio_Click.play();
            next1.style.border = "unset";
        next2.style.border="solid 2.5rem";
        recently_velocity_tapped = 0; // recently velocity button was tapped
        recently_mass_tapped = 1;// recently mass button was not tapped
            document.getElementById("p1").style.opacity=1;
            document.getElementById("v2").style.opacity=1;
            document.getElementById("v2").innerHTML = "1 m/s";
            document.getElementById("v3").style.opacity=1;
            document.getElementById("v3").innerHTML = "2 m/s";
            document.getElementById("v4").style.opacity=1;
            document.getElementById("v4").innerHTML = "3 m/s";
            document.getElementById("v5").style.opacity=1;
            document.getElementById("v5").innerHTML = "4 m/s";
            document.getElementById("v6").style.opacity=1;
            document.getElementById("v7").style.opacity=1;
            document.getElementById("v8").style.opacity=1;
            document.getElementById("v9").style.opacity=1;
            // var c = document.getElementById("myCanvas");
            // var ctx = c.getContext("2d");
            // ctx.clearRect(0, 0, c.width, c.height);
            // // axis();
            // // ball(position);
            // // box(position_box);
           
            velocity_flag = 0;// velocity button clicked
            // document.getElementById("slider2").style.opacity=0;
         document.getElementById("slider1").style.opacity=1;
         ball_mass_change();
        //  document.getElementById("p1").innerHTML="Velocity";
         document.getElementById("para").style.fontSize =" 40rem";
         document.getElementById("para").style.lineHeight =" 50rem";
         document.getElementById("para").style.paddingTop =" 10rem";
         unfade(document.getElementsByClassName('feedback_bar')[0]);
         document.getElementById("para").innerHTML=("Vary the velocity of the ball using the slider and press play to observe how the kinetic energy of the ball is affected.");
    //      var output = document.getElementById("v1");
    //  output.innerHTML = (ball_initial_velocity)+"m/s";
    
         var slider2 = document.getElementById("slider1");
          slider2.value = 1;
          mass_ball = 40;
          ball_initial_velocity = 50 ;

     ball_mass_change();
             slider2.oninput = function() {
                buttonAudio_Click.play();
        //     var output = document.getElementById("v1");
        // output.innerHTML = ((this.value/2)+50)+"m/s";
        if (this.value < 5)
        this.value = 1;
      else if(this.value<=34)
          this.value = 34;
        else if (this.value>34 && this.value <= 70)
            this.value = 70;
        else 
           this.value = 100;
            ball_initial_velocity =  (((this.value/2)+50)) ;
            // if(mass_flag == 0){
            // let ItemElement = document.createElement("p");
            // document.getElementById("para").style.fontSize =" 34rem";
            // document.getElementById("para").style.lineHeight =" 45rem";
            // document.getElementById("para").style.paddingTop =" 25rem";
            // document.getElementById("para").style.paddingLeft =" 20rem";
            // document.getElementById("para").innerHTML="When the ball hits the block it transfers all of its K.E. ";
            // let content = "Push ball with different velocities to observe its effect on Kinetic Energy. ";
            // // document.getElementById("para").style.fontSize ="30rem";
            // // document.getElementById("para").style.lineHeight =" 30rem";
            // let TitleElement = document.createElement("b");
            // TitleElement.style.fontSize="35rem";
            // TitleElement.style.lineHeight="10rem";
            // TitleElement.textContent = content;
            // ItemElement.appendChild(TitleElement);
            // document.getElementById("para").appendChild(ItemElement);}
            // else{
            //     let ItemElement = document.createElement("p");
            //     document.getElementById("para").style.fontSize =" 35rem";
            //     document.getElementById("para").style.paddingTop =" 20rem";
            //     document.getElementById("para").style.paddingLeft =" 20rem";
            //     document.getElementById("para").innerHTML="The K.E of an object is directly proportional to the square of the velocity of the object. ";
            //     document.getElementById("para").style.lineHeight =" 30rem";
            //     let content = "Tap on mass button to check effects of mass.";
            //     document.getElementById("para").style.fontSize ="40rem";
            //     document.getElementById("para").style.lineHeight =" 40rem";
            //     let TitleElement = document.createElement("b");
            //     TitleElement.style.fontSize="36rem";
            //     TitleElement.textContent = content;
            //     ItemElement.appendChild(TitleElement);
            //     document.getElementById("para").appendChild(ItemElement);}


            ball_mass_change();
            
        }
    
            }


        function ball_mass_change(){ // function to change the mass of the ball
            var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    axis();
    ball(150);
    box(0);

        }





    axis();
ball(position);
box(position_box);
window.onload = function() {
var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    // ctx.clearRect(0, 0, c.width, c.height);
    var img = document.getElementById("table");
    // ctx.beginPath();
    ctx.drawImage(img, 0, 600,1540,220);

    var img = document.getElementById("ball");
    
    // ctx.beginPath();
    //ctx.drawImage(img, mid1x-mass_ball-3, mid1y-mass_ball-7.5,mass_ball+47,mass_ball+47); initial ball position
    // ctx.drawImage(img, mid1x-mass_ball-6, mid1y-mass_ball-17,mass_ball+108,mass_ball+108);//final ball position

    // ctx.drawImage(img, mid1x-mass_ball-(3+(0.6*mass_ball)), mid1y-mass_ball-((1.4*mass_ball)),mass_ball+(47+1.22*mass_ball),mass_ball+(47+1.22*mass_ball));
    // ctx.drawImage(img, mid1x-mass_ball-(3+(0.6*mass_ball)), mid1y-mass_ball-(1+(0.5*mass_ball)),mass_ball+(26+1.22*mass_ball),mass_ball+(26+1.22*mass_ball));


    var img = document.getElementById("box");
    ctx.drawImage(img, 550, 455,200,150); // inital box position
    var img = document.getElementById("triangle");
    ctx.drawImage(img, 650-140, 590,100,90); 
    ctx.drawImage(img, mid2x+50, 590,100,90); 
}
// function drawImage(image, x, y, scale, rotation){
//     var c = document.getElementById("myCanvas");
//     var ctx = c.getContext("2d");
//     ctx.setTransform(scale, 0, 0, scale, x, y); // sets scale and origin
//     ctx.rotate(rotation);
//     ctx.drawImage(image, -image.width / 2, -image.height / 2);
// } 
    
// function drawRotated(degrees){
//     var c = document.getElementById("myCanvas");
//     var ctx = c.getContext("2d");
//     // ctx.clearRect(0, 0, c.width, c.height);
//     var img = document.getElementById("ball");
//     ctx.clearRect(0,0,canvas.width,canvas.height);
//     ctx.save();
//     ctx.translate(canvas.width/2,canvas.height/2);
//     ctx.rotate(degrees*Math.PI/180);
//     ctx.drawImage(image,-image.width/2,-image.width/2);
//     // ctx.drawImage(img, mid1x-mass_ball-(3+(0.6*mass_ball)), mid1y-mass_ball-(1+(0.5*mass_ball)),mass_ball+(26+1.22*mass_ball),mass_ball+(26+1.22*mass_ball));

//     ctx.restore();
// }
// function fade(element) {
//     var op = 1;  // initial opacity
//     var timer = setInterval(function () {
//         if (op <= 0.1){
//             clearInterval(timer);
//             element.style.display = 'none';
//         }
//         element.style.opacity = op;
//         element.style.filter = 'alpha(opacity=' + op * 100 + ")";
//         op -= op * 0.1;
//     }, 50);
// }

function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op > 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 50);
}