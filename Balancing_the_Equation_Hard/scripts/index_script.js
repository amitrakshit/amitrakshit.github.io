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
var observation_tab = navigation_bar[1].children[0];
var movable_parent = document.getElementsByClassName('movable_parent')[0];
question_tab.onclick = function () {
   movable_parent.style = "left: -1080px;";
}

observation_tab.onclick = function () {
   movable_parent.style = "left: 0px";
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
var check_1 = document.getElementById('first_check');
var check_2 = document.getElementById('second_check');
var check_3 = document.getElementById('third_check');
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
btn2.disabled = true;
btn2.style.opacity = 0.4;
btn4.disabled = true;
btn4.style.opacity = 0.4;
btn6.disabled = true;
btn6.style.opacity = 0.4;
btn8.disabled = true;
btn8.style.opacity = 0.4;


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
        product_1.update_element_numbers();
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
        product_2.update_element_numbers();
        update_product_column();
        update_check_column();
        paragraph_show();
    }
}

var table_data = document.getElementsByTagName('td');
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
if (reactant_column[0].innerText != product_column[0].innerText)
{
    check_1.classList.remove("right");
    check_1.classList.add("wrong");
}else
{
    check_1.classList.remove("wrong");
    check_1.classList.add("right");
}

if (reactant_column[1].innerText != product_column[1].innerText){
    check_2.classList.remove("right");
    check_2.classList.add("wrong");
}else 
{
    check_2.classList.remove("wrong");
    check_2.classList.add("right");
}
if (reactant_column[2].innerText != product_column[2].innerText)
{
    check_3.classList.remove("right");
    check_3.classList.add("wrong");
}else
{
    check_3.classList.remove("wrong");
    check_3.classList.add("right");
}
}


function paragraph_show()
{
if ( btn3.disabled == false && btn7.disabled == false)
{ if(btn1.disabled == false && btn5.disabled == false) {iron_feedback();}
  else{final_feedback();}
}
else if (btn1.disabled == false && btn4.disabled == false && btn5.disabled == false && btn8.disabled == false)
{oxygen_feedback();}
else if (btn2.disabled == false && btn4.disabled == false && btn6.disabled == false && btn8.disabled == false)
{carbon_feedback();}
}


function iron_feedback()
{
var remarks = document.getElementById("para");
if (reactant_1.multiplier == 1 && product_1.multiplier == 2)
    {remarks.innerText = "Awesome! You have balanced iron atoms on both sides.";}
 else if (reactant_1.multiplier == 2 && product_1.multiplier == 4)
    {remarks.innerText = "Awesome! Iron atoms are equal but you could have gotten it done with a much lower number. Try again.";}
    
else{remarks.innerText = "Iron atoms are not balanced. Try making the number of iron atoms equal on both reactant and product side.";}
}

function next_instruction()
{
var remarks = document.getElementById("para");
if (remarks.innerText == "Awesome! You have balanced iron atoms on both sides.")
{ sound.play();
remarks.innerText = "Awesome! Let us look to balance the oxygen atoms next.";
btn3.disabled = true;
btn3.style.opacity = 0.4;
btn4.disabled = false;
btn4.style.opacity = 1;
btn7.disabled = true;
btn7.style.opacity = 0.4;
btn8.disabled = false;
btn8.style.opacity = 1;
}
else if (remarks.innerText == "Awesome! You have balanced oxygen atoms on both sides")
{ sound.play();
remarks.innerText = "Awesome! Let us look to balance the carbon atoms next.";
btn1.disabled = true; btn1.style.opacity = 0.4;
btn2.disabled = false; btn2.style.opacity = 1;
btn5.disabled = true; btn5.style.opacity = 0.4;
btn6.disabled = false; btn6.style.opacity = 1;
}
else if(remarks.innerText == "Awesome! You have balanced carbon atoms on both sides.")
{ sound.play();
remarks.innerText = "Awesome! But looks like the Fe atoms are again unequal.";
btn2.disabled = true; btn2.style.opacity = 0.4;
btn3.disabled = false;btn3.style.opacity = 1;
btn4.disabled = true;btn4.style.opacity = 0.4;
btn6.disabled = true;btn6.style.opacity = 0.4;
btn7.disabled = false;btn7.style.opacity = 1;
btn8.disabled = true;btn8.style.opacity = 0.4;
}
else if (remarks.innerText == "Awesome! You have made Fe atoms equal on both sides and also the entire equation looks balanced.")
{sound.play();

    movable_parent.style = "left: -1080px;";
}

}

function oxygen_feedback() 
{
if (reactant_1.multiplier == 2 && product_2.multiplier == 3)
{remarks.innerText = "Awesome! You have balanced oxygen atoms on both sides";}
else{remarks.innerText = "Oxygen atoms are not balanced. Try making the number of oxygen atoms equal on both reactant and product side";}
}


function carbon_feedback()
{
if (reactant_2.multiplier == product_2.multiplier)
{
    if (reactant_2.multiplier == 3)
    {remarks.innerText = "Awesome! You have balanced carbon atoms on both sides."}
    else{remarks.innerText = "This number has unbalanced the oxygen atoms, lets try some other number to balance the carbon atoms."}
}
else{remarks.innerText = "Carbon atoms are not balanced. Try making the number of carbon atoms equal on both reactant and product side."}
}

function final_feedback()
{
    if (reactant_1.multiplier == 2 && product_1.multiplier == 4)   
    {remarks.innerText = "Awesome! You have made Fe atoms equal on both sides and also the entire equation looks balanced.";}
    else{remarks.innerText = "Observe that the number of Fe atoms are unequal on both the sides.";}
}





