
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
// functionality added in LO_script.js



// Submit button
var submitButton = document.getElementsByClassName('submitButton')[0];
submitButton.onclick = function () {
    buttonAudio_Click.play();
    submitAns();
}

// The arrays for checking correct ans and wrong ans
var correctResponse = [true, true, false];
var numberOfOptions = correctResponse.length;
var numberOfCorrectOptions = 2;
var userResponse = [false, false, false];

// styles of the options and behindDivs
var optionStyles = ['585rem', '400rem', '215rem']; // For four options add the bottom of the fourth option as well
var behindDivStyles = ['calc(585rem - var(--downwardDisplacement))', 'calc(400rem - var(--downwardDisplacement))', 'calc(215rem - var(--downwardDisplacement))']; // For four options add the bottom style of the fourth option as well

// Gradients for future use
var greenGradient = "linear-gradient(180deg, #3CA35A, #389B60)";
var redGradient = "linear-gradient(180deg, #FB6F6F, #EB5151)";
var userRespondedAllOptions = false;
function submitAns() {
    var rightAnswerStatus = false; var wrongAnswerStatus = false; var howManyResponse = 0;
    for (let i = 0; i <= numberOfOptions; i++) {
        if (userResponse[i] == true && correctResponse[i] == true) {
            Object.assign(options[i].style, { background: greenGradient, color: "white" });
            rightAnswerStatus = true;
            optionsChildren[i].classList.add('answered');
            optionsChildren[i].children[0].classList.add('rightAns');
            Object.assign(optionsChildren[i].style, { display: 'flex' });
            options[i].onclick = () => {
                buttonAudio_Click.play();
            }
            // for counting how many option is chosen by the user
            howManyResponse += 1;
        }
        else if (userResponse[i] == true && correctResponse[i] == false) {
            Object.assign(options[i].style, { background: redGradient, color: "white" });
            wrongAnswerStatus = true;
            optionsChildren[i].classList.add('answered');
            optionsChildren[i].children[0].classList.add('wrongAns');
            howManyResponse += 1;
        }
        else {
            if (correctResponse[i] == true) {
                wrongAnswerStatus = true;
            }
        }
    }

    // check wheather user has responded all
    if (howManyResponse == numberOfOptions) {
        userRespondedAllOptions = true;
    }
    else {
        userRespondedAllOptions = false;
    }

    // check all possible cases for the 
    if (rightAnswerStatus == true && wrongAnswerStatus == false && userRespondedAllOptions == false) {
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
    else if (rightAnswerStatus == true && wrongAnswerStatus == true && userRespondedAllOptions == false) {
        // partially correct answer
        feedback_bar.children[0].innerHTML = "Almost There!";
        feedback_bar.children[1].innerHTML = `You are partially correct. <br> There are a total of ${numberOfCorrectOptions} correct answers. Try again!`;
        Object.assign(feedback_bar.children[1].style, { width: '90%' });
        Object.assign(feedback_bar.style, { opacity: 1, top: "970rem" });
        Wrong_ANS.play();
        submitButton.innerHTML = 'Retry';
        submitButton.onclick = function () {
            buttonAudio_Click.play();
            retry();
        }
    }
    else if (rightAnswerStatus == false && wrongAnswerStatus == true && userRespondedAllOptions == false) {
        // wrong answer
        feedback_bar.children[0].innerHTML = "Oops!";
        feedback_bar.children[1].innerHTML = `Try again or swipe left to figure out the right answer.`;
        Object.assign(feedback_bar.style, { opacity: 1, top: "970rem" });
        Wrong_ANS.play();
        submitButton.innerHTML = 'Retry';
        submitButton.onclick = function () {
            buttonAudio_Click.play();
            retry();
        }
    }
    else if (userRespondedAllOptions == true) {
        // All options have been chosen
        feedback_bar.children[0].innerHTML = "Oops!";
        feedback_bar.children[1].innerHTML = `You have chosen all the options. <br> There are ${numberOfOptions - numberOfCorrectOptions} wrong options`;
        Object.assign(feedback_bar.style, { opacity: 1, top: "970rem" });
        Wrong_ANS.play();
        submitButton.innerHTML = 'Retry';
        submitButton.onclick = function () {
            buttonAudio_Click.play();
            retry();
        }
    }


    //switching off the button click functionality
    for (let i = 0; i <= numberOfOptions; i++) {
        options[i].onclick = function () {
        }
    }
}

function retry() {
    // for checking which option is already answered
    if (userRespondedAllOptions == false) {
        for (let i = 0; i < numberOfOptions; i++) {
            if (userResponse[i] == true && correctResponse[i] == true) {
                Object.assign(optionsChildren[i].style, { display: 'none' });
                options[i].onclick = function () {
                    popDownTxt(this);
                }
            }
            else {
                // For the wrong answers to be made white and previous state
                userResponse[i] = false;
                optionsChildren[i].children[0].classList.remove('wrongAns');
                optionsChildren[i].children[0].classList.remove('checked');
                optionsChildren[i].classList.remove('answered');
                Object.assign(options[i].style, { background: 'white', color: '#333333' });

                //bringing back the button click functionality
                options[i].onclick = function () {
                    if (userResponse[i] == false) {
                        userResponse[i] = true;
                        optionsChildren[i].children[0].classList.add('checked');
                    }
                    else if (userResponse[i] == true) {
                        userResponse[i] = false;
                        optionsChildren[i].children[0].classList.remove('checked');
                    }
                }
            }

        }
        // for hiding the feedbackbar
        Object.assign(feedback_bar.style, { opacity: 0 });

        // for chainging the submit/retry button function
        submitButton.innerHTML = "Submit";
        submitButton.onclick = function () {
            buttonAudio_Click.play();
            submitAns();
        }
    }
    else {

        // Shuffling takes place here
        var shuffledArrayAndIndex = shuffle(optionStyles);
        var shuffledArray = shuffledArrayAndIndex[0];
        var shuffledArrayIndex = shuffledArrayAndIndex[1];

        // assigning the new styles for the options
        for (let i = 0; i < numberOfOptions; i++) {
            Object.assign(options[i].style, { bottom: shuffledArray[i] });
            // Object.assign(behindDivs[shuffledArrayIndex[i]].style, { bottom: behindDivStyles[i] });
            Object.assign(behindDivs[i].style, { bottom: behindDivStyles[shuffledArrayIndex[i]] });

            console.log(shuffledArray, shuffledArrayIndex, behindDivStyles[shuffledArrayIndex[i]]);

            // For removing the behind texts
            behindDivs[i].style.setProperty('--downwardDisplacement', '0rem');

            // For the wrong answers to be made white and previous state
            userResponse[i] = false;
            optionsChildren[i].children[0].classList.remove('wrongAns');
            optionsChildren[i].children[0].classList.remove('rightAns');
            optionsChildren[i].children[0].classList.remove('checked');
            optionsChildren[i].classList.remove('answered');
            Object.assign(options[i].style, { background: 'white', color: '#333333' });

            //bringing back the button click functionality
            options[i].onclick = function () {
                if (userResponse[i] == false) {
                    userResponse[i] = true;
                    optionsChildren[i].children[0].classList.add('checked');
                }
                else if (userResponse[i] == true) {
                    userResponse[i] = false;
                    optionsChildren[i].children[0].classList.remove('checked');
                }
            }
        }



        // for hiding the feedbackbar
        Object.assign(feedback_bar.style, { opacity: 0 });

        // for chainging the submit/retry button function
        submitButton.innerHTML = "Submit";
        submitButton.onclick = function () {
            buttonAudio_Click.play();
            submitAns();
        }
    }
}


function popDownTxt(option) {
    var index = (option.id).charAt(option.id.length - 1);
    behindDivs[index - 1].style.setProperty('--downwardDisplacement', '30rem');
}

function shuffle(array) {
    var copyArray = array.slice();
    var tempArray = [];
    var previousIndex = [];
    var arrayHighestIndex = copyArray.length - 1;
    var randomIndex;

    for (let index = 0; index <= arrayHighestIndex; index++) {
        randomIndex = randIntBtwn(0, copyArray.length - 1);
        tempArray.push(copyArray.splice(randomIndex, 1)[0]);
        previousIndex.push(array.indexOf(tempArray[index]));
    }
    return [tempArray, previousIndex];
}

function randIntBtwn(start, end) {
    var randomNumber = start + Math.floor((end - start + 1) * Math.random());
    return randomNumber;
}