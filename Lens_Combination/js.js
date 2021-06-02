//sound Import
var click = new Audio('Sound/click.wav');
var correctSound = new Audio('Sound/rightAnswer.mp3');
var wrongSound = new Audio('Sound/wrongAnswer.mp3');
var dropSound = new Audio('Sound/dropSound.mp3');
var nextORFinish = new Audio('Sound/nextORfinish.mp3');
var optionClick = new Audio('Sound/optionClick.mp3');

//sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//question navigation bar onclick function
async function qeOnClick() {
    nextORFinish.play();
    document.getElementById('questionBar').classList.add('add');
    document.getElementById('observationBar').classList.remove('add');
    document.getElementsByClassName('childDiv')[0].classList.add('childDivAdd');
    document.getElementById('nextButton').style.display = 'none';
    document.getElementsByClassName('onlyBG')[0].style = 'left: calc(-1*var(--width));';
    document.getElementsByClassName('onlyBG')[1].style = 'left: calc(0*var(--width));';
    //obDiv.style.display='none';
    //qeDiv.style.display='block';
    obDiv.style.marginLeft = '-96%';
    qeDiv.style.marginLeft = '4.00%';
    if (footerState == false) {
        document.getElementById('footer').style.display = 'none';
    }
    await sleep(150);
    document.getElementById('qeSubmitButton').style.display = 'flex';
    await sleep(200);
    if (footerState) {
        document.getElementById('footer').style.display = 'block';
    }
}

//observation navigation bar onclick function
async function obOnClick() {
    nextORFinish.play();
    document.getElementById('observationBar').classList.add('add');
    document.getElementById('questionBar').classList.remove('add');
    document.getElementsByClassName('childDiv')[0].classList.remove('childDivAdd');
    document.getElementById('qeSubmitButton').style.display = 'none';
    document.getElementById('footer').style.display = 'none';
    document.getElementsByClassName('onlyBG')[0].style = 'left: calc(0*var(--width));';
    document.getElementsByClassName('onlyBG')[1].style = 'left: calc(1*var(--width));';
    //obDiv.style.display='block';
    //qeDiv.style.display='none'; 
    obDiv.style.marginLeft = '4.00%';
    qeDiv.style.marginLeft = '104.0%';
    await sleep(150);
    document.getElementById('nextButton').style.display = 'flex';
}

childDiv = document.getElementsByClassName('childDiv')[0];
qeDiv = document.getElementById('qeDiv');
obDiv = document.getElementById('obDiv');
var canvas1 = document.getElementById('firstCanvas');
var canvas2 = document.getElementById("secondCanvas");
var canvas3 = document.getElementById("thirdCanvas");
canvas2.style.background = "url('Images/LensBackground1.svg')";

//canvas width height change
if (window.innerWidth / window.innerHeight >= 9.0 / 16) {
    canvas1.width = window.innerHeight * (9 / 16) * 92 / 100;
    canvas1.height = canvas1.width * 0.55;
    canvas2.width = window.innerHeight * (9 / 16) * 92 / 100;
    canvas2.height = canvas1.width * 0.55;
    canvas3.width = window.innerHeight * (9 / 16) * 92 / 100;
    canvas3.height = canvas1.width * 0.55;
}
else {
    canvas1.width = window.innerWidth * 92 / 100;
    canvas1.height = canvas1.width * 0.55;
    canvas2.width = window.innerWidth * 92 / 100;
    canvas2.height = canvas1.width * 0.55;
    canvas3.width = window.innerHeight * (9 / 16) * 92 / 100;
    canvas3.height = canvas1.width * 0.55;

}

// window.onresize = function () {
//     location.reload();
// }


//xtransformation
function transX(x) {
    return originX + (x / xUnitsPerPixel)
}
//ytransformation
function transY(y) {
    return originY - (y / yUnitsPerPixel)
}


//xtransformation from canvas frame
function transX_from_canvas(x) {
    return (x - originX) * xUnitsPerPixel
}
//ytransformation from canvas frame
function transY_from_canvas(y) {
    return (originY - y) * yUnitsPerPixel
}


//Connection between canvases and variables
var ctx1 = canvas1.getContext("2d");
var ctx2 = canvas2.getContext("2d");
var ctx3 = canvas3.getContext("2d");



//setting graph's ranges
var xMin = -1;
var xMax = 9;
var yMin = -3.5;
var yMax = 3.5;



//setting scales and origin
var xUnitsPerPixel = (xMax - xMin) / canvas1.width;
var yUnitsPerPixel = (yMax - yMin) / canvas1.height;
var originX = (-xMin) / xUnitsPerPixel;
var originY = (yMax) / yUnitsPerPixel;

var convexImage = new Image();
convexImage.src = "Images/convexLens.svg";
var concaveImage = new Image();
concaveImage.src = "Images/concaveLens.svg";
var laserImg = new Image();
laserImg.src = 'Images/laser.svg';

function backgroundANDlaserImg() {
    //canvas2 backgroundColor
    var grd = ctx2.createLinearGradient(0, 0, 0, canvas2.height);
    grd.addColorStop(0, "#130d21");
    grd.addColorStop(0.5, "#241149");
    grd.addColorStop(1, "#130d21");
    //canvas laser
    //ctx2.fillStyle = grd;
    //ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
    //ctx2.drawImage(laserImg,transX(-1),transY(0.17),1/xUnitsPerPixel,(1/xUnitsPerPixel)*(laserImg.height/laserImg.width));
}

//ray drawing function
function Ray(x0, y0) {
    this.x0 = x0;
    this.y0 = y0;
    this.lensPos1State = 0;
    this.lensPos2State = 0;
    this.angle0 = 6;
    this.angleSet = function () {
        if (this.lensPos1State == 0) {
            this.angle1 = 0;
        }
        else if (this.lensPos1State == 1) {
            this.angle1 = -6;
        }
        else if (this.lensPos1State == -1) {
            this.angle1 = 5.1;
        }
        if (this.lensPos2State == 0) {
            this.angle2 = 0;
        }
        else if (this.lensPos2State == 1) {
            this.angle2 = -6;
        }
        else if (this.lensPos2State == -1) {
            this.angle2 = 5.1;
        }
    }


    this.x1 = 2.7;
    this.x2 = 5.1;
    this.x3 = 11;
    this.draw = function (raySign) {
        if (raySign < 0) {
            y0 = 0.20;
            this.y0 = y0;
        }
        else {
            y0 = 1.10;
            this.y0 = y0;
        }
        this.angleSet();
        ctx1.beginPath();
        ctx1.moveTo(transX(x0), transY(y0));
        this.y1 = raySign * Math.tan(this.angle0 * Math.PI / 180) * (this.x1 - this.x0) + y0;
        ctx1.lineTo(transX(this.x1), transY(this.y1));
        ctx1.lineWidth = '1';
        ctx1.strokeStyle = '#3bff21';
        ctx1.stroke();

        this.y2 = this.y1 + raySign * Math.tan((this.angle0 + this.angle1) * Math.PI / 180) * (this.x2 - this.x1);
        ctx1.lineTo(transX(this.x2), transY(this.y2));
        ctx1.stroke();


        this.y3 = this.y2 + raySign * Math.tan((this.angle0 + this.angle1 + this.angle2) * Math.PI / 180) * (this.x3 - this.x2);
        ctx1.lineTo(transX(this.x3), transY(this.y3));
        ctx1.stroke();

    }

}

window.onload = async function () {
    backgroundANDlaserImg();
    ray = new Ray(0.5, 1);
    ray.draw(1);
    ray.draw(-1);

    //ray.lensHolderDraw();
}
//drag and Drop Status
var firstDrop = false;
var secondDrop = false;

var FirstDropzoneLens = ''; //storing the id of the lens images
var SecondDropzoneLens = '';

//drag and drop function
document.getElementById('convexLensImg').draggable = "true";
let dragStartEv = document.getElementById('convexLensImg').addEventListener("dragstart", dragStartFunction);
var convexLens = document.getElementById('convexLensImg');
var concaveLens = document.getElementById('concaveLensImg');
// var Lensstyle = window.getComputedStyle(convexLens);

convexLens.addEventListener('touchstart', function (ev) {
    touchstart(ev);
})
convexLens.addEventListener('touchmove', function (ev) {
    touchmove(ev);
})
convexLens.addEventListener('touchend', function (ev) {
    touchend(ev);
    if (ev.target.getAttribute('dropzoneID') == 'obLensHolder1') {
        dropFunctionForLensHolder1Touch(ev);
    }
    else if (ev.target.getAttribute('dropzoneID') == 'obLensHolder2') {
        dropFunctionForLensHolder2Touch(ev);
    }

})
concaveLens.addEventListener('touchstart', function (ev) {
    touchstart(ev);
})
concaveLens.addEventListener('touchmove', function (ev) {
    touchmove(ev);
})
concaveLens.addEventListener('touchend', function (ev) {
    touchend(ev);
    if (ev.target.getAttribute('dropzoneID') == 'obLensHolder1') {
        dropFunctionForLensHolder1Touch(ev);
    }
    else if (ev.target.getAttribute('dropzoneID') == 'obLensHolder2') {
        dropFunctionForLensHolder2Touch(ev);
    }
})

document.getElementById('concaveLensImg').draggable = "true";
document.getElementById('concaveLensImg').addEventListener("dragstart", dragStartFunction);

document.getElementById('obLensHolder1').addEventListener("drop", dropFunctionForLensHolder1);
document.getElementById('obLensHolder1').addEventListener("dragover", dragOverFunction);
document.getElementById('obLensHolder2').addEventListener("drop", dropFunctionForLensHolder2);
document.getElementById('obLensHolder2').addEventListener("dragover", dragOverFunction);
async function dropFunctionForLensHolder1(event) {
    document.getElementById('obLensHolder1').classList.add('obLensHolder');
    firstDrop = true;
    dropSound.play();
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    //event.target.appendChild(document.getElementById(data));
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    if (data == 'convexLensImg') {
        ctx2.clearRect(0, 0, canvas1.width, canvas1.height);
        //document.getElementById('obLensHolder1').style.border='0.0rem solid white';
        ray.lensPos1State = 1;
        backgroundANDlaserImg();
        ctx2.drawImage(convexImage, transX(2.73) - (0.9 / xUnitsPerPixel) / 2, transY(0.73) - (0.9 / xUnitsPerPixel * (convexImage.height / convexImage.width)) / 2, 0.9 / xUnitsPerPixel, 0.92 / xUnitsPerPixel * (convexImage.height / convexImage.width));
        FirstDropzoneLens = data;
    }
    else if (data == 'concaveLensImg') {
        ctx2.clearRect(0, 0, canvas1.width, canvas1.height);
        //document.getElementById('obLensHolder1').style.border='0.0rem solid white';
        ray.lensPos1State = -1;
        backgroundANDlaserImg();
        ctx2.drawImage(concaveImage, transX(2.73) - (0.9 / xUnitsPerPixel) / 2, transY(0.73) - (0.9 / xUnitsPerPixel * (convexImage.height / convexImage.width)) / 2, 0.9 / xUnitsPerPixel, 0.92 / xUnitsPerPixel * (convexImage.height / convexImage.width));
        FirstDropzoneLens = data;
    }
    ray.draw(1);
    ray.draw(-1);
    document.getElementById('reloadButton').style.display = 'block';
    //obStatement popup
    document.getElementById('obPopupWindow').style = "opacity: 1;";
    document.getElementById('obPopupWindow').classList.add('obPopupWindowAdd');
    await sleep(300);
    document.getElementById('obPopupWindow').classList.remove('obPopupWindowAdd');

    if (secondDrop) {
        if (FirstDropzoneLens == 'convexLensImg' && SecondDropzoneLens == 'convexLensImg') {
            document.getElementById('obPopupWindow').innerHTML = 'Observe that the light converges first and then it converges further after passing through both the lenses.'; /*Convex - Convex Combination */
        }
        else if (FirstDropzoneLens == 'convexLensImg' && SecondDropzoneLens == 'concaveLensImg') {
            document.getElementById('obPopupWindow').innerHTML = 'Observe that the light converges first and then diverges after passing  through both the lenses.'; /*Convex - Concave Combination */
        }
        else if (FirstDropzoneLens == 'concaveLensImg' && SecondDropzoneLens == 'concaveLensImg') {
            document.getElementById('obPopupWindow').innerHTML = 'Observe that the light diverges first and then it diverges further after passing through both the lenses.'; /*Concave - Concave Combination */
        }
        else {
            document.getElementById('obPopupWindow').innerHTML = 'Observe that the light diverges first and then converges after passing through both the lenses.'; /* Else means Concave - Convex Combination */
        }
    }
    else {
        if (FirstDropzoneLens == 'convexLensImg') {
            document.getElementById('obPopupWindow').innerHTML = 'Observe that the convex lens converges the light ray. Go ahead and try out the other combinations as well.';
        }
        else {
            document.getElementById('obPopupWindow').innerHTML = 'Observe that the concave lens diverges the light ray. Go ahead and try out the other combinations as well.';
        }
    }

}
async function dropFunctionForLensHolder2(event) {
    document.getElementById('obLensHolder2').classList.add('obLensHolder');
    secondDrop = true;
    dropSound.play();
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    //event.target.appendChild(document.getElementById(data));
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    if (data == 'convexLensImg') {
        //document.getElementById('obLensHolder2').style.border='0.0rem solid white';
        ray.lensPos2State = 1;
        ctx3.clearRect(0, 0, canvas1.width, canvas1.height);
        ctx3.drawImage(convexImage, transX(5.2) - (0.9 / xUnitsPerPixel) / 2, transY(0.73) - (0.9 / xUnitsPerPixel * (convexImage.height / convexImage.width)) / 2, 0.9 / xUnitsPerPixel, 0.92 / xUnitsPerPixel * (convexImage.height / convexImage.width));
        SecondDropzoneLens = data;
    }
    else if (data == 'concaveLensImg') {
        //document.getElementById('obLensHolder2').style.border='0.0rem solid white';
        ray.lensPos2State = -1;
        ctx3.clearRect(0, 0, canvas1.width, canvas1.height);
        ctx3.drawImage(concaveImage, transX(5.2) - (0.9 / xUnitsPerPixel) / 2, transY(0.73) - (0.9 / xUnitsPerPixel * (convexImage.height / convexImage.width)) / 2, 0.9 / xUnitsPerPixel, 0.92 / xUnitsPerPixel * (convexImage.height / convexImage.width));
        SecondDropzoneLens = data;
    }
    ray.draw(1);
    ray.draw(-1);
    document.getElementById('reloadButton').style.display = 'block';
    document.getElementById('obPopupWindow').style = "opacity: 1;";
    document.getElementById('obPopupWindow').classList.add('obPopupWindowAdd');
    await sleep(300);
    document.getElementById('obPopupWindow').classList.remove('obPopupWindowAdd');
    if (firstDrop) {
        if (FirstDropzoneLens == 'convexLensImg' && SecondDropzoneLens == 'convexLensImg') {
            document.getElementById('obPopupWindow').innerHTML = 'Observe that the light converges first and then it converges further after passing through both the lenses.'; /*Convex - Convex Combination */
        }
        else if (FirstDropzoneLens == 'convexLensImg' && SecondDropzoneLens == 'concaveLensImg') {
            document.getElementById('obPopupWindow').innerHTML = 'Observe that the light converges first and then diverges after passing  through both the lenses.'; /*Convex - Concave Combination */
        }
        else if (FirstDropzoneLens == 'concaveLensImg' && SecondDropzoneLens == 'concaveLensImg') {
            document.getElementById('obPopupWindow').innerHTML = 'Observe that the light diverges first and then it diverges further after passing through both the lenses.'; /*Concave - Concave Combination */
        }
        else {
            document.getElementById('obPopupWindow').innerHTML = 'Observe that the light diverges first and then converges after passing through both the lenses.'; /* Else means Concave - Convex Combination */
        }
    }
    else {
        if (SecondDropzoneLens == 'convexLensImg') {
            document.getElementById('obPopupWindow').innerHTML = 'Observe that the convex lens converges the light ray. Go ahead and try out the other combinations as well.';
        }
        else {
            document.getElementById('obPopupWindow').innerHTML = 'Observe that the concave lens diverges the light ray. Go ahead and try out the other combinations as well.';
        }
    }
}

function dragOverFunction(event) {
    event.preventDefault();
}

function dragStartFunction(event) {
    event.dataTransfer.setData("text", event.target.id);

}

//Drop Function for touch
async function dropFunctionForLensHolder1Touch(event) {
    firstDrop = true;
    dropSound.play();
    event.preventDefault();
    var data = document.getElementById('obLensHolder1').getAttribute('draggedID');
    //event.target.appendChild(document.getElementById(data));
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    if (data == 'convexLensImg') {
        document.getElementById('obLensHolder1').classList.add('obLensHolder');
        ctx2.clearRect(0, 0, canvas1.width, canvas1.height);
        //document.getElementById('obLensHolder1').style.border='0.0rem solid white';
        ray.lensPos1State = 1;
        backgroundANDlaserImg();
        ctx2.drawImage(convexImage, transX(2.73) - (0.9 / xUnitsPerPixel) / 2, transY(0.73) - (0.9 / xUnitsPerPixel * (convexImage.height / convexImage.width)) / 2, 0.9 / xUnitsPerPixel, 0.92 / xUnitsPerPixel * (convexImage.height / convexImage.width));
        FirstDropzoneLens = data;
    }
    else if (data == 'concaveLensImg') {
        document.getElementById('obLensHolder1').classList.add('obLensHolder');
        ctx2.clearRect(0, 0, canvas1.width, canvas1.height);
        //document.getElementById('obLensHolder1').style.border='0.0rem solid white';
        ray.lensPos1State = -1;
        backgroundANDlaserImg();
        ctx2.drawImage(concaveImage, transX(2.73) - (0.9 / xUnitsPerPixel) / 2, transY(0.73) - (0.9 / xUnitsPerPixel * (convexImage.height / convexImage.width)) / 2, 0.9 / xUnitsPerPixel, 0.92 / xUnitsPerPixel * (convexImage.height / convexImage.width));
        FirstDropzoneLens = data;
    }
    ray.draw(1);
    ray.draw(-1);
    document.getElementById('reloadButton').style.display = 'block';
    //obStatement popup
    document.getElementById('obPopupWindow').style = "opacity: 1;";
    document.getElementById('obPopupWindow').classList.add('obPopupWindowAdd');
    await sleep(300);
    document.getElementById('obPopupWindow').classList.remove('obPopupWindowAdd');

    if (secondDrop) {
        if (FirstDropzoneLens == 'convexLensImg' && SecondDropzoneLens == 'convexLensImg') {
            document.getElementById('obPopupWindow').innerHTML = 'Observe that the light converges first and then it converges further after passing through both the lenses.'; /*Convex - Convex Combination */
        }
        else if (FirstDropzoneLens == 'convexLensImg' && SecondDropzoneLens == 'concaveLensImg') {
            document.getElementById('obPopupWindow').innerHTML = 'Observe that the light converges first and then diverges after passing  through both the lenses.'; /*Convex - Concave Combination */
        }
        else if (FirstDropzoneLens == 'concaveLensImg' && SecondDropzoneLens == 'concaveLensImg') {
            document.getElementById('obPopupWindow').innerHTML = 'Observe that the light diverges first and then it diverges further after passing through both the lenses.'; /*Concave - Concave Combination */
        }
        else {
            document.getElementById('obPopupWindow').innerHTML = 'Observe that the light diverges first and then converges after passing through both the lenses.'; /* Else means Concave - Convex Combination */
        }
    }
    else {
        if (FirstDropzoneLens == 'convexLensImg') {
            document.getElementById('obPopupWindow').innerHTML = 'Observe that the convex lens converges the light ray. Go ahead and try out the other combinations as well.';
        }
        else {
            document.getElementById('obPopupWindow').innerHTML = 'Observe that the concave lens diverges the light ray. Go ahead and try out the other combinations as well.';
        }
    }

}
async function dropFunctionForLensHolder2Touch(event) {

    secondDrop = true;
    dropSound.play();
    event.preventDefault();
    var data = document.getElementById('obLensHolder2').getAttribute('draggedID');
    //event.target.appendChild(document.getElementById(data));
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    if (data == 'convexLensImg') {
        document.getElementById('obLensHolder2').classList.add('obLensHolder');
        //document.getElementById('obLensHolder2').style.border='0.0rem solid white';
        ray.lensPos2State = 1;
        ctx3.clearRect(0, 0, canvas1.width, canvas1.height);
        ctx3.drawImage(convexImage, transX(5.2) - (0.9 / xUnitsPerPixel) / 2, transY(0.73) - (0.9 / xUnitsPerPixel * (convexImage.height / convexImage.width)) / 2, 0.9 / xUnitsPerPixel, 0.92 / xUnitsPerPixel * (convexImage.height / convexImage.width));
        SecondDropzoneLens = data;
    }
    else if (data == 'concaveLensImg') {
        document.getElementById('obLensHolder2').classList.add('obLensHolder');
        //document.getElementById('obLensHolder2').style.border='0.0rem solid white';
        ray.lensPos2State = -1;
        ctx3.clearRect(0, 0, canvas1.width, canvas1.height);
        ctx3.drawImage(concaveImage, transX(5.2) - (0.9 / xUnitsPerPixel) / 2, transY(0.73) - (0.9 / xUnitsPerPixel * (convexImage.height / convexImage.width)) / 2, 0.9 / xUnitsPerPixel, 0.92 / xUnitsPerPixel * (convexImage.height / convexImage.width));
        SecondDropzoneLens = data;
    }
    ray.draw(1);
    ray.draw(-1);
    document.getElementById('reloadButton').style.display = 'block';
    document.getElementById('obPopupWindow').style = "opacity: 1;";
    document.getElementById('obPopupWindow').classList.add('obPopupWindowAdd');
    await sleep(300);
    document.getElementById('obPopupWindow').classList.remove('obPopupWindowAdd');
    if (firstDrop) {
        if (FirstDropzoneLens == 'convexLensImg' && SecondDropzoneLens == 'convexLensImg') {
            document.getElementById('obPopupWindow').innerHTML = 'Observe that the light converges first and then it converges further after passing through both the lenses.'; /*Convex - Convex Combination */
        }
        else if (FirstDropzoneLens == 'convexLensImg' && SecondDropzoneLens == 'concaveLensImg') {
            document.getElementById('obPopupWindow').innerHTML = 'Observe that the light converges first and then diverges after passing  through both the lenses.'; /*Convex - Concave Combination */
        }
        else if (FirstDropzoneLens == 'concaveLensImg' && SecondDropzoneLens == 'concaveLensImg') {
            document.getElementById('obPopupWindow').innerHTML = 'Observe that the light diverges first and then it diverges further after passing through both the lenses.'; /*Concave - Concave Combination */
        }
        else {
            document.getElementById('obPopupWindow').innerHTML = 'Observe that the light diverges first and then converges after passing through both the lenses.'; /* Else means Concave - Convex Combination */
        }
    }
    else {
        if (SecondDropzoneLens == 'convexLensImg') {
            document.getElementById('obPopupWindow').innerHTML = 'Observe that the convex lens converges the light ray. Go ahead and try out the other combinations as well.';
        }
        else {
            document.getElementById('obPopupWindow').innerHTML = 'Observe that the concave lens diverges the light ray. Go ahead and try out the other combinations as well.';
        }
    }
}
//reload function
document.getElementById('reloadButton').onclick = async function () {
    click.play();
    document.getElementById('obLensHolder1').classList.remove('obLensHolder');
    document.getElementById('obLensHolder2').classList.remove('obLensHolder');
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx2.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx3.clearRect(0, 0, canvas1.width, canvas1.height);
    backgroundANDlaserImg();
    ray.lensPos1State = 0;
    ray.lensPos2State = 0;
    ray.draw(1);
    ray.draw(-1);
    this.style.display = 'none';
    firstDrop = false;
    secondDrop = false;
    document.getElementById('obPopupWindow').style = 'opacity: 0';
    document.getElementById('obPopupWindow').classList.add('obPopupWindowAdd');
    await sleep(300);
    document.getElementById('obPopupWindow').classList.remove('obPopupWindowAdd');
    document.getElementById('obPopupWindow').innerHTML = 'Drag and drop any lens to any of the dotted box';

}

//correct answer list and response answer list

var correctAnswer = [0, true, false, true]; //1st value is dummy to avoid 0th element
var responseAnswer = [0, false, false, false]; //1st value is dummy to avoid 0th element

option1 = document.getElementById('option1');
option2 = document.getElementById('option2');
option3 = document.getElementById('option3');
option4 = document.getElementById('option4');

option1Check = document.getElementById('option1Check');
option2Check = document.getElementById('option2Check');
option3Check = document.getElementById('option3Check');
option4Check = document.getElementById('option4Check');

var responseNumberCount = 0;
//options clicks function
option1.onclick = function () {
    optionClick.play();
    if (responseAnswer[1] == false) {
        responseAnswer[1] = true;
        option1.classList.add('qeOptionsAdd');
        option1Check.checked = true;
        responseNumberCount += 1;
        document.getElementById('qeSubmitButton').style.display = 'flex';
    }
    else {
        responseAnswer[1] = false;
        option1.classList.remove('qeOptionsAdd');
        option1Check.checked = false;
        responseNumberCount -= 1;
        if (responseNumberCount < 1) {
            document.getElementById('qeSubmitButton').style.display = 'none';
        }

    }

}
option2.onclick = function () {
    optionClick.play();
    if (responseAnswer[2] == false) {
        responseAnswer[2] = true;
        option2.classList.add('qeOptionsAdd');
        option2Check.checked = true;
        responseNumberCount += 1;
        document.getElementById('qeSubmitButton').style.display = 'flex';
    }
    else {
        responseAnswer[2] = false;
        option2.classList.remove('qeOptionsAdd');
        option2Check.checked = false;
        responseNumberCount -= 1;
        if (responseNumberCount < 1) {
            document.getElementById('qeSubmitButton').style.display = 'none';
        }
    }
}
option3.onclick = function () {
    optionClick.play();
    if (responseAnswer[3] == false) {
        responseAnswer[3] = true;
        option3.classList.add('qeOptionsAdd');
        option3Check.checked = true;
        responseNumberCount += 1;
        document.getElementById('qeSubmitButton').style.display = 'flex';
    }
    else {
        responseAnswer[3] = false;
        option3.classList.remove('qeOptionsAdd');
        option3Check.checked = false;
        responseNumberCount -= 1;
        if (responseNumberCount < 1) {
            document.getElementById('qeSubmitButton').style.display = 'none';
        }
    }
}
option4.onclick = function () {
    optionClick.play();
    if (responseAnswer[4] == false) {
        responseAnswer[4] = true;
        option4.classList.add('qeOptionsAdd');
        option4Check.checked = true;
        responseNumberCount += 1;
        document.getElementById('qeSubmitButton').style.display = 'flex';
    }
    else {
        responseAnswer[4] = false;
        option4.classList.remove('qeOptionsAdd');
        option4Check.checked = false;
        responseNumberCount -= 1;
        if (responseNumberCount < 1) {
            document.getElementById('qeSubmitButton').style.display = 'none';
        }
    }
}

//variables to determine the answer is fully correct or partial correct
var rightAnswerStatus = false;
var wrongAnswerStatus = false;

document.getElementById('qeSubmitButton').style.display = 'none';
//question submit function
footerState = false;
document.getElementById('qeSubmitButton').onclick = function () {
    footerState = true;
    if (document.getElementById('qeSubmitButton').innerHTML == 'Submit') {
        //document.getElementById('solutionDiv').style.display='flex';
        //document.getElementById('qeOptionBox').style.marginTop='20%';
        //document.getElementById('solutionDiv').style.marginTop='85%';
        //document.getElementById('rightWrongPopUp').style.marginTop='2%';

        for (i = 1; i <= correctAnswer.length - 1; i++) {
            // document.getElementById('option' + i.toString()).classList.remove('qeOptionsAdd');
            // document.getElementById('option' + i.toString()).style.pointerEvents = 'none';
            // if (responseAnswer[i] == true) {
            //     document.getElementById('option' + i.toString()).style.backgroundImage = 'linear-gradient(#FC7070, #EB5050)';
            // }
            // if (correctAnswer[i] == true) {
            //     document.getElementById('option' + i.toString()).style.backgroundImage = 'linear-gradient(#49BE47, #36A75C)';
            // }
            if (responseAnswer[i] == true) {
                if (responseAnswer[i] == correctAnswer[i]) {
                    rightAnswerStatus = true;
                    document.getElementById('option' + i.toString()).style = 'background-image: linear-gradient(#49BE47, #36A75C); color: #fff;';
                }
                else {
                    wrongAnswerStatus = true;
                    document.getElementById('option' + i.toString()).style = 'background-image: linear-gradient(#FC7070, #EB5050); color: #fff;';
                }
            }
            else {
                if (correctAnswer[i] == true) {
                    wrongAnswerStatus = true;
                }
            }
        }
        if (rightAnswerStatus == true && wrongAnswerStatus == true) {
            document.getElementById('questionInstruction').style.display = 'none';
            document.getElementById('rightWrongPopUp').style.opacity = '1';
            document.getElementById('rightWrongPopUp').style.color = 'rgb(251, 111, 111)';
            document.getElementById('qeSubmitButton').innerHTML = 'Retry';
            document.getElementById('rightWrongPopUp').innerHTML = '<label style="position: relative; font-size:1.2rem; font-weight: 500;">Oops!</label><label style = "width: 60%;"> Try again or swipe left to figure out the right answer.</label>';
            wrongSound.play();
        }
        else if (rightAnswerStatus == true && wrongAnswerStatus == false) {
            document.getElementById('questionInstruction').style.display = 'none';
            document.getElementById('qeSubmitButton').innerHTML = 'Finish';
            document.getElementById('footer').style.display = 'block';
            document.getElementById('solutionDiv').style.display = 'block';
            document.getElementById('qeStatement').style.display = 'flex';
            document.getElementById('questionImage').style.display = 'flex';
            document.getElementById('qeDiv').style.overflowY = "scroll";
            document.getElementById('qeDiv').style.scrollBehavior = 'smooth';
            document.getElementById('qeDiv').scrollTop = '215';
            document.getElementById('rightWrongPopUp').style.opacity = '1';
            document.getElementById('rightWrongPopUp').style.color = 'rgb(141, 212, 62)';
            document.getElementById('rightWrongPopUp').innerHTML = '<label style="position: relative; font-size:1.2rem; font-weight: 500;">Well Done!</label><label style = "width: 60%;"> You got the correct answer!</label>';
            correctSound.play();
            //Lo messaging
            LO_message.style = "z-index : 1;";
            LO_message.style.backgroundColor = '#000000cc';
            popup.style = 'opacity:2; top: calc(601*var(--newPixel));';
            circle_stroke_animation();
            setTimeout(function () {
                close_button.style.opacity = 1;
            }, 1000)
        }
        else {
            document.getElementById('questionInstruction').style.display = 'none';
            document.getElementById('rightWrongPopUp').style.opacity = '1';
            document.getElementById('rightWrongPopUp').style.color = 'rgb(251, 111, 111)';
            document.getElementById('qeSubmitButton').innerHTML = 'Retry';
            document.getElementById('rightWrongPopUp').innerHTML = '<label style="position: relative; font-size:1.2rem; font-weight: 500;">Oops!</label><label style = "width: 60%;"> Try again or swipe left to figure out the right answer.</label>';
            wrongSound.play();
        }
    }
    else if (document.getElementById('qeSubmitButton').innerHTML == 'Retry') {
        document.getElementById('qeSubmitButton').innerHTML = 'Submit';
        var options_parent = document.getElementsByClassName('qeOptions');
        document.getElementById('questionInstruction').style.display = 'block';
        document.getElementById('rightWrongPopUp').style.opacity = '0';
        for (let j = 0; j < options_parent.length; j++) {
            options_parent[j].style = "background-image: #fff; color: #000;";
            options_parent[j].children[0].checked = false;
        }
        rightAnswerStatus = false;
        wrongAnswerStatus = false;
        correctAnswer = [0, true, false, true]; //Please change this to its default value
        responseAnswer = [0, false, false, false]; //If you add
        responseNumberCount = 0;
        wrongAnswerStatus = false;
    }
    else {/* The finish Button */
        nextORFinish.play();
        window.location.reload();
    }
}