'use strict'

let gCanvas
let gCtx


function onInit() {
    gCanvas = document.querySelector('#canvas')
    gCtx = gCanvas.getContext('2d')
    renderGallery()
    resizeCanvas()
    createMemes()
    console.log('MEMES:', gMemes)
}

function getTxtInfo() {
    const txt = document.querySelector('.txt').value
    // const font = document.querySelector('.font').value
    // const fontSize = document.querySelector('.font-size').value
    return txt
}

function renderMeme() {
    onleModal()
    const { memeImg } = getMemeImg()
    const img = new Image()
    img.src = `imgs/meme-imgs (square)/${memeImg.url}`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        gMeme.lines.forEach((line, idx) => {
            drawText(line.txt, line.size, line.strokeSize, line.color, idx, line.font)
        })
    }
}


function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

function drawLine(x, y) {
    gCtx.beginPath()
    gCtx.moveTo(x, y)
    gCtx.lineTo(gCanvas.width, y)

    gCtx.lineWidth = 5
    gCtx.strokeStyle = 'white'
    gCtx.stroke()
}

// DRAW TXT
function drawText(text, size, strokeSize, color, idx, font) {
    gCtx.beginPath()
    const { x, y } = setCoords(idx)
    gCtx.lineWidth = strokeSize
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = gMeme.lines[idx].align
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y) 
    gCtx.strokeText(text, x, y) 
}

function onTextInput(userTxt) {
    setLineTxt(userTxt)
    renderMeme()
}

function changeTxtColor(color) {
    setMemeColor(color)
    renderMeme()
}

function changeFontSize(increaseClicked) {
    const { gMeme } = getMeme()
    let idx = getSelectedLineIdx()
    const diff = increaseClicked ? 7 : -7
    gMeme.lines[idx].size += diff
    renderMeme()
}

function onAlign(num) {
    alignText(num)
    renderMeme()
}

function onAddLine() {
    addNewLine()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function onChangeFont() {
    changeFont()
    renderMeme()
}

//NOT WORKING...
function onCanvasClicked(ev) {
    canvasClicked(ev)
    renderMeme()
}

function onSaveMeme() {
    _saveMeme()
    alert('Your Meme was saved successfully')
}