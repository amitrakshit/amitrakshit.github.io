// Following Code is use for adaptation of the device width and height
if (screen.width / screen.height < 9 / 16) {
   screenScaleRatio = 1080 / screen.width;
}
else {
   screenScaleRatio = 1920 / screen.height;
}
var metaData = document.getElementsByName('viewport');
metaData[0].content = "width=device-width, initial-scale=" + 1 / screenScaleRatio.toString();

// SFX filrs
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

//Defining the required canvas variables and the contexts
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
var objectDistance = lensFocalLength / 3;

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
var myopicButton = document.getElementById('myopia');
var hyperopicButton = document.getElementById('hyperopia');

// For Myopic and hyperopic blur styles
var frontImg = document.getElementById('blurBackImg');
var blurFrontImg = document.getElementById('blurFrontImg');

// For positioning the small plants on right side screen
var plantsInRightScreen = document.getElementsByClassName('plantImg');

// input slider and the other texts
var inputSlider = document.getElementById('slider1');
var sliderMarkers = document.getElementsByClassName('marker');
var interactionAreaText = document.getElementsByClassName('interactionAreaText');

/* Defining the functions for the buttons */
var whichButtonClicked = 'notSelectedYet';
myopicButton.onclick = function () {
   buttonAudio_Click.play();
   whichButtonClicked = 'myopic';
   blurFrontImg.classList.add('myopia');
   blurFrontImg.classList.remove('hyperopia');
   Object.assign(inputSlider.style, { opacity: '1' });
   Object.assign(myopicButton.style, { opacity: '0' });
   Object.assign(hyperopicButton.style, { opacity: '0' });
   for (let i = 0; i < 3; i++) {
      Object.assign(interactionAreaText[i].style, { opacity: '1' });
      Object.assign(sliderMarkers[i].style, { opacity: '1' });
   }
   feedbackArea.children[0].innerHTML = myopiaFeedback;
   Object.assign(feedbackArea.style, { opacity: '1' });

   // The Images for frontView source change..
   frontImg.src = "./img/wallFrontView.png";
   blurFrontImg.src = "./img/wallFrontView.png";

   // The image of small
   Object.assign(plantsInRightScreen[0].style, { opacity: '1' }); // Left image
   Object.assign(plantsInRightScreen[1].style, { opacity: '0' }); // Right image

   // Drawing the lens and rays
   Lens.draw(contexts[1]);
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

hyperopicButton.onclick = function () {
   buttonAudio_Click.play();
   whichButtonClicked = 'hyperopic';
   blurFrontImg.classList.remove('myopia');
   blurFrontImg.classList.add('hyperopia');
   Object.assign(inputSlider.style, { opacity: '1' });
   Object.assign(myopicButton.style, { opacity: '0' });
   Object.assign(hyperopicButton.style, { opacity: '0' });
   for (let i = 0; i < 3; i++) {
      Object.assign(interactionAreaText[i].style, { opacity: '1' });
      Object.assign(sliderMarkers[i].style, { opacity: '1' });
   }
   feedbackArea.children[0].innerHTML = hypermetropiaFeedback;
   Object.assign(feedbackArea.style, { opacity: '1' });

   // The Images for frontView source change..
   frontImg.src = "./img/wallFrontViewForHypermetropia.png";
   blurFrontImg.src = "./img/wallFrontViewForHypermetropia.png";

   // The image of small
   Object.assign(plantsInRightScreen[0].style, { opacity: '0' }); // Left image
   Object.assign(plantsInRightScreen[1].style, { opacity: '1' }); // Right image

   // Drawing the lens and rays
   Lens.draw(contexts[1]);
   ray1.type = 'divergent';
   ray1.endSpread = ray1.spread; // For diverging lens when starting point is the focus point, then providing endSpread value is mandatory
   ray1.startX = Lens.x - objectDistance;
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

// Reset function
function reset() {
   // bringing back the buttons and hiding the slider
   Object.assign(inputSlider.style, { opacity: '0' });
   Object.assign(myopicButton.style, { opacity: '1' });
   Object.assign(hyperopicButton.style, { opacity: '1' });
   for (let i = 0; i < 3; i++) {
      Object.assign(interactionAreaText[i].style, { opacity: '0' });
      Object.assign(sliderMarkers[i].style, { opacity: '0' });
   }

   // The image of small
   Object.assign(plantsInRightScreen[0].style, { opacity: '0' }); // Left image
   Object.assign(plantsInRightScreen[1].style, { opacity: '0' }); // Right image

   inputSlider.value = 0; // inputSlider value to default value
   lens.type = 'parallel';
   sliderFunction();
   for (let i = 0; i < canvases.length; i++) {
      contexts[i].clearRect(0, 0, canvasWidth, canvasHeight);
   }
   Object.assign(feedbackArea.style, { opacity: '0' }); // hiding the feedback
   whichButtonClicked = 'notSelectedYet';

   blurFrontImg.classList.remove('myopia');
   blurFrontImg.classList.remove('hyperopia');

   // For checking the state change
   previousSliderValue = 0.0;
   stateChanged = false;
}

// feedback texts and feedbackArea
var hypermetropiaFeedback = "In hypermetropia a blurred image of nearby objects are formed beyond the retina.";
var myopiaFeedback = "In myopia a blurred image of faraway objects are formed in front of the retina.";
var planeGlassSlabFeedback = "Try changing the curvature of lens to correct the defect in the eye.";
var hypermetropiaDivergingFeedback = "This lens moves the rays away from each other, shifting the image before the retina.";
var hypermetropiaConvergingFeedback = "This lens moves the rays away from each other, shifting the image at the retina.";
var myopiaDivergingFeedback = "This lens moves the rays away from each other, shifting the image at the retina.";
var myopiaConvergingFeedback = "This lens moves the rays away from each other, shifting the image before the retina.";

var feedbackArea = document.getElementsByClassName('feedback_bar')[0];

// Defining input slider function
inputSlider.oninput = function () {
   sliderOnInputAudio.play();
   sliderFunction();
}
inputSlider.onchange = function () {
   sliderOnChangeAudio.play();
}
// Global variables for changing state and detecting it
var previousSliderValue = 0.0;
var stateChanged = false;

function sliderFunction() {
   if (previousSliderValue < 0 && inputSlider.value >= 0) {
      stateChanged = true;
   }
   else if (previousSliderValue > 0 && inputSlider.value <= 0) {
      stateChanged = true;
   }
   else if (previousSliderValue == 0 && inputSlider.value < 0 || previousSliderValue == 0 && inputSlider.value > 0) {
      stateChanged = true;
   }
   else {
      stateChanged = false;
   }
   if (whichButtonClicked == 'myopic') {
      blurFrontImg.style.setProperty('--blurValue', `${2 + 2 * inputSlider.value}rem`);
      if (inputSlider.value > 0) {
         if (stateChanged) {
            Object.assign(feedbackArea.style, { opacity: 0 });
            setTimeout(function () {
               feedbackArea.children[0].innerHTML = myopiaConvergingFeedback;
               Object.assign(feedbackArea.style, { opacity: 1 });
            }, 500);
         }

         // Drawing the lens
         Lens.clearRect(contexts[1]);
         Lens.type = 'convex';
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
               Object.assign(feedbackArea.style, { opacity: 1 });
            }, 500);
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
               Object.assign(feedbackArea.style, { opacity: 1 });
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
   else if (whichButtonClicked == 'hyperopic') {
      blurFrontImg.style.setProperty('--blurValue', `${2 - 2 * inputSlider.value}rem`);
      if (inputSlider.value > 0) {
         if (stateChanged) {
            Object.assign(feedbackArea.style, { opacity: 0 });
            setTimeout(function () {
               feedbackArea.children[0].innerHTML = hypermetropiaConvergingFeedback;
               Object.assign(feedbackArea.style, { opacity: 1 });
            }, 500);
         }


         var focalLength = lensFocalLength / (Math.abs(inputSlider.value));
         var imageDistance = (-objectDistance * focalLength) / (-objectDistance + focalLength);
         ray2.focusPoint = Lens.x + imageDistance;


         // Drawing the lens
         Lens.clearRect(contexts[1]);
         Lens.type = 'convex';
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
               Object.assign(feedbackArea.style, { opacity: 1 });
            }, 500);
         }


         var focalLength = lensFocalLength / (Math.abs(inputSlider.value));
         var imageDistance = (objectDistance * focalLength) / (-objectDistance - focalLength);
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
               Object.assign(feedbackArea.style, { opacity: 1 });
            }, 500);
         }

         var imageDistance = -objectDistance;
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
   previousSliderValue = inputSlider.value;
}