PunhoDireitoX = 0
PunhoDireitoY = 0
PunhoEsquerdoX = 0
PunhoEsquerdoY = 0
som = ""
precisãoPunhoDireito = 0
precisãoPunhoEsquerdo = 0

function preLoad(){
    som = loadSound("music.mp3")
}
function setup(){
    canvas = createCanvas(600, 500)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video,modelLoaded)
    poseNet.on("pose",gotPoses)
}
function modelLoaded(){
    console.log("modeloCarregado")
}

function gotPoses(results){
    if(results.length>0){
        console.log(results)
        PunhoDireitoX = results[0].pose.rightWrist.X
        PunhoDireitoY = results[0].pose.rightWrist.Y
        PunhoEsquerdoX = results[0].pose.leftWrist.X
        PunhoEsquerdaX = results[0].pose.leftWrist.Y
        console.log(PunhoDireitoX+ " . " +PunhoDireitoY+ " . " +PunhoEsquerdoX+ " . " +PunhoEsquerdoY)
        precisãoPunhoDireito = results[0].pose.keypoints[10].score
        precisãoPunhoEsquerdo = results[0].pose.keypoints[9].score
        console.log(precisãoPunhoDireito+ " . " +precisãoPunhoEsquerdo)

    }
}

function draw(){
    image(video, 0, 0, 600, 500)
    fill("red")
    stroke("black")
    if(precisãoPunhoEsquerdo>0.2){
        circle(PunhoEsquerdoX, PunhoEsquerdoY, 20)
        numInteiro = floor(Number(PunhoEsquerdoY))
        console.log(numIntero)
        volume = numInteiro/500
        som.setVolume(volume)
    }
}

function Play(){
    console.log("Função Play Ok")
    som.play()
    som.setVolume(1)
    som.rate(1)
}

function Stop(){
    som.stop()
}