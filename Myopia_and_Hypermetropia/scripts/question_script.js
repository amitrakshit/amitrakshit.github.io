
// SFX files
var Right_ANS = new Audio();
Right_ANS.src = "sounds/Right_ANS.mp3";
var Wrong_ANS = new Audio();
Wrong_ANS.src = "sounds/Wrong_ANS.mp3";
var buttonAudio_Click = new Audio();
buttonAudio_Click.src = "sounds/buton_Click.mp3";

//Dynamic_panel
var scrollable_dynamic_panel = document.getElementsByClassName('scrollable_dynamic_panel')[0];
var dynamic_panel_window = document.getElementsByClassName('dynamic_panel_window')[0];

//question_area
var question_area = document.getElementsByClassName("question_area")[0];

//geting the feedback bar
var feedback_bar = document.getElementsByClassName('feedback-bar')[0];

//geting the options into account
var option_container = document.getElementsByClassName("option-container")[0];
var options = document.getElementsByClassName("options");
var optionsChildren = document.getElementsByClassName('checkBox');

// the behind divs for all options
var behindDivs = document.getElementsByClassName("behindText");

//solution and footer
var solution = document.getElementsByClassName('solution')[0];
var footer = document.getElementsByTagName('footer')[0];

//changing the parameters of the options and other
var solution_clicked = false;
var which_button_clicked = 1;
for (let index = 0; index < options.length; index++) {
    options[index].onclick = function () {
        if (userResponse[index] == false) {
            userResponse[index] = true;
            optionsChildren[index].children[0].classList.add('checked');
        }
        else if (userResponse[index] == true) {
            userResponse[index] = false;
            optionsChildren[index].children[0].classList.remove('checked');
        }
    }
}

// Finish Button
// functionality added in LO_script



// Submit button
var submitButton = document.getElementsByClassName('submitButton')[0];
submitButton.onclick = function () {
    buttonAudio_Click.play();
    submitAns();
}

var correctResponse = [true, false, true];
var userResponse = [false, false, false];

var greenGradient = "linear-gradient(180deg, #3CA35A, #389B60)";
var redGradient = "linear-gradient(180deg, #FB6F6F, #EB5151)";

function submitAns() {
    var rightAnswerStatus = false; var wrongAnswerStatus = false;
    for (let i = 0; i <= correctResponse.length; i++) {
        if (userResponse[i] == true && correctResponse[i] == true) {
            Object.assign(options[i].style, { background: greenGradient, color: "white" });
            rightAnswerStatus = true;
            optionsChildren[i].classList.add('answered');
            optionsChildren[i].children[0].classList.add('rightAns');
            options[i].onclick = () => {
                buttonAudio_Click.play();
            }
        }
        else if (userResponse[i] == true && correctResponse[i] == false) {
            Object.assign(options[i].style, { background: redGradient, color: "white" });
            wrongAnswerStatus = true;
            optionsChildren[i].classList.add('answered');
            optionsChildren[i].children[0].classList.add('wrongAns');
        }
        else {
            if (correctResponse[i] == true) {
                wrongAnswerStatus = true;
            }
        }
    }

    if (rightAnswerStatus == true && wrongAnswerStatus == false) {
        // correct answer
        Right_ANS.play();
        Object.assign(feedback_bar.style, { opacity: 1, top: "1000rem" });
        feedback_bar.children[0].style = "color: #8DD43E;";
        feedback_bar.children[0].innerHTML = "Well Done!";
        feedback_bar.children[1].style = "color: #8DD43E;";
        feedback_bar.children[1].innerHTML = "You got the correct answer!";
        dynamic_panel_window.style = "overflow-y:scroll;";
        dynamic_panel_window.scroll({ top: 350, behavior: "smooth" });
        footer.style = "bottom:0rem";

        // Hiding the submit button
        Object.assign(submitButton.style, { display: 'none' });

        // LO pop up
        LO_message.style = "z-index : 0;";
        LO_message.style.backgroundColor = '#000000cc';
        popup.style = 'opacity:1; top: 580rem'
        circle_stroke_animation();
        setTimeout(function () {
            close_button.style.opacity = 1;
        }, 1000);
    }
    else if (rightAnswerStatus == true && wrongAnswerStatus == true) {
        // partially correct answer
        feedback_bar.children[1].innerHTML = "You have partially answered. <br> Try again. There are total two correct answers.";
        Object.assign(feedback_bar.children[1].style, { width: '90%' });
        Object.assign(feedback_bar.style, { opacity: 1, top: "970rem" });
        Wrong_ANS.play();
        submitButton.innerHTML = 'Retry';
        submitButton.onclick = function () {
            buttonAudio_Click.play();
            retry();
        }
    }
    else if (rightAnswerStatus == false && wrongAnswerStatus == true) {
        // wrong answer
        Object.assign(feedback_bar.style, { opacity: 1, top: "970rem" });
        Wrong_ANS.play();
        submitButton.innerHTML = 'Retry';
        submitButton.onclick = function () {
            buttonAudio_Click.play();
            retry();
        }
    }

}

function retry() {
    for (let i = 0; i < correctResponse.length; i++) {
        if (userResponse[i] == true && correctResponse[i] == true) {
            Object.assign(optionsChildren[i].style, { display: 'none' });
            options[i].onclick = function () {
                popDownTxt(this);
            }
        }
        else {
            userResponse[i] = false;
            optionsChildren[i].children[0].classList.remove('wrongAns');
            optionsChildren[i].children[0].classList.remove('checked');
            optionsChildren[i].classList.remove('answered');
            Object.assign(options[i].style, { background: 'white', color: '#333333' });
        }
    }
    submitButton.innerHTML = "Submit";
    submitButton.onclick = function () {
        buttonAudio_Click.play();
        submitAns();
    }
}

function popDownTxt(option) {
    var index = (option.id).charAt(option.id.length - 1);
    behindDivs[index - 1].style.setProperty('--downwardDisplacement', '30rem');
    setTimeout(function () {
        behindDivs[index - 1].style.setProperty('--downwardDisplacement', '0rem');
    }, 2000);

}