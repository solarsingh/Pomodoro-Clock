var theParent = document.querySelector(".input");
theParent.addEventListener("click", changeTime);

function changeTime(e) {
    let timeSelect = e.target.parentElement.className;
    let operation = e.target.className;

    if(operation=='increase'){
        let elm = document.getElementById(timeSelect).innerHTML;
        elm=Number(elm);
        elm+=1;
        document.getElementById(timeSelect).innerHTML=elm;
    }
    else if(operation=='decrease'){
        let elm = document.getElementById(timeSelect).innerHTML;
        elm=Number(elm);
        if (elm>1){
            elm-=1;
        document.getElementById(timeSelect).innerHTML = elm;
        }
        else{
            alert("Time cannot be Negative");
        }
    }
}

let isPause = false;

function timer(workDuration, breakDuration, i){
    let start1 = Date.now();

    playBtn.disabled = true;
    resumeBtn.disabled = true;
    
    let current = [workDuration, breakDuration];
    let start2 = start1+ (workDuration*1000);

    let start = [start1, start2];

    let label = ["Work Session", "Take a Break!!"]

    function startNext(){
        if(++i<current.length){
            startTimer(current[i], start[i], label[i], startNext)
        }
        else{
            playBtn.disabled = false;
            resumeBtn.disabled = false;
        }
    }
    
    startNext();

    function startTimer(duration, start, label, callback){
        let timer = duration;
        let begin = start;
        let minutes, seconds;

        document.getElementById("label").innerHTML = label;

        let stopID = setInterval(function(){
            let a = Date.now();
            diff = timer - (((a - begin) / 1000) | 0)+1;

            console.log(isPause);

            minutes = (diff / 60) | 0;
            seconds = (diff % 60) | 0;

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            if (diff >= 0){
                if(!isPause){
                    document.getElementById("show").innerHTML=minutes + ":" + seconds;
                }
                else{
                    clearInterval(stopID);
                }
            }
            else{
                callback();
                clearInterval(stopID);
            }
        }, 1000);
    }
}

let playBtn = document.querySelector('#play');
let pauseBtn = document.querySelector('#pause');
let resumeBtn = document.querySelector('#resume');
let resetBtn = document.querySelector('#reset');

// pauseBtn.Disabled = true;
// resumeBtn.Disabled = true;
// resetBtn.Disabled = true;

playBtn.addEventListener('click', () => {
    let x = document.getElementById("session").innerHTML;
    let y = document.getElementById("break").innerHTML;
    
    let i = -1;
    let workDuration = x*60;
    let breakDuration = y*60;
    
    timer(workDuration, breakDuration, i);
});


pauseBtn.addEventListener('click', () => {
    isPause = true;
    resumeBtn.disabled = false;
});


resumeBtn.addEventListener('click', () => {
    
    let x = document.getElementById("session").innerHTML;
    let y = document.getElementById("break").innerHTML; 
    
    let session = document.getElementById("label").innerHTML;

    
    
    if (session == "Work Session"){
        let time = document.getElementById('show').innerHTML;
        let min = Number(time.slice(0,2));
        let sec = Number(time.slice(3));
        
        let workDuration = (min*60)+sec;
        let breakDuration = y*60;
        let i = -1;

        console.log(workDuration);
        console.log(breakDuration);
        timer(workDuration, breakDuration, i);
    }
    else if (session == "Take a Break!!"){
        let time = document.getElementById('show').innerHTML;
        let min = Number(time.slice(0,2));
        let sec = Number(time.slice(3));

        let workDuration = 0;
        let breakDuration = (min*60)+sec;;
        let i = 0;

        console.log(workDuration);
        console.log(breakDuration);
        timer(workDuration, breakDuration, i);
    }

    isPause = false;
});


resetBtn.addEventListener('click', () => {
    isPause = true;
    playBtn.disabled = false;
    resumeBtn.disabled = false;
    document.getElementById("show").innerHTML="00" + ":" + "00";
    document.getElementById("label").innerHTML="Should we begin?!"
});