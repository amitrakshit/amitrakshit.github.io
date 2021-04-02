//This is the main background
var background = document.createElement("section");
Object.assign(background, {id:"background"})
document.body.append(background);
var BG = document.createElement("img");
BG.src = "Sum of Like fracions/Elements/BG1.png";
background.append(BG);

window.onload = function(){
var instructionArea = document.createElement('div');
background.append(instructionArea);
instructionArea.id = 'instructionArea';
instructionArea.innerHTML = 'Use the slider to make and add fractions. ';

//Two objects for the numbers
var number1 = {};
var number2 = {};

//Visual Area canvases defined here
var VisualArea = document.createElement("canvas");
VisualArea.height = '515';
VisualArea.width = '984';
VisualArea.id = 'BackCanvas';
VisualArea.style =
"position: absolute;\
border-radius: 20px;\
top: 560px;";

var VisualArea2 = document.createElement("canvas");
VisualArea2.height = '515';
VisualArea2.width = '984';
VisualArea2.style =
"position: absolute;\
border-radius: 20px;\
top: 560px;";

var VisualArea3 = document.createElement("canvas");
VisualArea3.height = '515';
VisualArea3.width = '984';
VisualArea3.style =
"position: absolute;\
border-radius: 20px;\
top: 560px;";
var ctx3 = VisualArea3.getContext('2d');
var ctx2 = VisualArea2.getContext('2d');
background.append(VisualArea);
background.append(VisualArea2);
background.append(VisualArea3);

//first fraction box in the visual area
var box1 = document.createElement('img');
box1.src = "Sum of Like fracions/Elements/Box 01.png";
background.append(box1);
box1.style = "position:absolute; width: 100%; top: -30px;";
box1DenominatorDiv = document.createElement('div'); // Div for the denominator of first number
box1DenominatorDiv.className = 'Number';
background.append(box1DenominatorDiv);
box1DenominatorDiv.style = "left: 160px;"

//second fraction box in the visual area
var box2 = document.createElement('img');
box2.src = "Sum of Like fracions/Elements/Box 02.png";
background.append(box2);
box2.style = "position:absolute; width: 100%; top: -30px;";
box2DenominatorDiv = document.createElement('div'); // Div for the denominator of the second number
box2DenominatorDiv.className = 'Number';
background.append(box2DenominatorDiv);
box2DenominatorDiv.style = "left: 508px;"

//Div for the first number numerator
box1NumeratorDiv = document.createElement('div');
box1NumeratorDiv.className = 'Number';
background.append(box1NumeratorDiv);
box1NumeratorDiv.style = "left: 160px; top:882px;";

//Div for the second number numerator
box2NumeratorDiv = document.createElement('div');
box2NumeratorDiv.className = 'Number';
background.append(box2NumeratorDiv);
box2NumeratorDiv.style = "left: 508px; top:882px;";

//Div for the resulting number
var box3 = document.createElement('img');
box3.src = "Sum of Like fracions/Elements/Box 03.png";
background.append(box3);
box3.style = "position: absolute; width: 100%; top: -30px; left: -15px; display:none;";
box3NumeratorDiv = document.createElement('div');
box3NumeratorDiv.className = 'Number';
background.append(box3NumeratorDiv);
box3NumeratorDiv.style = "left: 843px; top:882px;";
box3DenominatorDiv = document.createElement('div'); // Div for the denominator of the second number
box3DenominatorDiv.className = 'Number';
background.append(box3DenominatorDiv);
box3DenominatorDiv.style = "left: 843px;"

//Div for plus and equal to symbol
var plusSymbolDiv = document.createElement('div');
var equalSymbolDiv = document.createElement('div');
background.append(plusSymbolDiv, equalSymbolDiv);
plusSymbolDiv.className = 'symbol';
equalSymbolDiv.className = 'symbol';
plusSymbolDiv.style = 'left:315px';
equalSymbolDiv.style = 'left: 630px';
plusSymbolDiv.innerHTML = '+';


//The feedback area
var feedbackArea = document.createElement('div');
background.append(feedbackArea);
feedbackArea.id = 'feedbackArea';
feedbackArea.innerText = "Set the denominator of the fractions."

//The Initial Circle 1
var ctx = VisualArea.getContext("2d");
ctx.beginPath()
ctx.arc(150, 180, //position
    100, //radius
    0, 2*Math.PI);
ctx.strokeStyle = 'rgb(255, 255, 255)';
ctx.lineWidth = '5';
//ctx.fillStyle = '#4faea6';
//ctx.fill();
ctx.stroke();
//The Initial Circle 2
ctx.beginPath()
ctx.arc(492, 180, 100, 0, 2*Math.PI);
ctx.strokeStyle = 'rgb(255, 255, 255)';
ctx.lineWidth = '5';
//ctx.fillStyle = '#4faea6';
//ctx.fill();
ctx.stroke();

//The function for changing the denominator
function set_denominator(number) {
    box1DenominatorDiv.innerHTML = number_slider.value;
    box2DenominatorDiv.innerHTML = number_slider.value;
    ctx3.clearRect(0,0, VisualArea2.width, VisualArea2.height);
    sector_angle = (2*Math.PI/number);
    for (let i = 0; i <= number; i++) {
    ctx3.beginPath();
    ctx3.arc(150, 180, 100, i*sector_angle, (i+1)*sector_angle);
    ctx3.lineTo(150, 180);
    //ctx.fillStyle = '#4b9c98';
    //ctx.fill();
    ctx3.strokeStyle = 'white';
    ctx3.lineWidth = '5';
    ctx3.stroke();

    ctx3.beginPath();
    ctx3.arc(492, 180, 100, i*sector_angle, (i+1)*sector_angle);
    ctx3.lineTo(492, 180);
    //ctx2.fillStyle = '#4b9c98';
    //ctx2.fill();
    ctx3.strokeStyle = 'white';
    ctx3.lineWidth = '5';
    ctx3.stroke();
    }
}

//Slider for changing the values
var number_slider = document.createElement('input');
Object.assign(number_slider, {type:'range', min: '1', max: '8', step: '1', value: '1', className: 'Slider'});
number_slider.oninput
number_slider.oninput = function() {
set_denominator(number_slider.value)};
number_slider.style = "position: absolute; width: 85%; top: 78%;";
background.append(number_slider);
box1DenominatorDiv.innerHTML = number_slider.value;  //For showing the default value
box2DenominatorDiv.innerHTML = number_slider.value;  //For showing the default value

//Div for showing the min and max value of the range slider
var minValue = document.createElement('div');
var maxValue = document.createElement('div');
minValue.className = 'RangeValues';
maxValue.className = 'RangeValues';
minValue.style.left = '50px';
maxValue.style.right = '50px';
minValue.innerHTML = number_slider.min;
maxValue.innerHTML = number_slider.max;
background.append(minValue, maxValue);

//function for changing numerator of first number
function set_numeratorOne(number, denominator) {
    box1NumeratorDiv.innerHTML = number_slider.value;
    sector_angle = 2*Math.PI/denominator;
    ctx2.clearRect(50,80, 200, 200);
    ctx2.beginPath();
    ctx2.arc(150, 180, 100, 0, number*sector_angle);
    ctx2.lineTo(150, 180);
    ctx2.fillStyle = '#e99d52';
    ctx2.fill();
}

//function for changing numerator of the second number
function set_numeratorTwo(number, denominator) {
    box2NumeratorDiv.innerHTML = number_slider.value;
    sector_angle = 2*Math.PI/denominator;
    ctx2.clearRect(392,80, 200, 200);
    ctx2.beginPath();
    ctx2.arc(492, 180, 100, 0, number*sector_angle);
    ctx2.lineTo(492, 180);
    ctx2.fillStyle = '#eb697a';
    //ctx2.lineWidth = '8';
    ctx2.fill();
}

//Function for showing the result
function AddedResult(num1, num2, denom) {
    var num1 = parseFloat(num1);
    var num2 = parseFloat(num2);
    var denom = parseFloat(denom);
    box3NumeratorDiv.innerHTML = num1 + num2;
    box3DenominatorDiv.innerHTML = denom;
    if (num1+num2 > denom) {
        feedbackArea.innerHTML = "The result is an improper fraction.";
        equalSymbolDiv.innerHTML = '=';
            sector_angle = 2*Math.PI/denom;// The outline of the answer circle
            ctx3.beginPath();
            ctx3.arc(750, 180, 70, 0, 2*Math.PI);
            ctx3.strokeStyle = 'white';
            ctx3.lineWidth = '3';
            ctx3.stroke();
            ctx.beginPath();// Outline of the answer circle 2
            ctx.arc(900, 180, 70, 0, 2*Math.PI);
            ctx.strokeStyle = 'white';
            ctx.lineWidth = '2';
            ctx.stroke();

                //The code for filling the first answer circle
            ctx2.beginPath();
            ctx2.arc(750, 180, 70, 0, num1*sector_angle);
            ctx2.lineTo(750, 180);
            ctx2.fillStyle = '#e99d52';
            ctx2.fill();
            ctx2.beginPath();
            ctx2.arc(750, 180, 70, num1*sector_angle, (denom)*sector_angle);
            ctx2.lineTo(750, 180);
            ctx2.fillStyle = '#eb697a';
            ctx2.fill();
                //code for filling up the second answer circle
            ctx2.beginPath();
            ctx2.arc(900, 180, 70, 0, (num1+num2-denom)*sector_angle);
            ctx2.lineTo(900, 180);
            ctx2.fillStyle = '#eb697a';
            ctx2.fill();
            for (let i = 0; i <= denom; i++) {
                ctx3.beginPath();
                ctx3.arc(900, 180, 70, i*sector_angle, (i+1)*sector_angle);
                ctx3.lineTo(900, 180);
                ctx3.strokeStyle = 'white';
                ctx3.lineWidth = '3';
                ctx3.stroke();
                }

    }
    else {
        equalSymbolDiv.innerHTML = '=';
        equalSymbolDiv.style = 'left: 655px';
        sector_angle = 2*Math.PI/denom;
        ctx.beginPath()
        ctx.arc(834, 180, //position
        100, //radius
        0, 2*Math.PI);
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineWidth = '5';
        ctx.stroke();
        for (let i = 0; i <= denom; i++) {
            ctx3.beginPath();
            ctx3.arc(834, 180, 100, i*sector_angle, (i+1)*sector_angle);
            ctx3.lineTo(834, 180);
            ctx3.strokeStyle = 'white';
            ctx3.lineWidth = '5';
            ctx3.stroke();
            }
        ctx2.beginPath();
        ctx2.arc(834, 180, 100, 0, num1*sector_angle);
        ctx2.lineTo(834, 180);
        ctx2.fillStyle = '#e99d52';
        ctx2.fill();
        ctx2.beginPath();
        ctx2.arc(834, 180, 100, num1*sector_angle, (num1+num2)*sector_angle);
        ctx2.lineTo(834, 180);
        ctx2.fillStyle = '#eb697a';
        ctx2.fill();
        }
}
    //Next Button
var NextButton = document.createElement('button');
NextButton.textContent = 'Next';
var NextButtonClickTimes = 0;
NextButton.onclick = function() {
    NextButtonClickTimes += 1;
    // console.log(NextButtonClickTimes);
    if (NextButtonClickTimes == 1) {
        feedbackArea.innerHTML = 'Set the numerator of the first Number';
        const denominator = number_slider.value;
        box1DenominatorDiv.innerHTML = denominator;
        box2DenominatorDiv.innerHTML = denominator;
        number_slider.max = denominator;
        number_slider.min = 0;
        number_slider.value = 0;
        box1NumeratorDiv.innerHTML = number_slider.value;
        minValue.innerHTML = number_slider.min;
        maxValue.innerHTML = number_slider.max;
        number_slider.oninput = function (){
            set_numeratorOne(number_slider.value, denominator);
        }
        number1.denominator = denominator; //Initialising the denominator of the first and second number
        number2.denominator = denominator;
    } 
    else if (NextButtonClickTimes == 2) {
        feedbackArea.innerHTML = 'Set the numerator of the second Number';
        number1.numerator = number_slider.value;
        number_slider.value = 0;
        box2NumeratorDiv.innerHTML = number_slider.value;
        number_slider.oninput = function (){
            set_numeratorTwo(number_slider.value, number_slider.max);
            NextButton.textContent = 'Add numbers';
        }
    
    }
    else if (NextButtonClickTimes == 3){
        number2.numerator = number_slider.value;
        box3.style.display = 'inline';
        AddedResult(number1.numerator, number2.numerator, number1.denominator);
        feedbackArea.innerHTML = 'Check the result.';
        NextButton.innerHTML = 'Reset';
    }
    else{
        window.location.reload();
    }
}
background.append(NextButton);
}
