
//sound Import
var click=new Audio('Sound/click.wav');
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
function qeOnClick(){
    nextORFinish.play();
    document.getElementById('questionBar').classList.add('add');
    document.getElementById('observationBar').classList.remove('add');
    document.getElementsByClassName('childDiv')[0].classList.add('childDivAdd');
    //obDiv.style.display='none';
    //qeDiv.style.display='block';
    obDiv.style.marginLeft='-96%';
    qeDiv.style.marginLeft='4.00%';
    
    
}

//observation navigation bar onclick function
function obOnClick(){
    nextORFinish.play();
    document.getElementById('observationBar').classList.add('add');
    document.getElementById('questionBar').classList.remove('add');
    document.getElementsByClassName('childDiv')[0].classList.remove('childDivAdd');
    //obDiv.style.display='block';
    //qeDiv.style.display='none'; 
    obDiv.style.marginLeft='4.00%';
    qeDiv.style.marginLeft='104.0%';
    
}

childDiv=document.getElementsByClassName('childDiv')[0];
qeDiv=document.getElementById('qeDiv');
obDiv=document.getElementById('obDiv');
var canvas1=document.getElementById('firstCanvas')
var canvas2 = document.getElementById("secondCanvas");
var canvas3 = document.getElementById("thirdCanvas");
canvas2.style.background="url('Images/LensBackground1.svg')";

//canvas width height change
if(window.innerWidth/window.innerHeight>=9.0/16){
    canvas1.width=window.innerHeight*(9/16)*92/100;
    canvas1.height=canvas1.width*0.55;
    canvas2.width=window.innerHeight*(9/16)*92/100;
    canvas2.height=canvas1.width*0.55;
    canvas3.width=window.innerHeight*(9/16)*92/100;
    canvas3.height=canvas1.width*0.55;
    
}
else{
    canvas1.width=window.innerWidth*92/100;
    canvas1.height=canvas1.width*0.55;
    canvas2.width=window.innerWidth*92/100;
    canvas2.height=canvas1.width*0.55;
    canvas3.width=window.innerHeight*(9/16)*92/100;
    canvas3.height=canvas1.width*0.55;
    
}

window.onresize=function(){
    location.reload();
}


 //xtransformation
 function transX(x){
    return originX+(x/xUnitsPerPixel)
}
//ytransformation
function transY(y){
    return originY-(y/yUnitsPerPixel)
}


 //xtransformation from canvas frame
 function transX_from_canvas(x){
  return (x-originX)*xUnitsPerPixel
}
//ytransformation from canvas frame
function transY_from_canvas(y){
  return (originY-y)*yUnitsPerPixel
}


//Connection between canvases and variables
var ctx1 = canvas1.getContext("2d");
var ctx2 = canvas2.getContext("2d");
var ctx3 = canvas3.getContext("2d");



//setting graph's ranges
var xMin=-1;
var xMax=9;
var yMin=-3.5;
var yMax=3.5;



//setting scales and origin
var xUnitsPerPixel=(xMax-xMin)/canvas1.width;
var yUnitsPerPixel=(yMax-yMin)/canvas1.height;
var originX=(-xMin)/xUnitsPerPixel;
var originY=(yMax)/yUnitsPerPixel;

var convexImage= new Image();
convexImage.src="Images/convexLens.svg";
var concaveImage= new Image();
concaveImage.src="Images/concaveLens.svg";
var laserImg = new Image();
laserImg.src='Images/laser.svg';

function backgroundANDlaserImg(){
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
function Ray(x0,y0){
    this.x0=x0;
    this.y0=y0;
    this.lensPos1State=0;
    this.lensPos2State=0;
    this.angle0=6;
    this.angleSet=function(){
        if(this.lensPos1State==0){
            this.angle1=0;
        }
        else if(this.lensPos1State==1){
            this.angle1=-6;
        }
        else if(this.lensPos1State==-1){
            this.angle1=5.1;
        }
        if(this.lensPos2State==0){
            this.angle2=0;
        }
        else if(this.lensPos2State==1){
            this.angle2=-6;
        }
        else if(this.lensPos2State==-1){
            this.angle2=5.1;
        }
    }

    
    this.x1=2.7;
    this.x2=5.1;
    this.x3=8.5;
    this.draw=function(raySign){
        if(raySign<0){
            y0=0.20;
            this.y0=y0;
        }
        else{
            y0=1.10;
            this.y0=y0;
        }
        this.angleSet();
        ctx1.beginPath();
        ctx1.moveTo(transX(x0),transY(y0));
        this.y1=raySign*Math.tan(this.angle0*Math.PI/180)*(this.x1-this.x0)+y0;
        ctx1.lineTo(transX(this.x1),transY(this.y1));
        ctx1.lineWidth='0.7';
        ctx1.strokeStyle='#3bff21';
        ctx1.stroke();

        this.y2=this.y1+raySign*Math.tan((this.angle0+this.angle1)*Math.PI/180)*(this.x2-this.x1);
        ctx1.lineTo(transX(this.x2),transY(this.y2));
        ctx1.stroke();


        this.y3=this.y2+raySign*Math.tan((this.angle0+this.angle1+this.angle2)*Math.PI/180)*(this.x3-this.x2);
        ctx1.lineTo(transX(this.x3),transY(this.y3));
        ctx1.stroke();

    }

}
window.onload= async function(){
    backgroundANDlaserImg();
    ray=new Ray(0.5,1);
    ray.draw(1);
    ray.draw(-1);
    
    //ray.lensHolderDraw();
}
//drag and Drop Status
var firstDrop=false;
var secondDrop=false;

//drag and drop function
document.getElementById('convexLensImg').draggable="true";
document.getElementById('convexLensImg').addEventListener("dragstart",dragStartFunction);

document.getElementById('concaveLensImg').draggable="true";
document.getElementById('concaveLensImg').addEventListener("dragstart",dragStartFunction);

document.getElementById('obLensHolder1').addEventListener("drop",dropFunctionForLensHolder1);
document.getElementById('obLensHolder1').addEventListener("dragover",dragOverFunction);
document.getElementById('obLensHolder2').addEventListener("drop",dropFunctionForLensHolder2);
document.getElementById('obLensHolder2').addEventListener("dragover",dragOverFunction);
 async function dropFunctionForLensHolder1(event){
    document.getElementById('obLensHolder1').classList.add('obLensHolder');
    firstDrop=true;
    dropSound.play();
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    //event.target.appendChild(document.getElementById(data));
    ctx1.clearRect(0,0,canvas1.width,canvas1.height);
    if(data=='convexLensImg'){
        ctx2.clearRect(0,0,canvas1.width,canvas1.height);
        //document.getElementById('obLensHolder1').style.border='0.0rem solid white';
        ray.lensPos1State=1;
        backgroundANDlaserImg();
        ctx2.drawImage(convexImage,transX(2.73)-(0.9/xUnitsPerPixel)/2,transY(0.73)-(0.9/xUnitsPerPixel*(convexImage.height/convexImage.width))/2,0.9/xUnitsPerPixel,0.92/xUnitsPerPixel*(convexImage.height/convexImage.width));
    }
    else if(data=='concaveLensImg'){
        ctx2.clearRect(0,0,canvas1.width,canvas1.height);
        //document.getElementById('obLensHolder1').style.border='0.0rem solid white';
        ray.lensPos1State=-1;
        backgroundANDlaserImg();
        ctx2.drawImage(concaveImage,transX(2.73)-(0.9/xUnitsPerPixel)/2,transY(0.73)-(0.9/xUnitsPerPixel*(convexImage.height/convexImage.width))/2,0.9/xUnitsPerPixel,0.92/xUnitsPerPixel*(convexImage.height/convexImage.width));
    }
    ray.draw(1);
    ray.draw(-1);
    document.getElementById('reloadButton').style.display='block';
    //obStatement popup
    document.getElementById('obPopupWindow').classList.add('obPopupWindowAdd');
    await sleep(300);
    document.getElementById('obPopupWindow').classList.remove('obPopupWindowAdd');
        if(secondDrop){
            document.getElementById('obPopupWindow').innerHTML='Great! You can go to the question section or you can press the reset button to see the interaction again';
        }
        else{
            document.getElementById('obPopupWindow').innerHTML='Great! Now drag and drop any lens to the remaining dotted box.';
        }
    
  }
 async function dropFunctionForLensHolder2(event){
    document.getElementById('obLensHolder2').classList.add('obLensHolder');
    secondDrop=true;
    dropSound.play();
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    //event.target.appendChild(document.getElementById(data));
    ctx1.clearRect(0,0,canvas1.width,canvas1.height);
    if(data=='convexLensImg'){
        //document.getElementById('obLensHolder2').style.border='0.0rem solid white';
        ray.lensPos2State=1;
        ctx3.clearRect(0,0,canvas1.width,canvas1.height);
        ctx3.drawImage(convexImage,transX(5.2)-(0.9/xUnitsPerPixel)/2,transY(0.73)-(0.9/xUnitsPerPixel*(convexImage.height/convexImage.width))/2,0.9/xUnitsPerPixel,0.92/xUnitsPerPixel*(convexImage.height/convexImage.width));
    }
    else if(data=='concaveLensImg'){
        //document.getElementById('obLensHolder2').style.border='0.0rem solid white';
        ray.lensPos2State=-1;
        ctx3.clearRect(0,0,canvas1.width,canvas1.height);
        ctx3.drawImage(concaveImage,transX(5.2)-(0.9/xUnitsPerPixel)/2,transY(0.73)-(0.9/xUnitsPerPixel*(convexImage.height/convexImage.width))/2,0.9/xUnitsPerPixel,0.92/xUnitsPerPixel*(convexImage.height/convexImage.width));
    }
    ray.draw(1);
    ray.draw(-1);
    document.getElementById('reloadButton').style.display='block';

    document.getElementById('obPopupWindow').classList.add('obPopupWindowAdd');
    await sleep(300);
    document.getElementById('obPopupWindow').classList.remove('obPopupWindowAdd');
        if(firstDrop){
            document.getElementById('obPopupWindow').innerHTML='Great! You can move to the question section or you can press the reset button to see the interaction again';
        }
        else{
            document.getElementById('obPopupWindow').innerHTML='Great! Now drag and drop any lens to the remaining dotted box.';
        }
  }

function dragOverFunction(event){
    event.preventDefault();
  }
  
function dragStartFunction(event){
    event.dataTransfer.setData("text", event.target.id);
  
  }


  //reload function
document.getElementById('reloadButton').onclick= async function(){
    click.play();
    document.getElementById('obLensHolder1').classList.remove('obLensHolder');
    document.getElementById('obLensHolder2').classList.remove('obLensHolder');
    ctx1.clearRect(0,0,canvas1.width,canvas1.height);
    ctx2.clearRect(0,0,canvas1.width,canvas1.height);
    ctx3.clearRect(0,0,canvas1.width,canvas1.height);
    backgroundANDlaserImg();
    ray.lensPos1State=0;
    ray.lensPos2State=0;
    ray.draw(1);
    ray.draw(-1);
    this.style.display='none';
    firstDrop=false;
    secondDrop=false;
    document.getElementById('obPopupWindow').classList.add('obPopupWindowAdd');
    await sleep(300);
    document.getElementById('obPopupWindow').classList.remove('obPopupWindowAdd');
    document.getElementById('obPopupWindow').innerHTML='Drag and drop any lens to any of the dotted box';

}

//correct answer list and response answer list

var correctAnswer=[0,true,false,false,true]; //1st value is dummy to avoid 0th element
var responseAnswer=[0,false,false,false,false]; //1st value is dummy to avoid 0th element

option1=document.getElementById('option1');
option2=document.getElementById('option2');
option3=document.getElementById('option3');
option4=document.getElementById('option4');

option1Check=document.getElementById('option1Check');
option2Check=document.getElementById('option2Check');
option3Check=document.getElementById('option3Check');
option4Check=document.getElementById('option4Check');

var responseNumberCount=0;
//options clicks function
option1.onclick=function(){
    optionClick.play();
    if(responseAnswer[1]==false){
        responseAnswer[1]=true;
        option1.classList.add('qeOptionsAdd');
        option1Check.checked=true;
        responseNumberCount+=1;
        document.getElementById('qeSubmitButton').style.display='flex';
    }
    else{
        responseAnswer[1]=false;
        option1.classList.remove('qeOptionsAdd');
        option1Check.checked=false;
        responseNumberCount-=1;
        if(responseNumberCount<1){
            document.getElementById('qeSubmitButton').style.display='none';
        }
        
    }
    
}
option2.onclick=function(){
    optionClick.play();
    if(responseAnswer[2]==false){
        responseAnswer[2]=true;
        option2.classList.add('qeOptionsAdd');
        option2Check.checked=true;
        responseNumberCount+=1;
        document.getElementById('qeSubmitButton').style.display='flex';
    }
    else{
        responseAnswer[2]=false;
        option2.classList.remove('qeOptionsAdd');
        option2Check.checked=false;
        responseNumberCount-=1;
        if(responseNumberCount<1){
            document.getElementById('qeSubmitButton').style.display='none';
        }
    }
}
option3.onclick=function(){
    optionClick.play();
    if(responseAnswer[3]==false){
        responseAnswer[3]=true;
        option3.classList.add('qeOptionsAdd');
        option3Check.checked=true;
        responseNumberCount+=1;
        document.getElementById('qeSubmitButton').style.display='flex';
    }
    else{
        responseAnswer[3]=false;
        option3.classList.remove('qeOptionsAdd');
        option3Check.checked=false;
        responseNumberCount-=1;
        if(responseNumberCount<1){
            document.getElementById('qeSubmitButton').style.display='none';
        }
    }
}
option4.onclick=function(){
    optionClick.play();
    if(responseAnswer[4]==false){
        responseAnswer[4]=true;
        option4.classList.add('qeOptionsAdd');
        option4Check.checked=true;
        responseNumberCount+=1;
        document.getElementById('qeSubmitButton').style.display='flex';
    }
    else{
        responseAnswer[4]=false;
        option4.classList.remove('qeOptionsAdd');
        option4Check.checked=false;
        responseNumberCount-=1;
        if(responseNumberCount<1){
            document.getElementById('qeSubmitButton').style.display='none';
        }
    }
}

//variables to determine the answer is fully correct or partial correct
var rightAnswerStatus=false;
var wrongAnswerStatus=false;

document.getElementById('qeSubmitButton').style.display='none';
//question submit function
document.getElementById('qeSubmitButton').onclick=function(){
    if(document.getElementById('qeSubmitButton').innerHTML=='Submit'){
    document.getElementById('questionInstruction').style.display='none';
    document.getElementById('qeSubmitButton').innerHTML='Finish'
    //document.getElementById('solutionDiv').style.display='flex';
    document.getElementById('footer').style.display='block';


    document.getElementById('qeStatement').style.display='none';
    document.getElementById('questionImage').style.display='none';
    document.getElementById('qeOptionBox').style.marginTop='20%';
    document.getElementById('solutionDiv').style.marginTop='85%';
    document.getElementById('rightWrongPopUp').style.marginTop='2%';
    document.getElementById('rightWrongPopUp').style.opacity='1';
    for(i=1;i<=correctAnswer.length-1;i++){
        document.getElementById('option'+i.toString()).classList.remove('qeOptionsAdd');
        document.getElementById('option'+i.toString()).style.pointerEvents = 'none';
        if(responseAnswer[i]==true ){
            document.getElementById('option'+i.toString()).style.backgroundImage='linear-gradient(#FC7070, #EB5050)';
        }
        if(correctAnswer[i]==true){
            document.getElementById('option'+i.toString()).style.backgroundImage='linear-gradient(#49BE47, #36A75C)';
        }
        if(responseAnswer[i]==true){
            if(responseAnswer[i]==correctAnswer[i]){
                rightAnswerStatus=true;
            }
            else{
                wrongAnswerStatus=true;
            }
        }
        else{
            if(correctAnswer[i]==true){
                wrongAnswerStatus=true;
            }
        }

    }
    if(rightAnswerStatus==true && wrongAnswerStatus==true){
        document.getElementById('rightWrongPopUp').style.color='rgb(251, 111, 111)';
        document.getElementById('rightWrongPopUp').innerHTML='<label style="font-size:1.4rem; font-weight: 500;">Oops!</label><br><label> You are partially correct. Check the solution</label>';
        wrongSound.play();
    }
    else if(rightAnswerStatus==true && wrongAnswerStatus==false){
        document.getElementById('rightWrongPopUp').style.color='rgb(141, 212, 62)';
        document.getElementById('rightWrongPopUp').innerHTML='<label style="font-size:1.4rem; font-weight: 500;">Well Done!</label><br><label> You got the correct answer!</label>';
        correctSound.play();
    }
    else{
        document.getElementById('rightWrongPopUp').style.color='rgb(251, 111, 111)';
        document.getElementById('rightWrongPopUp').innerHTML='<label style="font-size:1.4rem; font-weight: 500;">Oops!</label><br><label> You are wrong. Check the solution</label>';
        wrongSound.play();
    }
}
else{
    nextORFinish.play();
}
}



























