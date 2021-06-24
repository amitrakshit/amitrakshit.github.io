
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

//solution and footer
var solution = document.getElementsByClassName('solution')[0];
var footer = document.getElementsByTagName('footer')[0];

//changing the parameters of the options and other
var solution_clicked = false;
var which_button_clicked = 1;
for (let index = 0; index < options.length; index++) {
    options[index].onclick = function () {
        if (this.title == "solution" && solution_clicked == false) {
            options[which_button_clicked - 1].style = "background: white; color: black;"
            solution_clicked = true;
            feedback_bar.style.opacity = "1";
            feedback_bar.children[0].style = "color: #8DD43E;";
            feedback_bar.children[0].innerHTML = "Well Done!";
            feedback_bar.children[1].style = "color: #8DD43E;";
            feedback_bar.children[1].innerHTML = "You got the correct answer!";
            this.style = "background:linear-gradient(180deg, #3CA35A, #389B60); color: white;";
            dynamic_panel_window.style = "overflow-y:scroll;";
            dynamic_panel_window.scroll({ top: 800, behavior: "smooth" });
            footer.style = "bottom:0rem";
            Right_ANS.play();

            //Lo message
            buttonAudio_Click.play();
            LO_message.style = "z-index : 0;";
            LO_message.style.backgroundColor = '#000000cc';
            popup.style = 'opacity:1; top: 601rem'
            circle_stroke_animation();
            setTimeout(function () {
                close_button.style.opacity = 1;
            }, 1000)
        }
        else if (this.title !== "solution" && solution_clicked == false) {
            options[which_button_clicked - 1].style = "background: white; color: black;"
            this.style = "background:linear-gradient(180deg, #FB6F6F, #EB5151); color: white;";
            feedback_bar.style = "opacity:1; top: 1050rem";
            Wrong_ANS.play();
        }
        which_button_clicked = (this.id).charAt(this.id.length - 1);
    }
}

// Finish Button
// functionality added in LO_script