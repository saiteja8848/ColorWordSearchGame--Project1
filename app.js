//data for level one
let colorNames = ["orange", "green", "pink", "red", "yellow", "brown", "blue"];
let colorCodes = ["orange", "green", "pink", "red", "yellow", "brown", "blue"];
//data for level two
let secondLevelColorNames = ["AQUA", "AZURE", "BEIGE", "CORAL", "CYAN", "GRAY", "KHAKI"];
let secondLevelcolorCodes = ["#00FFFF", "#007FFF", "#F5F5DC", "#FF7F50", "#00FFFF", "#F0F68C", "#F0E68C"];
//data for resetting the letters on the cells of matrix
let data = ['C', 'K', 'C', 'G', 'B', 'P', 'Y', 'H', 'O', 'R', 'E', 'A', 'A', 'A', 'R', 'A', 'I', 'Z', 'N',
    'K', 'A', 'Y', 'G', 'U', 'A', 'Q', 'U', 'A', 'E', 'R', 'X', 'I', 'L', 'Y', 'Z', 'E'];
//status to know which color is active and used to reset the color    
let status = [0, 0, 0, 0, 0, 0, 0];
//game timer
let CountDown_Time = 49;
//id to clear setInterval
let timerId;
//user entered word 
let word = "";
//list of buttons and game status
let buttons, gameStatus = false, secondLevelStatus = false, started = false, index = -1;
let totalPoints, indexValue = -1, score = 0;

//Onloding the page on the browser, it gets the data from the browser
window.onload = function () {
    totalPoints = document.getElementById("again")
    totalPoints.style.display = "none";
    document.getElementById('clear').style.display = "none";
    buttons = document.querySelectorAll(".item");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click',
            function () {
                if (gameStatus == true) {
                    word += this.innerHTML;
                    document.getElementById("word").style.color = "white";
                    document.getElementById("word").innerHTML = word;
                }
                else if (started == false) {
                    alert("Please Click the Start Button to play the game");
                }
                else {
                    alert("Time Over");
                }
            }
            ,
            false);
    }
}


//First Level game Start Point
function startGame() {
    started = true;
    document.getElementById('firstLevel').style.display = "none";
    timerId = setInterval(timer, 1000);
    document.getElementById('clear').style.display = "block";
}

//game Level Two Start Point
function levelTwo() {
    //console.log("level 2 start button");
    for (let i = 0; i < secondLevelColorNames.length; i++) {
        colorNames[i] = secondLevelColorNames[i];
        colorCodes[i] = secondLevelcolorCodes[i];
    }
    timerId = setInterval(timer, 1000);
    document.getElementById('clear').style.display = "block";
}


// Resetting for Second level
function nextLevel() {
    secondLevelStatus = true;
    console.log("He or She goes no to next Level");
    buttons = document.querySelectorAll(".item");
    for (let i = 0; i < buttons.length; i++)
        buttons[i].innerHTML = data[i];
    //score reset to zero
    score = 0;
    document.getElementById('score').innerHTML = 0 + " Points";
    document.getElementById('score').style.color = "white";
    //time reset
    document.getElementById('time').style.color = "white";
    document.getElementById('time').innerHTML = "00:00";
    //word reset
    word = "";
    document.getElementById('word').innerHTML = "Selected Elements";
    document.getElementById('word').style.color = "white";
    //display reset
    totalPoints = document.getElementById("again");
    totalPoints.style.display = "none";
    //changing the startGame
    //newButton
    var newButton = document.createElement("button");
    newButton.innerHTML = "Start Game";
    newButton.backgroundcolor = "whitesmoke";
    newButton.color = "black";
    newButton.classList.add("button");
    newButton.addEventListener("click", levelTwo);
    newButton.setAttribute("id", "secondLevel");
    //oldButton
    var oldButton = document.getElementById("firstLevel");
    document.getElementById("main").replaceChild(newButton, oldButton);
    //clear button
    document.getElementById('clear').color = "black";
    document.getElementById('clear').backgroundcolor = "whitesmoke";
    document.getElementById('clear').style.display = "none";
    document.body.style.background = "darkolivegreen";
}


//page reloading
function reload() {
    location.reload(true);
}

function clearLetter() {
    if (word.length >= 2) {
        word = word.substr(0, word.length - 1);
        document.getElementById('word').innerHTML = word;
    }
    else if (word.length == 1) {
        word = word.substr(0, word.length - 1);
        document.getElementById('word').innerHTML = "Selected Letters";
    }
    else
        document.getElementById('word').innerHTML = "Selected Letters";
}


//Reset the color which is previously set
function reset() {
    let value = status.indexOf(1);
    if (value != -1) {
        var str = ".item-" + value;
        var letter = document.querySelector(str);
        letter.style.background = "white";
        letter.style.color = "black";
        status[value] = 0;
    }
}

//Changing the color of the letters on the matrix for specified time
function changeColor(second) {
    if (second % 7 == 0 && second != 0) {
        reset();
        var str = ".item-" + (++index);
        var letter = document.querySelector(str);
        letter.style.background = colorCodes[index];
        letter.style.color = "white";
        status[index] = 1;
    }
    if (second == 0) {
        reset();
        index = -1;
    }

}

//Timer
function timer() {
    let timeCounter = document.querySelector('#time');
    if (CountDown_Time == -1) {
        gameStatus = false;
        if (score < 7) {
            totalPoints = document.getElementById("again");
            document.getElementById('totalScore').innerHTML = `Your Total Points: ${score}`;
            document.getElementById('nextLevel').style.display = "none";
            totalPoints.style.display = "flex";
        }
        CountDown_Time = 49;
        clearInterval(timerId);
        indexValue = -1;
        let v = score;
        if (v >= 5 && secondLevelStatus == false) {
            totalPoints = document.getElementById("again");
            document.getElementById('totalScore').innerHTML = `Your Total Points: ${score}`;
            document.getElementById('nextLevel').style.display = "block";
            totalPoints.style.display = "flex";
        }
        if (v >= 5 && secondLevelStatus == true) {
            totalPoints = document.getElementById("again");
            document.getElementById('totalScore').innerHTML = `Your Total Points: ${score}`;
            document.getElementById('nextLevel').style.display = "none";
            totalPoints.style.display = "flex";
        }

        score = 0;
    }
    else {
        if (CountDown_Time <= 0)
            timeCounter.style.color = "red";
        CountDown_Time <= 9 ? (timeCounter.textContent = "00" + ":" + "0" + CountDown_Time) : (timeCounter.textContent = "00" + ":" + CountDown_Time);
        gameStatus = true;

        changeColor(CountDown_Time);

        if (CountDown_Time % 7 == 0 && CountDown_Time != 0) {
            indexValue++;
            word = "";
            document.getElementById("word").innerHTML.replace = "&nbsp";

        }
        if (word.length >= colorNames[indexValue].length && word != "" && indexValue < colorNames.length) {
            if (word == colorNames[indexValue]) {
                score++;
                document.getElementById("score").innerHTML = score + " Points";
                document.getElementById('score').style.color = "green";
                document.getElementById("word").style.color = "green";
                word = "";
            }
            else
                document.getElementById("word").style.color = "red";
            word = "";
        }
        CountDown_Time--;
    }
}

