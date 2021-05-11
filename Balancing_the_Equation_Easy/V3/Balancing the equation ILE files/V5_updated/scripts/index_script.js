var devicePixelRatio = window.devicePixelRatio;
var screenScaleRatio = 1080 / screen.width;
//console.log(devicePixelRatio);
var metaData = document.getElementsByName('viewport');
metaData[0].content = "width=device-width, initial-scale=" + 1 / screenScaleRatio.toString();
//console.log(metaData[0].content);
var loading_screen = document.getElementById('loading-screen');

// window.onresize = function () {
//     location.reload();
// }
/* For filling up the numbers which will slide */

var number_container = document.getElementsByClassName('numbers_container');

for (let elements of number_container) {
    var random = Math.floor(Math.random() * 7 + 1);
    elements.style.top = (-random * 100).toString() + '%';
    for (let j = 0; j < 9; j++) {
        var temp = document.createElement('span');
        temp.className = 'inside_number';
        temp.innerText = (j + 1);
        elements.append(temp);
    }
}

/*...Declaring the global variables for right/wrong check..*/
var check_1 = document.getElementById('first_check');
var check_2 = document.getElementById('second_check');
var check_3 = document.getElementById('third_check');
var check_4 = document.getElementById('fourth_check');


/*... for the transition of numbers using buttons...*/
function poly1() {
    if (reactant_1.multiplier < 9) {
        var top_measure = Number(number_container[0].style.top.slice(0, -1));
        top_measure = top_measure - 100;
        number_container[0].style.top = top_measure.toString() + '%';
        reactant_1.multiplier = Number(number_container[0].style.top.slice(0, -1)) / -100 + 1;
        reactant_1.update_element_numbers();
        update_reactant_column();
        update_check_column();
        paragraph_show();

    }
}

function poly2() {
    if (reactant_2.multiplier < 9) {
        var top_measure = Number(number_container[1].style.top.slice(0, -1));
        top_measure = top_measure - 100;
        number_container[1].style.top = top_measure.toString() + '%';
        reactant_2.multiplier = Number(number_container[1].style.top.slice(0, -1)) / -100 + 1;
        reactant_2.update_element_numbers();
        update_reactant_column();
        update_check_column();
        paragraph_show();

    }
}

function poly3() {
    if (product_1.multiplier < 9) {
        var top_measure = Number(number_container[2].style.top.slice(0, -1));
        top_measure = top_measure - 100;
        number_container[2].style.top = top_measure.toString() + '%';
        product_1.multiplier = Number(number_container[2].style.top.slice(0, -1)) / -100 + 1;
        product_1.update_element_numbers();
        update_product_column();
        update_check_column();
        paragraph_show();


    }
}

function poly4() {
    if (product_2.multiplier < 9) {
        var top_measure = Number(number_container[3].style.top.slice(0, -1));
        top_measure = top_measure - 100;
        number_container[3].style.top = top_measure.toString() + '%';
        product_2.multiplier = Number(number_container[3].style.top.slice(0, -1)) / -100 + 1;
        product_2.update_element_numbers();
        update_product_column();
        update_check_column();
        paragraph_show();

    }
}

function poly5() {
    if (reactant_1.multiplier > 1) {
        var top_measure = Number(number_container[0].style.top.slice(0, -1));
        top_measure = top_measure + 100;
        number_container[0].style.top = top_measure.toString() + '%';
        reactant_1.multiplier = Number(number_container[0].style.top.slice(0, -1)) / -100 + 1;
        reactant_1.update_element_numbers();
        update_reactant_column();
        update_check_column();
        paragraph_show();

    }
}

function poly6() {
    if (reactant_2.multiplier > 1) {
        var top_measure = Number(number_container[1].style.top.slice(0, -1));
        top_measure = top_measure + 100;
        number_container[1].style.top = top_measure.toString() + '%';
        reactant_2.multiplier = Number(number_container[1].style.top.slice(0, -1)) / -100 + 1;
        reactant_2.update_element_numbers();
        update_reactant_column();
        update_check_column();
        paragraph_show();

    }
}

function poly7() {
    if (product_1.multiplier > 1) {
        var top_measure = Number(number_container[2].style.top.slice(0, -1));
        top_measure = top_measure + 100;
        number_container[2].style.top = top_measure.toString() + '%';
        product_1.multiplier = Number(number_container[2].style.top.slice(0, -1)) / -100 + 1;
        product_1.update_element_numbers();
        update_product_column();
        update_check_column();
        paragraph_show();

    }
}

function poly8() {
    if (product_2.multiplier > 1) {
        var top_measure = Number(number_container[3].style.top.slice(0, -1));
        top_measure = top_measure + 100;
        number_container[3].style.top = top_measure.toString() + '%';
        product_2.multiplier = Number(number_container[3].style.top.slice(0, -1)) / -100 + 1;
        product_2.update_element_numbers();
        update_product_column();
        update_check_column();
        paragraph_show();

    }
}

var table_data = document.getElementsByTagName('td');
var reactant_1 = {
    Cu: 1, S: 1, O: 4, multiplier: 1,
    update_element_numbers: function () {
        this.Cu = this.multiplier * 1;
        this.S = this.multiplier * 1;
        this.O = this.multiplier * 4;
    }
};
var reactant_2 = {
    Zn: 1, multiplier: 1,
    update_element_numbers: function () {
        this.Zn = this.multiplier * 1;
    }
};
var product_1 = {
    Zn: 1, S: 1, O: 4, multiplier: 1,
    update_element_numbers: function () {
        this.Zn = this.multiplier * 1;
        this.S = this.multiplier * 1;
        this.O = this.multiplier * 4;
    }
};
var product_2 = {
    Cu: 1, multiplier: 1,
    update_element_numbers: function () {
        this.Cu = this.multiplier * 1;
    }
};

//Initialising the values of table data and other
reactant_1.multiplier = Number(number_container[0].style.top.slice(0, -1)) / -100 + 1;
reactant_2.multiplier = Number(number_container[1].style.top.slice(0, -1)) / -100 + 1;
product_1.multiplier = Number(number_container[2].style.top.slice(0, -1)) / -100 + 1;
product_2.multiplier = Number(number_container[3].style.top.slice(0, -1)) / -100 + 1;
product_1.update_element_numbers();
product_2.update_element_numbers();
reactant_1.update_element_numbers();
reactant_2.update_element_numbers();

var reactant_column = [];
var product_column = [];
var balance_column = [];
for (let i = 0; i < 4; i++) {
    reactant_column[i] = table_data[4 * i + 1];
    product_column[i] = table_data[4 * i + 2];
    balance_column[i] = table_data[4 * 1 + 3];
}

function update_reactant_column() {
    reactant_column[0].innerText = reactant_1.Cu;
    reactant_column[1].innerText = reactant_1.S;
    reactant_column[2].innerText = reactant_1.O;
    reactant_column[3].innerText = reactant_2.Zn;
}

function update_product_column() {
    product_column[0].innerText = product_2.Cu;
    product_column[1].innerText = product_1.S;
    product_column[2].innerText = product_1.O;
    product_column[3].innerText = product_1.Zn;
}

update_reactant_column();
update_product_column();
update_check_column();
paragraph_show();

function update_check_column() {
    if (reactant_column[0].innerText != product_column[0].innerText) {
        check_1.classList.remove("right");
        check_1.classList.add("wrong");
    } else {
        check_1.classList.remove("wrong");
        check_1.classList.add("right");
    }

    if (reactant_column[1].innerText != product_column[1].innerText) {
        check_2.classList.remove("right");
        check_2.classList.add("wrong");
    } else {
        check_2.classList.remove("wrong");
        check_2.classList.add("right");
    }
    if (reactant_column[2].innerText != product_column[2].innerText) {
        check_3.classList.remove("right");
        check_3.classList.add("wrong");
    } else {
        check_3.classList.remove("wrong");
        check_3.classList.add("right");
    }
    if (reactant_column[3].innerText != product_column[3].innerText) {
        check_4.classList.remove("right");
        check_4.classList.add("wrong");
    } else {
        check_4.classList.remove("wrong");
        check_4.classList.add("right");
    }
}
/*... for showing the feedback message...*/
function paragraph_show() {
    var remarks = document.getElementById("para");
    if (check_1.classList[1] == "right" && check_2.classList[1] == "right" && check_3.classList[1] == "right" && check_4.classList[1] == "right") {
        if (reactant_1.multiplier == 1 && reactant_2.multiplier == 1) {
            remarks.innerText = "The equation is balanced.";
        }
        else {
            remarks.innerText = "The equation is balanced but the coefficients should be smallest possible integer.";
        }
    }
    else {
        remarks.innerText = "The equation is not balanced yet.";
    }
}