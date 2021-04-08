var devicePixelRatio = window.devicePixelRatio;
var screenScaleRatio = 1080/screen.width;
//console.log(devicePixelRatio);
var metaData = document.getElementsByName('viewport');
metaData[0].content = "width=device-width, initial-scale=" + 1/screenScaleRatio.toString();
//console.log(metaData[0].content);

//This is the main background
var background = document.createElement("section");
Object.assign(background, {id:"background"})
document.body.append(background);
var BG = document.createElement("img");
BG.src = "Sum of Like fracions/Elements/BG1.png";
background.append(BG);


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

//Intruction Area
var instructionArea = document.createElement('div');
background.append(instructionArea);
instructionArea.id = 'instructionArea';
instructionArea.innerHTML = 'Use the slider to make and add like fractions.';

//Two objects for the numbers
var number1 = {};
var number2 = {};

//Visual Area canvases defined here
var VisualArea = document.createElement("canvas");
VisualArea.height = '515';
VisualArea.width = '984';
VisualArea.id = 'BackCanvas';

var VisualArea2 = document.createElement("canvas");
VisualArea2.height = '515';
VisualArea2.width = '984';

var VisualArea3 = document.createElement("canvas");
VisualArea3.height = '515';
VisualArea3.width = '984';

var ctx3 = VisualArea3.getContext('2d');
var ctx2 = VisualArea2.getContext('2d');
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
box1DenominatorDiv.style = "left: 14.8%; background:#06b2bc;"

//second fraction box in the visual area
// var box2 = document.createElement('img');
// box2.src = "Sum of Like fracions/Elements/Box 02.png";
// background.append(box2);
// box2.style = "position:absolute; width: 100%; top: -1.56%;";
box2DenominatorDiv = document.createElement('div'); // Div for the denominator of the second number
box2DenominatorDiv.className = 'Number';
background.append(box2DenominatorDiv);
box2DenominatorDiv.style = "left: 47%; background:#06b2bc;"

//Div for the first number numerator
box1NumeratorDiv = document.createElement('div');
box1NumeratorDiv.className = 'Number';
background.append(box1NumeratorDiv);
box1NumeratorDiv.style = "left: 14.8%; top:43.7%; background:#e99d52;";

//Div for the second number numerator
box2NumeratorDiv = document.createElement('div');
box2NumeratorDiv.className = 'Number';
background.append(box2NumeratorDiv);
box2NumeratorDiv.style = "left: 47%; top:43.7%; background:#eb697a;";

//Div for the resulting number
var box3 = document.createElement('img');
// box3.src = "Sum of Like fracions/Elements/Box 03.png";
// background.append(box3);
// box3.style = "position: absolute; width: 100%; top: -30px; left: -15px; display:none;";
box3NumeratorDiv = document.createElement('div');
box3NumeratorDiv.className = 'Number';
background.append(box3NumeratorDiv);
box3NumeratorDiv.style = "left: 78%; top:43.7%; background:#fed219; display:none;";
box3DenominatorDiv = document.createElement('div'); // Div for the denominator of the third number
box3DenominatorDiv.className = 'Number';
background.append(box3DenominatorDiv);
box3DenominatorDiv.style = "left: 78%; background:#06b2bc; display:none;"

//div for horizontal bar for showing fraction
bar1 = document.createElement('div');
bar2 = document.createElement('div');
bar3 = document.createElement('div');
background.append(bar1, bar2, bar3);
bar1.className = 'bars';
bar2.className = 'bars';
bar3.className = 'bars';
bar1.style = "left:14%;";
bar2.style = "left: 46.4%;";
bar3.style = "left: 77.4%; display:none";

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
feedbackArea.innerText = "Set the denominator"


//The Initial Circle 1
var ctx = VisualArea.getContext("2d");
ctx.beginPath()
ctx.arc(150, 180, //position
    100, //radius
    0, 2*Math.PI);
ctx.strokeStyle = 'rgb(255, 255, 255)';
ctx.lineWidth = '5';
ctx.fillStyle = '#06b2bc';
ctx.fill();
ctx.stroke();
//The Initial Circle 2
ctx.beginPath()
ctx.arc(492, 180, 100, 0, 2*Math.PI);
ctx.strokeStyle = 'rgb(255, 255, 255)';
ctx.lineWidth = '5';
ctx.fillStyle = '#06b2bc';
ctx.fill();
ctx.stroke();

//The function for changing the denominator
function set_denominator(number) {
    box1DenominatorDiv.innerHTML = number_slider.value;
    box2DenominatorDiv.innerHTML = number_slider.value;
    numerical_pointer.style.left = (10 + 80/(number_slider.max - number_slider.min)*(number_slider.value-1)).toString() + '%';
    numerical_pointer.innerHTML = number_slider.value;
    ctx3.clearRect(0,0, VisualArea2.width, VisualArea2.height);
    if(number>1){
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
}

//Slider for changing the values
var number_slider = document.createElement('input');
Object.assign(number_slider, {type:'range', min: '1', max: '8', step: '1', value: '1', className: 'Slider'});
number_slider.oninput = function() {
    set_denominator(number_slider.value)};
background.append(number_slider);
box1DenominatorDiv.innerHTML = number_slider.value;  //For showing the default value
box2DenominatorDiv.innerHTML = number_slider.value;  //For showing the default value

//Numerical pointer
var numerical_pointer = document.createElement('div');
numerical_pointer.className = 'numerical_pointer';
numerical_pointer.style = 'left:10%; background:#06b2bc;';
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

//Div for creating the numerical slider
// var custom_slider_thumb = document.createElement('div');
// custom_slider_thumb.id = 'custom_slider_thumb';
// background.append(custom_slider_thumb);


//function for changing numerator of first number
function set_numeratorOne(number, denominator) {
    box1NumeratorDiv.innerHTML = number_slider.value;
    numerical_pointer.style.left = (10 + 80/(number_slider.max - number_slider.min)*(number_slider.value)).toString() + '%';
    numerical_pointer.innerHTML = number_slider.value;
    numerical_pointer.style.background = '#e99d52';
    sector_angle = 2*Math.PI/denominator;
    ctx2.clearRect(50, 80, 200, 200);
    ctx2.beginPath();
    ctx2.arc(150, 180, 100, 0, number*sector_angle);
    ctx2.lineTo(150, 180);
    ctx2.fillStyle = '#e99d52';
    ctx2.fill();
    ctx3.beginPath();
    ctx3.arc(150, 180, 100, 0, 2*Math.PI);
    ctx3.strokeStyle = 'white';
    ctx3.lineWidth = 5;
    ctx3.stroke();
}

//function for changing numerator of the second number
function set_numeratorTwo(number, denominator) {
    box2NumeratorDiv.innerHTML = number_slider.value;
    numerical_pointer.style.left = (10 + 80/(number_slider.max - number_slider.min)*(number_slider.value)).toString() + '%';
    numerical_pointer.innerHTML = number_slider.value;
    numerical_pointer.style.background = '#eb697a';
    sector_angle = 2*Math.PI/denominator;
    ctx2.clearRect(392,80, 200, 200);
    ctx2.beginPath();
    ctx2.arc(492, 180, 100, 0, number*sector_angle);
    ctx2.lineTo(492, 180);
    ctx2.fillStyle = '#eb697a';
    ctx2.lineWidth = '5';
    ctx2.fill();
    ctx3.beginPath();
    ctx3.arc(492, 180, 100, 0, 2*Math.PI);
    ctx3.strokeStyle = 'white';
    ctx3.lineWidth = 5;
    ctx3.stroke();
    
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
        //     ctx.fillStyle = '#06b2bc';
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
        feedbackArea.innerHTML = 'This is the sum of two like fractions';
        bar3.style.display = 'flex';
        box3NumeratorDiv.style.display = 'flex';
        box3DenominatorDiv.style.display = 'flex';

        equalSymbolDiv.innerHTML = '=';
        equalSymbolDiv.style = 'left: 655px';
        sector_angle = 2*Math.PI/denom;
        //The background resulting circle
        ctx.beginPath()
        ctx.arc(834, 180, //position
        100, //radius
        0, 2*Math.PI);
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.fillStyle = '#06b2bc';
        ctx.lineWidth = '5';
        ctx.fill();
        ctx.stroke();
            //For stroke sector lines
            if(denom !==1){
                for (let i = 0; i <= denom; i++) {
                    ctx3.beginPath();
                    ctx3.arc(834, 180, 100, i*sector_angle, (i+1)*sector_angle);
                    ctx3.lineTo(834, 180);
                    ctx3.strokeStyle = 'white';
                    ctx3.lineWidth = '5';
                    ctx3.stroke();
                    }
            }
            else{ctx3.beginPath();
                ctx3.arc(834, 180, 100, 0, 2*Math.PI);
                ctx3.strokeStyle = 'white';
                ctx3.lineWidth = '5';
                ctx3.stroke();
            }

            //For filling with orange or red part
            if(num1+num2==1 && denom == 1){
                if(num1 ==1){
                    ctx2.beginPath();
                    ctx2.arc(834, 180, 100, 0, 2*Math.PI);
                    ctx2.fillStyle = '#e99d52';
                    ctx2.fill();
                }
                else{
                    ctx2.beginPath();
                    ctx2.arc(834, 180, 100, 0, 2*Math.PI);
                    ctx2.fillStyle = '#eb697a';
                    ctx2.fill();
                }
            }
            else{
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
}

//Next Button
var NextButton = document.createElement('button');
NextButton.textContent = 'Next';
var NextButtonClickTimes = 0;
NextButton.onclick = function() {
    NextButtonClickTimes += 1;
    // console.log(NextButtonClickTimes);
    if (NextButtonClickTimes == 1) {
        feedbackArea.innerHTML = 'Set the numerator of the first fraction';
        const denominator = number_slider.value;
        number1.denominator = denominator; //Initialising the denominator of the first and second number
        number2.denominator = denominator;
        box1DenominatorDiv.innerHTML = denominator;
        box2DenominatorDiv.innerHTML = denominator;
            if(denominator==1){       //for checking whether the denominator is 1 or not
                number_slider.max = denominator;
                console.log(number_slider.max);
            }
            else{
                number_slider.max = denominator - 1;
                console.log(denominator, number_slider.max);
            }
        number_slider.min = 0;
        number_slider.value = 0;
        box1NumeratorDiv.innerHTML = number_slider.value;
        minValue.innerHTML = number_slider.min;
        maxValue.innerHTML = number_slider.max;
        numerical_pointer.style = 'left: 10%; background: #e99d52;';
        numerical_pointer.innerHTML = number_slider.min;
        number_slider.oninput = function (){
            set_numeratorOne(number_slider.value, denominator);
        }
    } 
    else if (NextButtonClickTimes == 2) {
        feedbackArea.innerHTML = 'Set the numerator of the second fraction';
        number1.numerator = number_slider.value;
        number_slider.value = 0;

        if(number1.numerator=='1' && number1.denominator=='1'){
            number_slider.max=0;
            maxValue.innerHTML = 1;
        }
        else{number_slider.max = parseInt(number1.denominator) - parseInt(number1.numerator);
            maxValue.innerHTML = number_slider.max;}
        
        box2NumeratorDiv.innerHTML = number_slider.value;
        numerical_pointer.innerHTML = number_slider.min;
        numerical_pointer.style = 'left: 10%; background:#eb697a;';
        number_slider.oninput = function (){
            set_numeratorTwo(number_slider.value, parseInt(number2.denominator));
            NextButton.textContent = 'Add numbers';
        }
    
    }
    else if (NextButtonClickTimes == 3){
        number2.numerator = number_slider.value;
        
        AddedResult(number1.numerator, number2.numerator, number1.denominator);
        
        NextButton.innerHTML = 'Reset';
        // number_slider.disabled = true;
        number_slider.style.display = 'none';
        numerical_pointer.style.display = 'none';
        maxValue.style.display = 'none';
        minValue.style.display = 'none';

    }
    else{
        window.location.reload();
    }
}
background.append(NextButton);
//console.log(bar3.style);
// console.log(screen.width);
