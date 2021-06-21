// Following Code is use for adaptation of the device width and height
if (screen.width / screen.height < 9 / 16) {
   screenScaleRatio = 1080 / screen.width;
}
else {
   screenScaleRatio = 1920 / screen.height;
}
var metaData = document.getElementsByName('viewport');
metaData[0].content = "width=device-width, initial-scale=" + 1 / screenScaleRatio.toString();


// Following code is for question tab and observation tab transition
var navigation_bar = document.getElementsByClassName('navigation_bar');
var question_tab = navigation_bar[0].children[1];
var observation_tab = navigation_bar[0].children[0];
var movable_parent = document.getElementsByClassName('movable_parent')[0];

question_tab.onclick = function () {
   movable_parent.style = "left: -1080rem;";
   observation_tab.classList.remove('nav_selected');
   question_tab.classList.add('nav_selected2');
}

observation_tab.onclick = function () {
   movable_parent.style = "left: 0rem";
   observation_tab.classList.add('nav_selected');
   question_tab.classList.remove('nav_selected2');
}

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
resetButton.onclick = reset;

function reset() {
   // bringing back the buttons and hiding the slider
   Object.assign(inputSlider.style, { opacity: '0' });
   Object.assign(myopicButton.style, { opacity: '1' });
   Object.assign(hyperopicButton.style, { opacity: '1' });
   for (let i = 0; i < 3; i++) {
      Object.assign(interactionAreaText[i].style, { opacity: '0' });
      Object.assign(sliderMarkers[i].style, { opacity: '0' });
   }

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
}



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
var lineWidth = 3 * canvasHeight / 520;

// Defining the rays
var ray1 = new xParallelRays(ray1StartingPositionX, ray1StartingPositionY);
ray1.spread = canvasHeight * 0.04;
ray1.type = 'parallel';
ray1.startX = ray1StartingPositionX;
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

// Myopic and hyperopic blur styles
var blurFrontImg = document.getElementById('blurFrontImg');

// input slider and the other texts
var inputSlider = document.getElementById('slider1');
var sliderMarkers = document.getElementsByClassName('marker');
var interactionAreaText = document.getElementsByClassName('interactionAreaText');

/* Defining the functions for the buttons */
var whichButtonClicked = 'notSelectedYet';
myopicButton.onclick = function () {
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

   // Drawing the lens and rays
   Lens.draw(contexts[1]);

   ray3.endX = ratinaPosition - focusOffsetValue;
   ray3.focusPoint = ratinaPosition - focusOffsetValue;
   ray1.draw(contexts[2]);
   ray2.draw(contexts[2]);
   ray3.draw(contexts[2]);
}

hyperopicButton.onclick = function () {
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
   // Drawing the lens and rays
   Lens.draw(contexts[1]);

   ray3.endX = ratinaPosition + focusOffsetValue;
   ray3.focusPoint = ratinaPosition + focusOffsetValue;
   ray1.draw(contexts[2]);
   ray2.draw(contexts[2]);
   ray3.draw(contexts[2]);
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
inputSlider.oninput = sliderFunction;
function sliderFunction() {
   if (whichButtonClicked == 'myopic') {
      blurFrontImg.style.setProperty('--blurValue', `${2 + 2 * inputSlider.value}rem`);
      if (inputSlider.value > 0) {
         feedbackArea.children[0].innerHTML = myopiaConvergingFeedback;
         // Drawing the lens
         Lens.clearRect(contexts[1]);
         Lens.type = 'convex';
         Lens.power = inputSlider.value;
         Lens.draw(contexts[1]);

         // Drawing the ray diagram
         contexts[2].clearRect(0, 0, canvasWidth, canvasHeight);
         ray1.draw(contexts[2]);
         ray2.type = 'convergent';
         ray2.focusPoint = Lens.x + lensFocalLength / (inputSlider.value);
         ray3.endX = ratinaPosition - focusOffsetValue * (1 + Math.abs(inputSlider.value));
         ray3.focusPoint = ratinaPosition - focusOffsetValue * (1 + Math.abs(inputSlider.value));
         ray3.spread = ray2.getEndSpread();
         ray2.draw(contexts[2]);
         ray3.draw(contexts[2]);
      }
      else if (inputSlider.value < 0) {
         feedbackArea.children[0].innerHTML = myopiaDivergingFeedback;
         // drawing the lens
         Lens.clearRect(contexts[1]);
         Lens.type = 'concave';
         Lens.power = Math.abs(inputSlider.value);
         Lens.draw(contexts[1]);

         // Drawing the ray diagram
         contexts[2].clearRect(0, 0, canvasWidth, canvasHeight);
         ray1.draw(contexts[2]);
         ray2.type = 'divergent';
         ray2.focusPoint = Lens.x - (lensFocalLength / Math.abs(inputSlider.value));
         ray3.endX = ratinaPosition - focusOffsetValue * (1 - Math.abs(inputSlider.value));
         ray3.focusPoint = ratinaPosition - focusOffsetValue * (1 - Math.abs(inputSlider.value));
         ray3.spread = ray2.getEndSpread();
         ray2.draw(contexts[2]);
         ray3.draw(contexts[2]);

      }
      else if (inputSlider.value == 0) {
         feedbackArea.children[0].innerHTML = planeGlassSlabFeedback;
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
         feedbackArea.children[0].innerHTML = hypermetropiaConvergingFeedback;
         // Drawing the lens
         Lens.clearRect(contexts[1]);
         Lens.type = 'convex';
         Lens.power = inputSlider.value;
         Lens.draw(contexts[1]);

         // Drawing the ray diagram
         contexts[2].clearRect(0, 0, canvasWidth, canvasHeight);
         ray1.draw(contexts[2]);
         ray2.type = 'convergent';
         ray2.focusPoint = Lens.x + lensFocalLength / (inputSlider.value);
         ray3.focusPoint = ratinaPosition + focusOffsetValue * (1 - Math.abs(inputSlider.value));
         ray3.endX = ray3.focusPoint;
         ray3.spread = ray2.getEndSpread();
         ray2.draw(contexts[2]);
         ray3.draw(contexts[2]);
      }
      else if (inputSlider.value < 0) {
         feedbackArea.children[0].innerHTML = hypermetropiaDivergingFeedback;
         // drawing the lens
         Lens.clearRect(contexts[1]);
         Lens.type = 'concave';
         Lens.power = Math.abs(inputSlider.value);
         Lens.draw(contexts[1]);

         // Drawing the ray diagram
         contexts[2].clearRect(0, 0, canvasWidth, canvasHeight);
         ray1.draw(contexts[2]);
         ray2.type = 'divergent';
         ray2.focusPoint = Lens.x - (lensFocalLength / Math.abs(inputSlider.value));
         ray3.focusPoint = ratinaPosition + focusOffsetValue * (1 + Math.abs(inputSlider.value));
         ray3.endX = ray3.focusPoint;
         ray3.spread = ray2.getEndSpread();
         ray2.draw(contexts[2]);
         ray3.draw(contexts[2]);
      }
      else if (inputSlider.value == 0) {
         feedbackArea.children[0].innerHTML = planeGlassSlabFeedback;
         Lens.clearRect(contexts[1]);
         Lens.type = 'parallel';
         Lens.draw(contexts[1]);

         // Drawing the ray diagram
         ray2.type = 'parallel';
         ray3.focusPoint = ratinaPosition + focusOffsetValue * (1);
         ray3.endX = ray3.focusPoint;
         ray3.spread = ray2.getEndSpread();
         ray3.draw(contexts[2]);
      }
   }
}