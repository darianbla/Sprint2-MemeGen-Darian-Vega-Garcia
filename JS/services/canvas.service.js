'use strict'

let gCanvas
let gCtx
let gTxt

function onInit() {
    gCanvas = document.querySelector('#canvas')
    gCtx = gCanvas.getContext('2d')

    drawImgFromlocal()
    drawText()

    // Check download (does not work)
    // drawImgFromRemote()
}

function drawImgFromlocal() {
    const img = new Image()
    img.src = 'imgs/meme-imgs (square)/1.jpg'
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xEnd,yEnd
    }
}

function drawImgFromRemote() {
    const img = new Image()
    img.src = 'https://cdn.pixabay.com/photo/2023/01/23/13/37/flowers-7738726_1280.jpg'
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}

function downloadCanvas(elLink) {
    // Protect the image soo attacker could not download imgs from diff domain
    const data = gCanvas.toDataURL() // For security reason you cannot do toDataUrl on tainted canvas
    // This protects users from having private data exposed by using images
    // to pull information from remote web sites without permission.
    elLink.href = data
    elLink.download = 'my-img.jpg'
}

// DRAW TXT

function onDrawText(ev) {
    // ev.preventDefault()
    drawText()
}

function drawText() {
    gTxt = getTxtInfo()
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = `100px serif`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(gTxt, 225, 50) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(gTxt, 225, 50) // Draws (strokes) a given text at the given (x, y) position.
}

// function drawText() {
//     gCtx.font = "48px serif";
//     gCtx.fillText("Hello world", 10, 50);
// }

function getTxtInfo() {
    const txt = document.querySelector('.txt').value
    // const font = document.querySelector('.font').value
    // const fontSize = document.querySelector('.font-size').value
    return txt
}