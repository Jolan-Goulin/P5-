var gui = new dat.GUI();
var params = {
    y: 20,
    n: 250,
    b: 400,
    h: 1.25,
    s: 1,
    s2: 1,
    c: 1,
    Download_Image: function () { return save(); },
};
gui.add(params, "n", 0, 500, 1);
gui.add(params, "b", 0, 500, 1);
gui.add(params, "y", 0, 60, 1);
gui.add(params, "h", 1.25, 5, 0.05);
gui.add(params, "s", 0, 1, 0.05);
gui.add(params, "s2", 0, 2, 0.05);
gui.add(params, "c", 0, 100, 0.05);
gui.add(params, "Download_Image");
function draw() {
    background(200);
    rectMode(CENTER);
    translate(width / 2, height / 2);
    var i = 0;
    for (i = 0; i < params.y; i++) {
        fill("black");
        rotate(-i * PI / (2 * params.n) / i * 2);
        rect(0, 0, width - 100, height - 100);
        scale(0.9 * params.s, 0.9 * params.s, 1);
        for (var j = 0; j < 32 * params.h; j++) {
            fill("white");
            var alpha_1 = (j * PI / (16 * params.h)) % (PI / 2);
            if (alpha_1 > PI / 4) {
                alpha_1 = (PI / 2) - alpha_1;
            }
            var comp = 1 / cos(alpha_1);
            var redu = params.s2 * (1 + alpha_1 / params.b);
            scale(redu, redu, 1);
            ellipse((width / 2 - 67) * comp, 0, 100, 50 + 50 * alpha_1 * alpha_1);
            scale(1 / redu, 1 / redu, 1);
            rotate(PI / (16 * params.h));
        }
    }
    fill("white");
    rotate(i * PI / (2 * params.n) / i * 2);
    rect(0, 0, width - 100, height - 100);
}
function setup() {
    p6_CreateCanvas();
}
function windowResized() {
    p6_ResizeCanvas();
}
var __ASPECT_RATIO = 1;
var __MARGIN_SIZE = 25;
function __desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2;
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO;
    }
}
function __desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO;
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2;
    }
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map