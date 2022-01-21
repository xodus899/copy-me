const buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userPickedPattern = [];
let started = false;
let level = 0;


function startGame() {
    $(document).on('click keydown', () => {
      if(!started) {
        setTimeout(function() {
            updateLevel();
            nextSequence();
            started = true;
            userClicked();
        }, 500);
      }
    })
};

function updateLevel() {
    level++;
    return $('#level-title').text('Level ' + level);
};

function userClicked() {
    $('.btn').click(function() {
        const userChosenColor = $(this).attr('id');
        userPickedPattern.push(userChosenColor);
        playAudio(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userPickedPattern.length - 1);
    });
};

function nextSequence() {
    userPickedPattern = [];
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $('#' + randomChosenColor).fadeIn(150).fadeOut(150).fadeIn(150);
};

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userPickedPattern[currentLevel]) {
        if (userPickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                updateLevel();
                nextSequence();
            }, 1000);
        }
    } else {
        let gameOverSound = new Audio('sounds/wrong.mp3');
        gameOverSound.play();
        gameOver();
    }
};

function playAudio(name) {
    let audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
};

function animatePress(currentColor) {
    $('#' + currentColor).addClass('pressed');
    setTimeout(function() {
        $('#' + currentColor).removeClass('pressed');
    }, 150);
};

function gameOver() {
    $('body').addClass('game-over');
    setTimeout(() => {
        $('body').removeClass('game-over');
        $('#level-title').text('Game over, Click or Press Any Key to Restart');
        $(".btn").unbind( "click" );
        startOver();
    }, 200);
};

function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
};
startGame();
