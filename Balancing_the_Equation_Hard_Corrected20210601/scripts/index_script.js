var devicePixelRatio = window.devicePixelRatio;
var screenScaleRatio = 1080 / screen.width;
//console.log(devicePixelRatio);
var metaData = document.getElementsByName('viewport');
metaData[0].content = "width=device-width, initial-scale=" + 1 / screenScaleRatio.toString();
//console.log(metaData[0].content);
var loading_screen = document.getElementById('loading-screen');


// Following code is for question tab and observation tab transition
var navigation_bar = document.getElementsByClassName('navigation_bar');
var question_tab = navigation_bar[0].children[1];
var observation_tab = navigation_bar[0].children[0];
var movable_parent = document.getElementsByClassName('movable_parent')[0];

question_tab.onclick = function () {
   buttonAudio_Click.play();
   buttonAudio_Click.playbackRate = 3;
   movable_parent.style = "left: -1080px;";
   observation_tab.classList.remove('nav_selected');
   question_tab.classList.add('nav_selected2');
}

observation_tab.onclick = function () {
   buttonAudio_Click.play();
   buttonAudio_Click.playbackRate = 3;
   movable_parent.style = "left: 0px";
   observation_tab.classList.add('nav_selected');
   question_tab.classList.remove('nav_selected2');
}

// Inserting the numbers for coefficients in the number container
var number_container = document.getElementsByClassName('numbers_container');
for (let elements of number_container) {
    elements.style.top = (-0 * 100).toString() + '%';
    for (let j = 0; j < 4; j++) {
        var temp = document.createElement('span');
        temp.className = 'inside_number';
        temp.innerText = (j + 1);
        elements.append(temp);
    }
}

/*...Declaring the global variables.*/

// For the paragraph in instruction/feedback area
var remarks = document.getElementById("para");

// For all the plus minus buttons
var btn1 = document.getElementById("button1");
var btn2 = document.getElementById("button2");
var btn3 = document.getElementById("button3");
var btn4 = document.getElementById("button4");
var btn5 = document.getElementById("button5");
var btn6 = document.getElementById("button6");
var btn7 = document.getElementById("button7");
var btn8 = document.getElementById("button8");

// For the button sound
var sound = document.getElementById("button_sound");

// For the color transition of the feedback box
var box = document.getElementById("color_change");

// For highlighting the specific row of the table
var highlight1 = document.getElementById("my_table").rows[2];
var h1 = document.getElementById("my_table").rows[2].cells[0];
var highlight2 = document.getElementById("my_table").rows[3];
var h2 = document.getElementById("my_table").rows[3].cells[0];
var highlight3 = document.getElementById("my_table").rows[4];
var h3 = document.getElementById("my_table").rows[4].cells[0];

// Function to hide the table numbers
 function hide_numbers()
 {
    document.getElementsByClassName("coef")[0].style.display = "none";
    document.getElementsByClassName("coef")[1].style.display = "none";
    document.getElementsByClassName("coef")[2].style.display = "none";
    document.getElementsByClassName("coef")[3].style.display = "none";
    document.getElementsByClassName("coef")[4].style.display = "none";
    document.getElementsByClassName("coef")[5].style.display = "none";
}

// A random variable to show the alternative correct feedback when the equation is balanced
var random;

/*... for the transition of numbers using buttons...*/
function poly1() {
    if (reactant_1.multiplier < 4) {
        var top_measure = Number(number_container[0].style.top.slice(0, -1));
        top_measure = top_measure - 100;
        number_container[0].style.top = top_measure.toString() + '%';
        reactant_1.multiplier = Number(number_container[0].style.top.slice(0, -1)) / -100 + 1;
        sound.play();
        sound.playbackRate = 3;
        reactant_1.update_element_numbers();
        if (reactant_1.multiplier ==4){btn1.disabled = true; btn1.style.opacity =0.4; btn1.style.border = "none";}
        btn5.disabled = false; btn5.style.opacity =1;
        if (btn3.disabled == false || btn7.disabled == false) {
        btn5.style.border = "8px solid #0FCDF3";}
        else {btn5.style.border = "8px solid #FFD390";}
        update_reactant_column();
        update_product_column();
        update_check_column();
        paragraph_show();
        hide_numbers();
    }
}

function poly2() {
    if (reactant_2.multiplier < 4) {
        var top_measure = Number(number_container[1].style.top.slice(0, -1));
        top_measure = top_measure - 100;
        number_container[1].style.top = top_measure.toString() + '%';
        reactant_2.multiplier = Number(number_container[1].style.top.slice(0, -1)) / -100 + 1;
        sound.play();
        sound.playbackRate = 3;
        if (reactant_2.multiplier ==4){btn2.disabled = true; btn2.style.opacity =0.4; btn2.style.border = "none";}
        btn6.disabled = false; btn6.style.opacity =1;
        btn6.style.border = "8px solid #FB78AF";
        reactant_2.update_element_numbers();
        update_reactant_column();
        update_product_column();
        update_check_column();
        paragraph_show();
        hide_numbers();
    }
}

function poly3() {
    if (product_1.multiplier < 4) {
        var top_measure = Number(number_container[2].style.top.slice(0, -1));
        top_measure = top_measure - 100;
        number_container[2].style.top = top_measure.toString() + '%';
        product_1.multiplier = Number(number_container[2].style.top.slice(0, -1)) / -100 + 1;
        sound.play();
        sound.playbackRate = 3;
        if (random ==0)
            {random = 1;}
            else {random = 0;}
            if (product_1.multiplier ==4){btn3.disabled = true; btn3.style.opacity =0.4; btn3.style.border = "none";}
        btn7.disabled = false; btn7.style.opacity =1;
        btn7.style.border = "8px solid #0FCDF3";
        product_1.update_element_numbers();
        update_product_column();
        update_reactant_column();
        update_check_column();
        paragraph_show();
        hide_numbers();

    }
}

function poly4() {
    if (product_2.multiplier < 4) {
        var top_measure = Number(number_container[3].style.top.slice(0, -1));
        top_measure = top_measure - 100;
        number_container[3].style.top = top_measure.toString() + '%';
        product_2.multiplier = Number(number_container[3].style.top.slice(0, -1)) / -100 + 1;
        sound.play();
        sound.playbackRate = 3;
        if (product_2.multiplier ==4){btn4.disabled = true; btn4.style.opacity =0.4; btn4.style.border = "none";}
        btn8.disabled = false; btn8.style.opacity =1;

    if (btn2.disabled == false || btn6.disabled == false){btn8.style.border = "5px solid #FB78AF";}
        else {btn8.style.border = "8px solid #FFD390";}
        product_2.update_element_numbers();
        update_product_column();
        update_reactant_column();
        update_check_column();
        paragraph_show();
        hide_numbers();
    }
}

function poly5() {
    if (reactant_1.multiplier > 1) {
        var top_measure = Number(number_container[0].style.top.slice(0, -1));
        top_measure = top_measure + 100;
        number_container[0].style.top = top_measure.toString() + '%';
        reactant_1.multiplier = Number(number_container[0].style.top.slice(0, -1)) / -100 + 1;
        sound.play();
        sound.playbackRate = 3;
        if (reactant_1.multiplier ==1){btn5.disabled = true; btn5.style.opacity =0.4; btn5.style.border = "none";}
        btn1.disabled = false; btn1.style.opacity =1;
        if (btn3.disabled == false || btn7.disabled == false) {
            btn1.style.border = "8px solid #0FCDF3";}
            else{btn1.style.border = "8px solid #FFD390";}
        reactant_1.update_element_numbers();
        update_reactant_column();
        update_product_column();
        update_check_column();
        paragraph_show();
        hide_numbers();
    }
}

function poly6() {
    if (reactant_2.multiplier > 1) {
        var top_measure = Number(number_container[1].style.top.slice(0, -1));
        top_measure = top_measure + 100;
        number_container[1].style.top = top_measure.toString() + '%';
        reactant_2.multiplier = Number(number_container[1].style.top.slice(0, -1)) / -100 + 1;
        sound.play();
        sound.playbackRate = 3;
        if (reactant_2.multiplier ==1){btn6.disabled = true; btn6.style.opacity =0.4; btn6.style.border = "none";}
        btn2.disabled = false; btn2.style.opacity =1;
        btn2.style.border = "8px solid #FB78AF";
        reactant_2.update_element_numbers();
        update_reactant_column();
        update_product_column();
        update_check_column();
        paragraph_show();
        hide_numbers();
    }
}

function poly7() {
    if (product_1.multiplier > 1) {
        var top_measure = Number(number_container[2].style.top.slice(0, -1));
        top_measure = top_measure + 100;
        number_container[2].style.top = top_measure.toString() + '%';
        product_1.multiplier = Number(number_container[2].style.top.slice(0, -1)) / -100 + 1;
        sound.play();
        sound.playbackRate = 3;
        if (product_1.multiplier ==1){btn7.disabled = true; btn7.style.opacity =0.4; btn7.style.border = "none";}
        btn3.disabled = false; btn3.style.opacity =1;
        btn3.style.border = "8px solid #0FCDF3";
        product_1.update_element_numbers();
        random = 0;
        update_product_column();
        update_reactant_column();
        update_check_column();
        paragraph_show();
        hide_numbers();
    }
}

function poly8() {
    if (product_2.multiplier > 1) {
        var top_measure = Number(number_container[3].style.top.slice(0, -1));
        top_measure = top_measure + 100;
        number_container[3].style.top = top_measure.toString() + '%';
        product_2.multiplier = Number(number_container[3].style.top.slice(0, -1)) / -100 + 1;
        sound.play();
        sound.playbackRate = 3;
        if (product_2.multiplier ==1){btn8.disabled = true; btn8.style.opacity =0.4; btn8.style.border = "none";}
        btn4.disabled = false; btn4.style.opacity =1;
        if (btn2.disabled == false || btn6.disabled == false){btn4.style.border = "8px solid #FB78AF";}
        else {btn4.style.border = "8px solid #FFD390";}
        product_2.update_element_numbers();
        update_product_column();
        update_reactant_column();
       update_check_column();
        paragraph_show();
        hide_numbers();
    }
}

var table_data = document.getElementsByClassName('table')[0].getElementsByTagName('td');
console.log(table_data);

// table_date[0].style.backgroundColor = "red";
var reactant_1 = {
    Fe: 2, O: 3, multiplier: 1,
    update_element_numbers: function () {
        this.Fe = this.multiplier * 2;
        this.O = this.multiplier * 3;
    }
};
var reactant_2 = {
    C: 1, multiplier: 1,
    update_element_numbers: function () {
        this.C = this.multiplier * 1;
    }
};
var product_1 = {
    Fe: 1, multiplier: 1,
    update_element_numbers: function () {
        this.Fe = this.multiplier * 1;
    }
};
var product_2 = {
    C: 1, O: 2, multiplier: 1,
    update_element_numbers: function () {
        this.C = this.multiplier * 1;
        this.O = this.multiplier * 2;

    }
};

//Initialising the values of table data and other
reactant_1.multiplier = Number(number_container[0].style.top.slice(0, -1)) / -100 + 1;
reactant_2.multiplier = Number(number_container[1].style.top.slice(0, -1)) / -100 + 1;
product_1.multiplier = Number(number_container[2].style.top.slice(0, -1)) / -100 + 1;
product_2.multiplier = Number(number_container[3].style.top.slice(0, -1)) / -100 + 1;
product_1.update_element_numbers();
product_2.update_element_numbers();
reactant_1.update_element_numbers();
reactant_2.update_element_numbers();


var reactant_column = [];
var product_column = [];
var balance_column = []; 
for (let i = 0; i < 3; i ++) {
    reactant_column[i] = table_data[3*i + 1];
    // balance_column[i] = table_data[4 * i + 2];
    product_column[i] = table_data[3*i + 2];
}


function update_reactant_column() {
    reactant_column[0].innerText = reactant_1.Fe;
    reactant_column[1].innerText = reactant_2.C;
    reactant_column[2].innerText = reactant_1.O;
}

function update_product_column() {
    product_column[0].innerText = product_1.Fe;
    product_column[1].innerText = product_2.C;
    product_column[2].innerText = product_2.O;

}

//update_reactant_column();
//update_product_column();
//update_check_column();


function update_check_column()
{
if (2*reactant_1.multiplier == product_1.multiplier)
{
    document.getElementsByClassName("right")[0].style.display = "inline";
    document.getElementsByClassName("wrong")[0].style.display = "none";
}else
{
    document.getElementsByClassName("wrong")[0].style.display = "inline";
    document.getElementsByClassName("right")[0].style.display = "none";
}

if (reactant_2.multiplier == product_2.multiplier){
    document.getElementsByClassName("right")[1].style.display = "inline";
    document.getElementsByClassName("wrong")[1].style.display = "none";
}else 
{
    document.getElementsByClassName("wrong")[1].style.display = "inline";
    document.getElementsByClassName("right")[1].style.display = "none";
}
if (3*reactant_1.multiplier == 2*product_2.multiplier)
{
    document.getElementsByClassName("right")[2].style.display = "inline";
    document.getElementsByClassName("wrong")[2].style.display = "none";
}else
{
    document.getElementsByClassName("wrong")[2].style.display = "inline";
    document.getElementsByClassName("right")[2].style.display = "none";
}
}

// function to call the functions to show the stepwise feedback
function paragraph_show()
{
if ( btn3.disabled == false || btn7.disabled == false)
{ if(btn1.disabled == false || btn5.disabled == false) 
   { 
       iron_feedback();
       
       }
  else{final_feedback();}
}
else if (btn1.disabled == false || btn5.disabled == false)
{oxygen_feedback();
   
   }
else if (btn2.disabled == false || btn6.disabled == false && btn8.disabled == false)
{carbon_feedback();
  
    }
}


// function to show the feedback when iron is being dealt
function iron_feedback()
{
  
var remarks = document.getElementById("para");
if (reactant_1.multiplier == 1 && product_1.multiplier == 2)
    {
        
        box.style = "opacity:0; top: 60%;";
        setTimeout(() => {
        remarks.innerText = "Awesome! You have balanced iron atoms on both sides.";
        box.style = "opacity:1; top: 58.3%;";
         }, 400);
    
        
    
    document.getElementsByClassName("next_button")[0].style.top = "1704px";
    document.getElementsByClassName("next_button")[0].style.transition = " top 0.5s";
    btn1.disabled = true;
    btn1.style.border = "none";
    btn1.style.opacity = 0.4;
    btn3.disabled = true;
    btn3.style.opacity = 0.4;
    btn3.style.border = "none";
    btn7.disabled = true;
    btn7.style.opacity = 0.4;
    btn7.style.border = "none";
    btn5.style.border = "none";
    }
 else if (reactant_1.multiplier == 2 && product_1.multiplier == 4)
    
        {
            box.style = "opacity:0; top: 60%;";
        setTimeout(() => {
            remarks.innerText = "Awesome! Iron atoms are equal but you could have gotten it done with a much lower number. Try again.";
            box.style = "opacity:1; top: 58.3%;";
         }, 400);
            
        }  
else{
    
            remarks.innerText = "Let us start with Fe. Observe the number of atoms in the reactant and product side and try to make it equal on both sides.";
            
   
}
 
}


function next_instruction()
{
var remarks = document.getElementById("para");

if (remarks.innerText == "To balance a chemical equation we need to compare number of molecules on reactant and product side. Tap on the button to tabulate this date.")
{
    sound.play();
    sound.playbackRate = 3;
    document.getElementsByClassName("next_button")[0].style.top = "100%";
    document.getElementsByClassName("next_button")[0].style.transition = " top 0.5s";
    update_numbers();

    
}    
else if (remarks.innerText == "Click on the start button to start balancing the equation.")  
{
    sound.play();
    sound.playbackRate = 3;
    document.getElementsByClassName("next_button")[0].style.top = "100%";
    document.getElementsByClassName("next_button")[0].style.transition = " top 0.5s";
    highlight1.style.background = "#0FCDF3";
    highlight1.style.color = "black";
    // h1.style.color = "black";
    document.getElementsByClassName("elm1")[0].style.color = "black";
    document.getElementsByClassName("elm4")[0].style.color = "black";
    document.getElementsByClassName("Iron")[0].style.color = "black";
    h1.style.background = "#0FCDF3";
    //remarks.innerText = "Let us start with Fe. Observe the number of atoms in the reactant and product side and try to make it equal on both sides.";


    box.style = "opacity:0; top: 60%;";
    setTimeout(() => {
    remarks.innerText = "Let us start with Fe. Observe the number of atoms in the reactant and product side and try to make it equal on both sides.";
    box.style = "opacity:1; top: 58.3%;";
     }, 400);


btn1.disabled = false;
btn1.style.opacity = 1;
btn1.style.border = "8px solid #0FCDF3";
btn3.disabled = false;
btn3.style.opacity = 1;
btn3.style.border = "8px solid #0FCDF3";
document.getElementsByClassName("next_button")[0].innerText = "Next";
document.getElementsByClassName("Fe1")[0].style.opacity = "1";
document.getElementsByClassName("Fe1")[0].style.background = "linear-gradient(180deg, #12EAFA  0%, #0787E2 100%)"; 
document.getElementsByClassName("Fe2")[0].style.opacity = "1";
document.getElementsByClassName("Fe2")[0].style.background = "linear-gradient(180deg, #12EAFA  0%, #0787E2 100%)";  
}            
else if (remarks.innerText == "Awesome! You have balanced iron atoms on both sides.")
{ sound.play();
    sound.playbackRate = 3;
    highlight3.style.background = "#FFD390";
    highlight3.style.color = "black";
    document.getElementsByClassName("Oxygen")[0].style.color = "black";
    highlight1.style.color = "white";
    document.getElementsByClassName("Iron")[0].style.color = "white";
    highlight3.style.background = "linear-gradient(180deg, #FFDDA9 0%, #FFC773 100%)";
    h3.style.background = "#FFD390";
    h1.style.background = "#212A40";
    highlight1.style.background = "#212A40";
    


    box.style = "opacity:0; top: 60%;";
    box.style.background = "linear-gradient(180deg, #12EAFA  0%,#0787E2 100%)";
    setTimeout(() => {
        
        remarks.innerText = "Awesome! Let us look to balance the oxygen atoms next.";
    box.style = "opacity:1; top: 58.3%;";
    box.style.background = "linear-gradient(180deg, #FFDDA9 0%, #FFC773 100%)";
     }, 400);
     

// box.style.background = "linear-gradient(180deg, #FFDDA9 0%, #FFC773 100%)";
btn4.disabled = false;
btn4.style.border = "8px solid #FFD390";
btn4.style.opacity = 1;
btn1.disabled = false;
btn1.style.border = "8px solid #FFD390";
btn1.style.opacity = 1;

document.getElementsByClassName("next_button")[0].style.top = "100%";
    document.getElementsByClassName("next_button")[0].style.transition = " top 0.5s";


    document.getElementsByClassName("Fe1")[0].style.opacity = "0";
    document.getElementsByClassName("Fe2")[0].style.opacity = "0";
    document.getElementsByClassName("O1")[0].style.opacity = "1";
    document.getElementsByClassName("O2")[0].style.opacity = "1";
    document.getElementsByClassName("O1")[0].style.background =  "linear-gradient(180deg, #FFDDA9 0%, #FFC773 100%)";
document.getElementsByClassName("O2")[0].style.background =  "linear-gradient(180deg, #FFDDA9 0%, #FFC773 100%)";

}
else if (remarks.innerText == "Awesome! You have balanced oxygen atoms on both sides.")
{ sound.play();
    sound.playbackRate = 3;
    highlight3.style.background = "#28334F";
    highlight2.style.background = "#FB78AF";
    h2.style.background = "#FB78AF";
    h3.style.background = "#212A40";
    highlight2.style.color = "black";
    document.getElementsByClassName("Carbon")[0].style.color = "black";
    highlight3.style.color = "white";
    document.getElementsByClassName("Oxygen")[0].style.color = "white";


    box.style = "opacity:0; top: 60%;";
    box.style.background = "linear-gradient(180deg, #FFDDA9 0%, #FFC773 100%)";
    setTimeout(() => {
        
        remarks.innerText = "Awesome! Let us look to balance the carbon atoms next.";
    box.style = "opacity:1; top: 58.3%;";
    box.style.background = "linear-gradient(180deg, #FEAFC6 0%, #FA65A7 100%)";
    
     }, 400);



btn4.disabled = false; btn4.style.opacity = 1;
btn4.style.border = "8px solid #FB78AF";
btn2.disabled = false; btn2.style.opacity = 1;
btn2.style.border = "8px solid #FB78AF";
btn8.disabled = false; btn8.style.opacity = 1;
btn8.style.border = "8px solid #FB78AF";
document.getElementsByClassName("next_button")[0].style.top = "100%";
document.getElementsByClassName("next_button")[0].style.transition = " top 0.5s";

document.getElementsByClassName("C1")[0].style.opacity = "1";
    document.getElementsByClassName("C2")[0].style.opacity = "1";
    document.getElementsByClassName("O1")[0].style.opacity = "0";
    document.getElementsByClassName("O2")[0].style.opacity = "0";
    document.getElementsByClassName("C1")[0].style.background = "linear-gradient(180deg, #FEAFC6 0%, #FA65A7 100%)";
    document.getElementsByClassName("C2")[0].style.background = "linear-gradient(180deg, #FEAFC6 0%, #FA65A7 100%)";

}
else if(remarks.innerText == "Awesome! You have balanced carbon atoms on both sides.")
{ sound.play();
    sound.playbackRate = 3;
    highlight2.style.background = "#28334F";
    highlight1.style.background = "#0FCDF3";
    h1.style.background = "#0FCDF3";
    h2.style.background = "#212A40";
    highlight1.style.color = "black";
    document.getElementsByClassName("Iron")[0].style.color = "black";
    highlight2.style.color = "white";
    document.getElementsByClassName("Carbon")[0].style.color = "white";
    document.getElementsByClassName("next_button")[0].style.top = "100%";
    document.getElementsByClassName("next_button")[0].style.transition = " top 0.5s";


    
    box.style = "opacity:0; top: 60%;";
    box.style.background = "linear-gradient(180deg, #FEAFC6 0%, #FA65A7 100%)";
    setTimeout(() => {
   remarks.innerText = "Awesome! But looks like the Fe atoms are again unequal."; 
    box.style = "opacity:1; top: 58.3%;";
    box.style.background = "linear-gradient(180deg, #12EAFA  0%,#0787E2 100%)";
     }, 400);



btn2.disabled = true; btn2.style.opacity = 0.4; btn2.style.border = "none";
btn3.disabled = false;btn3.style.opacity = 1;
btn3.style.border = "8px solid #0FCDF3 ";
btn4.disabled = true;btn4.style.opacity = 0.4; btn4.style.border = "none";
btn6.disabled = true;btn6.style.opacity = 0.4; btn6.style.border = "none";
btn7.disabled = false;btn7.style.opacity = 1;
btn7.style.border = "8px solid #0FCDF3 ";
btn8.disabled = true;btn8.style.opacity = 0.4; btn8.style.border = "none";
document.getElementsByClassName("C1")[0].style.opacity = "0";
document.getElementsByClassName("C2")[0].style.opacity = "0";
document.getElementsByClassName("Fe1")[0].style.opacity = "1";
document.getElementsByClassName("Fe1")[0].style.background = "linear-gradient(180deg, #12EAFA  0%, #0787E2 100%)"; 
document.getElementsByClassName("Fe2")[0].style.opacity = "1";
document.getElementsByClassName("Fe2")[0].style.background = "linear-gradient(180deg, #12EAFA  0%, #0787E2 100%)";  


}
else if (remarks.innerText == "Awesome! You have made Fe atoms equal on both sides and also the entire equation looks balanced.")
{sound.play();
    sound.playbackRate = 3; 
   movable_parent.style = "left: -1080px;";
   observation_tab.classList.remove('nav_selected');
   question_tab.classList.add('nav_selected2');
}

}

function oxygen_feedback() 
{ 

if (reactant_1.multiplier == 2 && product_2.multiplier == 3)
{

    box.style = "opacity:0; top: 60%;";
    box.style.background = "linear-gradient(180deg, #FFDDA9 0%, #FFC773 100%)";
    setTimeout(() => {
        remarks.innerText = "Awesome! You have balanced oxygen atoms on both sides.";
    box.style = "opacity:1; top: 58.3%;";
    box.style.background = "linear-gradient(180deg, #FFDDA9 0%, #FFC773 100%)";
     }, 400);



document.getElementsByClassName("next_button")[0].style.top = "1704px";
document.getElementsByClassName("next_button")[0].style.transition = " top 0.5s";
btn1.disabled = true; btn1.style.opacity = 0.4;btn1.style.border = "none";
btn4.disabled = true; btn4.style.opacity = 0.4;btn4.style.border = "none";
btn5.disabled = true; btn5.style.opacity = 0.4;btn5.style.border = "none";
btn8.disabled = true; btn8.style.opacity = 0.4;btn8.style.border = "none";

}
else{remarks.innerText = "Awesome! Let us next look to balance the oxygen atoms.";

}
}


function carbon_feedback()
{ 
if (reactant_2.multiplier == product_2.multiplier)
{
    if (reactant_2.multiplier == 3)
    {
        box.style = "opacity:0; top: 60%;";
        box.style.background = "linear-gradient(180deg, #FEAFC6 0%, #FA65A7 100%)";
        setTimeout(() => {
        remarks.innerText = "Awesome! You have balanced carbon atoms on both sides."
        box.style = "opacity:1; top: 58.3%;";
        box.style.background = "linear-gradient(180deg, #FEAFC6 0%, #FA65A7 100%)";
         }, 400);
        
        
        
    
    btn4.disabled = true; btn4.style.opacity = 0.4;btn4.style.border = "none";
    btn2.disabled = true; btn2.style.opacity = 0.4;btn2.style.border = "none";
    btn8.disabled = true; btn8.style.opacity = 0.4;btn8.style.border = "none";
    btn6.disabled = true; btn6.style.opacity = 0.4;btn6.style.border = "none";
    document.getElementsByClassName("next_button")[0].style.top = "1704px";
    document.getElementsByClassName("next_button")[0].style.transition = " top 0.5s";
}
    else{
        
        
        box.style = "opacity:0; top: 60%;";
        box.style.background = "linear-gradient(180deg, #FEAFC6 0%, #FA65A7 100%)";
        setTimeout(() => {
        remarks.innerText = "Oh! Carbon atoms are now equal, but that made the number of oxygen atoms unequal. Try using another coefficient."; 
        box.style = "opacity:1; top: 58.3%;";
        box.style.background = "linear-gradient(180deg, #FEAFC6 0%, #FA65A7 100%)";
         }, 400);
        
        
        
    }
}
    else{remarks.innerText = "Awesome! Let us look to balance the carbon atoms next.";

    }
}

function final_feedback()
{       
    if (reactant_1.multiplier == 2 && product_1.multiplier == 4)   
    {   document.getElementsByClassName("next_button")[0].style.top = "1704px";
    document.getElementsByClassName("next_button")[0].style.transition = " top 0.5s";
    document.getElementsByClassName("reset_button")[0].style.top = "1540px";
    document.getElementsByClassName("reset_button")[0].style.transition = " top 0.5s";
    document.getElementsByClassName("equation_container")[0].style.top = "1340px";
    document.getElementsByClassName("equation_container")[0].style.transition = " top 0.5s";

    btn1.style.display = "none"; btn2.style.display = "none";
    btn3.style.display = "none"; btn4.style.display = "none";
    btn5.style.display = "none"; btn6.style.display = "none";
    btn7.style.display = "none"; btn8.style.display = "none";
    highlight1.style.background = "#28334F";
h1.style.background = "#212A40";
h1.style.color = "white";
highlight1.style.color = "white";
document.getElementsByClassName("Iron")[0].style.color = "white";

    // btn3.disabled = "false"; btn3.style.opacity = 1;
    // btn1.style.border = "8px solid black";
    // btn1.disabled = "false"; btn1.style.opacity = 1;
    // btn3.style.border = "8px solid black";

    btn7.disabled = "true"; btn7.style.opacity = 0.4;btn7.style.border = "none";

    document.getElementsByClassName("Fe1")[0].style.opacity = "0";
    document.getElementsByClassName("Fe2")[0].style.opacity = "0";

    h1.innerText = "Fe";
    h1.style.color = "white";
    h2.innerText = "C";
    h2.style.color = "white";
    h3.innerText = "O";
    h3.style.color = "white";

    document.getElementsByClassName("Iron")[0].style.display = "none";
    document.getElementsByClassName("Carbon")[0].style.display = "none";
    document.getElementsByClassName("Oxygen")[0].style.display = "none";

        if (random ==0)
            {
                
         
        
         box.style = "opacity:0; top: 60%;";
         box.style.background = "linear-gradient(180deg, #12EAFA  0%,#0787E2 100%)";
         setTimeout(() => {
            remarks.innerText = "Awesome! You have made Fe atoms equal on both sides and also the entire equation looks balanced.";
         box.style = "opacity:1; top: 58.3%;";
         box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)"; 
          }, 400);
     
        
        
        }
        else{
            

 
            box.style = "opacity:0; top: 60%;";
            box.style.background = "linear-gradient(180deg, #12EAFA  0%,#0787E2 100%)";
            setTimeout(() => {
               
        remarks.innerText = "Yay! All the elements have equal atoms on both sides, which means the equation is balanced.";
            
   
            box.style = "opacity:1; top: 58.3%;";
            box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)"; 
             }, 400);
            }

        }
    else{remarks.innerText = "Awesome! But looks like the Fe atoms are again unequal.";
    
}
}




async function update_numbers()
{  

    
    document.getElementsByClassName("Iron")[0].style.opacity = "1";
    document.getElementsByClassName("Iron")[0].style.transform = "translate(13px,-1070%)";
    document.getElementsByClassName("Iron")[0].style.transition = "transform 1s";

    document.getElementsByClassName("Carbon")[0].style.opacity = "1";
    document.getElementsByClassName("Carbon")[0].style.transform = "translate(-300px,-920%)";
    document.getElementsByClassName("Carbon")[0].style.transition = "transform 1s";

    document.getElementsByClassName("Oxygen")[0].style.opacity = "1";
    document.getElementsByClassName("Oxygen")[0].style.transform = "translate(-30px,-750%)";
    document.getElementsByClassName("Oxygen")[0].style.transition = "transform 1s";


     await sleep (1500);

    document.getElementsByClassName("elm1")[0].style.opacity = "1";
    document.getElementsByClassName("elm1")[0].style.transform = "translate(280px,-1070%)";
    document.getElementsByClassName("elm1")[0].style.transition = "transform 1s";

    document.getElementsByClassName("elm4")[0].style.opacity = "1";
    document.getElementsByClassName("elm4")[0].style.transform = "translate(225px,-1070%)";
    document.getElementsByClassName("elm4")[0].style.transition = "transform 1s";


    

    await sleep (1500); 

    document.getElementsByClassName("elm3")[0].style.opacity = "1";
    document.getElementsByClassName("elm3")[0].style.transform = "translate(118px,-920%)";
    document.getElementsByClassName("elm3")[0].style.transition = "transform 1s";

    document.getElementsByClassName("elm5")[0].style.opacity = "1";
    document.getElementsByClassName("elm5")[0].style.transform = "translate(15px,-920%)";
    document.getElementsByClassName("elm5")[0].style.transition = "transform 1s";

    await sleep (1500);
    
    document.getElementsByClassName("elm2")[0].style.opacity = "1";
    document.getElementsByClassName("elm2")[0].style.transform = "translate(230px,-750%)";
    document.getElementsByClassName("elm2")[0].style.transition = "transform 1s";
    
    document.getElementsByClassName("elm6")[0].style.opacity = "1";
    document.getElementsByClassName("elm6")[0].style.transform = "translate(-115px,-750%)";
    document.getElementsByClassName("elm6")[0].style.transition = "transform 1s";
     
    await sleep (1500)
    update_check_column();

    await sleep (800)
    document.getElementsByClassName("next_button")[0].style.top = "1704px";
    document.getElementsByClassName("next_button")[0].style.transition = " top 0.5s";

    box.style.opacity = 1;  
    box.style = "opacity:0; top: 60%;";
    setTimeout(() => {
    remarks.innerText = "Click on the start button to start balancing the equation.";
    box.style = "opacity:1; top: 58.3%;";
     }, 400);
    // box.style.transition = "opacity 0.5s";
    // remarks.innerText = "Click on the start button to start balancing the equation.";
    document.getElementsByClassName("next_button")[0].innerText = "Start";

 }


    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }

function reset_instruction()

 { 
    sound.play();
    sound.playbackRate = 3;
    onload = window.location.reload(); 

 }


 