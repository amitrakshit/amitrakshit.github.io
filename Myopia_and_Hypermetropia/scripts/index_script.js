// Following Code is use for adaptation of the device width and height
if (screen.width / screen.height < 9 / 16) {
   screenScaleRatio = 1080 / screen.width;
}
else {
   screenScaleRatio = 1920 / screen.height;
}
var metaData = document.getElementsByName('viewport');
metaData[0].content = "width=device-width, initial-scale=" + 1 / screenScaleRatio.toString();

// SFX files
var buttonAudio_Click = new Audio();
buttonAudio_Click.src = "sounds/buton_Click.mp3";
var sliderOnInputAudio = new Audio();
sliderOnInputAudio.src = "./sounds/Slider_oninput.mp3";
var sliderOnChangeAudio = new Audio();
sliderOnChangeAudio.src = "./sounds/Slider_onchange.mp3";


// Following code is for question tab and observation tab transition
var navigation_bar = document.getElementsByClassName('navigation_bar');
var question_tab = navigation_bar[0].children[1];
var observation_tab = navigation_bar[0].children[0];
var movable_parent = document.getElementsByClassName('movable_parent')[0];
var nextButton = document.getElementById('nextButton');

question_tab.onclick = function () {
   buttonAudio_Click.play();
   movable_parent.style = "left: -1080rem;";
   observation_tab.classList.remove('nav_selected');
   question_tab.classList.add('nav_selected2');
}

observation_tab.onclick = function () {
   buttonAudio_Click.play();
   movable_parent.style = "left: 0rem";
   observation_tab.classList.add('nav_selected');
   question_tab.classList.remove('nav_selected2');
}
nextButton.onclick = function () {
   buttonAudio_Click.play();
   movable_parent.style = "left: -1080rem;";
   observation_tab.classList.remove('nav_selected');
   question_tab.classList.add('nav_selected2');
};

// touchEvents.oneFingerSwipe(movable_parent, 'left', function () {
//    movable_parent.style = "left: -1080rem;";
//    observation_tab.classList.remove('nav_selected');
//    question_tab.classList.add('nav_selected2');
// });

// touchEvents.oneFingerSwipe(movable_parent, 'right', function () {
//    movable_parent.style = "left: 0rem;";
//    observation_tab.classList.add('nav_selected');
//    question_tab.classList.remove('nav_selected2');
// });

var windowForThisSim = document.querySelector('.window');
document.addEventListener('dblclick', function (event) {
   event.preventDefault();
   windowForThisSim.requestFullscreen();

});

// visual area heading
var visualAreaHeading = document.getElementById("visualAreaHeading");

//Defining the required canvas variables and the contexts

/* Canvas and context */
var visualArea = document.getElementsByClassName('visual_area')[0];
var visualAreaComputedStyle = window.getComputedStyle(visualArea);
var canvasWidth = visualAreaComputedStyle.width.slice(0, -2);
var canvasHeight = visualAreaComputedStyle.height.slice(0, -2);
var canvases = document.getElementsByClassName('visualCanvas');
var contexts = [];
for (let i = 0; i < canvases.length; i++) {
   canvases[i].height = canvasHeight;
   canvases[i].width = canvasWidth;
   contexts[i] = canvases[i].getContext('2d');
}

/* Arrow and light text */
var arrowContainer = document.querySelector('.lightArrowContainer');


/* The right side image */
var rightSideImageArea = document.getElementById("rightSide");

// Reset Button
var resetButton = document.getElementsByClassName('resetButtonContainter')[0];
resetButton.onclick = function () {
   buttonAudio_Click.play();
   reset();
};  // Calling the reset function defined later on this script

// Status dots and status bar
var statusDots = document.getElementsByClassName("statusDots");
var statusBar = document.getElementById('frontBar');

// Labels
var labels = document.getElementsByClassName("labels");
Object.assign(labels[2].style, { opacity: '0' });
Object.assign(labels[3].style, { opacity: '0' });
labelColor = {
   green: "#23BB60",
   red: "#F92E5E",
   blue: "#0099BB"
}

// Myopic and hyperopic button
var leftButton = document.getElementById('leftButton');
var rightButton = document.getElementById('rightButton');

// images in the visual Area (LEFT)
var leftBG = document.getElementById('leftBackground'); //backGround of left side
var treeImg = document.getElementsByClassName('treeImgContainer')[0]; //tree image of left side
var leftFG = document.getElementsByClassName('foreGroundImgContainer')[0]; //foreGround of left side

// images in the visual Area (Right)
var rightTree = document.getElementsByClassName("treeImgContainerRight")[0]; // tree img of Right side
var rightJuiceCan = document.getElementsByClassName("juiceCanImgContainerRight")[0]; // juice can of right side


// input slider and the other texts
var inputSlider = document.getElementById('slider1');
var sliderMarkers = document.getElementsByClassName('marker');
var interactionAreaText = document.getElementsByClassName('interactionAreaText');

/* Defining the functions for the buttons */
var typeOfEyeDefect; var whichObjectSelected; var whichDefectAlreadyInspected;
leftButton.onclick = function () {
   buttonAudio_Click.play();
   inspectMyopia();
   whichDefectAlreadyInspected = 'myopia';
}

function inspectMyopia() {
   visualAreaHeading.children[0].innerHTML = "Myopic condition";

   typeOfEyeDefect = 'myopic';
   leftButton.innerHTML = 'Tree';
   rightButton.innerHTML = 'Juice can';
   // FeedbackArea style
   Object.assign(feedbackArea.style, { opacity: 0, top: '1122rem' });
   setTimeout(function () {
      feedbackArea.children[0].innerHTML = myopiaFeedback;
      Object.assign(feedbackArea.style, { opacity: 1, top: '1090rem', background: blueGradient });
      Object.assign(feedbackArea.children[0].style, { width: '80%' }); // paragraph width
   }, 500);

   contexts[1].clearRect(0, 0, canvasWidth, canvasHeight);
   contexts[2].clearRect(0, 0, canvasWidth, canvasHeight);

   // for hiding the slider and bringing back the buttons
   Object.assign(inputSlider.style, { opacity: '0', display: 'none' });
   inputSlider.disabled = true;
   Object.assign(leftButton.style, { opacity: '1' });
   Object.assign(rightButton.style, { opacity: '1' });
   for (let i = 0; i < 3; i++) {
      Object.assign(interactionAreaText[i].style, { opacity: '0' });
      Object.assign(sliderMarkers[i].style, { opacity: '0' });
   }

   leftButton.disabled = false;
   rightButton.disabled = false;

   // The images
   rightSideImageArea.classList.remove('zoomRight');
   Object.assign(rightJuiceCan.style, { opacity: '1' });
   Object.assign(rightTree.style, { opacity: '1' });
   leftBG.classList.add("blur");
   treeImg.classList.add("blur");
   leftFG.classList.remove("blur");
   rightTree.classList.add("blur");
   rightJuiceCan.classList.remove("blur");

   // labels
   labels[0].children[0].innerHTML = "Blurred vision";
   labels[1].children[0].innerHTML = "Clear vision";
   Object.assign(labels[0].style, { backgroundColor: labelColor.red, opacity: '1' });
   Object.assign(labels[1].style, { backgroundColor: labelColor.blue, opacity: '1' });
   Object.assign(labels[2].style, { backgroundColor: labelColor.blue, opacity: '0' });
   Object.assign(labels[3].style, { opacity: '0' });

   // Arrow and light text
   Object.assign(arrowContainer.style, { opacity: 0 });

   //For removing selected button outline
   leftButton.classList.remove('buttonSelected');
   rightButton.classList.remove('buttonSelected');

   // For the status bar updation
   Object.assign(statusBar.style, { width: '25%' });
   for (let i = 2; i <= 4; i++) {
      Object.assign(statusDots[i].style, { opacity: 0.5 });
   }
   Object.assign(statusDots[1].style, { opacity: 1 });

   whichObjectAlreadyVisited = 'none';

   /* Following code for myopia far object */
   leftButton.onclick = function () {
      buttonAudio_Click.play();
      whichObjectSelected = 'far';

      if (whichObjectAlreadyVisited == 'near') {
         whichObjectAlreadyVisited = 'far';
         Object.assign(feedbackArea.style, { opacity: 0, top: '1122rem' });
         Object.assign(nextButton.style, { opacity: '1' });
         nextButton.disabled = false;
         setTimeout(function () {
            feedbackArea.children[0].innerHTML = "The tree is not visible as its image forms in front of retina. <br> <b>Let’s rectify myopia.</b>"; //myopia far second feedback
            Object.assign(feedbackArea.style, { opacity: '1', top: '1090rem', background: yellowGradient });
            Object.assign(nextButton.style, { display: 'block' });
         }, 500);

         // For the status bar updation
         Object.assign(statusBar.style, { width: '75%' });
         Object.assign(statusDots[3].style, { opacity: 1 });

         nextButton.innerHTML = "Rectify myopia";
         nextButton.onclick = function () {
            rectifyMyopia();
         }
      }
      else if (whichObjectAlreadyVisited == 'none') {
         whichObjectAlreadyVisited = 'far';
         Object.assign(feedbackArea.style, { opacity: 0, top: '1122rem' });
         setTimeout(function () {
            feedbackArea.children[0].innerHTML = "The tree is not clearly visible as its image forms in front of retina. <br> <b> Now, let's observe the juice can. </b>"; //myopia far first feedback
            Object.assign(feedbackArea.style, { opacity: '1', top: '1090rem', background: yellowGradient });
         }, 500);

         // For the status bar updation
         Object.assign(statusBar.style, { width: '50%' });
         Object.assign(statusDots[2].style, { opacity: 1 });
      }

      // labels and images
      rightSideImageArea.classList.remove('zoomRight');
      Object.assign(labels[0].style, { backgroundColor: labelColor.red, opacity: '1' });
      Object.assign(labels[1].style, { backgroundColor: labelColor.blue, opacity: '0' });
      Object.assign(labels[2].style, { backgroundColor: labelColor.blue, opacity: '1' });
      Object.assign(rightJuiceCan.style, { opacity: '0' });
      Object.assign(rightTree.style, { opacity: '1' });
      labels[0].children[0].innerHTML = "Blurred vision";
      labels[2].children[0].innerHTML = "Image formed infront of retina";

      // Arrow and light text
      Object.assign(arrowContainer.style, { opacity: 1, left: "50%" });

      // label hand postion change
      Object.assign(labels[2].children[2].style, { right: "70rem" });
      Object.assign(labels[2].children[3].style, { right: "70rem" });


      //For selected button outline
      leftButton.classList.add('buttonSelected');
      rightButton.classList.remove('buttonSelected');


      // Drawing the lens and rays
      changeCanvasVariablesZoomOut();
      contexts[1].clearRect(0, 0, canvasWidth, canvasHeight);
      contexts[2].clearRect(0, 0, canvasWidth, canvasHeight);
      ray4.focusPoint = retinaPosition - focusOffsetValue;
      ray4.endX = ray4.focusPoint;
      ray1.draw(contexts[2]);
      ray2.draw(contexts[2]);
      ray3.draw(contexts[2]);
      ray4.draw(contexts[2]);

   }

   /* Following code for myopia near object */
   rightButton.onclick = function () {
      buttonAudio_Click.play();
      whichObjectSelected = 'near';

      if (whichObjectAlreadyVisited == 'far') {
         whichObjectAlreadyVisited = 'near';
         Object.assign(feedbackArea.style, { opacity: 0, top: '1122rem' });
         Object.assign(nextButton.style, { opacity: '1' });
         nextButton.disabled = false;
         setTimeout(function () {
            feedbackArea.children[0].innerHTML = "The juice can is clearly visible as its image forms on retina. <br> <b> Let’s rectify myopia. </b>"; // myopia near second feedback
            Object.assign(feedbackArea.style, { opacity: '1', top: '1090rem', background: yellowGradient });
            Object.assign(nextButton.style, { display: 'block' });
         }, 500);

         // For the status bar updation
         Object.assign(statusBar.style, { width: '75%' });
         Object.assign(statusDots[3].style, { opacity: 1 });

         nextButton.innerHTML = "Rectify myopia";
         nextButton.onclick = function () {
            buttonAudio_Click.play();
            rectifyMyopia();
         }
      }
      else if (whichObjectAlreadyVisited == 'none') {
         whichObjectAlreadyVisited = 'near';
         Object.assign(feedbackArea.style, { opacity: 0, top: '1122rem' });
         setTimeout(function () {
            feedbackArea.children[0].innerHTML = "The juice can is clearly visible as its image forms on retina. <br> <b>Now, let’s observe the tree.</b>"; // myopia near first feedback
            Object.assign(feedbackArea.style, { opacity: '1', top: '1090rem', background: yellowGradient });
         }, 500);

         // For the status bar updation
         Object.assign(statusBar.style, { width: '50%' });
         Object.assign(statusDots[2].style, { opacity: 1 });
      }

      // labels and images
      rightSideImageArea.classList.add('zoomRight');
      Object.assign(labels[0].style, { backgroundColor: labelColor.red, opacity: '0' });
      Object.assign(labels[1].style, { backgroundColor: labelColor.blue, opacity: '1' });
      Object.assign(labels[2].style, { backgroundColor: labelColor.blue, opacity: '1' });
      Object.assign(rightJuiceCan.style, { opacity: '1' });
      Object.assign(rightTree.style, { opacity: '0' });
      labels[2].children[0].innerHTML = "Image is formed on retina";

      // Arrow and light text
      Object.assign(arrowContainer.style, { opacity: 1, left: "52%" });

      // label hand postion change
      Object.assign(labels[2].children[2].style, { right: "48rem" });
      Object.assign(labels[2].children[3].style, { right: "48rem" });

      //For selected button outline
      leftButton.classList.remove('buttonSelected');
      rightButton.classList.add('buttonSelected');

      // Drawing the lens and rays
      changeCanvasVariablesZoomIn();
      contexts[1].clearRect(0, 0, canvasWidth, canvasHeight);
      contexts[2].clearRect(0, 0, canvasWidth, canvasHeight);
      ray1.draw(contexts[2]);
      ray2.draw(contexts[2]);
      ray3.draw(contexts[2]);
      ray4.draw(contexts[2]);

   }
}

function rectifyMyopia() {
   userInteractedWithSlider = false;
   whichObjectSelected = 'far';


   // for removing the buttons and bringing the slider
   Object.assign(inputSlider.style, { opacity: '1', display: 'block' });
   inputSlider.disabled = false;
   inputSlider.value = 0;
   Object.assign(leftButton.style, { opacity: '0' });
   Object.assign(rightButton.style, { opacity: '0' });
   for (let i = 0; i < 3; i++) {
      Object.assign(interactionAreaText[i].style, { opacity: '1' });
      Object.assign(sliderMarkers[i].style, { opacity: '1' });
   }
   leftButton.disabled = true;
   rightButton.disabled = true;

   // bringing back the tree and removing the juice and the labels
   rightSideImageArea.classList.remove('zoomRight');
   Object.assign(labels[0].style, { backgroundColor: labelColor.red, opacity: '1' });
   Object.assign(labels[1].style, { backgroundColor: labelColor.blue, opacity: '0' });
   Object.assign(labels[2].style, { backgroundColor: labelColor.blue, opacity: '1' });
   Object.assign(labels[3].style, { backgroundColor: labelColor.blue, opacity: '1' });
   labels[3].classList.remove('zoomOut');
   labels[3].children[2].classList.remove('zoomOutHand');
   Object.assign(rightJuiceCan.style, { opacity: '0' });
   Object.assign(rightTree.style, { opacity: '1' });
   labels[2].children[0].innerHTML = "Image formed in front of retina";

   // Arrow and light text
   Object.assign(arrowContainer.style, { left: "50%" });

   // Drawing the lens and rays
   changeCanvasVariablesZoomOut();
   contexts[1].clearRect(0, 0, canvasWidth, canvasHeight);
   contexts[2].clearRect(0, 0, canvasWidth, canvasHeight);
   ray4.focusPoint = retinaPosition - focusOffsetValue;
   ray4.endX = ray4.focusPoint;
   Lens.draw(contexts[1]);
   ray1.draw(contexts[2]);
   ray2.draw(contexts[2]);
   ray3.draw(contexts[2]);
   ray4.draw(contexts[2]);


   sliderFunction();

   // For updating the status bar and dots
   Object.assign(statusDots[4].style, { opacity: 1 });
   Object.assign(statusBar.style, { width: '100%' });

   if (whichDefectAlreadyInspected == 'hypermetropia') {
      Object.assign(nextButton.style, { display: 'none' });
      nextButton.innerHTML = "Next";
      nextButton.onclick = function () {
         buttonAudio_Click.play();
         movable_parent.style = "left: -1080rem;";
         observation_tab.classList.remove('nav_selected');
         question_tab.classList.add('nav_selected2');
      }
   }
   else {
      nextButton.innerHTML = "Inspect hypermetropia";
      Object.assign(nextButton.style, { width: '600rem', display: 'none' });
      nextButton.onclick = function () {
         buttonAudio_Click.play();
         inspectHypermetropia();
         setTimeout(function () {
            Object.assign(nextButton.style, { display: 'none' })
         }, 500);
      }
   }
}

rightButton.onclick = function () {
   buttonAudio_Click.play();
   inspectHypermetropia();
   whichDefectAlreadyInspected = 'hypermetropia';
}

function inspectHypermetropia() {
   visualAreaHeading.children[0].innerHTML = "Hypermetropic condition";
   typeOfEyeDefect = 'hyperopic';
   leftButton.innerHTML = 'Tree';
   rightButton.innerHTML = 'Juice can';

   // FeedbackArea style
   Object.assign(feedbackArea.style, { opacity: 0, top: '1122rem' });
   setTimeout(function () {
      feedbackArea.children[0].innerHTML = hypermetropiaFeedback;
      Object.assign(feedbackArea.style, { opacity: 1, top: '1090rem', background: blueGradient });
      Object.assign(feedbackArea.children[0].style, { width: '80%' }); //paragraph width
   }, 500); //0.5s

   contexts[1].clearRect(0, 0, canvasWidth, canvasHeight);
   contexts[2].clearRect(0, 0, canvasWidth, canvasHeight);
   // for hiding the slider and bringing back the buttons
   Object.assign(inputSlider.style, { opacity: '0', display: 'none' });
   inputSlider.disabled = true;
   Object.assign(leftButton.style, { opacity: '1' });
   Object.assign(rightButton.style, { opacity: '1' });
   for (let i = 0; i < 3; i++) {
      Object.assign(interactionAreaText[i].style, { opacity: '0' });
      Object.assign(sliderMarkers[i].style, { opacity: '0' });
   }
   leftButton.disabled = false;
   rightButton.disabled = false;

   //For removing selected button outline
   leftButton.classList.remove('buttonSelected');
   rightButton.classList.remove('buttonSelected');

   // The images
   rightSideImageArea.classList.remove('zoomRight');
   Object.assign(rightJuiceCan.style, { opacity: '1' });
   Object.assign(rightTree.style, { opacity: '1' });
   leftBG.classList.remove("blur");
   treeImg.classList.remove("blur");
   leftFG.classList.add("blur");
   rightTree.classList.remove("blur");
   rightJuiceCan.classList.add("blur");

   // labels
   labels[0].children[0].innerHTML = "Clear vision";
   labels[1].children[0].innerHTML = "Blurred vision";
   Object.assign(labels[0].style, { backgroundColor: labelColor.blue, opacity: '1' });
   Object.assign(labels[1].style, { backgroundColor: labelColor.red, opacity: '1' });
   Object.assign(labels[2].style, { backgroundColor: labelColor.blue, opacity: '0' });
   Object.assign(labels[3].style, { opacity: '0' });

   // Arrow and light text
   Object.assign(arrowContainer.style, { opacity: 0 });

   // For the status bar updation
   Object.assign(statusBar.style, { width: '25%' });
   for (let i = 2; i <= 4; i++) {
      Object.assign(statusDots[i].style, { opacity: 0.5 });
   }
   Object.assign(statusDots[1].style, { opacity: 1 });

   whichObjectAlreadyVisited = 'none';

   /* Following code for hypermetropia far object */
   leftButton.onclick = function () {
      buttonAudio_Click.play();
      whichObjectSelected = 'far';

      if (whichObjectAlreadyVisited == 'near') {
         whichObjectAlreadyVisited = 'far';
         Object.assign(feedbackArea.style, { opacity: 0, top: '1122rem' });
         Object.assign(nextButton.style, { opacity: '1' });
         nextButton.disabled = false;
         setTimeout(function () {
            feedbackArea.children[0].innerHTML = "The tree is clearly visible as its image forms on retina. <br> <b>Let’s rectify hypermetropia.</b>"; //hyperopia far second feedback
            Object.assign(feedbackArea.style, { opacity: '1', top: '1090rem', background: yellowGradient });
            Object.assign(nextButton.style, { display: 'block', width: '600rem' });
         }, 500);

         // For the status bar updation
         Object.assign(statusBar.style, { width: '75%' });
         Object.assign(statusDots[3].style, { opacity: 1 });

         nextButton.innerHTML = "Rectify hypermetropia";
         nextButton.onclick = function () {
            buttonAudio_Click.play();
            rectifyHypermetropia();
         }
      }
      else if (whichObjectAlreadyVisited == 'none') {
         whichObjectAlreadyVisited = 'far';
         Object.assign(feedbackArea.style, { opacity: 0, top: '1122rem' });
         setTimeout(function () {
            feedbackArea.children[0].innerHTML = "The tree is clearly visible as its image forms on retina. <br> <b>Now, let's observe the juice can.</b>"; //hyperopia far first feedback
            Object.assign(feedbackArea.style, { opacity: '1', top: '1090rem', background: yellowGradient });
         }, 500);

         // For the status bar updation
         Object.assign(statusBar.style, { width: '50%' });
         Object.assign(statusDots[2].style, { opacity: 1 });

      }

      // labels and images
      rightSideImageArea.classList.remove('zoomRight');
      Object.assign(labels[0].style, { backgroundColor: labelColor.blue, opacity: '1' });
      Object.assign(labels[1].style, { backgroundColor: labelColor.red, opacity: '0' });
      Object.assign(labels[2].style, { backgroundColor: labelColor.blue, opacity: '1' });
      Object.assign(rightJuiceCan.style, { opacity: '0' });
      Object.assign(rightTree.style, { opacity: '1' });
      labels[2].children[0].innerHTML = "Image formed on the retina";

      // Arrow and light text
      Object.assign(arrowContainer.style, { opacity: 1, left: "50%" });

      // label hand postion change
      Object.assign(labels[2].children[2].style, { right: "48rem" });
      Object.assign(labels[2].children[3].style, { right: "48rem" });

      //For selected button outline
      leftButton.classList.add('buttonSelected');
      rightButton.classList.remove('buttonSelected');

      // Drawing the lens and rays
      changeCanvasVariablesZoomOut();
      contexts[1].clearRect(0, 0, canvasWidth, canvasHeight);
      contexts[2].clearRect(0, 0, canvasWidth, canvasHeight);
      ray4.focusPoint = retinaPosition;
      ray4.endX = ray4.focusPoint;
      ray1.draw(contexts[2]);
      ray2.draw(contexts[2]);
      ray3.draw(contexts[2]);
      ray4.draw(contexts[2]);

   }

   /* Following code for hypermetropia near object */
   rightButton.onclick = function () {
      buttonAudio_Click.play();
      whichObjectSelected = 'near';

      if (whichObjectAlreadyVisited == 'far') {
         whichObjectAlreadyVisited = 'near';
         Object.assign(feedbackArea.style, { opacity: 0, top: '1122rem' });
         Object.assign(nextButton.style, { opacity: '1' });
         nextButton.disabled = false;
         setTimeout(function () {
            feedbackArea.children[0].innerHTML = "The juice can is not clearly visible as its image forms behind retina. <br> <b>Let’s rectify hypermetropia.</b>"; // hyperopia near second feedback
            Object.assign(feedbackArea.style, { opacity: '1', top: '1090rem', background: yellowGradient });
            Object.assign(nextButton.style, { display: 'block', width: '600rem' });
         }, 500);

         // For the status bar updation
         Object.assign(statusBar.style, { width: '75%' });
         Object.assign(statusDots[3].style, { opacity: 1 });

         nextButton.innerHTML = "Rectify hypermetropia";
         nextButton.onclick = function () {
            buttonAudio_Click.play();
            rectifyHypermetropia();
         }
      }
      else if (whichObjectAlreadyVisited == 'none') {
         whichObjectAlreadyVisited = 'near';
         Object.assign(feedbackArea.style, { opacity: 0, top: '1122rem' });
         setTimeout(function () {
            feedbackArea.children[0].innerHTML = "The juice can is not clearly visible as its image forms behind retina. <br> <b>Let's observe the tree.</b>"; // hyperopia near first feedback
            Object.assign(feedbackArea.style, { opacity: '1', top: '1090rem', background: yellowGradient });
         }, 500);

         // For the status bar updation
         Object.assign(statusBar.style, { width: '50%' });
         Object.assign(statusDots[2].style, { opacity: 1 });
      }

      // labels and images
      rightSideImageArea.classList.add('zoomRight');
      Object.assign(labels[0].style, { backgroundColor: labelColor.blue, opacity: '0' });
      Object.assign(labels[1].style, { backgroundColor: labelColor.red, opacity: '1' });
      Object.assign(labels[2].style, { backgroundColor: labelColor.blue, opacity: '1' });
      Object.assign(rightJuiceCan.style, { opacity: '1' });
      Object.assign(rightTree.style, { opacity: '0' });
      labels[2].children[0].innerHTML = "Image is not formed on the retina";

      // Arrow and light text
      Object.assign(arrowContainer.style, { opacity: 1, left: "52%" });

      // label hand postion change
      Object.assign(labels[2].children[2].style, { right: "30rem" });
      Object.assign(labels[2].children[3].style, { right: "30rem" });

      //For selected button outline
      leftButton.classList.remove('buttonSelected');
      rightButton.classList.add('buttonSelected');

      // Drawing the lens and rays
      changeCanvasVariablesZoomIn();
      contexts[1].clearRect(0, 0, canvasWidth, canvasHeight);
      contexts[2].clearRect(0, 0, canvasWidth, canvasHeight);
      ray4.focusPoint = retinaPosition + focusOffsetValue;
      ray4.endX = ray4.focusPoint;
      ray1.draw(contexts[2]);
      ray2.draw(contexts[2]);
      ray3.draw(contexts[2]);
      ray4.draw(contexts[2]);

   }
}

function rectifyHypermetropia() {
   userInteractedWithSlider = false;
   whichObjectSelected = 'near';

   // for removing the buttons and bringing the slider
   Object.assign(inputSlider.style, { opacity: '1', display: 'block' });
   inputSlider.disabled = false;
   inputSlider.value = 0;
   Object.assign(leftButton.style, { opacity: '0' });
   Object.assign(rightButton.style, { opacity: '0' });
   for (let i = 0; i < 3; i++) {
      Object.assign(interactionAreaText[i].style, { opacity: '1' });
      Object.assign(sliderMarkers[i].style, { opacity: '1' });
   }
   leftButton.disabled = true;
   rightButton.disabled = true;

   // labels and images
   rightSideImageArea.classList.add('zoomRight');
   Object.assign(labels[0].style, { backgroundColor: labelColor.blue, opacity: '0' });
   Object.assign(labels[1].style, { backgroundColor: labelColor.red, opacity: '1' });
   Object.assign(labels[2].style, { backgroundColor: labelColor.blue, opacity: '1' });
   Object.assign(labels[3].style, { opacity: '1' });
   labels[3].classList.add('zoomOut');
   labels[3].children[2].classList.add('zoomOutHand');
   Object.assign(rightJuiceCan.style, { opacity: '1' });
   Object.assign(rightTree.style, { opacity: '0' });

   // Arrow and light text
   Object.assign(arrowContainer.style, { opacity: 1, left: "46%" });

   // Drawing the lens and rays
   changeCanvasVariablesZoomIn();
   contexts[1].clearRect(0, 0, canvasWidth, canvasHeight);
   contexts[2].clearRect(0, 0, canvasWidth, canvasHeight);
   ray4.focusPoint = retinaPosition + focusOffsetValue;
   ray4.endX = ray4.focusPoint;
   Lens.draw(contexts[1]);
   ray1.draw(contexts[2]);
   ray2.draw(contexts[2]);
   ray3.draw(contexts[2]);
   ray4.draw(contexts[2]);

   sliderFunction();

   // For updating the status bar and dots
   Object.assign(statusDots[4].style, { opacity: 1 });
   Object.assign(statusBar.style, { width: '100%' });

   if (whichDefectAlreadyInspected == 'myopia') {
      nextButton.innerHTML = "Next";
      Object.assign(nextButton.style, { display: "none" });
      nextButton.onclick = function () {
         buttonAudio_Click.play();
         movable_parent.style = "left: -1080rem;";
         observation_tab.classList.remove('nav_selected');
         question_tab.classList.add('nav_selected2');
      }
   }
   else {
      nextButton.innerHTML = "Inspect myopia";
      Object.assign(nextButton.style, { display: "none" });
      nextButton.onclick = function () {
         buttonAudio_Click.play();
         inspectMyopia();
         setTimeout(function () {
            Object.assign(nextButton.style, { display: 'none' })
         }, 500);

      }
   }
}

// Reset function
function reset() {
   visualAreaHeading.children[0].innerHTML = "Normal condition";
   // resetting the variables
   whichDefectAlreadyInspected = "none";
   whichObjectSelected = 'none';
   whichObjectAlreadyVisited = 'none';

   // next button
   Object.assign(nextButton.style, { opacity: '0' });
   nextButton.innerHTML = 'Next';
   nextButton.disabled = true;

   // bringing back the buttons and hiding the slider
   Object.assign(inputSlider.style, { opacity: '0', display: 'none' });
   inputSlider.disabled = true;
   inputSlider.value = 0;
   Object.assign(leftButton.style, { opacity: '1' });
   Object.assign(rightButton.style, { opacity: '1' });
   leftButton.disabled = false;
   rightButton.disabled = false;
   for (let i = 0; i < 3; i++) {
      Object.assign(interactionAreaText[i].style, { opacity: '0' });
      Object.assign(sliderMarkers[i].style, { opacity: '0' });
   }

   lens.type = 'parallel';
   sliderFunction();
   for (let i = 0; i < canvases.length; i++) {
      contexts[i].clearRect(0, 0, canvasWidth, canvasHeight);
   }
   Object.assign(feedbackArea.style, { opacity: '0', top: '1122rem' }); // hiding the feedback
   setTimeout(function () {
      Object.assign(feedbackArea.style, { opacity: '1', top: '1090rem', background: blueGradient })
   }, 500);
   feedbackArea.children[0].innerHTML = "Inspect the eye defects by tapping the buttons.";

   // button functions resetting
   leftButton.innerHTML = "Inspect myopia";
   leftButton.classList.remove('buttonSelected');
   leftButton.onclick = function () {
      inspectMyopia();
      buttonAudio_Click.play();
   }
   rightButton.innerHTML = "Inspect <br> hypermetropia";
   rightButton.classList.remove('buttonSelected');
   rightButton.onclick = function () {
      inspectHypermetropia();
      buttonAudio_Click.play();
   }

   // For updating the status bar and dots
   for (let i = 1; i <= 4; i++) {
      Object.assign(statusDots[i].style, { opacity: 0.5 });
   }
   Object.assign(statusBar.style, { width: '0%' });

   // For checking the state change
   previousSliderValue = 0.0;
   stateChanged = false;
}

// feedback texts and feedbackArea
var hypermetropiaFeedback = "In hypermetropia, nearby objects are not clearly visible, but faraway objects are. <br> <b>Tap and observe why.</b>";
var myopiaFeedback = "In myopia, nearby objects are seen clearly; faraway objects appear blurry. <br> <b>Tap to observe why</b>.";

// var planeGlassSlabFeedback = "Try changing the curvature of lens to correct the defect in the eye.";

var hypermetropiaDivergingFeedbackEnd = "Oh! The image has become more blurry. With this corrective lens the rays diverge before reaching the eye, shifting the image farther and blurring it.";
var hypermetropiaDivergingFeedback = 'Oh! The image is getting blurrier. This corrective lens diverges the rays before reaching the eye, shifting the image away from retina.';
var hypermetropiaConvergingFeedbackEnd = "Awesome! Juice can can be seen clearly now. With this corrective lens the rays converge before reaching the eye, shifting the image towards retina.";
var hypermetropiaConvergingFeedback = 'Great! The image is getting clearer. This corrective lens converges the rays  before reaching the eye, shifting the image towards retina.';

var myopiaDivergingFeedbackEnd = "Yay, we’ve rectified myopia! With this corrective lens the rays diverge before reaching the eye, forming the image on retina.";
var myopiaDivergingFeedback = 'Great! The image is getting clearer. This corrective lens diverges the rays before reaching the eye, shifting the image towards retina.';
var myopiaConvergingFeedbackEnd = "Uh-Oh! The image has become more blurry. With this corrective lens the rays converge before reaching the eye, blurring the image by moving it away from the retina.";
var myopiaConvergingFeedback = 'Uh-Oh! The image is getting blurrier. This corrective lens converges the rays before reaching the eye, shifting the image away from retina.';

var feedbackArea = document.getElementsByClassName('feedback_bar')[0];
var yellowGradient = "linear-gradient(180deg, #FFE601 0%, #E8882F 100%)";
var blueGradient = "linear-gradient(180deg, #12EAFA 0%, #0787E2 100%)";

// Defining input slider function
inputSlider.oninput = function () {
   sliderOnInputAudio.play();
   sliderFunction();
   userInteractedWithSlider = true;
}
inputSlider.onchange = function () {
   sliderOnChangeAudio.play();
}

// Global variables for changing state and detecting it
var previousSliderValue = 0.0;
var stateChanged = false;
var userInteractedWithSlider = false;
function sliderFunction() {
   if (previousSliderValue < 0 && (inputSlider.value > 0 || inputSlider.value == -1)) {
      stateChanged = true;
   }
   else if (previousSliderValue > 0 && (inputSlider.value < 0 || inputSlider.value == 1)) {
      stateChanged = true;
   }
   else if (previousSliderValue == 0 && inputSlider.value < 0 || previousSliderValue == 0 && inputSlider.value > 0) {
      stateChanged = true;
   }
   else if ((previousSliderValue == -1 || previousSliderValue == 1) && (inputSlider.value != 1 || inputSlider.value != -1)) {
      stateChanged = true;
   }
   else {
      stateChanged = false;
   }
   // Making the width of the paragraph of feedbackArea as 100%
   setTimeout(function () {
      Object.assign(feedbackArea.children[0].style, { width: '100%' });
   }, 500);


   if (typeOfEyeDefect == 'myopic' && whichObjectSelected == 'far') {
      leftBG.style.setProperty('--blurValue', `${5 + 5 * inputSlider.value}rem`);
      treeImg.style.setProperty('--blurValue', `${5 + 5 * inputSlider.value}rem`);
      rightTree.style.setProperty('--blurValue', `${5 + 5 * inputSlider.value}rem`);
      // Changing the position of the label hand
      Object.assign(labels[2].children[2].style, { right: `${70 + (inputSlider.value) * (75 - 55)}rem` });
      Object.assign(labels[2].children[3].style, { right: `${70 + (inputSlider.value) * (75 - 55)}rem` });

      if (userInteractedWithSlider == false) {
         Object.assign(feedbackArea.style, { opacity: 0, top: '1122rem' });
         setTimeout(function () {
            feedbackArea.children[0].innerHTML = "Let’s rectify myopia by focusing the rays onto the retina using a corrective lens.";
            Object.assign(feedbackArea.style, { opacity: 1, top: '1090rem', background: blueGradient });
         }, 500);
      }
      if (inputSlider.value > 0) {

         // For the end feedbacks
         if (inputSlider.value == 1) {
            Object.assign(feedbackArea.style, { opacity: 0, top: '1122rem' });
            setTimeout(function () {
               feedbackArea.children[0].innerHTML = myopiaConvergingFeedbackEnd;
               Object.assign(feedbackArea.style, { opacity: 1, top: '1090rem', background: yellowGradient });
            }, 500);
         }
         else if (inputSlider.value != 1 && stateChanged == true) {
            Object.assign(feedbackArea.style, { opacity: 0, top: '1122rem' });
            setTimeout(function () {
               feedbackArea.children[0].innerHTML = myopiaConvergingFeedback;
               Object.assign(feedbackArea.style, { opacity: 1, top: '1090rem', background: yellowGradient });
            }, 500);
         }

         // Drawing the lens
         Lens.clearRect(contexts[1]);
         Lens.type = 'convexE';
         Lens.power = inputSlider.value;
         Lens.draw(contexts[1]);

         // Drawing the lens and rays
         contexts[2].clearRect(0, 0, canvasWidth, canvasHeight);
         ray2.type = 'convergent';
         ray2.focusPoint = Lens.x + 0.8 * lensFocalLength / (inputSlider.value);
         ray3.spread = ray2.getEndSpread();
         ray4.focusPoint = retinaPosition - focusOffsetValue * (1 + Math.abs(inputSlider.value));
         ray4.endX = ray4.focusPoint;
         ray4.spread = ray3.getEndSpread();
         ray1.draw(contexts[2]);
         ray2.draw(contexts[2]);
         ray3.draw(contexts[2]);
         ray4.draw(contexts[2]);

      }
      else if (inputSlider.value < 0) {

         // For the end feedbacks and bringing back the buttons
         if (inputSlider.value == -1) {
            Object.assign(nextButton.style, { display: 'block' });
            Object.assign(labels[0].style, { backgroundColor: labelColor.green });
            labels[0].children[0].innerHTML = "Clear vision";
            labels[2].children[0].innerHTML = "Image is formed on retina";
            Object.assign(feedbackArea.style, { opacity: 0, top: '1122rem' });
            setTimeout(function () {
               feedbackArea.children[0].innerHTML = myopiaDivergingFeedbackEnd;
               Object.assign(feedbackArea.style, { opacity: 1, top: '1090rem', background: yellowGradient });
            }, 500);
         }
         else if (inputSlider.value != -1 && stateChanged == true) {
            Object.assign(feedbackArea.style, { opacity: 0, top: '1122rem' });
            setTimeout(function () {
               feedbackArea.children[0].innerHTML = myopiaDivergingFeedback;
               Object.assign(feedbackArea.style, { opacity: 1, top: '1090rem', background: yellowGradient });
            }, 500);
            Object.assign(labels[0].style, { backgroundColor: labelColor.red });
            labels[0].children[0].innerHTML = "Blurred vision";
            labels[2].children[0].innerHTML = "Image formed in front of retina";
         }

         // drawing the lens
         Lens.clearRect(contexts[1]);
         Lens.type = 'concave';
         Lens.power = Math.abs(inputSlider.value);
         Lens.draw(contexts[1]);

         // Drawing the lens and rays
         contexts[2].clearRect(0, 0, canvasWidth, canvasHeight);
         ray2.type = 'divergent';
         ray2.focusPoint = Lens.x - (0.8 * lensFocalLength / Math.abs(inputSlider.value));
         ray3.spread = ray2.getEndSpread();
         ray4.focusPoint = retinaPosition - focusOffsetValue * (1 - Math.abs(inputSlider.value));
         ray4.endX = ray4.focusPoint;
         ray4.spread = ray3.getEndSpread();
         ray1.draw(contexts[2]);
         ray2.draw(contexts[2]);
         ray3.draw(contexts[2]);
         ray4.draw(contexts[2]);


      }
      else if (inputSlider.value == 0) {
         if (stateChanged) {
            Object.assign(feedbackArea.style, { opacity: 0, top: '1122rem' });
            setTimeout(function () {
               feedbackArea.children[0].innerHTML = planeGlassSlabFeedback;
               Object.assign(feedbackArea.style, { opacity: 1, top: '1090rem', background: yellowGradient });
            }, 500);
         }
         else {
            Object.assign(feedbackArea.style, { opacity: 0, top: '1122rem' });
         }

         // Drawing the lenses
         Lens.clearRect(contexts[1]);
         Lens.type = 'parallel';
         Lens.draw(contexts[1]);

         // Drawing the ray diagram
         contexts[2].clearRect(0, 0, canvasWidth, canvasHeight);
         ray2.type = 'parallel';
         ray3.spread = ray2.getEndSpread();
         ray4.focusPoint = retinaPosition - focusOffsetValue * (1);
         ray4.endX = ray4.focusPoint;
         ray4.spread = ray3.getEndSpread();
         ray1.draw(contexts[2]);
         ray2.draw(contexts[2]);
         ray3.draw(contexts[2]);
         ray4.draw(contexts[2]);
      }
   }
   else if (typeOfEyeDefect == 'hyperopic' && whichObjectSelected == 'near') {
      leftFG.style.setProperty('--blurValue', `${5 - 5 * inputSlider.value}rem`);
      rightJuiceCan.style.setProperty('--blurValue', `${5 - 5 * inputSlider.value}rem`);

      // Changing the position of the label hand
      Object.assign(labels[2].children[2].style, { right: `${30 + (inputSlider.value) * (75 - 55)}rem` });
      Object.assign(labels[2].children[3].style, { right: `${30 + (inputSlider.value) * (75 - 55)}rem` });

      if (userInteractedWithSlider == false) {
         Object.assign(feedbackArea.style, { opacity: 0, top: '1122rem' });
         setTimeout(function () {
            feedbackArea.children[0].innerHTML = "Let’s rectify hypermetropia by focusing the rays onto the retina using a corrective lens.";
            Object.assign(feedbackArea.style, { opacity: 1, top: '1090rem', background: blueGradient });
         }, 500);
      }
      if (inputSlider.value > 0) {

         // Bringing back the button and end feedback
         if (inputSlider.value == 1) {
            Object.assign(nextButton.style, { display: 'block', width: '480rem' });
            Object.assign(labels[1].style, { backgroundColor: labelColor.green });
            labels[1].children[0].innerHTML = "Clear vision";
            labels[2].children[0].innerHTML = "Image is formed on retina";
            Object.assign(feedbackArea.style, { opacity: 0, top: '1122rem' });
            setTimeout(function () {
               feedbackArea.children[0].innerHTML = hypermetropiaConvergingFeedbackEnd;
               Object.assign(feedbackArea.style, { opacity: 1, top: '1090rem', background: yellowGradient });
            }, 500);
         }
         else if (inputSlider.value != 1 && stateChanged == true) {
            Object.assign(labels[1].style, { backgroundColor: labelColor.red });
            labels[1].children[0].innerHTML = "Blurred vision";
            labels[2].children[0].innerHTML = "Image is not formed on the retina";
            Object.assign(feedbackArea.style, { opacity: 0, top: '1122rem' });
            setTimeout(function () {
               feedbackArea.children[0].innerHTML = hypermetropiaConvergingFeedback;
               Object.assign(feedbackArea.style, { opacity: 1, top: '1090rem', background: yellowGradient });
            }, 500);
         }

         // var focalLength = lensFocalLength / (Math.abs(inputSlider.value));
         // var imageDistance = (-nearObjectDistance * focalLength) / (-nearObjectDistance + focalLength);
         // ray2.focusPoint = Lens.x + imageDistance;


         // Drawing the lens
         Lens.clearRect(contexts[1]);
         Lens.type = 'convexE';
         Lens.power = inputSlider.value;
         Lens.draw(contexts[1]);

         // Drawing the lens and rays
         contexts[2].clearRect(0, 0, canvasWidth, canvasHeight);
         ray2.type = 'convergent';
         ray2.focusPoint = Lens.x + 0.8 * lensFocalLength / (inputSlider.value);
         ray3.spread = ray2.getEndSpread();
         ray4.focusPoint = retinaPosition + focusOffsetValue * (1 - Math.abs(inputSlider.value));
         ray4.endX = ray4.focusPoint;
         ray4.spread = ray3.getEndSpread();
         ray1.draw(contexts[2]);
         ray2.draw(contexts[2]);
         ray3.draw(contexts[2]);
         ray4.draw(contexts[2]);

      }
      else if (inputSlider.value < 0) {

         // For the end feedbacks
         if (inputSlider.value == -1) {
            Object.assign(feedbackArea.style, { opacity: 0, top: '1122rem' });
            setTimeout(function () {
               feedbackArea.children[0].innerHTML = hypermetropiaDivergingFeedbackEnd;
               Object.assign(feedbackArea.style, { opacity: 1, top: '1090rem', background: yellowGradient });
            }, 500);
         }
         else if (inputSlider.value != -1 && stateChanged == true) {
            Object.assign(feedbackArea.style, { opacity: 0, top: '1122rem' });
            setTimeout(function () {
               feedbackArea.children[0].innerHTML = hypermetropiaDivergingFeedback;
               Object.assign(feedbackArea.style, { opacity: 1, top: '1090rem', background: yellowGradient });
            }, 500);
         }

         // drawing the lens
         Lens.clearRect(contexts[1]);
         Lens.type = 'concave';
         Lens.power = Math.abs(inputSlider.value);
         Lens.draw(contexts[1]);

         // Drawing the lens and rays
         contexts[2].clearRect(0, 0, canvasWidth, canvasHeight);
         ray2.type = 'convergent';
         ray2.focusPoint = Lens.x + 1.2 * lensFocalLength / (inputSlider.value);
         ray3.spread = ray2.getEndSpread();
         ray4.focusPoint = retinaPosition + focusOffsetValue * (1 + Math.abs(inputSlider.value));
         ray4.endX = ray4.focusPoint;
         ray4.spread = ray3.getEndSpread();
         ray1.draw(contexts[2]);
         ray2.draw(contexts[2]);
         ray3.draw(contexts[2]);
         ray4.draw(contexts[2]);

      }
      else if (inputSlider.value == 0) {
         if (stateChanged) {
            Object.assign(feedbackArea.style, { opacity: 0, top: '1122rem' });
            setTimeout(function () {
               feedbackArea.children[0].innerHTML = planeGlassSlabFeedback;
               Object.assign(feedbackArea.style, { opacity: 1, top: '1090rem', background: yellowGradient });
            }, 500);
         }
         else {
            Object.assign(feedbackArea.style, { opacity: 0, top: '1122rem' });
         }

         // Drawing the lens
         Lens.clearRect(contexts[1]);
         Lens.type = 'parallel';
         Lens.draw(contexts[1]);

         // Drawing the ray diagram
         contexts[2].clearRect(0, 0, canvasWidth, canvasHeight);
         ray2.type = 'parallel';
         ray3.spread = ray2.getEndSpread();
         ray4.focusPoint = retinaPosition + focusOffsetValue * (1);
         ray4.endX = ray4.focusPoint;
         ray4.spread = ray3.getEndSpread();
         ray1.draw(contexts[2]);
         ray2.draw(contexts[2]);
         ray3.draw(contexts[2]);
         ray4.draw(contexts[2]);
      }
   }
   previousSliderValue = inputSlider.value;
}

// The following are for the ray diagrams of on the eye

//Drawing and positioning the lenses
var Lens = new lens(canvasWidth * 0.73, canvasHeight * 0.45);
Lens.height = canvasHeight * 0.28;
Lens.width = canvasWidth * 0.04;
Lens.power = 0.5;

var lensFocalLength = canvasWidth * 0.35; //Lens focal length

// Variables for ray calculation
var retinaPosition = canvasWidth * 0.925;
var focusOffsetValue = canvasWidth * 0.02;
var ray1StartingPositionX = canvasWidth * 0.40;
var ray1StartingPositionY = canvasHeight * 0.462;
// var lineWidth = 3 * canvasHeight / 520;
var lineWidth = 2;
var nearObjectDistance = lensFocalLength / 3;
var pointsX = [canvasWidth * 0.40, Lens.x, canvasWidth * 0.785, canvasWidth * 0.801, retinaPosition];

// Defining the rays
var ray1 = new xParallelRays(ray1StartingPositionX, ray1StartingPositionY);
ray1.spread = canvasHeight * 0.09;
ray1.type = 'parallel';
ray1.startX = ray1StartingPositionX;
ray1.focusPoint = ray1StartingPositionX;
ray1.endX = pointsX[1];
ray1.strokeStyle = "#ffffff80";
ray1.fillStyle = "#ffffff80";
ray1.lineWidth = lineWidth;
// parallelRays.draw(contexts[2]);

var ray2 = new xParallelRays(ray1.endX, ray1.startY);
ray2.spread = ray1.getEndSpread();
ray2.endX = pointsX[2];
ray2.strokeStyle = "#ffffff80";
ray2.fillStyle = "#ffffff80";
ray2.type = 'parallel';
ray2.lineWidth = lineWidth;
// ray1.draw(contexts[2]);

var ray3 = new xParallelRays(ray2.endX, ray2.startY);
ray3.spread = ray2.getEndSpread();
ray3.endX = pointsX[3];
ray3.focusPoint = ray3.endX + canvasWidth * 0.03;
ray3.strokeStyle = "#ffffff80";
ray3.fillStyle = "#ffffff80";
ray3.type = 'convergent';
ray3.lineWidth = lineWidth;
// ray2.draw(contexts[2]);

var ray4 = new xParallelRays(ray3.endX, ray3.startY);
ray4.spread = ray3.getEndSpread();
ray4.endX = pointsX[4];
ray4.focusPoint = ray4.endX;
ray4.strokeStyle = "#ffffff80";
ray4.fillStyle = '#ffffff80';
ray4.type = 'convergent';
ray4.lineWidth = lineWidth;

ray1.stroke = false;
ray2.stroke = false;
ray3.stroke = false;
ray4.stroke = false;

/* Four functions for four type of ray diagrams */
function drawRayDiagramMyopiaNear() {
   changeCanvasVariablesZoomIn();
   Lens.draw(contexts[1]);
   ray1.draw(contexts[0]);
   ray2.draw(contexts[0]);
   ray3.draw(contexts[0]);
   ray4.draw(contexts[0]);
}

function changeCanvasVariablesZoomOut() {
   // Variables for ray calculation
   retinaPosition = canvasWidth * 0.925;
   focusOffsetValue = canvasWidth * 0.02;
   ray1StartingPositionX = canvasWidth * 0.40;
   ray1StartingPositionY = canvasHeight * 0.465;

   // Lens variables
   Lens.x = canvasWidth * 0.73;
   Lens.y = canvasHeight * 0.45
   Lens.height = canvasHeight * 0.28;
   Lens.width = canvasWidth * 0.04;

   pointsX = [ray1StartingPositionX, Lens.x + 1, canvasWidth * 0.785 + 1, canvasWidth * 0.809 + 1, retinaPosition];

   // Ray variables
   ray1.startX = ray1StartingPositionX;
   ray1.startY = ray1StartingPositionY;
   ray1.spread = canvasHeight * 0.098;
   ray1.endX = pointsX[1];

   ray2.type = 'parallel';
   ray2.startX = ray1.endX;
   ray2.startY = ray1StartingPositionY;
   ray2.endX = pointsX[2];
   ray2.spread = ray1.getEndSpread();

   ray3.startX = ray2.endX;
   ray3.startY = ray1StartingPositionY;
   ray3.endX = pointsX[3];
   ray3.focusPoint = ray3.endX + canvasWidth * 0.09;
   ray3.focusPoint = retinaPosition + canvasWidth * 0.3;
   ray3.spread = ray2.getEndSpread();

   ray4.startX = ray3.endX;
   ray4.startY = ray1StartingPositionY;
   ray4.endX = pointsX[4];
   ray4.spread = ray3.getEndSpread();
   ray4.focusPoint = ray4.endX;
}

function changeCanvasVariablesZoomIn() {
   rightSideImageArea.classList.add('zoomRight');
   // Variables for ray calculation
   retinaPosition = canvasWidth * 0.90;
   focusOffsetValue = canvasWidth * 0.02 * 1.3;
   ray1StartingPositionX = canvasWidth * 0.46;
   ray1StartingPositionY = canvasHeight * 0.462;

   // Lens variables
   Lens.x = canvasWidth * 0.65;
   Lens.y = canvasHeight * 0.45
   Lens.height = canvasHeight * 0.28 * 1.3;
   Lens.width = canvasWidth * 0.04 * 1.3;

   pointsX = [ray1StartingPositionX, Lens.x + 1, canvasWidth * 0.715 + 1, canvasWidth * 0.74 + 1, retinaPosition];

   // Ray variables
   ray1.startX = ray1StartingPositionX;
   ray1.startY = ray1StartingPositionY;
   ray1.spread = canvasHeight * 0.10 * 1.3;
   ray1.endX = pointsX[1];

   ray2.type = 'parallel';
   ray2.startX = ray1.endX;
   ray2.startY = ray1StartingPositionY;
   ray2.endX = pointsX[2];
   ray2.spread = ray1.getEndSpread();

   ray3.startX = ray2.endX;
   ray3.startY = ray1StartingPositionY;
   ray3.endX = pointsX[3];
   ray3.focusPoint = ray3.endX + canvasWidth * 0.09 * 1.3;
   ray3.focusPoint = retinaPosition + canvasWidth * 0.3 * 1.3;
   ray3.spread = ray2.getEndSpread();

   ray4.startX = ray3.endX;
   ray4.startY = ray1StartingPositionY;
   ray4.endX = pointsX[4];
   ray4.spread = ray3.getEndSpread();
   ray4.focusPoint = ray4.endX;
}

// drawRayDiagramMyopiaNear();