var context_button = document.getElementsByClassName('context_button')[0];
var context_card = document.getElementsByClassName('contex_card')[0];
var context_card_closed = true;
context_button.addEventListener('click', function(event){
    if (context_card_closed){
        context_card.style.setProperty('transform', 'scale(1)');
        context_card.style.opacity = 1;
        context_card_closed = false;
    }
    else{
        context_card.style.setProperty('transform', 'scale(0)');
        context_card.style = "opacity: 0.0";
        context_card_closed = false;
        context_card_closed = true;
    }
})