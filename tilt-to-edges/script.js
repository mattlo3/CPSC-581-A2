let demo_PASSWORD = " L L R D "

let ready_for_input = false;
let input = "";

function onClick() {

    if(ready_for_input) {
        ready_for_input = false;
        window.removeEventListener("devicemotion", handleDeviceMotion, false);
        return;
    }

    ready_for_input = true;
    input = "";

    // feature detect
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
        .then(permissionState => {
            if (permissionState === 'granted') {
            window.addEventListener("devicemotion", handleDeviceMotion, true)
            }
        })
        .catch(console.error);
    } else {
      // handle regular non iOS 13+ devices
    }
}

$(function() {
    $('button').click(function(event) {
        onClick()
    })
})

function handleDeviceMotion(event) {
    var dot = null;
    dot = document.getElementById("dot");
    var dot_inner = null;
    dot_inner = document.getElementById("inner-dot");
    var homescreen = null;
    homescreen = document.getElementById("homescreen");
    
    if(!ready_for_input) {
        // reset dot to middle
        dot.style.left = 50 + '%';
        dot.style.top = 50 + '%';
        dot.style.marginTop = -100 + 'px';
        dot.style.marginLeft = -100 + 'px';

        // check if password correct
        if(input == demo_PASSWORD) {
            $('#console').text("CORRECT");

            dot.style.backgroundColor = '#01f943'
            dot_inner.style.backgroundColor = '#01f943';

            setTimeout (function() {
                homescreen.style.visibility = 'visible';
            }, 300);
        }
        else {
            $('#console').text("WRONG");

            dot.style.backgroundColor = '#f90101'
            dot_inner.style.backgroundColor = '#f90101';
        }
        
        return;
    }

    dot.style.backgroundColor = '#ffffff';

    dot_inner.style.backgroundColor = '#000000';

    homescreen.style.visibility = 'hidden';

    let t1 = event.accelerationIncludingGravity.x
    let t2 = event.accelerationIncludingGravity.y
    let t3 = event.accelerationIncludingGravity.z
    $('#sensor-x').text(t1)
    $('#sensor-y').text(t2)
    $('#sensor-z').text(t3)

    // move dot with tilt input
    dot.style.left = parseInt((window.innerWidth / 2) - 100).toString().substring(0, 3) + 'px';
    dot.style.top = parseInt((window.innerHeight / 2) - 100).toString().substring(0, 3) + 'px';

    dot.style.marginTop = 'auto';
    dot.style.marginLeft = 'auto'; 

    // threshold for snapping to edges
    if(t1 >= 4) {
        dot.style.left = window.innerWidth - 200 + 'px';
        dot_inner.style.backgroundColor = '#6cd1fc';

        if(input[input.length - 1] != 'R'
        && Math.abs(t2) < 4) {
            input = input + "R";
        }
    }
    else if(t1 <= -4) {
        dot.style.left = 0 + 'px';
        dot_inner.style.backgroundColor = '#6cd1fc';

        if(input[input.length - 1] != 'L'
        && Math.abs(t2) < 4) {
            input = input + "L";
        }
    }
    else {
        dot.style.left = parseInt(dot.style.left) + parseInt(t1 * (((window.innerWidth / 2) - 100) / 10)) + 'px';
        
        if(input[input.length - 1] != ' '
        && Math.abs(t1) < 4
        && Math.abs(t2) < 4) {
            input = input + " ";
            dot.style.backgroundColor = '#ffffff';
        }
    }

    // threshold for snapping to edges
    if(t2 >= 4) {
        dot.style.top = 0 + 'px';
        dot_inner.style.backgroundColor = '#6cd1fc';

        if(input[input.length - 1] != 'U'
        && Math.abs(t1) < 4) {
            input = input + "U";
        }
    }
    else if(t2 <= -4) {
        dot.style.top = window.innerHeight - 200 + 'px';
        dot_inner.style.backgroundColor = '#6cd1fc';

        if(input[input.length - 1] != 'D'
        && Math.abs(t1) < 4) {
            input = input + "D";
        }
    }
    else {
        dot.style.top = parseInt(dot.style.top) - parseInt(t2 * (((window.innerHeight / 2) - 100) / 10)) + 'px';

        if(input[input.length - 1] != ' '
        && Math.abs(t1) < 4
        && Math.abs(t2) < 4) {
            input = input + " ";
            dot.style.backgroundColor = '#ffffff';
        }
    }

    $('#console').text(input);
}
