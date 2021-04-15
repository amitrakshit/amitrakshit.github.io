var devicePixelRatio = window.devicePixelRatio;
var screenScaleRatio = 1080 / screen.width;
//console.log(devicePixelRatio);
var metaData = document.getElementsByName('viewport');
metaData[0].content = "width=device-width, initial-scale=" + 1 / screenScaleRatio.toString();
//console.log(metaData[0].content);


//Observation bar linking
var observation_bar = document.getElementsByClassName("observation_bar")[0];
observation_bar.onclick = function () {
    location.href = "index.html";
}

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
solution_clicked = false;
options[0].onclick = function () {
    if (this.title == "solution" && solution_clicked==false) {
        solution_clicked = true;
        feedback_bar.style.opacity = "1";
        feedback_bar.children[0].style = "color: #8DD43E;";
        feedback_bar.children[0].innerHTML = "Well Done!";
        feedback_bar.children[1].style = "color: #8DD43E;";
        feedback_bar.children[1].innerHTML = "You got the correct answer!";
        this.style = "background:linear-gradient(180deg, #3CA35A, #389B60); color: white;";
        option_container.style.top = "444px";
        feedback_bar.style.top = "300px";
        question_area.style.opacity = "0";
        solution.style = "top:1160px";
        footer.style = "bottom:0px";
    }
    else if (this.title !== "solution" && solution_clicked==false){
        this.style = "background:linear-gradient(180deg, #FB6F6F, #EB5151); color: white;";
        feedback_bar.style = "opacity:1; top: 1000px";
    }
}

options[1].onclick = function () {
    if (this.title == "solution" && solution_clicked==false) {
        solution_clicked = true;
        feedback_bar.style.opacity = "1";
        feedback_bar.children[0].style = "color: #8DD43E;";
        feedback_bar.children[0].innerHTML = "Well Done!";
        feedback_bar.children[1].style = "color: #8DD43E;";
        feedback_bar.children[1].innerHTML = "You got the correct answer!";
        this.style = "background:linear-gradient(180deg, #3CA35A, #389B60); color: white;";
        option_container.style.top = "444px";
        feedback_bar.style.top = "300px";
        question_area.style.opacity = "0";
        solution.style = "top:1160px";
        footer.style = "bottom:0px";
    }
    else if(this.title !== "solution" && solution_clicked==false) {
        this.style = "background:linear-gradient(180deg, #FB6F6F, #EB5151); color: white;";
        feedback_bar.style = "opacity:1; top: 1000px";
    }
}
options[2].onclick = function () {
    if (this.title == "solution" && solution_clicked==false) {
        solution_clicked = true;
        feedback_bar.style.opacity = "1";
        feedback_bar.children[0].style = "color: #8DD43E;";
        feedback_bar.children[0].innerHTML = "Well Done!";
        feedback_bar.children[1].style = "color: #8DD43E;";
        feedback_bar.children[1].innerHTML = "You got the correct answer!";
        this.style = "background:linear-gradient(180deg, #3CA35A, #389B60); color: white;";
        option_container.style.top = "444px";
        feedback_bar.style.top = "300px";
        question_area.style.opacity = "0";
        solution.style = "top:1160px";
        footer.style = "bottom:0px";
    }
    else if(this.title !== "solution" && solution_clicked==false){
        this.style = "background:linear-gradient(180deg, #FB6F6F, #EB5151); color: white;";
        feedback_bar.style = "opacity:1; top: 1000px";
    }
}
options[3].onclick = function () {
    if (this.title == "solution" && solution_clicked==false) {
        solution_clicked = true;
        feedback_bar.style.opacity = "1";
        feedback_bar.children[0].style = "color: #8DD43E;";
        feedback_bar.children[0].innerHTML = "Well Done!";
        feedback_bar.children[1].style = "color: #8DD43E;";
        feedback_bar.children[1].innerHTML = "You got the correct answer!";
        this.style = "background:linear-gradient(180deg, #3CA35A, #389B60); color: white;";
        option_container.style.top = "444px";
        feedback_bar.style.top = "300px";
        question_area.style.opacity = "0";
        solution.style = "top:1160px";
        footer.style = "bottom:0px";
    }
    else if(this.title !== "solution" && solution_clicked==false) {
        this.style = "background:linear-gradient(180deg, #FB6F6F, #EB5151); color: white;";
        feedback_bar.style = "opacity:1; top: 1000px";
    }
}

var finish_button = document.getElementsByTagName('button')[0];
finish_button.onclick = function () {
    location.href = "index.html";
}