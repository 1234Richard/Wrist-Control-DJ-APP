song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
volume = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses)
}

function modelLoaded() {
    console.log("model loaded");
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX = " + leftWristX + ", leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + ", rightWristY = " + rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    if (scoreRightWrist > 0.2) {
        fill("blue");
        stroke("blue");
        circle(rightWristX, rightWristY, 20);
        InNumberRightWristY = Number(rightWristY);
        removeDecimalsRW = floor(InNumberRightWristY);
        if (removeDecimalsRW > 0 && removeDecimalsRW <= 100) {
            song.rate(0.5);
            document.getElementById('speed').innerHTML = "Speed = x0.5";
        } else if (removeDecimalsRW > 100 && removeDecimalsRW <= 200) {
            song.rate(1.0);
            document.getElementById('speed').innerHTML = "Speed = x1.0";
        } else if (removeDecimalsRW > 200 && removeDecimalsRW <= 300) {
            song.rate(1.5);
            document.getElementById("speed").innerHTML = "Speed = x1.5";
        } else if (removeDecimalsRW > 300 && removeDecimalsRW <= 400) {
            song.rate(2.0);
            document.getElementById("speed").innerHTML = "Speed = x2.0";
        } else if (removeDecimalsRW > 400 && removeDecimalsRW <= 500) {
            song.rate(2.5);
            document.getElementById("speed").innerHTML = "Speed = x2.5";
    }
    
    if (scoreLeftWrist > 0.2) {
        fill("#FF0000");
        stroke("#FF0000");
        circle(leftWristX, leftWristY, 20);
        InMumberLeftWristY = Number(leftWristY);
        removeDecimalsLW = floor(InMumberLeftWristY);
        volume = removeDecimalsLW/500;
        document.getElementById('volume').innerHTML = "Volume = " + volume;
        song.setVolume(volume);
        
        }
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}