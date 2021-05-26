//console.log(devicePixelRatio);
var metaData = document.getElementsByName('viewport');

//console.log(metaData[0].content);

if (screen.width / screen.height < 9 / 16) {
    screenScaleRatio = 1080 / screen.width;
}
else {
    screenScaleRatio = 1920 / screen.height;
}
metaData[0].content = "width=device-width, initial-scale=" + 1 / screenScaleRatio.toString();
// console.log(document.getElementsByTagName('body')[0].style);


var loading_screen = document.getElementById('loading-screen');
window.onload = function () {
    loading_screen.style.display = 'none';
    background.style.display = 'flex';
}

// Following code is for question tab and observation tab transition
var navigation_bar = document.getElementsByClassName('navigation_bar');
var question_tab = navigation_bar[0].children[1];
var observation_tab = navigation_bar[0].children[0];
var movable_parent = document.getElementsByClassName('movable_parent')[0];

question_tab.onclick = function () {
    buttonAudio_Click.play();
    buttonAudio_Click.playbackRate = 1.5;
    movable_parent.style = "left: -1080px;";
    observation_tab.className = "observation_bar2";
    question_tab.className = "question_bar2";
}

observation_tab.onclick = function () {
    buttonAudio_Click.play();
    buttonAudio_Click.playbackRate = 1.5;
    movable_parent.style = "left: 0px";
    observation_tab.className = "observation_bar";
    question_tab.className = "question_bar";
}

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


//This is the main background
var background = document.getElementById("background");

//second BG or Question Page
var background2 = document.getElementById("background2");

//Navigation Bar
var navigation_bar = document.createElement('div');
background.append(navigation_bar);
navigation_bar.className = 'navigation_bar';
var observation_bar = document.createElement('div');
navigation_bar.append(observation_bar);
observation_bar.className = 'observation_bar';
observation_bar.innerHTML = 'Observation';
var question_bar = document.createElement('div');
question_bar.className = 'question_bar';
navigation_bar.append(question_bar);
question_bar.innerHTML = 'Question';
question_bar.onclick = function () {
    buttonAudio_Click.play();
    movable_parent.style = "left: calc(var(--width)*-1); ";
}

//Intruction Area
var instructionArea = document.createElement('div');
background.append(instructionArea);
instructionArea.id = 'instructionArea';
instructionArea.innerHTML = "Let's explore additon of like fractions using the following interaction.";

//Two objects for the numbers
var number1 = {};
var number2 = {};

//Visual Area canvases defined here
var VisualArea = document.createElement("canvas");
VisualArea.height = '631';
VisualArea.width = '984';
VisualArea.id = 'VisualArea';

var VisualArea2 = document.createElement("canvas");
VisualArea2.height = '631';
VisualArea2.width = '984';
VisualArea2.id = "VisualArea2";

var VisualArea3 = document.createElement("canvas");
VisualArea3.height = '631';
VisualArea3.width = '984';
VisualArea3.id = "VisualArea3";
VisualArea3.style = "opacity:0.5;";

var VisualArea4 = document.createElement("canvas");
VisualArea4.height = '631';
VisualArea4.width = '984';
VisualArea4.id = "VisualArea4";

var ctx = VisualArea.getContext("2d");
var ctx2 = VisualArea2.getContext('2d');
var ctx3 = VisualArea3.getContext('2d');
var ctx4 = VisualArea4.getContext('2d');

background.append(VisualArea4);
background.append(VisualArea);
background.append(VisualArea2);
background.append(VisualArea3);

//first fraction box in the visual area
// var box1 = document.createElement('img');
// box1.src = "Sum of Like fracions/Elements/Box 01.png";
// background.append(box1);
// box1.style = "position:absolute; width: 100%; top: -1.56%;";
box1DenominatorDiv = document.createElement('div'); // Div for the denominator of first number
box1DenominatorDiv.className = 'Number';
background.append(box1DenominatorDiv);
box1DenominatorDiv.style = "left: 228px; background:#40d6ce;"

//second fraction box in the visual area
// var box2 = document.createElement('img');
// box2.src = "Sum of Like fracions/Elements/Box 02.png";
// background.append(box2);
// box2.style = "position:absolute; width: 100%; top: -1.56%;";
box2DenominatorDiv = document.createElement('div'); // Div for the denominator of the second number
box2DenominatorDiv.className = 'Number';
background.append(box2DenominatorDiv);
box2DenominatorDiv.style = "left: 540px; background:#40d6ce;"

//Div for the first number numerator
box1NumeratorDiv = document.createElement('div');
box1NumeratorDiv.className = 'Number';
background.append(box1NumeratorDiv);
box1NumeratorDiv.style = "left: 228px; top:779px; background:#e99d52;";

//Div for the second number numerator
box2NumeratorDiv = document.createElement('div');
box2NumeratorDiv.className = 'Number';
background.append(box2NumeratorDiv);
box2NumeratorDiv.style = "left: 50%; top:779px; background:#ff78ca;";

//Div for the resulting number
var box3 = document.createElement('img');
// box3.src = "Sum of Like fracions/Elements/Box 03.png";
// background.append(box3);
// box3.style = "position: absolute; width: 100%; top: -30px; left: -15px; display:none;";
box3NumeratorDiv = document.createElement('div');
box3NumeratorDiv.className = 'Number';
background.append(box3NumeratorDiv);
box3NumeratorDiv.style = "left: 78.8%; top:779px; background:linear-gradient(0deg, #e99d52,#ff78ca); opacity:0.5;";
box3DenominatorDiv = document.createElement('div'); // Div for the denominator of the third number
box3DenominatorDiv.className = 'Number';
background.append(box3DenominatorDiv);
box3DenominatorDiv.style = "left: 78.8%; background:#40d6ce; opacity:0.5;"

//div for horizontal bar for showing fraction
bar1 = document.createElement('div');
bar2 = document.createElement('div');
bar3 = document.createElement('div');
background.append(bar1, bar2, bar3);
bar1.className = 'bars';
bar2.className = 'bars';
bar3.className = 'bars';
bar1.style = "left:228px;";
bar2.style = "left: 50%;";
bar3.style = "left: 78.8%; opacity:0.5";

//Div for plus and equal to symbol
var plusSymbolDiv = document.createElement('div');
var equalSymbolDiv = document.createElement('div');
background.append(plusSymbolDiv, equalSymbolDiv);
plusSymbolDiv.className = 'symbol';
equalSymbolDiv.className = 'symbol';
plusSymbolDiv.style = 'left:330px';
equalSymbolDiv.style = 'left: 645px; opacity:0.5;';
plusSymbolDiv.innerHTML = '+';
equalSymbolDiv.innerHTML = '=';


//The feedback area
var feedbackArea = document.createElement('div');
feedbackArea.id = 'feedbackArea';
var imageArray = new Array();
imageArray.length = 4;
for (let index = 0; index < imageArray.length; index++) {
    imageArray[index] = new Image();
    imageArray[index].src = "image/feedbackArea (" + (index + 1).toString() + ").png";
    imageArray[index].style = 'position:absolute; left:0px; top:-18px; width: 100%;';
}
background.append(feedbackArea);
feedbackArea.append(imageArray[0]);
var inside_feedback = document.createElement('p');
feedbackArea.append(inside_feedback);


//The Initial Circle 1
ctx.beginPath()
ctx.arc(180, 165, //position
    120, //radius
    0, 2 * Math.PI);
ctx.strokeStyle = 'rgb(255, 255, 255)';
ctx.lineWidth = '5';
ctx.fillStyle = '#40d6ce';
ctx.fill();
ctx.stroke();
//The Initial Circle 2
ctx2.beginPath()
ctx2.arc(492, 165, 120, 0, 2 * Math.PI);
ctx2.strokeStyle = 'rgb(255, 255, 255)';
ctx2.lineWidth = '5';
ctx2.fillStyle = '#40d6ce';
ctx2.fill();
ctx2.stroke();

//The Initial Circle 3
ctx3.beginPath()
ctx3.arc(804, 165, 120, 0, 2 * Math.PI);
ctx3.strokeStyle = 'rgb(255, 255, 255)';
ctx3.lineWidth = '5';
ctx3.fillStyle = '#40d6ce';
ctx3.fill();
ctx3.stroke();

//The function for changing the denominator
function set_denominator(number) {
    box1DenominatorDiv.innerHTML = number_slider.value;
    box2DenominatorDiv.innerHTML = number_slider.value;
    numerical_pointer.style.left = (10 + 80 / (number_slider.max - number_slider.min) * (number_slider.value - 1)).toString() + '%';
    numerical_pointer.innerHTML = number_slider.value;
    ctx.clearRect(0, 0, VisualArea2.width, VisualArea2.height);
    ctx2.clearRect(0, 0, VisualArea2.width, VisualArea2.height);
    //The Initial Circle 1
    ctx.beginPath()
    ctx.arc(180, 165, //position
        120, //radius
        0, 2 * Math.PI);
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.lineWidth = '5';
    ctx.fillStyle = '#40d6ce';
    ctx.fill();
    ctx.stroke();
    //The Initial Circle 2
    ctx2.beginPath()
    ctx2.arc(492, 165, 120, 0, 2 * Math.PI);
    ctx2.strokeStyle = 'rgb(255, 255, 255)';
    ctx2.lineWidth = '5';
    ctx2.fillStyle = '#40d6ce';
    ctx2.fill();
    ctx2.stroke();
    if (number > 1) {
        sector_angle = (2 * Math.PI / number);
        for (let i = 0; i <= number; i++) {
            ctx.beginPath();
            ctx.arc(180, 165, 120, i * sector_angle, (i + 1) * sector_angle);
            ctx.lineTo(180, 165);
            //ctx.fillStyle = '#4b9c98';
            //ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = '5';
            ctx.stroke();

            ctx2.beginPath();
            ctx2.arc(492, 165, 120, i * sector_angle, (i + 1) * sector_angle);
            ctx2.lineTo(492, 165);
            //ctx2.fillStyle = '#4b9c98';
            //ctx2.fill();
            ctx2.strokeStyle = 'white';
            ctx2.lineWidth = '5';
            ctx2.stroke();
        }

    }
}

//Slider for changing the values
var number_slider = document.createElement('input');
Object.assign(number_slider, { type: 'range', min: '1', max: '8', step: '1', value: '1', className: 'Slider' });
number_slider.oninput = function () {
    set_denominator(number_slider.value)
    sliderAudio_oninput.play();
    sliderAudio_oninputForward.play();
};
number_slider.onchange = function () {
    sliderAudio_onchange.play();
}
background.append(number_slider);
box1DenominatorDiv.innerHTML = number_slider.value;  //For showing the default value
box2DenominatorDiv.innerHTML = number_slider.value;  //For showing the default value

//Numerical pointer
var numerical_pointer = document.createElement('div');
numerical_pointer.className = 'numerical_pointer';
numerical_pointer.style = 'left:10%;';
numerical_pointer.innerHTML = number_slider.value;
background.append(numerical_pointer);

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

//Object for showing the marking on step slider
var marking = {
    number: '',
    add: function (parent) {
        var divArray = new Array();
        divArray.length = parseInt(this.number);
        d = 100 / (parseInt(this.number) - 1);
        for (let i = 0; i < divArray.length; i++) {
            divArray[i] = document.createElement('div');
            divArray[i].style = "position:absolute; border-radius: 5px; background:#ffffff; height:80%; width:10px; transform: translate(-50%, -50%); top:50%;";
            divArray[i].style.left = (i * d).toString() + '%';
            parent.append(divArray[i]);
        }
        divArray[0].style.left = "-2.5%";
        divArray[divArray.length - 1].style.left = "102.9%";
    },
    remove: function (parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
}

//marking container div
var marking_container = document.createElement('div');
marking_container.style = "position:absolute; width:80%; height: 60px; transform: translateY(-50%);";
marking_container.style.top = "80%";
background.append(marking_container);
marking.number = 8;
marking.add(marking_container);
// marking.remove(marking_container);

//function for changing numerator of first number
function set_numeratorOne(number, denominator) {
    box1NumeratorDiv.innerHTML = number_slider.value;
    numerical_pointer.style.left = (10 + 80 / (number_slider.max - number_slider.min) * (number_slider.value)).toString() + '%';
    numerical_pointer.innerHTML = number_slider.value;
    sector_angle = 2 * Math.PI / denominator;

    if (denominator != 1) {
        ctx.clearRect(0, 0, VisualArea.width, VisualArea.height);
        ctx.beginPath()
        //Initial Circle fill
        ctx.arc(180, 165, //position
            120, //radius
            0, 2 * Math.PI);
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineWidth = '5';
        ctx.fillStyle = '#40d6ce';
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(180, 165, 120, 0, number * sector_angle);
        ctx.lineTo(180, 165);
        ctx.fillStyle = '#e99d52';
        ctx.fill();

        for (let i = 0; i <= denominator; i++) {
            ctx.beginPath();
            ctx.arc(180, 165, 120, i * sector_angle, (i + 1) * sector_angle);
            ctx.lineTo(180, 165);
            //ctx.fillStyle = '#4b9c98';
            //ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = '5';
            ctx.stroke();
        }
    }
    else {
        ctx.clearRect(0, 0, VisualArea.width, VisualArea.height);
        if (number == 1) {
            ctx.beginPath()
            ctx.arc(180, 165, //position
                120, //radius
                0, 2 * Math.PI);
            ctx.strokeStyle = 'rgb(255, 255, 255)';
            ctx.lineWidth = '5';
            ctx.fillStyle = '#e99d52';
            ctx.fill();
            ctx.stroke();
        }
        else {
            ctx.beginPath()
            ctx.arc(180, 165, //position
                120, //radius
                0, 2 * Math.PI);
            ctx.strokeStyle = 'rgb(255, 255, 255)';
            ctx.lineWidth = '5';
            ctx.fillStyle = '#40d6ce';
            ctx.fill();
            ctx.stroke();
        }
    }
}

//function for changing numerator of the second number
function set_numeratorTwo(number, denominator) {
    box2NumeratorDiv.innerHTML = number_slider.value;
    numerical_pointer.style.left = (10 + 80 / (number_slider.max - number_slider.min) * (number_slider.value)).toString() + '%';
    numerical_pointer.innerHTML = number_slider.value;
    sector_angle = 2 * Math.PI / denominator;
    if (denominator != 1) {
        ctx2.clearRect(0, 0, VisualArea.width, VisualArea.height);
        ctx2.beginPath()
        ctx2.arc(492, 165, //position
            120, //radius
            0, 2 * Math.PI);
        ctx2.strokeStyle = 'rgb(255, 255, 255)';
        ctx2.lineWidth = '5';
        ctx2.fillStyle = '#40d6ce';
        ctx2.fill();
        ctx2.stroke();

        ctx2.beginPath();
        ctx2.arc(492, 165, 120, (denominator - number) * sector_angle, 2 * Math.PI);
        ctx2.lineTo(492, 165);
        ctx2.fillStyle = '#ff78ca';
        ctx2.fill();

        for (let i = 0; i <= denominator; i++) {
            ctx2.beginPath();
            ctx2.arc(492, 165, 120, i * sector_angle, (i + 1) * sector_angle);
            ctx2.lineTo(492, 165);
            //ctx.fillStyle = '#4b9c98';
            //ctx.fill();
            ctx2.strokeStyle = 'white';
            ctx2.lineWidth = '5';
            ctx2.stroke();
        }
    }
    else {
        ctx2.clearRect(0, 0, VisualArea.width, VisualArea.height);
        if (number == 1) {
            ctx2.beginPath()
            ctx2.arc(492, 165, //position
                120, //radius
                0, 2 * Math.PI);
            ctx2.strokeStyle = 'rgb(255, 255, 255)';
            ctx2.lineWidth = '5';
            ctx2.fillStyle = '#ff78ca';
            ctx2.fill();
            ctx2.stroke();
        }
        else {
            ctx2.beginPath()
            ctx2.arc(492, 165, //position
                120, //radius
                0, 2 * Math.PI);
            ctx2.strokeStyle = 'rgb(255, 255, 255)';
            ctx2.lineWidth = '5';
            ctx2.fillStyle = '#40d6ce';
            ctx2.fill();
            ctx2.stroke();
        }
    }
}

//Function for showing the result
function AddedResult(num1, num2, denom) {
    var num1 = parseFloat(num1);
    var num2 = parseFloat(num2);
    var denom = parseFloat(denom);
    box3NumeratorDiv.innerHTML = num1 + num2;
    box3DenominatorDiv.innerHTML = denom;
    if (num1 + num2 > denom) {
        // equalSymbolDiv.innerHTML = '=';
        //     sector_angle = 2*Math.PI/denom;
        //     ctx3.beginPath();// The outline of the answer circle 1
        //     ctx3.arc(750, 180, 70, 0, 2*Math.PI);
        //     ctx3.strokeStyle = 'white';
        //     ctx3.lineWidth = '3';
        //     ctx3.stroke();
        //     ctx3.beginPath();// Outline of the answer circle 2
        //     ctx3.arc(900, 180, 70, 0, 2*Math.PI);
        //     ctx3.strokeStyle = 'white';
        //     ctx3.lineWidth = '2';
        //     ctx3.stroke();

        //     //background fill for the answer circle 2
        //     ctx.beginPath();
        //     ctx.arc(900, 180, 70, 0, 2*Math.PI);
        //     ctx.fillStyle = '#40d6ce';
        //     ctx.fill();

        //         //The code for filling the first answer circle
        //     ctx2.beginPath();
        //     ctx2.arc(750, 180, 70, 0, num1*sector_angle);
        //     ctx2.lineTo(750, 180);
        //     ctx2.fillStyle = '#fed219';
        //     ctx2.fill();
        //     ctx2.beginPath();
        //     ctx2.arc(750, 180, 70, num1*sector_angle, (denom)*sector_angle);
        //     ctx2.lineTo(750, 180);
        //     ctx2.fillStyle = '#fed219';
        //     ctx2.fill();
        //         //code for filling up the second answer circle
        //     ctx2.beginPath();
        //     ctx2.arc(900, 180, 70, 0, (num1+num2-denom)*sector_angle);
        //     ctx2.lineTo(900, 180);
        //     ctx2.fillStyle = '#fed219';
        //     ctx2.fill();
        //     for (let i = 0; i <= denom; i++) {
        //         ctx3.beginPath();
        //         ctx3.arc(900, 180, 70, i*sector_angle, (i+1)*sector_angle);
        //         ctx3.lineTo(900, 180);
        //         ctx3.strokeStyle = 'white';
        //         ctx3.lineWidth = '3';
        //         ctx3.stroke();
        //         }

    }
    else {
        sector_angle = 2 * Math.PI / denom;
        ctx3.clearRect(0, 0, VisualArea3.width, VisualArea3.height);
        if (denom !== 1) {
            //The Initial Circle 3
            ctx3.beginPath()
            ctx3.arc(804, 165, 120, 0, 2 * Math.PI);
            ctx3.strokeStyle = 'rgb(255, 255, 255)';
            ctx3.lineWidth = '5';
            ctx3.fillStyle = '#40d6ce';
            ctx3.fill();
            ctx3.stroke();

            ctx3.beginPath();
            ctx3.arc(804, 165, 120, 0, num1 * sector_angle);
            ctx3.lineTo(804, 165);
            ctx3.fillStyle = '#e99d52';
            ctx3.fill();
            ctx3.beginPath();
            ctx3.arc(804, 165, 120, (denom - num2) * sector_angle, 2 * Math.PI);
            ctx3.lineTo(804, 165);
            ctx3.fillStyle = '#ff78ca';
            ctx3.fill();
            for (let i = 0; i <= denom; i++) {
                ctx3.beginPath();
                ctx3.arc(804, 165, 120, i * sector_angle, (i + 1) * sector_angle);
                ctx3.lineTo(804, 165);
                ctx3.strokeStyle = 'white';
                ctx3.lineWidth = '5';
                ctx3.stroke();
            }
        }
        else {
            if (num1 == 1) {
                ctx3.beginPath();
                ctx3.arc(804, 165, 120, 0, num1 * sector_angle);
                ctx3.strokeStyle = 'white';
                ctx3.lineWidth = 5;
                ctx3.fillStyle = '#e99d52'; // orange
                ctx3.fill();
                ctx3.stroke();
            }
            else if (num2 == 1) {
                ctx3.beginPath();
                ctx3.arc(804, 165, 120, (denom - num2) * sector_angle, 2 * Math.PI);
                ctx3.strokeStyle = 'white';
                ctx3.lineWidth = 5;
                ctx3.fillStyle = '#ff78ca'; // red
                ctx3.fill();
                ctx3.stroke();
            }
            else {
                ctx3.beginPath()
                ctx3.arc(804, 165, 120, 0, 2 * Math.PI);
                ctx3.strokeStyle = 'rgb(255, 255, 255)';
                ctx3.lineWidth = '5';
                ctx3.fillStyle = '#40d6ce'; // Green
                ctx3.fill();
                ctx3.stroke();
            }
        }
    }
}

//Next Button
var NextButton = document.createElement('button');
NextButton.textContent = 'Next';
NextButton.className = 'Next-Button'
var NextButtonClickTimes = 0;
NextButton.onclick = function () {
    NextButtonClickTimes += 1;
    buttonAudio_Click.play();
    if (NextButtonClickTimes == 1) {
        feedbackArea.style = "opacity:0; top: 60%;";
        setTimeout(() => {
            feedbackArea.removeChild(imageArray[0]);
            feedbackArea.appendChild(imageArray[1]);
            feedbackArea.style = "opacity:1; top: 58.3%;";
        }, 500);

        // feedbackArea.innerHTML = 'Set the numerator of the first fraction';
        VisualArea2.style.opacity = "0.5";
        box2DenominatorDiv.style.opacity = "0.5";
        box2NumeratorDiv.style.opacity = "0.5";
        bar2.style.opacity = "0.5";
        const denominator = number_slider.value;
        number1.denominator = denominator; //Initialising the denominator of the first and second number
        number2.denominator = denominator;
        box1DenominatorDiv.innerHTML = denominator;
        box2DenominatorDiv.innerHTML = denominator;
        if (denominator == 1) {       //for checking whether the denominator is 1 or not
            number_slider.max = denominator;
            // console.log(number_slider.max);
        }
        else {
            number_slider.max = denominator - 1;
            // console.log(denominator, number_slider.max);
        }
        number_slider.min = 0;
        number_slider.value = 0;
        box1NumeratorDiv.innerHTML = number_slider.value;
        minValue.innerHTML = number_slider.min;
        maxValue.innerHTML = number_slider.max;
        numerical_pointer.style = 'left: 10%; background: linear-gradient(180deg, #ffce94, #fdb52f);';
        numerical_pointer.innerHTML = number_slider.min;
        marking.remove(marking_container);
        marking.number = maxValue.innerHTML - number_slider.min + 1;
        marking.add(marking_container);
        number_slider.oninput = function () {
            sliderAudio_oninput.play();
            sliderAudio_oninputForward.play();
            set_numeratorOne(number_slider.value, denominator);
        }
    }
    else if (NextButtonClickTimes == 2) {
        feedbackArea.style = "opacity:0; top: 60%;";
        setTimeout(() => {
            feedbackArea.removeChild(imageArray[1]);
            feedbackArea.appendChild(imageArray[2]);
            feedbackArea.style = "opacity:1; top: 58.3%;";
        }, 500);
        VisualArea2.style.opacity = "1";
        box2DenominatorDiv.style.opacity = "1";
        box2NumeratorDiv.style.opacity = "1";
        bar2.style.opacity = "1";
        VisualArea.style.opacity = "0.5";
        box1DenominatorDiv.style.opacity = "0.5";
        box1NumeratorDiv.style.opacity = "0.5";
        bar1.style.opacity = "0.5";

        number1.numerator = number_slider.value;
        number_slider.value = 0;

        if (number1.numerator == '1' && number1.denominator == '1') {
            number_slider.max = 0;
            maxValue.innerHTML = 1;
        }
        else {
            number_slider.max = parseInt(number1.denominator) - parseInt(number1.numerator);
            maxValue.innerHTML = number_slider.max;
        }

        box2NumeratorDiv.innerHTML = number_slider.value;
        numerical_pointer.innerHTML = number_slider.min;
        numerical_pointer.style = 'left: 10%; background:linear-gradient(180deg, #ff69c3, #fc1a97);';
        marking.remove(marking_container);
        marking.number = maxValue.innerHTML - number_slider.min + 1;
        marking.add(marking_container);
        number_slider.oninput = function () {
            sliderAudio_oninput.play();
            sliderAudio_oninputForward.play();
            set_numeratorTwo(number_slider.value, parseInt(number2.denominator));
            NextButton.textContent = 'Add';
        }

    }
    else if (NextButtonClickTimes == 3) {
        feedbackArea.style = "opacity:0; top: 60%;";
        setTimeout(() => {
            feedbackArea.removeChild(imageArray[2]);
            inside_feedback.innerHTML = 'On adding two like fractions, the numerator of the fractions gets added and the denominator remains the same.';
            feedbackArea.style = "opacity:1; top: 58.3%;";
        }, 500);
        VisualArea.style.opacity = "1";
        box1DenominatorDiv.style.opacity = "1";
        box1NumeratorDiv.style.opacity = "1";
        bar1.style.opacity = "1";
        VisualArea3.style.opacity = "1";
        box3DenominatorDiv.style.opacity = "1";
        box3NumeratorDiv.style.opacity = "1";
        bar3.style.opacity = "1";
        equalSymbolDiv.style.opacity = 1;

        number2.numerator = number_slider.value;
        AddedResult(number1.numerator, number2.numerator, number1.denominator);
        NextButton.innerHTML = 'Next';
        // number_slider.disabled = true;
        number_slider.style.display = 'none';
        numerical_pointer.style.display = 'none';
        maxValue.style.display = 'none';
        minValue.style.display = 'none';
        marking_container.style.display = 'none';
        reset_button.style.display = '';
    }
    else {
        movable_parent.style = "left: -1080px;";
        observation_tab.className = "observation_bar2";
        question_tab.className = "question_bar2";
    }
}
background.append(NextButton);

var reset_button = document.getElementById('reset');

reset_button.onclick = function () {
    buttonAudio_Click.play();
    reset_this();
}

function reset_this() {
    NextButtonClickTimes = 0;
    //The initial Circle 1
    ctx.clearRect(0, 0, VisualArea.width, VisualArea.height);
    ctx2.clearRect(0, 0, VisualArea.width, VisualArea.height);
    ctx3.clearRect(0, 0, VisualArea.width, VisualArea.height);

    ctx.beginPath()
    ctx.arc(180, 165, //position
        120, //radius
        0, 2 * Math.PI);
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.lineWidth = '5';
    ctx.fillStyle = '#40d6ce';
    ctx.fill();
    ctx.stroke();

    //The Initial Circle 2
    ctx2.beginPath()
    ctx2.arc(492, 165, 120, 0, 2 * Math.PI);
    ctx2.strokeStyle = 'rgb(255, 255, 255)';
    ctx2.lineWidth = '5';
    ctx2.fillStyle = '#40d6ce';
    ctx2.fill();
    ctx2.stroke();

    //The Initial Circle 3
    ctx3.beginPath()
    ctx3.arc(804, 165, 120, 0, 2 * Math.PI);
    ctx3.strokeStyle = 'rgb(255, 255, 255)';
    ctx3.lineWidth = '5';
    ctx3.fillStyle = '#40d6ce';
    ctx3.fill();
    ctx3.stroke();

    //Setting the default styles for the elements
    VisualArea.style.opacity = 1;
    VisualArea2.style.opacity = 1;
    VisualArea3.style.opacity = 0.5;

    box1NumeratorDiv.style.opacity = 1;
    bar1.style.opacity = 1;
    box1DenominatorDiv.style.opacity = 1;

    box2NumeratorDiv.style.opacity = 1;
    bar2.style.opacity = 1;
    box2DenominatorDiv.style.opacity = 1;

    box3NumeratorDiv.style.opacity = 0.5;
    bar3.style.opacity = 0.5;
    box3DenominatorDiv.style.opacity = 0.5;

    equalSymbolDiv.style.opacity = 0.5;

    //reset the content
    box1NumeratorDiv.innerHTML = '';
    box1DenominatorDiv.innerHTML = 1;
    box2NumeratorDiv.innerHTML = '';
    box2DenominatorDiv.innerHTML = 1;
    box3NumeratorDiv.innerHTML = '';
    box3DenominatorDiv.innerHTML = '';

    //reset feedback area
    // feedbackArea.removeChild(feedbackArea.firstChild);
    feedbackArea.append(imageArray[0]);

    //reset slider
    number_slider.min = 1;
    number_slider.max = 8;
    number_slider.value = 1;
    number_slider.style.display = '';
    number_slider.oninput = function () {
        sliderAudio_oninput.play();
        sliderAudio_oninputForward.play();
        set_denominator(number_slider.value)
    };

    //reset min max box
    maxValue.style.display = '';
    maxValue.innerHTML = '8';
    minValue.style.display = '';
    minValue.innerHTML = '1';
    marking_container.style.display = '';

    //reset numerical_pointer
    numerical_pointer.style.display = '';
    numerical_pointer.style = 'left:10%; background:linear-gradient(0deg, #1db3aa,#4dd3cc) ;';
    numerical_pointer.innerHTML = number_slider.value;

    //reset marking
    marking.number = 8;
    marking.remove(marking_container);
    marking.add(marking_container);
    reset_button.style.display = 'none';
}