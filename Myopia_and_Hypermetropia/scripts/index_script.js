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

// Reset Button
var resetButton = document.getElementsByClassName('resetButtonContainter')[0];
resetButton.onclick = function () {
   buttonAudio_Click.play();
   reset();
};  // Calling the reset function defined later on this script

// Status dots and status bar
var statusDots = document.getElementsByClassName("statusDots");
var statusBar = document.getElementById('frontBar');

//Drawing and positioning the lenses
var Lens = new lens(canvasWidth * 0.68, canvasHeight * 0.45);
Lens.height = canvasHeight * 0.28;
Lens.width = canvasWidth * 0.04;
Lens.power = 0.5;

var lensFocalLength = canvasWidth * 0.35; //Lens focal length

// Variables for ray calculation
var ratinaPosition = canvasWidth * 0.9;
var focusOffsetValue = canvasWidth * 0.02;
var ray1StartingPositionX = canvasWidth * 0.35;
var ray1StartingPositionY = canvasHeight * 0.46;
// var lineWidth = 3 * canvasHeight / 520;
var lineWidth = 2;
var nearObjectDistance = lensFocalLength / 3;

// Defining the rays
var ray1 = new xParallelRays(ray1StartingPositionX, ray1StartingPositionY);
ray1.spread = canvasHeight * 0.04;
ray1.type = 'parallel';
ray1.startX = ray1StartingPositionX;
ray1.focusPoint = ray1StartingPositionX;
ray1.endX = Lens.x;
ray1.strokeStyle = "#ffffff";
ray1.fillStyle = "#ffffff00";
ray1.lineWidth = lineWidth;
// parallelRays.draw(contexts[2]);

var ray2 = new xParallelRays(ray1.endX, ray1.startY);
ray2.spread = ray1.getEndSpread();
ray2.endX = canvasWidth * 0.76;
ray2.strokeStyle = "#ffffff";
ray2.fillStyle = "#ffffff00";
ray2.type = 'parallel';
ray2.lineWidth = lineWidth;
// ray1.draw(contexts[2]);

var ray3 = new xParallelRays(ray2.endX, ray2.startY);
ray3.spread = ray2.getEndSpread();
ray3.endX = ratinaPosition;
ray3.focusPoint = ray3.endX;
ray3.strokeStyle = "#ffffff";
ray3.fillStyle = "#ffffff00";
ray3.type = 'convergent';
ray3.lineWidth = lineWidth;
// ray2.draw(contexts[2]); 

// Myopic and hyperopic button
var leftButton = document.getElementById('leftButton');
var rightButton = document.getElementById('rightButton');

// For Myopic and hyperopic blur styles
var frontImg = document.getElementById('blurBackImg');
var blurFrontImg = document.getElementById('blurFrontImg');

// For positioning the small plants on right side screen
var plantsInRightScreen = document.getElementsByClassName('plantImg');

// For bluring the plants on the left side screen
var plantsInLeftScreen = document.getElementsByClassName('leftScreenPlantImg');
var farawayPlant = plantsInLeftScreen[0];
var nearbyPlant = plantsInLeftScreen[1];

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
   leftButton.innerHTML = 'Faraway plant';
   rightButton.innerHTML = 'Nearby plant';
   Object.assign(feedbackArea.style, { opacity: 0 });
   setTimeout(function () {
      feedbackArea.children[0].innerHTML = myopiaFeedback;
      Object.assign(feedbackArea.style, { opacity: 1, background: blueGradient })
   }, 500);

   Object.assign(plantsInRightScreen[1].style, { opacity: 0.5 }); // Rightside plant opacity reducing
   Object.assign(plantsInRightScreen[0].style, { opacity: 1 }); // Rightside plant opacity reducing

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

   // for bluring the images of the plants and the environment
   farawayPlant.classList.add('plantBlur');
   nearbyPlant.classList.remove('plantBlur');
   plantsInRightScreen[0].classList.add('plantBlurSmall');
   plantsInRightScreen[1].classList.remove('plantBlurSmall');
   blurFrontImg.classList.add('myopia');
   blurFrontImg.classList.remove('hyperopia');

   leftButton.disabled = false;
   rightButton.disabled = false;

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

      Object.assign(plantsInRightScreen[1].style, { opacity: 0.5 }); // Rightside plant opacity reducing
      Object.assign(plantsInRightScreen[0].style, { opacity: 1 }); // Rightside plant opacity reducing

      if (whichObjectAlreadyVisited == 'near') {
         whichObjectAlreadyVisited = 'far';
         Object.assign(feedbackArea.style, { opacity: 0 });
         Object.assign(nextButton.style, { opacity: '1' });
         nextButton.disabled = false;
         setTimeout(function () {
            feedbackArea.children[0].innerHTML = "The faraway pot is not clearly visible since its image is formed in front of the retina. Let’s rectify myopia."; //myopia far second feedback
            Object.assign(feedbackArea.style, { opacity: '1', background: yellowGradient });
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
         Object.assign(feedbackArea.style, { opacity: 0 });
         setTimeout(function () {
            feedbackArea.children[0].innerHTML = "The faraway pot is not clearly visible since its image is formed in front of the retina. Let’s Explore the nearby pot."; //myopia far first feedback
            Object.assign(feedbackArea.style, { opacity: '1', background: yellowGradient });
         }, 500);

         // For the status bar updation
         Object.assign(statusBar.style, { width: '50%' });
         Object.assign(statusDots[2].style, { opacity: 1 });
      }

      //For selected button outline
      leftButton.classList.add('buttonSelected');
      rightButton.classList.remove('buttonSelected');


      // Drawing the lens and rays
      contexts[2].clearRect(0, 0, canvasWidth, canvasHeight);
      // Lens.draw(contexts[1]);
      ray1.type = 'parallel';
      ray1.startX = ray1StartingPositionX;
      ray2.type = 'parallel';
      ray2.spread = ray1.getEndSpread();
      ray3.spread = ray2.getEndSpread();
      ray3.endX = ratinaPosition - focusOffsetValue;
      ray3.focusPoint = ratinaPosition - focusOffsetValue;
      ray1.draw(contexts[2]);
      ray2.draw(contexts[2]);
      ray3.draw(contexts[2]);
   }

   /* Following code for myopia near object */
   rightButton.onclick = function () {
      buttonAudio_Click.play();
      whichObjectSelected = 'near';

      Object.assign(plantsInRightScreen[1].style, { opacity: 1 }); // Rightside plant opacity reducing
      Object.assign(plantsInRightScreen[0].style, { opacity: 0.5 }); // Rightside plant opacity reducing

      if (whichObjectAlreadyVisited == 'far') {
         whichObjectAlreadyVisited = 'near';
         Object.assign(feedbackArea.style, { opacity: 0 });
         Object.assign(nextButton.style, { opacity: '1' });
         nextButton.disabled = false;
         setTimeout(function () {
            feedbackArea.children[0].innerHTML = "The nearby pot is clearly visible."; // myopia near second feedback
            Object.assign(feedbackArea.style, { opacity: '1', background: yellowGradient });
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
         Object.assign(feedbackArea.style, { opacity: 0 });
         setTimeout(function () {
            feedbackArea.children[0].innerHTML = "The nearby pot is clearly visible, let’s explore the faraway pot."; // myopia near first feedback
            Object.assign(feedbackArea.style, { opacity: '1', background: yellowGradient });
         }, 500);

         // For the status bar updation
         Object.assign(statusBar.style, { width: '50%' });
         Object.assign(statusDots[2].style, { opacity: 1 });
      }

      //For selected button outline
      leftButton.classList.remove('buttonSelected');
      rightButton.classList.add('buttonSelected');

      // Drawing the lens and rays
      contexts[2].clearRect(0, 0, canvasWidth, canvasHeight);
      // Lens.draw(contexts[1]);
      ray1.type = 'divergent'; // For diverging lens when starting point is the focus point, then providing endSpread value is mandatory
      ray1.endSpread = ray1.spread;
      ray1.startX = Lens.x - nearObjectDistance;
      ray1.focusPoint = ray1.startX;
      ray2.type = 'divergent';
      ray2.spread = ray1.getEndSpread();
      ray2.focusPoint = ray1.focusPoint;
      ray3.spread = ray2.getEndSpread();
      ray3.endX = ratinaPosition;
      ray3.focusPoint = ratinaPosition;
      ray1.draw(contexts[2]);
      ray2.draw(contexts[2]);
      ray3.draw(contexts[2]);


   }
}

function rectifyMyopia() {
   userInteractedWithSlider = false;
   whichObjectSelected = 'far';

   Object.assign(plantsInRightScreen[1].style, { opacity: 0.5 }); // Rightside plant opacity reducing
   Object.assign(plantsInRightScreen[0].style, { opacity: 1 }); // Rightside plant opacity reducing

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

   // Drawing the lens and rays
   contexts[2].clearRect(0, 0, canvasWidth, canvasHeight);
   Lens.draw(contexts[1]);
   ray1.type = 'parallel';
   ray1.spread = canvasHeight * 0.04;
   ray1.startX = ray1StartingPositionX;
   ray2.type = 'parallel';
   ray2.spread = ray1.getEndSpread();
   ray3.spread = ray2.getEndSpread();
   ray3.endX = ratinaPosition - focusOffsetValue;
   ray3.focusPoint = ray3.endX;
   ray1.draw(contexts[2]);
   ray2.draw(contexts[2]);
   ray3.draw(contexts[2]);

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
   leftButton.innerHTML = 'Faraway plant';
   rightButton.innerHTML = 'Nearby plant';
   Object.assign(feedbackArea.style, { opacity: 0 });
   setTimeout(function () {
      feedbackArea.children[0].innerHTML = hypermetropiaFeedback;
      Object.assign(feedbackArea.style, { opacity: 1, background: blueGradient })
   }, 500);

   Object.assign(plantsInRightScreen[1].style, { opacity: 1 }); // Rightside plant opacity reducing
   Object.assign(plantsInRightScreen[0].style, { opacity: 1 }); // Rightside plant opacity reducing

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

   // for bluring the images of the plants
   farawayPlant.classList.remove('plantBlur');
   nearbyPlant.classList.add('plantBlur');
   plantsInRightScreen[0].classList.remove('plantBlurSmall');
   plantsInRightScreen[1].classList.add('plantBlurSmall');
   blurFrontImg.classList.remove('myopia');
   blurFrontImg.classList.add('hyperopia');

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

      Object.assign(plantsInRightScreen[1].style, { opacity: 0.5 }); // Rightside plant opacity reducing
      Object.assign(plantsInRightScreen[0].style, { opacity: 1 }); // Rightside plant opacity reducing

      if (whichObjectAlreadyVisited == 'near') {
         whichObjectAlreadyVisited = 'far';
         Object.assign(feedbackArea.style, { opacity: 0 });
         Object.assign(nextButton.style, { opacity: '1' });
         nextButton.disabled = false;
         setTimeout(function () {
            feedbackArea.children[0].innerHTML = "The faraway pot is clearly visible. Let’s rectify hypermetropia."; //hyperopia far second feedback
            Object.assign(feedbackArea.style, { opacity: '1', background: yellowGradient });
            Object.assign(nextButton.style, { display: 'block', width: '480rem' });
         }, 500);

         // For the status bar updation
         Object.assign(statusBar.style, { width: '75%' });
         Object.assign(statusDots[3].style, { opacity: 1 });

         nextButton.innerHTML = "Rectify <br> hypermetropia";
         nextButton.onclick = function () {
            buttonAudio_Click.play();
            rectifyHypermetropia();
         }
      }
      else if (whichObjectAlreadyVisited == 'none') {
         whichObjectAlreadyVisited = 'far';
         Object.assign(feedbackArea.style, { opacity: 0 });
         setTimeout(function () {
            feedbackArea.children[0].innerHTML = "The faraway pot is clearly visible.  Let’s explore the other pot."; //hyperopia far first feedback
            Object.assign(feedbackArea.style, { opacity: '1', background: yellowGradient });
         }, 500);

         // For the status bar updation
         Object.assign(statusBar.style, { width: '50%' });
         Object.assign(statusDots[2].style, { opacity: 1 });

      }

      //For selected button outline
      leftButton.classList.add('buttonSelected');
      rightButton.classList.remove('buttonSelected');

      // Drawing the lens and rays
      contexts[2].clearRect(0, 0, canvasWidth, canvasHeight);
      // Lens.draw(contexts[1]);
      ray1.type = 'parallel';
      ray1.startX = ray1StartingPositionX;
      ray2.type = 'parallel';
      ray2.spread = ray1.getEndSpread();
      ray3.spread = ray2.getEndSpread();
      ray3.endX = ratinaPosition;
      ray3.focusPoint = ratinaPosition;
      ray1.draw(contexts[2]);
      ray2.draw(contexts[2]);
      ray3.draw(contexts[2]);
   }

   /* Following code for hypermetropia near object */
   rightButton.onclick = function () {
      buttonAudio_Click.play();
      whichObjectSelected = 'near';

      Object.assign(plantsInRightScreen[1].style, { opacity: 1 }); // Rightside plant opacity reducing
      Object.assign(plantsInRightScreen[0].style, { opacity: 0.5 }); // Rightside plant opacity reducing

      if (whichObjectAlreadyVisited == 'far') {
         whichObjectAlreadyVisited = 'near';
         Object.assign(feedbackArea.style, { opacity: 0 });
         Object.assign(nextButton.style, { opacity: '1' });
         nextButton.disabled = false;
         setTimeout(function () {
            feedbackArea.children[0].innerHTML = "The nearby pot is not clearly visible since its image is formed behind the retina."; // hyperopia near second feedback
            Object.assign(feedbackArea.style, { opacity: '1', background: yellowGradient });
            Object.assign(nextButton.style, { display: 'block', width: '480rem' });
         }, 500);

         // For the status bar updation
         Object.assign(statusBar.style, { width: '75%' });
         Object.assign(statusDots[3].style, { opacity: 1 });

         nextButton.innerHTML = "Rectify <br> hypermetropia";
         nextButton.onclick = function () {
            buttonAudio_Click.play();
            rectifyHypermetropia();
         }
      }
      else if (whichObjectAlreadyVisited == 'none') {
         whichObjectAlreadyVisited = 'near';
         Object.assign(feedbackArea.style, { opacity: 0 });
         setTimeout(function () {
            feedbackArea.children[0].innerHTML = "The nearby pot is not clearly visible since its image is formed behind the retina. Let’s explore the other pot."; // hyperopia near first feedback
            Object.assign(feedbackArea.style, { opacity: '1', background: yellowGradient });
         }, 500);

         // For the status bar updation
         Object.assign(statusBar.style, { width: '50%' });
         Object.assign(statusDots[2].style, { opacity: 1 });
      }

      //For selected button outline
      leftButton.classList.remove('buttonSelected');
      rightButton.classList.add('buttonSelected');

      // Drawing the lens and rays
      contexts[2].clearRect(0, 0, canvasWidth, canvasHeight);
      // Lens.draw(contexts[1]);
      ray1.type = 'divergent'; // For diverging lens when starting point is the focus point, then providing endSpread value is mandatory
      ray1.endSpread = ray1.spread;
      ray1.startX = Lens.x - nearObjectDistance;
      ray1.focusPoint = ray1.startX;
      ray2.type = 'divergent';
      ray2.spread = ray1.getEndSpread();
      ray2.focusPoint = ray1.focusPoint;
      ray3.spread = ray2.getEndSpread();
      ray3.endX = ratinaPosition + focusOffsetValue;
      ray3.focusPoint = ratinaPosition + focusOffsetValue;
      ray1.draw(contexts[2]);
      ray2.draw(contexts[2]);
      ray3.draw(contexts[2]);
   }
}

function rectifyHypermetropia() {
   userInteractedWithSlider = false;
   whichObjectSelected = 'near';

   Object.assign(plantsInRightScreen[1].style, { opacity: 1 }); // Rightside plant opacity reducing
   Object.assign(plantsInRightScreen[0].style, { opacity: 0.5 }); // Rightside plant opacity reducing

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

   // Drawing the lens and rays
   contexts[2].clearRect(0, 0, canvasWidth, canvasHeight);
   Lens.draw(contexts[1]);
   ray1.type = 'divergent';
   ray1.spread = canvasHeight * 0.04;
   ray1.endSpread = ray1.spread; // For diverging lens when starting point is the focus point, then providing endSpread value is mandatory
   ray1.startX = Lens.x - nearObjectDistance;
   ray1.focusPoint = ray1.startX;
   ray2.type = 'divergent';
   ray2.spread = ray1.getEndSpread();
   ray2.focusPoint = ray1.focusPoint;
   ray3.spread = ray2.getEndSpread();
   ray3.endX = ratinaPosition + focusOffsetValue;
   ray3.focusPoint = ratinaPosition + focusOffsetValue;
   ray1.draw(contexts[2]);
   ray2.draw(contexts[2]);
   ray3.draw(contexts[2]);
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

   // The image of small plants
   Object.assign(plantsInRightScreen[0].style, { opacity: '1' }); // Left image
   Object.assign(plantsInRightScreen[1].style, { opacity: '1' }); // Right image
   plantsInRightScreen[0].style.setProperty('--blurValue', '0rem');
   plantsInRightScreen[1].style.setProperty('--blurValue', '0rem');

   lens.type = 'parallel';
   sliderFunction();
   for (let i = 0; i < canvases.length; i++) {
      contexts[i].clearRect(0, 0, canvasWidth, canvasHeight);
   }
   Object.assign(feedbackArea.style, { opacity: '0' }); // hiding the feedback
   setTimeout(function () {
      Object.assign(feedbackArea.style, { opacity: '1', background: blueGradient })
   }, 500);
   feedbackArea.children[0].innerHTML = "Tap on the buttons to explore eye defect";

   blurFrontImg.classList.remove('myopia');
   blurFrontImg.classList.remove('hyperopia');
   nearbyPlant.classList.remove('plantBlur');
   farawayPlant.classList.remove('plantBlur');

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
var hypermetropiaFeedback = "Nearby objects are not clearly visible in hypermetropia. Tap the options below to observe why.";
var myopiaFeedback = "Faraway objects are not clearly visible in myopia. Tap the options bellow to observe why.";

// var planeGlassSlabFeedback = "Try changing the curvature of lens to correct the defect in the eye.";


var hypermetropiaDivergingFeedback = "This lens diverges the rays before they reach the eye lens shifting the image even farther.";
var hypermetropiaConvergingFeedback = "This lens converges the rays before the eye lens, shifting the image towards the retina.";
var myopiaDivergingFeedback = "This lens diverges the rays before reaching the eye lens, shifting the image towards retina.";
var myopiaConvergingFeedback = "This lens converges the rays before the eye lens, shifting the image farther from the retina.";

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
   if (previousSliderValue < 0 && inputSlider.value > 0) {
      stateChanged = true;
   }
   else if (previousSliderValue > 0 && inputSlider.value < 0) {
      stateChanged = true;
   }
   else if (previousSliderValue == 0 && inputSlider.value < 0 || previousSliderValue == 0 && inputSlider.value > 0) {
      stateChanged = true;
   }
   else {
      stateChanged = false;
   }

   if (typeOfEyeDefect == 'myopic' && whichObjectSelected == 'far') {
      blurFrontImg.style.setProperty('--blurValue', `${2 + 2 * inputSlider.value}rem`);
      farawayPlant.style.setProperty('--blurValue', `${10 + 10 * inputSlider.value}rem`);
      plantsInRightScreen[0].style.setProperty('--blurValue', `${2 + 2 * inputSlider.value}rem`)
      if (userInteractedWithSlider == false) {
         Object.assign(feedbackArea.style, { opacity: 0 });
         setTimeout(function () {
            feedbackArea.children[0].innerHTML = "Lets try to rectify myopia by focusing the rays on to the retina using a corrective lens.";
            Object.assign(feedbackArea.style, { opacity: 1, background: blueGradient });
         }, 500);
      }
      if (inputSlider.value > 0) {
         if (stateChanged) {
            Object.assign(feedbackArea.style, { opacity: 0 });
            setTimeout(function () {
               feedbackArea.children[0].innerHTML = myopiaConvergingFeedback;
               Object.assign(feedbackArea.style, { opacity: 1, background: yellowGradient });
            }, 500);
         }

         // Drawing the lens
         Lens.clearRect(contexts[1]);
         Lens.type = 'convexE';
         Lens.power = inputSlider.value;
         Lens.draw(contexts[1]);

         // Drawing the ray diagram
         contexts[2].clearRect(0, 0, canvasWidth, canvasHeight);
         ray1.draw(contexts[2]);
         ray2.type = 'convergent';
         ray2.focusPoint = Lens.x + 1 * lensFocalLength / (inputSlider.value);
         ray3.endX = ratinaPosition - focusOffsetValue * (1 + Math.abs(inputSlider.value));
         ray3.focusPoint = ratinaPosition - focusOffsetValue * (1 + Math.abs(inputSlider.value));
         ray3.spread = ray2.getEndSpread();
         ray2.draw(contexts[2]);
         ray3.draw(contexts[2]);
      }
      else if (inputSlider.value < 0) {
         if (stateChanged) {
            Object.assign(feedbackArea.style, { opacity: 0 });
            setTimeout(function () {
               feedbackArea.children[0].innerHTML = myopiaDivergingFeedback;
               Object.assign(feedbackArea.style, { opacity: 1, background: yellowGradient });
            }, 500);
         }

         // Bringing back the button
         if (inputSlider.value == -1) {
            Object.assign(nextButton.style, { display: 'block' });
         }

         // drawing the lens
         Lens.clearRect(contexts[1]);
         Lens.type = 'concave';
         Lens.power = Math.abs(inputSlider.value);
         Lens.draw(contexts[1]);

         // Drawing the ray diagram
         contexts[2].clearRect(0, 0, canvasWidth, canvasHeight);
         ray1.draw(contexts[2]);
         ray2.type = 'divergent';
         ray2.focusPoint = Lens.x - (0.3 * lensFocalLength / Math.abs(inputSlider.value));
         ray3.endX = ratinaPosition - focusOffsetValue * (1 - Math.abs(inputSlider.value));
         ray3.focusPoint = ratinaPosition - focusOffsetValue * (1 - Math.abs(inputSlider.value));
         ray3.spread = ray2.getEndSpread();
         ray2.draw(contexts[2]);
         ray3.draw(contexts[2]);

      }
      else if (inputSlider.value == 0) {
         if (stateChanged) {
            Object.assign(feedbackArea.style, { opacity: 0 });
            setTimeout(function () {
               feedbackArea.children[0].innerHTML = planeGlassSlabFeedback;
               Object.assign(feedbackArea.style, { opacity: 1, background: yellowGradient });
            }, 500);
         }

         Lens.clearRect(contexts[1]);
         Lens.type = 'parallel';
         Lens.draw(contexts[1]);

         // Drawing the ray diagram
         ray2.type = 'parallel';

         ray3.endX = ratinaPosition - focusOffsetValue * (1);
         ray3.focusPoint = ratinaPosition - focusOffsetValue * (1);
         ray3.spread = ray2.getEndSpread();
         ray3.draw(contexts[2]);
      }
   }
   else if (typeOfEyeDefect == 'hyperopic' && whichObjectSelected == 'near') {
      blurFrontImg.style.setProperty('--blurValue', `${2 - 2 * inputSlider.value}rem`);
      nearbyPlant.style.setProperty('--blurValue', `${10 - 10 * inputSlider.value}rem`);
      plantsInRightScreen[1].style.setProperty('--blurValue', `${2 - 2 * inputSlider.value}rem`)
      if (userInteractedWithSlider == false) {
         Object.assign(feedbackArea.style, { opacity: 0 });
         setTimeout(function () {
            feedbackArea.children[0].innerHTML = "Lets try to rectify hypermetropia by focusing the rays on to the retina using a corrective lens.";
            Object.assign(feedbackArea.style, { opacity: 1, background: blueGradient });
         }, 500);
      }
      if (inputSlider.value > 0) {
         if (stateChanged) {
            Object.assign(feedbackArea.style, { opacity: 0 });
            setTimeout(function () {
               feedbackArea.children[0].innerHTML = hypermetropiaConvergingFeedback;
               Object.assign(feedbackArea.style, { opacity: 1, background: yellowGradient });
            }, 500);
         }
         // Bringing back the button
         if (inputSlider.value == 1) {
            Object.assign(nextButton.style, { display: 'block', width: '480rem' });
         }

         var focalLength = lensFocalLength / (Math.abs(inputSlider.value));
         var imageDistance = (-nearObjectDistance * focalLength) / (-nearObjectDistance + focalLength);
         ray2.focusPoint = Lens.x + imageDistance;


         // Drawing the lens
         Lens.clearRect(contexts[1]);
         Lens.type = 'convexE';
         Lens.power = inputSlider.value;
         Lens.draw(contexts[1]);

         // Drawing the ray diagram
         contexts[2].clearRect(0, 0, canvasWidth, canvasHeight);
         ray2.type = 'convergent';
         ray3.focusPoint = ratinaPosition + focusOffsetValue * (1 - Math.abs(inputSlider.value));
         ray3.endX = ray3.focusPoint;
         ray3.spread = ray2.getEndSpread();
         ray1.draw(contexts[2]);
         ray2.draw(contexts[2]);
         ray3.draw(contexts[2]);
      }
      else if (inputSlider.value < 0) {
         if (stateChanged) {
            Object.assign(feedbackArea.style, { opacity: 0 });
            setTimeout(function () {
               feedbackArea.children[0].innerHTML = hypermetropiaDivergingFeedback;
               Object.assign(feedbackArea.style, { opacity: 1, background: yellowGradient });
            }, 500);
         }


         var focalLength = lensFocalLength / (Math.abs(inputSlider.value));
         var imageDistance = (nearObjectDistance * focalLength) / (-nearObjectDistance - focalLength);
         ray2.focusPoint = Lens.x + imageDistance;

         // drawing the lens
         Lens.clearRect(contexts[1]);
         Lens.type = 'concave';
         Lens.power = Math.abs(inputSlider.value);
         Lens.draw(contexts[1]);

         // Drawing the ray diagram
         contexts[2].clearRect(0, 0, canvasWidth, canvasHeight);
         ray2.type = 'divergent';
         // ray2.focusPoint = Lens.x - (lensFocalLength / Math.abs(inputSlider.value));
         ray3.focusPoint = ratinaPosition + focusOffsetValue * (1 + Math.abs(inputSlider.value));
         ray3.endX = ray3.focusPoint;
         ray3.spread = ray2.getEndSpread();
         ray1.draw(contexts[2]);
         ray2.draw(contexts[2]);
         ray3.draw(contexts[2]);
      }
      else if (inputSlider.value == 0) {
         if (stateChanged) {
            Object.assign(feedbackArea.style, { opacity: 0 });
            setTimeout(function () {
               feedbackArea.children[0].innerHTML = planeGlassSlabFeedback;
               Object.assign(feedbackArea.style, { opacity: 1, background: yellowGradient });
            }, 500);
         }

         var imageDistance = -nearObjectDistance;
         // Drawing the ray diagram
         contexts[2].clearRect(0, 0, canvasWidth, canvasHeight);
         Lens.clearRect(contexts[1]);
         Lens.type = 'parallel';
         Lens.draw(contexts[1]);

         // Drawing the ray diagram

         ray2.type = 'divergent';
         ray2.focusPoint = ray1.focusPoint;
         ray3.focusPoint = ratinaPosition + focusOffsetValue * (1);
         ray3.endX = ray3.focusPoint;
         ray3.spread = ray2.getEndSpread();
         ray1.draw(contexts[2]);
         ray2.draw(contexts[2]);
         ray3.draw(contexts[2]);
      }
   }
   else if (typeOfEyeDefect == 'myopic' && whichObjectSelected == 'near') {

   }
   else if (typeOfEyeDefect == 'hyperopic' && whichObjectSelected == 'far') {

   }
   previousSliderValue = inputSlider.value;
}