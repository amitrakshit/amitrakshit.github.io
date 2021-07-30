var devicePixelratio = window.devicePixelRatio;
var draggable_objects = document.querySelectorAll('[draggable = "true"]');
var dropzones = document.querySelectorAll('[dropzone = "copy"]');

var HowManyTouches = 0;

var NumberOfdropzones = dropzones.length;
var dropzone_parameters = new Array();
for (let i = 0; i < NumberOfdropzones; i++) {
    var temp_style = dropzones[i].getBoundingClientRect();
    temp_collection = { left: Number(temp_style.left), top: Number(temp_style.top), width: Number(temp_style.width), height: Number(temp_style.height) };
    dropzone_parameters[i] = temp_collection;
}

var initialX = 0;
var initialY = 0;
var OriginX = 0;
var OriginY = 0;

var previousStyle = undefined;
function touchstart(event) {
    // previousStyle = event.target.style;
    initialX = event.touches[0].pageX;
    initialY = event.touches[0].pageY;
    var target_style = window.getComputedStyle(event.target);
    if (event.target.id == '') {
        event.target.id = 'tempID';
    }
    if (event.target.getAttribute('dragged') != 'true') {
        var target = event.target;
        var target_copy = target.cloneNode(true);
        target.before(target_copy);
        target_copy.id = target.id;
        target.id = target.id + "copy";
        target.style = 'position: absolute; opacity: 0.5;';
        target.setAttribute('dragged', 'true');
    }
    else {
        event.target.style = "position: absolute; opacity: 0.5;";
    }
    OriginX = target_style.left;
    OriginY = target_style.top;
}

function touchmove(event) {
    var relativeX = (event.touches[0].pageX - initialX) * (1 / 1);
    var relativeY = (event.touches[0].pageY - initialY) * (1 / 1);
    var targetX = (Number(OriginX.slice(0, -2)) + relativeX).toString() + 'px';
    var targetY = (Number(OriginY.slice(0, -2)) + relativeY).toString() + 'px';
    event.target.style.left = targetX;
    event.target.style.top = targetY;
    // console.log('clientX', event.touches[0].clientX, 'clientY', event.touches[0].clientY);
}


var defaultDropzoneStyle = dropzones;
function touchend(event) {
    event.target.style.left = OriginX;
    event.target.style.top = OriginY;
    var clientX = Number(event.changedTouches[0].clientX);
    var clientY = Number(event.changedTouches[0].clientY);
    event.target.setAttribute('dropzoneID', 'none');
    event.target.setAttribute('dropped', 'false');


    for (let i = 0; i < NumberOfdropzones; i++) {
        var dropzonLeft = dropzone_parameters[i].left;
        var dropzonTop = dropzone_parameters[i].top;
        var dropzonWidth = dropzone_parameters[i].width;
        var dropzonHeight = dropzone_parameters[i].height;
        // console.log(dropzonLeft, dropzonLeft + dropzonWidth, dropzonTop, dropzonTop + dropzonHeight);

        dropzones[i].style = defaultDropzoneStyle;
        if (clientX > dropzonLeft && clientX < (dropzonLeft + dropzonWidth) && clientY > dropzonTop && clientY < (dropzonTop + dropzonHeight)) {
            dropzones[i].setAttribute('draggedID', event.target.id.slice(0, -4));
            event.target.setAttribute('dropped', 'true');
            event.target.setAttribute('dropzoneID', dropzones[i].id);
        }
        else {
            dropzones[i].style = defaultDropzoneStyle[i].style;
        }
    }
    //For removing the copied one;
    // document.getElementById(event.target.id.slice(0, -4)).remove();
    // event.target.id = event.target.id.slice(0, -4);
    // event.target.setAttribute('dragged', 'false');
    // event.target.style = previousStyle;
    event.target.style = 'opacity: 0;';
}


var touchEvents = {
    oneFingerSwipe: function (element, swipDirection, actionFunction) {
        if (element == undefined) {
            console.error('Element is undefined.');
        }
        if (swipDirection == undefined) {
            console.error('please provide a swipe direction')
        }
        if (actionFunction == undefined) {
            console.error('No action is defined for the event.');
        }
        var initialStyle = window.getComputedStyle(element);
        if (initialStyle.position == '') {
            console.error('The element is not positioned.');
        }
        var timeStampDifference = 0;
        var clientXDifference = 0;
        var clientYDifference = 0;
        var NumberOfTaps = 0;

        var startingPositionX = 0;
        var startingPositionY = 0;
        var computedElementTopValue = 0;
        var computedElementLeftValue = 0;

        element.addEventListener('touchstart', function (ev) {
            timeStampDifference = ev.timeStamp;
            clientXDifference = ev.changedTouches[0].clientX;
            clientYDifference = ev.changedTouches[0].clientY;
            NumberOfTaps = ev.touches.length;

            // For moving the element
            initialStyle = window.getComputedStyle(element);
            defaultElementStyle = { top: initialStyle.top, left: initialStyle.left };
            startingPositionX = ev.changedTouches[0].pageX;
            startingPositionY = ev.changedTouches[0].pageY;
            computedElementTopValue = initialStyle.top;
            computedElementLeftValue = initialStyle.left;
        });

        element.addEventListener('touchmove', function (ev) {
            element.style.transitionDuration = '0s';
            var relativeX = (ev.changedTouches[0].pageX - startingPositionX) * (1 / 1);
            var targetX = (Number(computedElementLeftValue.slice(0, -2)) + relativeX).toString() + 'px';
            var relativeY = (ev.changedTouches[0].pageY - startingPositionY) * (1 / 1);
            var targetY = (Number(computedElementTopValue.slice(0, -2)) + relativeY).toString() + 'px';

            if (swipDirection == 'left' && relativeX < 0) {
                element.style.left = targetX;
            }
            else if (swipDirection == 'right' && relativeX > 0) {
                element.style.left = targetX;
            }
            else if (swipDirection == 'up' && relativeY < 0) {
                element.style.top = targetY;
            }
            else if (swipDirection == 'down' && relativeY > 0) {
                element.style.top = targetY;
            }
        });

        element.addEventListener('touchend', function (ev) {
            element.style.transitionDuration = '0.4s';
            timeStampDifference = ev.timeStamp - timeStampDifference;
            var startingClientX = clientXDifference;
            var startingClientY = clientYDifference;
            clientXDifference = ev.changedTouches[0].clientX - clientXDifference;
            clientYDifference = ev.changedTouches[0].clientY - clientYDifference;

            // This portion is for the swipe action
            if (NumberOfTaps == 1 && timeStampDifference < 500) {
                if (swipDirection == 'left' && clientXDifference < -20) {
                    actionFunction(ev);
                }
                else if (swipDirection == 'right' && clientXDifference > 20) {
                    actionFunction(ev);
                }
                else if (swipDirection == 'up' && clientYDifference < -20) {
                    actionFunction(ev);
                }
                else if (swipDirection == 'down' && clientYDifference > 20) {
                    actionFunction(ev);
                }
            }

            else if (NumberOfTaps == 1 && timeStampDifference >= 500) {
                var halfWidth = window.innerWidth / 2;
                var halfHeight = window.innerHeight / 2;

                if (swipDirection == 'left' && startingClientX > halfWidth && ev.changedTouches[0].clientX < halfWidth) {
                    actionFunction(ev);
                    console.log('left swipe');
                }
                else if (swipDirection == 'right' && startingClientX < halfWidth && ev.changedTouches[0].clientX > halfWidth) {
                    actionFunction(ev);
                    console.log('right swipe');
                }
                else if (swipDirection == 'up' && startingClientY > halfHeight && ev.changedTouches[0].clientY < halfHeight) {
                    actionFunction(ev);
                }
                else if (swipDirection == 'down' && startingClientY < halfHeight && ev.changedTouches[0].clientY > halfHeight) {
                    actionFunction(ev);
                }
                else if ((startingClientX < halfWidth && ev.changedTouches[0].clientX < halfWidth) || (startingClientX > halfWidth && ev.changedTouches[0].clientX > halfWidth)) {
                    element.style.setProperty('left', defaultElementStyle.left.toString());
                    // element.style.setProperty('top', defaultElementStyle.top.toString());
                }
                else if ((startingClientY < halfHeight && ev.changedTouches[0].clientY < halfHeight) || (startingClientY > halfHeight && ev.changedTouches[0].clientY > halfHeight)) {
                    // element.style.setProperty('left', defaultElementStyle.left.toString());
                    element.style.setProperty('top', defaultElementStyle.top.toString());
                }

            }
        });
    }
}

