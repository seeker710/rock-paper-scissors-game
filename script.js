var hands = document.querySelector('.hands');
var contest = document.querySelector('.contest');
var handChoice = document.querySelectorAll('.selected-hand div img');
var score = document.querySelector('.score-box h1');
var resultText = document.querySelector('#play-again p');

const option = ["rock", "paper", "scissors"];
const hoverColor = {'rock': '#db3f5b', 'paper': '#536bf6', 'scissors': '#eba116'};
var color;

function referee(player, bot) {
    if ((player=="paper" && bot=="rock") || (player=="rock" && bot=="paper"))
        color='paper';
    else if ((player=="scissors" && bot=="paper") || (player=="paper" && bot=="scissors"))
        color="scissors";
    else color="rock";

    if(player==bot) {
        color=player;   return 0; }
    else if ((player=="paper" && bot=="rock") || (player=="scissors" && bot=="paper") || (player=="rock" && bot=="scissors"))
        return 1;
    else
        return -1;
}

function result(player, bot) {
    var n = Number(score.innerText);
    switch (referee(player, bot)) {
        case 1:
            n+=1;
            resultText.innerText = "you win";
            break; 
        case 0:
            resultText.innerText = "draw";
            break;
        case -1:
            n-=1;
            resultText.innerText = "you lose";
            break;
    }
    score.innerHTML = n.toString();
    document.getElementById('play-again').style.display = "inline-block";
}

function shuffle(hand, callback) {
    var i=1;
    const max=15;
    var botChoice = option[Math.floor(Math.random() * 3)];
    // console.log(botChoice);
    var bot = handChoice[1];
    var timeout = setInterval(()=> {
        bot.src = "./media/" + option[i%option.length] + ".png";
        if(i >= max + option.indexOf(botChoice))
        {
            clearInterval(timeout);
            callback(hand, botChoice);
        }
        ++i;
    }, 150);
}

function pickedHand(hand) {
    hands.style.display = 'none';
    contest.style.display = 'grid';
    document.getElementById('play-again').style.display = "none";

    var player = handChoice[0];
    player.src = "./media/" + hand + ".png";
    shuffle(hand, result);
}

function home() {
    hands.style.display = 'grid';
    contest.style.display = 'none';
}

function colorChange(value) {
    if (value)
        document.querySelector('#play-again div').style.color = hoverColor[color];
    else
        document.querySelector('#play-again div').style.color = "#192648";
}
