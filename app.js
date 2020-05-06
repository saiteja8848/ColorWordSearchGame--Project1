let colorNames = ["orange", "green", "pink", "red", "yellow", "brown", "blue"];
let status = [0, 0, 0, 0, 0, 0, 0], CountDown_Time = 42;
var timerId, word = "";
let items, gameStatus = false, started = false, index = -1;
let totalPoints, indexValue = -1, score = 0;;

window.onload = function () {
    totalPoints = document.getElementById("again")
    totalPoints.style.display = "none";
    items = document.querySelectorAll(".item");
    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener('click',
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

function startGame() {
    started = true;
    timerId = setInterval(timer, 1000);
}

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

function changeColor(second) {
    if (second % 6 == 0 && second != 0) {
        reset();
        var str = ".item-" + (++index);
        var letter = document.querySelector(str);
        letter.style.background = colorNames[index];
        letter.style.color = "white";
        status[index] = 1;
    }
    if (second == 0) {
        reset();
        index = -1;
    }

}

function reload() {
    location.reload(true);
}

function nextLevel() {
    console.log("He or She goes no to next Level");
}

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
        CountDown_Time = 42;
        clearInterval(timerId);
        indexValue = -1;
        let v = score;
       
        if (v == 7) {
            totalPoints = document.getElementById("again");
            document.getElementById('totalScore').innerHTML = `Your Total Points: ${score}`;
            document.getElementById('nextLevel').style.display = "block";
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
        if (CountDown_Time % 6 == 0 && CountDown_Time != 0) {
            indexValue++; console.log("indexValue:", indexValue);
            word = "";
            document.getElementById("word").innerHTML.replace = "&nbsp";
        }
        if (word.length >= colorNames[indexValue].length && word != "" && indexValue < colorNames.length) {
            console.log("Entered Words", word);
            if (word == colorNames[indexValue]) {
                console.log("MatchedWord", word);
                score++;
                document.getElementById("score").innerHTML = score + " Points";
                document.getElementById('score').style.color = "green";
                document.getElementById("word").style.color = "green";
                word = "";
                //document.getElementById("word").innerHTML = "Selected Letters";
            }
            else
                document.getElementById("word").style.color = "red";
            word = "";
        }
        CountDown_Time--;
    }

}

