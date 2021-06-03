var context_button = document.getElementsByClassName('context_button')[0];
var context_card = document.getElementsByClassName('contex_card')[0];
var context_card_closed = true;
context_button.addEventListener('click', function (event) {
    buttonAudio_Click.play();
    if (context_card_closed) {
        context_card.style.setProperty('transform', 'scale(1)');
        context_card.style.opacity = 1;
        context_card_closed = false;
    }
    else {
        buttonAudio_Click.play();
        context_card.style.setProperty('transform', 'scale(0)');
        context_card.style.opacity = 0;
        context_card_closed = false;
        context_card_closed = true;
    }
})

// var Tobescaled = window.innerHeight / 1920;
// if (window.innerWidth / window.innerHeight > 9 / 16) {
//     var Tobescaled = window.innerHeight / 1920;
//     document.getElementsByClassName('window')[0].style.setProperty('transform', 'scale(' + Tobescaled.toString() + ')');
// }
// else {
//     var Tobescaled = window.innerWidth / 1080;
//     document.getElementsByClassName('window')[0].style.setProperty('transform', 'scale(' + Tobescaled.toString() + ')');
//     document.getElementsByClassName('window')[0].style = "transform-origin:center;";
// }