// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    etages: 20,
    rotation: 250,
    ScaleAjustement: 400,
    nombreElipses: 1.25,
    CoefDeDiminutionEtages: 1,
    hauteurElipses: 1,
    randomSeed: 0,
    color : 1,
    sensRota : 1,
    MethodRandom : 0,
    Download_Image: () => save(),
}
gui.add(params, "rotation", 0, 500, 1)
gui.add(params, "ScaleAjustement", 0, 500, 1)
gui.add(params, "etages", 0, 60, 1)
gui.add(params, "nombreElipses", 1.25  , 5, 0.05)
gui.add(params, "CoefDeDiminutionEtages", 0  , 1, 0.05)
gui.add(params, "hauteurElipses", 0  , 2, 0.05)
gui.add(params, "randomSeed", 0  , 100, 1)
gui.add(params, "MethodRandom", 0  , 3, 1)
gui.add(params, "color", 0  , 1, 1)
gui.add(params, "sensRota", -1  , 1, 1)
gui.add(params, "Download_Image")

// -------------------
//       Drawing
// -------------------

function draw() {
    background(200)
    rectMode(CENTER)
    translate(width/2,height/2)
    let i =0;
    if (params.MethodRandom == 0 ){
        randomSeed(params.randomSeed)}
    for (i =0; i<params.etages; i++){
        fill("black")
        rotate(params.sensRota*(-i)* PI/(2*params.rotation)/i*2)
        rect(0,0,width-100,height-100)
        scale(0.9*params.CoefDeDiminutionEtages,0.9*params.CoefDeDiminutionEtages,1) 
        if (params.MethodRandom == 1 ){
            randomSeed(params.randomSeed)}
        for(let j = 0; j<32*params.nombreElipses; j++){
            if (params.MethodRandom == 2 ){
                randomSeed(params.randomSeed)}
            fill("white")
            if (params.color == 1 ){
                fill(random(1)*255,random(1)*255,random(1)*255,255)
            }
            
            let alpha = (j*PI/(16*params.nombreElipses))%(PI/2)
            if ( alpha > PI/4){
                alpha = (PI/2)-alpha
            }   
            let comp = 1/cos(alpha)
            let redu = params.hauteurElipses * (1+alpha/params.ScaleAjustement)
            scale(redu, redu ,1)
            ellipse((width/2-67)*comp,0,100+15*alpha,(60+50*alpha*alpha)/2)
            scale(1/redu, 1/redu ,1)
            rotate(PI/(16*params.nombreElipses))
        }
        
        
    }
    fill("white")
    rotate(i* PI/(2*params.rotation)/i*2)
    rect(0,0,width-100,height-100)

}


// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()
}

function windowResized() {
    p6_ResizeCanvas()
}