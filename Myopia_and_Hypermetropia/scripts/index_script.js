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

//Drawing and positioning the lenses
var Lens = new lens(canvasWidth * 0.68, canvasHeight * 0.45);
Lens.height = canvasHeight * 0.28;
Lens.width = canvasWidth * 0.04;
Lens.power = 0.5;

var lensFocalLength = canvasWidth * 0.35;

// Lens.draw(contexts[1]);

// Variables for ray calculation
var ratinaPosition = canvasWidth * 0.9;
var focusOffsetValue = canvasWidth * 0.02;
var ray1StartingPositionX = canvasWidth * 0.3;
var ray1StartingPositionY = canvasHeight * 0.46;
var lineWidth = 2;

// Defining the rays
var ray1 = new xParallelRays(ray1StartingPositionX, ray1StartingPositionY);
ray1.spread = canvasHeight * 0.08;
ray1.type = 'parallel';
ray1.startX = canvasWidth * 0.3;
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

// input slider and the other texts
var inputSlider = document.getElementById('slider1');
var sliderMarkers = document.getElementsByClassName('marker');
var interactionAreaText = document.getElementsByClassName('interactionAreaText');

/* Defining the functions for the buttons */
var whichButtonClicked = 'notSelectedYet'
myopicButton.onclick = function () {
   whichButtonClicked = 'myopic';
   Object.assign(inputSlider.style, { opacity: '1' });
   Object.assign(myopicButton.style, { opacity: '0' });
   Object.assign(hyperopicButton.style, { opacity: '0' });
   for (let i = 0; i < 3; i++) {
      Object.assign(interactionAreaText[i].style, { opacity: '1' });
      Object.assign(sliderMarkers[i].style, { opacity: '1' });
   }

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
   Object.assign(inputSlider.style, { opacity: '1' });
   Object.assign(myopicButton.style, { opacity: '0' });
   Object.assign(hyperopicButton.style, { opacity: '0' });
   for (let i = 0; i < 3; i++) {
      Object.assign(interactionAreaText[i].style, { opacity: '1' });
      Object.assign(sliderMarkers[i].style, { opacity: '1' });
   }

   // Drawing the lens and rays
   Lens.draw(contexts[1]);

   ray3.endX = ratinaPosition + focusOffsetValue;
   ray3.focusPoint = ratinaPosition + focusOffsetValue;
   ray1.draw(contexts[2]);
   ray2.draw(contexts[2]);
   ray3.draw(contexts[2]);
}

// Defining input slider function
inputSlider.oninput = function () {
   if (whichButtonClicked == 'myopic') {
      if (inputSlider.value > 0) {
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
      {
         if (inputSlider.value > 0) {
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
}
