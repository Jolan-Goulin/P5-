// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    y: 20,
    n: 250,
    b: 400,
    h: 1.25,
    s: 1,
    s2: 1,
    c: 1,
    Download_Image: () => save(),
}
gui.add(params, "n", 0, 500, 1)
gui.add(params, "b", 0, 500, 1)
gui.add(params, "y", 0, 60, 1)
gui.add(params, "h", 1.25  , 5, 0.05)
gui.add(params, "s", 0  , 1, 0.05)
gui.add(params, "s2", 0  , 2, 0.05)
gui.add(params, "c", 0  , 100, 0.05)
gui.add(params, "Download_Image")

// -------------------
//       Drawing
// -------------------

function draw() {
    background(200)
    rectMode(CENTER)
    translate(width/2,height/2)
    let i =0;
    for (i =0; i<params.y; i++){
        fill("black")
        rotate(-i* PI/(2*params.n)/i*2)
        rect(0,0,width-100,height-100)
        scale(0.9*params.s,0.9*params.s,1) 

        for(let j = 0; j<32*params.h; j++){
            fill("white")
            
            let alpha = (j*PI/(16*params.h))%(PI/2)
            if ( alpha > PI/4){
                alpha = (PI/2)-alpha
            }   
            let comp = 1/cos(alpha)
            let redu = params.s2 * (1+alpha/params.b)
            scale(redu, redu ,1)
            ellipse((width/2-67)*comp,0,100,50+50*alpha*alpha)
            scale(1/redu, 1/redu ,1)
            rotate(PI/(16*params.h))
        }
        
        
    }
    fill("white")
    rotate(i* PI/(2*params.n)/i*2)
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