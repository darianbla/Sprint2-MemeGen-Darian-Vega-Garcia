'use strict'

let gCanvas
let gCtx
let gTxt

function onInit() {
    gCanvas = document.querySelector('#canvas')
    gCtx = gCanvas.getContext('2d')
    renderGallery()
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

function drawText(text, size, strokeSize, color, idx) {
    gCtx.beginPath()
    const { x, y } = setCoords(idx)
    gCtx.lineWidth = strokeSize
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px Impact`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}

function getTxtInfo() {
    const txt = document.querySelector('.txt').value
    // const font = document.querySelector('.font').value
    // const fontSize = document.querySelector('.font-size').value
    return txt
}

function renderMeme() {
    onleModal()
    const { memeImg } = getMeme()
    // let idx = getSelectedLineIdx()
    const img = new Image()
    img.src = `imgs/meme-imgs (square)/${memeImg.url}`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        gMeme.lines.forEach((line, idx) => {
            drawText(line.txt, line.size, line.strokeSize, line.color, idx)
        })

        // drawText(gMemeCurTxt.txt, gMemeCurTxt.size, gMemeCurTxt.color, idx)
        // if (getLinesLength() > 0) {
        //     drawText(gMemeNxtTxt.txt, gMemeNxtTxt.size, gMemeNxtTxt.color, idx)
        // }
    }
}

function onTextInput(userTxt) {
    setLineTxt(userTxt)
    renderMeme()
    // return userTxt
}

function changeTxtColor(color) {
    setMemeColor(color)
    renderMeme()
}

function changeFontSize(increaseClicked) {
    const { memeTxt } = getMeme()
    const diff = increaseClicked ? 7 : -7
    memeTxt.size += diff
    renderMeme()
}

function onAddLine() {
    addNewLine()
    let idx = getSelectedLineIdx()
    console.log('gMeme', gMeme)
    // drawText('im your new line!', '40', 'white', 'center', 250, 350)
    drawText('im your new line!', '40', '2', 'white', idx)
}

function onSwitchLine() {
    switchLine()
    renderMeme()
}