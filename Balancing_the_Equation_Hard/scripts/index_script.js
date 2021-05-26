var devicePixelRatio = window.devicePixelRatio;
var screenScaleRatio = 1080 / screen.width;
//console.log(devicePixelRatio);
var metaData = document.getElementsByName('viewport');
metaData[0].content = "width=device-width, initial-scale=" + 1 / screenScaleRatio.toString();
//console.log(metaData[0].content);
var loading_screen = document.getElementById('loading-screen');

// window.onresize = function () {
//     location.reload();
// }
/* For filling up the numbers which will slide */


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


var number_container = document.getElementsByClassName('numbers_container');

for (let elements of number_container) {
    // var random = Math.floor(Math.random() * 3 + 1);
    elements.style.top = (-0 * 100).toString() + '%';
    for (let j = 0; j < 4; j++) {
        var temp = document.createElement('span');
        temp.className = 'inside_number';
        temp.innerText = (j + 1);
        elements.append(temp);
    }
}
/*...Declaring the global variables for right/wrong check..*/
// var check_1 = document.getElementById('first_check');
// var check_2 = document.getElementById('second_check');
// var check_3 = document.getElementById('third_check');
var remarks = document.getElementById("para");
var btn1 = document.getElementById("button1");
var btn2 = document.getElementById("button2");
var btn3 = document.getElementById("button3");
var btn4 = document.getElementById("button4");
var btn5 = document.getElementById("button5");
var btn6 = document.getElementById("button6");
var btn7 = document.getElementById("button7");
var btn8 = document.getElementById("button8");
var sound = document.getElementById("button_sound");
var box = document.getElementById("color_change");
btn2.disabled = true;
btn2.style.opacity = 0.4;
btn4.disabled = true;
btn4.style.opacity = 0.4;
btn6.disabled = true;
btn6.style.opacity = 0.4;
btn8.disabled = true;
btn8.style.opacity = 0.4;
btn5.disabled = true;
btn5.style.opacity = 0.4;
btn7.disabled = true;
btn7.style.opacity = 0.4;
var highlight1 = document.getElementById("my_table").rows[1];
var h1 = document.getElementById("my_table").rows[1].cells[0];
var highlight2 = document.getElementById("my_table").rows[2];
var h2 = document.getElementById("my_table").rows[2].cells[0];
var highlight3 = document.getElementById("my_table").rows[3];
var h3 = document.getElementById("my_table").rows[3].cells[0];

highlight1.style.backgroundColor = "#4D5A7E";
h1.style.backgroundColor = "#3E4865";


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
        if (reactant_1.multiplier ==4){btn1.disabled = true; btn1.style.opacity =0.4;}
        btn5.disabled = false; btn5.style.opacity =1;
        update_reactant_column();
        update_check_column();
        paragraph_show();
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
        if (reactant_2.multiplier ==4){btn2.disabled = true; btn2.style.opacity =0.4;}
        btn6.disabled = false; btn6.style.opacity =1;
        reactant_2.update_element_numbers();
        update_reactant_column();
        update_check_column();
        paragraph_show();
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
            if (product_1.multiplier ==4){btn3.disabled = true; btn3.style.opacity =0.4;}
        btn7.disabled = false; btn7.style.opacity =1;
        product_1.update_element_numbers();
        update_product_column();
        update_check_column();
        paragraph_show();

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
        if (product_2.multiplier ==4){btn4.disabled = true; btn4.style.opacity =0.4;}
        btn8.disabled = false; btn8.style.opacity =1;
        product_2.update_element_numbers();
        update_product_column();
        update_check_column();
        paragraph_show();
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
        if (reactant_1.multiplier ==1){btn5.disabled = true; btn5.style.opacity =0.4;}
        btn1.disabled = false; btn1.style.opacity =1;
        reactant_1.update_element_numbers();
        update_reactant_column();
        update_check_column();
        paragraph_show();
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
        if (reactant_2.multiplier ==1){btn6.disabled = true; btn6.style.opacity =0.4;}
        btn2.disabled = false; btn2.style.opacity =1;
        reactant_2.update_element_numbers();
        update_reactant_column();
        update_check_column();
        paragraph_show();
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
        if (product_1.multiplier ==1){btn7.disabled = true; btn7.style.opacity =0.4;}
        btn3.disabled = false; btn3.style.opacity =1;
        product_1.update_element_numbers();
        random = 0;
        update_product_column();
        update_check_column();
        paragraph_show();
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
        if (product_2.multiplier ==1){btn8.disabled = true; btn8.style.opacity =0.4;}
        btn4.disabled = false; btn4.style.opacity =1;
        product_2.update_element_numbers();
        update_product_column();
        update_check_column();
        paragraph_show();
    }
}

var table_data = document.getElementsByTagName('td');

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
for (let i = 0; i < 4; i++) {
    reactant_column[i] = table_data[4 * i + 1];
    balance_column[i] = table_data[4 * i + 2];
    product_column[i] = table_data[4*i + 3];
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

update_reactant_column();
update_product_column();
update_check_column();


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


function paragraph_show()
{
if ( btn3.disabled == false || btn7.disabled == false)
{ if(btn1.disabled == false || btn5.disabled == false) 
   {
       iron_feedback();}
  else{final_feedback();}
}
else if (btn1.disabled == false || btn5.disabled == false)
{oxygen_feedback();}
else if (btn2.disabled == false || btn6.disabled == false && btn8.disabled == false)
{carbon_feedback();}
}



function iron_feedback()
{
  
var remarks = document.getElementById("para");
if (reactant_1.multiplier == 1 && product_1.multiplier == 2)
    {remarks.innerText = "Awesome! You have balanced iron atoms on both sides.";
    box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)";
    document.getElementsByClassName("next_button")[0].style.top = "1704px";
    document.getElementsByClassName("next_button")[0].style.transition = " top 0.5s";
    btn1.disabled = true;
    btn1.style.opacity = 0.4;
    btn3.disabled = true;
    btn3.style.opacity = 0.4;
    btn7.disabled = true;
    btn7.style.opacity = 0.4;
    }
 else if (reactant_1.multiplier == 2 && product_1.multiplier == 4)
    {remarks.innerText = "Awesome! Iron atoms are equal but you could have gotten it done with a much lower number. Try again.";
    box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)";
    }
    
else{remarks.innerText = "Let us start with Fe. Observe the number of atoms in the reactant and product side and try to make it equal on both sides.";}
box.style.background = "linear-gradient(180deg, #12EAFA  0%,#0787E2 100%)";}


function next_instruction()
{
var remarks = document.getElementById("para");
if (remarks.innerText == "Awesome! You have balanced iron atoms on both sides.")
{ sound.play();
    sound.playbackRate = 3;
    highlight1.style.backgroundColor = "#28334F";
    highlight3.style.backgroundColor = "#4D5A7E";
    h3.style.backgroundColor = "#3E4865";
    h1.style.backgroundColor = "#212A40";
remarks.innerText = "Awesome! Let us look to balance the oxygen atoms next.";
box.style.background = "linear-gradient(180deg, #12EAFA  0%,#0787E2 100%)";
btn4.disabled = false;
btn4.style.opacity = 1;
btn1.disabled = false;
btn1.style.opacity = 1;
// document.getElementsByClassName("next_button")[0].style.display = "none";
document.getElementsByClassName("next_button")[0].style.top = "100%";
    document.getElementsByClassName("next_button")[0].style.transition = " top 0.5s";
// btn8.disabled = false;
// btn8.style.opacity = 1;

}
else if (remarks.innerText == "Awesome! You have balanced oxygen atoms on both sides.")
{ sound.play();
    sound.playbackRate = 3;
    highlight3.style.backgroundColor = "#28334F";
    highlight2.style.backgroundColor = "#4D5A7E";
    h2.style.backgroundColor = "#3E4865";
    h3.style.backgroundColor = "#212A40";
  
remarks.innerText = "Awesome! Let us look to balance the carbon atoms next.";
box.style.background = "linear-gradient(180deg, #12EAFA  0%,#0787E2 100%)";
btn4.disabled = false; btn4.style.opacity = 1;
btn2.disabled = false; btn2.style.opacity = 1;
btn8.disabled = false; btn8.style.opacity = 1;
document.getElementsByClassName("next_button")[0].style.top = "100%";
document.getElementsByClassName("next_button")[0].style.transition = " top 0.5s";

// document.getElementsByClassName("next_button")[0].style.display = "none";
}
else if(remarks.innerText == "Awesome! You have balanced carbon atoms on both sides.")
{ sound.play();
    sound.playbackRate = 3;
    highlight2.style.backgroundColor = "#28334F";
    highlight1.style.backgroundColor = "#4D5A7E";
    h1.style.backgroundColor = "#3E4865";
    h2.style.backgroundColor = "#212A40";
    // document.getElementsByClassName("next_button")[0].style.display = "none";
    document.getElementsByClassName("next_button")[0].style.top = "100%";
    document.getElementsByClassName("next_button")[0].style.transition = " top 0.5s";
remarks.innerText = "Awesome! But looks like the Fe atoms are again unequal.";
box.style.background = "linear-gradient(180deg, #12EAFA  0%,#0787E2 100%)";
btn2.disabled = true; btn2.style.opacity = 0.4;
btn3.disabled = false;btn3.style.opacity = 1;
btn4.disabled = true;btn4.style.opacity = 0.4;
btn6.disabled = true;btn6.style.opacity = 0.4;
btn7.disabled = false;btn7.style.opacity = 1;
btn8.disabled = true;btn8.style.opacity = 0.4;
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

    // box.style = "opacity:0; top: 60%;";
    // setTimeout(() => {
    //     remarks.innerText = "Awesome! You have balanced oxygen atoms on both sides.";
    //     // box.style.setProperty("background", "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)");  
    //     // box.style = "background: linear-gradient(180deg, #FFE601 0%, #E8882F 100%)";
    //     box.style = "opacity:1; top: 58.3%;";
    // }, 500);


remarks.innerText = "Awesome! You have balanced oxygen atoms on both sides.";
box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)";

document.getElementsByClassName("next_button")[0].style.top = "1704px";
document.getElementsByClassName("next_button")[0].style.transition = " top 0.5s";
btn1.disabled = true; btn1.style.opacity = 0.4;
btn4.disabled = true; btn4.style.opacity = 0.4;
btn5.disabled = true; btn5.style.opacity = 0.4;
btn8.disabled = true; btn8.style.opacity = 0.4;

}
else{remarks.innerText = "Awesome! Let us next look to balance the oxygen atoms.";
box.style.background = "linear-gradient(180deg, #12EAFA  0%,#0787E2 100%)";}
}


function carbon_feedback()
{ 
if (reactant_2.multiplier == product_2.multiplier)
{
    if (reactant_2.multiplier == 3)
    {remarks.innerText = "Awesome! You have balanced carbon atoms on both sides."
    box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)";
    btn4.disabled = true; btn4.style.opacity = 0.4;
    btn2.disabled = true; btn2.style.opacity = 0.4;
    btn8.disabled = true; btn8.style.opacity = 0.4;
    btn6.disabled = true; btn6.style.opacity = 0.4;
    document.getElementsByClassName("next_button")[0].style.top = "1704px";
    document.getElementsByClassName("next_button")[0].style.transition = " top 0.5s";
}
    else{remarks.innerText = "Oh! Carbon atoms are now equal, but that made the number of oxygen atoms unequal. Try using another coefficient."; box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)";}
}
    else{remarks.innerText = "Awesome! Let us look to balance the carbon atoms next.";
box.style.background = "linear-gradient(180deg, #12EAFA  0%,#0787E2 100%)";}
}

function final_feedback()
{       
    if (reactant_1.multiplier == 2 && product_1.multiplier == 4)   
    {   document.getElementsByClassName("next_button")[0].style.top = "1704px";
    document.getElementsByClassName("next_button")[0].style.transition = " top 0.5s";
    btn3.disabled = true; btn3.style.opacity = 0.4;
    btn7.disabled = true; btn7.style.opacity = 0.4;
    highlight1.style.backgroundColor = "#28334F";
h1.style.backgroundColor = "#212A40";
        if (random ==0)
            {
                remarks.innerText = "Awesome! You have made Fe atoms equal on both sides and also the entire equation looks balanced.";
         box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)"; }
        else{
            remarks.innerText = "Yay! All the elements have equal atoms on both sides, which means the equation is balanced.";

            box.style.background = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)";}
        }
    else{remarks.innerText = "Awesome! But looks like the Fe atoms are again unequal.";
    
    box.style.background = "linear-gradient(180deg, #12EAFA  0%,#0787E2 100%)";}
}





