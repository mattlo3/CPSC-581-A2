let guitar_array = [[0,0,0,0,0,0], 
                    [0,0,0,0,0,0], 
                    [0,0,0,0,0,0], 
                    [0,0,0,0,0,0], 
                    [0,0,0,0,0,0]]; 
                    //EADGBE

let correct_chord = [[0,0,0,0,1,0], 
                    [0,0,1,1,0,1], 
                    [0,0,0,0,0,0], 
                    [0,0,0,0,0,0], 
                    [0,0,0,0,0,0]]; 
                    //EADGBE
                    //D2G2B1Eh2

// swipe stuff from https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android
document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
    return evt.touches ||             // browser API
        evt.originalEvent.touches; // jQuery
}                                                     
                                                                            
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                            
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                            
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* right swipe */ 
            $('#console').text("right");
        } else {
            /* left swipe */
            $('#console').text("left");

            var homescreen = null;
            homescreen = document.getElementById("homescreen");

            console.log(guitar_array);
            console.log(correct_chord);
            console.log(compareInput());
            if(compareInput()) {

                var audio = new Audio('A6_chord.mp3');
                audio.play();

                setTimeout (function() {
                    homescreen.style.visibility = 'visible';
                }, 300);
            }
            else {
                showWrong();

                var audio = new Audio('Trash_chord.mp3');
                audio.play();

                setTimeout (function() {
                    clearInput();
                }, 500);
            }
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* down swipe */ 
            $('#console').text("down");
        } else { 
            /* up swipe */
            $('#console').text("up");
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

function recordInput(inpt) {
    let i = inpt[0];
    let j = inpt[1];

    guitar_array[i][j] = 1;
    console.log(guitar_array);
}

function clearInput() {
    for(let i = 0; i < 5; i++) {
        for(let j = 0; j < 6; j++) {
            if(guitar_array[i][j] == 1) {
                guitar_array[i][j] = 0;
                var btn = null;
                console.log("Clearing " + i.toString() + j.toString());
                btn = document.getElementById(i.toString() + j.toString());
                btn.style.backgroundColor = 'transparent';
                btn.style.opacity = '1';
            }
        }
    }
}

function compareInput() {
    let result = true;

    for(let i = 0; i < 5; i++) {
        for(let j = 0; j < 6; j++) {
            if(guitar_array[i][j] != correct_chord[i][j]) {
                return false;
            }
        }
    }

    return true;
}

function showWrong() {
    for(let i = 0; i < 5; i++) {
        for(let j = 0; j < 6; j++) {
            if(guitar_array[i][j] == 1) {
                var btn = null;
                btn = document.getElementById(i.toString() + j.toString());
                btn.style.backgroundColor = '#fb0404';
                btn.style.opacity = '1';
            }
        }
    }
}

function onClick(btnid) {
    console.log(btnid);

    var btn = null;
    btn = document.getElementById(btnid);
    btn.style.backgroundColor = '#74e989'
    btn.style.opacity = '0.5';

    //D2
    if(btnid == "12") {
        var audio = new Audio('D2.mp3');
        audio.play();
    }
    //G2
    if(btnid == "13") {
        var audio = new Audio('G2.mp3');
        audio.play();
    }
    //B1
    if(btnid == "04") {
        var audio = new Audio('B1.mp3');
        audio.play();
    }
    //Eh2
    if(btnid == "15") {
        var audio = new Audio('Eh2.mp3');
        audio.play();
    }


    recordInput(btnid);
}

function onClick_strum() {
    var homescreen = null;
    homescreen = document.getElementById("homescreen");

    console.log(guitar_array);
    console.log(correct_chord);
    console.log(compareInput());
    if(compareInput()) {
        setTimeout (function() {
            homescreen.style.visibility = 'visible';
        }, 300);
    }
    else {
        showWrong();
        setTimeout (function() {
            clearInput();
        }, 500);
    }
}

$(function() {
    $(".fretbtn").click(function(event) {
        onClick(this.id)
    })

    $(".strumbtn").click(function(event) {
        onClick_strum()
    })
})



