// SFX filrs
var buttonAudio_Click = new Audio();
buttonAudio_Click.src = "../sounds/buton_Click.mp3";


/* Following code till circle_stroke_animation() is for loaded screen animation */

var round_stroke = document.getElementsByClassName('round_stroke')[0];
var circle_stroke = round_stroke.children[0];
function draw_svgArc(svgElement, cx = 0, cy = 0, radius = 1, startAngle = 0, stopAngle = 360) {
    var xStart = radius * Math.cos(startAngle % 360 * (Math.PI / 180));
    var yStart = radius * Math.sin(startAngle % 360 * (Math.PI) / 180);
    var xStop = radius * Math.cos(stopAngle % 360 * (Math.PI / 180));
    var yStop = radius * Math.sin(stopAngle % 360 * (Math.PI) / 180);
    if (stopAngle - startAngle <= 180) {
        var large_arc_sweep_flag = ' 0 0 1 ';
    }
    else {
        var large_arc_sweep_flag = ' 0 1 1 ';
    }
    /* The formate of svg ard is <path d="MstartX YstartY ARadiusX RadiusY 0 0 0 endX endY" ></path>*/
    var stringAttribute = "M" + (cx + xStart).toString() + ' ' + (cy + yStart).toString() +
        ' A' + radius.toString() + " " + radius.toString() + large_arc_sweep_flag
        + (cx + xStop).toString() + " " + (cy + yStop).toString();
    svgElement.setAttribute('d', stringAttribute);
}

var start_Angle = -90;
function circle_stroke_animation() {
    var circle_animation = setInterval(function () {
        if (start_Angle <= 270) {
            draw_svgArc(circle_stroke, 100, 100, 89, start_Angle, 270);
            start_Angle += 3;
        }
        else {
            clearInterval(circle_animation);
        }
    }, 1000/120);

}



// LO messagig screen
var LO_message = document.getElementsByClassName('LO_message')[0];
var popup = document.getElementsByClassName('popup')[0];
var close_button = document.getElementsByClassName('close_button')[0];

close_button.onclick = function () {
    buttonAudio_Click.play();
    window.location.reload();
}


//Finish Button
var finish_button = document.getElementsByClassName('finish-button')[0];
finish_button.onclick = function () {
    buttonAudio_Click.play();
    LO_message.style = "z-index : 0;";
    LO_message.style.backgroundColor = '#000000cc';
    popup.style = 'opacity:1; top: 601px'
    circle_stroke_animation();
    setTimeout(function () {
        close_button.style.opacity = 1;
    }, 1000)

}