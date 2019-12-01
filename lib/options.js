
const moreOptions = document.querySelector('.expand-options-icon');
const hiddenOptions = document.querySelector('.hiddenoptions')
const options = document.querySelector('.card');
const grid = document.querySelector('#minesweeper');

let mineDensity = 0.8;

moreOptions.addEventListener('click', e => {

    moreOptions.classList.add('hidden'); //Hide more options link
    animateCSS(hiddenOptions,'fadeIn','show'); //Animate in additional options
})

function animateCSS(element, animationName, hide, callback) {
    element.classList.add('animated', animationName);

    if (hide=='show' && element.classList.contains('hidden')) {
        element.classList.remove('hidden');
    }

    function handleAnimationEnd() {
        element.classList.remove('animated', animationName)
        element.removeEventListener('animationend', handleAnimationEnd)

        hide=='hide' ? element.classList.add('hidden') : "";

        if (typeof callback === 'function') callback()
    }

    element.addEventListener('animationend', handleAnimationEnd)
}

const startGame = () => {
    //Get values from user option choices

    if (document.querySelector('.slider').value == 1) {
        mineDensity = 0.9
    } else if (document.querySelector('.slider').value == 3) {
        mineDensity = 0.7
    } else {
        mineDensity = 0.8
    }

    if (document.querySelector('.boardslider').value == 1) {
        maxRows = 8;
        maxCols = 8;
    } else if (document.querySelector('.boardslider').value == 3) {
        maxRows = 12;
        maxCols = 12;
    }

    console.log(mineDensity)
   
    generateGrid();

    //Animate grid in
    initialGridAnimation();

}


const initialGridAnimation = () => {
    //Animate grid in
    animateCSS(options,'fadeOut');

    setTimeout(function() {
        animateCSS(grid,'zoomInUp','show');
        document.querySelector('.game').classList.remove('hidden')
        
        options.classList.add('hidden');
        
        setTimeout(function() {
            gameOver = false; //Make game active
        },700)

    },600)
}

const resetGame = () => {
    totalMines=0;
    gameOver=false;
    playAgainBtn.classList.add('hidden');
    generateGrid();
}