const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1920;
canvas.height = 1080;

var winImg = new Image();
winImg.src = "window.png";

var windows = [];
var images = [];
var loaded = false;
var imgCount = 30;

class Window {
    x = randomNumber(0, canvas.width - winImg.width);
    y = randomNumber(0, canvas.height - winImg.height);
    width = winImg.width;
    height = winImg.height;
    xDir = Math.random() < 0.5 ? -26 : 26;
    yDir = Math.random() < 0.5 ? -26 : 26;
    imgIndex = randomNumber(1, images.length);
    frameCount = randomNumber(0, 8);;

    constructor() {
    }

    draw() {
        ctx.drawImage(winImg, this.x, this.y, this.width, this.height);
        ctx.drawImage(images[this.imgIndex], this.x + 6, this.y + 26, 210, 141);
        this.setDirection();
        this.setImageIndex();
        this.x += this.xDir;
        this.y += this.yDir
        this.frameCount++;

        
    }

    setDirection() {
        if (this.x <= 0 || this.x >= canvas.width - this.width) {
            this.xDir = -this.xDir;
        }
        if (this.y <= 0 || this.y >= canvas.height - this.height) {
            this.yDir = -this.yDir;
        }
    }

    setImageIndex() {
        if (this.frameCount % 8 == 0) {
            this.imgIndex = randomNumber(1, images.length);
        }
        
    }
}

function loadImages() {
    for (var i = 0; i <= imgCount; i++) {
        var img = new Image();
        img.src = `img/img${i}.gif`;
        images.push(img);
    }
}

document.addEventListener("keydown", function() {
    for (let i = 0; i < 5; i++) {
        windows.push(new Window());
    }
})

function draw() {
    windows.forEach(win => {
        win.draw();
    })
}

function init() {
    loadImages();

    for (let i = 0; i < 5; i++) {
        windows.push(new Window());
    }

    setInterval(draw, 20);
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

winImg.onload = function() {
    init();
}






