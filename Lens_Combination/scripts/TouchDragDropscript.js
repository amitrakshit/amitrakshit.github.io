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
var OriginXTouch = 0;
var OriginYTouch = 0;

var previousStyle = 0;
function touchstart(event) {
    initialX = event.touches[0].pageX;
    initialY = event.touches[0].pageY;
    if (event.target.id == '') {
        event.target.id = 'tempID';
    }
    if (event.target.getAttribute('dragged') != 'true') {
        var target = event.target;
        var target_copy = target.cloneNode(true); //For copying the node with all its childs and innerHTML
        previousStyle = window.getComputedStyle(target);
        target_style = previousStyle;
        target.before(target_copy);
        target_copy.id = target.id;
        target.id = target.id + "copy";
        event.target.style.setProperty('position', 'absolute');        
        event.target.style.setProperty('opacity', '0.5');
        event.target.style.setProperty('top', target_style.top);
        event.target.style.setProperty('left', target_style.left);
        target.setAttribute('dragged', 'true');
    }
    else if(event.target.getAttribute('dragged') == 'true') {
        event.target.style.setProperty('position', 'absolute');
        event.target.style.setProperty('opacity', '0.5');
        // event.target.style.setProperty('top', previousStyle.top);
        // event.target.style.setProperty('left', previousStyle.left);
    }
    
    OriginXTouch = target_style.left;
    OriginYTouch = target_style.top;
}

function touchmove(event) {
    var relativeX = (event.touches[0].pageX - initialX) * (1 / 1);
    var relativeY = (event.touches[0].pageY - initialY) * (1 / 1);
    var targetX = (Number(OriginXTouch.slice(0, -2)) + relativeX).toString() + 'px';
    var targetY = (Number(OriginYTouch.slice(0, -2)) + relativeY).toString() + 'px';
    event.target.style.setProperty('left', targetX);
    event.target.style.setProperty('top', targetY);
    // console.log('clientX', event.touches[0].clientX, 'clientY', event.touches[0].clientY);
}


var defaultDropzoneStyle = dropzones;
function touchend(event) {
    event.target.style.left = OriginXTouch;
    event.target.style.top = OriginYTouch;
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
    // For removing the copied one;
    document.getElementById(event.target.id.slice(0, -4)).remove();
    event.target.id = event.target.id.slice(0, -4);
    event.target.setAttribute('dragged', 'false');
    event.target.style.setProperty('top', previousStyle.top);
    event.target.style.setProperty('left', previousStyle.left);
    event.target.style = 'opacity: 1;';
}
