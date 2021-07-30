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


/* Please do not touch this following code block. It is kept for future purpose. */

// var movable_parent = document.querySelector('.movable_parent');

// touchEvents.oneFingerSwipe(movable_parent, 'left', function () {
//    movable_parent.style = "left: -1080rem;";
// });

// touchEvents.oneFingerSwipe(movable_parent, 'right', function () {
//    movable_parent.style = "left: 0rem;";
// });




/* Start typing your code here.*/


