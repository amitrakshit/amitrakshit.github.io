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
        var target_copy = target.cloneNode(true); //For copying the node with all its childs and innerHTML
        target.before(target_copy);
        target_copy.id = target.id;
        target.id = target.id + "copy";
        target.style = 'position: absolute; opacity: 0.5;';
        target.setAttribute('dragged', 'true');
    }
    else {
        event.target.style.setProperty ('position', 'absolute');
        event.target.style.setProperty ('opacity', '0.5');
    }
    OriginX = target_style.left;
    OriginY = target_style.top;
}

function touchmove(event) {
    var relativeX = (event.touches[0].pageX - initialX) * (1 / 1);
    var relativeY = (event.touches[0].pageY - initialY) * (1 / 1);
    var targetX = (Number(OriginX.slice(0, -2)) + relativeX).toString() + 'px';
    var targetY = (Number(OriginY.slice(0, -2)) + relativeY).toString() + 'px';
    event.target.style.setProperty('left', targetX);
    event.target.style.setProperty('top', targetY);
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
        else{
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
