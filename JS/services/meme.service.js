'use strict'
var IMGS_STORAGE_KEY = 'ImagesDB'
const MEME_STORAGE_KEY = 'memeDB'
const MEMES_STORAGE_KEY = 'memesDB'
let gMemes = []


function createMemes() {
    let memes = loadFromStorage(MEMES_STORAGE_KEY);
    if (!memes || !memes.length) {
        memes = [];

        memes.push(_creatDemoMeme());
        console.log('memes:', memes)

    }
    gMemes = memes
    _saveMemesToStorage();
}

function _creatDemoMeme() {
    return {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'I sometimes eat Falafel',
                size: 40,
                strokeSize: 2,
                align: 'center',
                color: 'white',
                font: 'eurof35',
            },
        ],
    }
}

let gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

let gImgs = [
    { id: 1, url: '1.jpg', keywords: ['Trump', 'Angry'] },
    { id: 2, url: '2.jpg', keywords: ['Dog', 'Cute'] },
    { id: 3, url: '3.jpg', keywords: ['Dog', 'Cute', 'Baby'] },
    { id: 4, url: '4.jpg', keywords: ['Cat', 'Cute', 'Sleepy'] },
    { id: 5, url: '5.jpg', keywords: ['Baby', 'Win'] },
    { id: 6, url: '6.jpg', keywords: ['Stupied', 'Funny'] },
    { id: 7, url: '7.jpg', keywords: ['Baby', 'Suprrise'] },
    { id: 8, url: '8.jpg', keywords: ['Funny', 'Listening'] },
    { id: 9, url: '9.jpg', keywords: ['Baby', 'Cute', 'Funny'] },
    { id: 10, url: '10.jpg', keywords: ['Ubama', 'Funny'] },
    { id: 11, url: '11.jpg', keywords: ['Kissing', 'Fighting'] },
    { id: 12, url: '12.jpg', keywords: ['Funny', 'צדיק'] },
    { id: 13, url: '13.jpg', keywords: ['Glass', 'Funny', 'Please'] },
    { id: 14, url: '14.jpg', keywords: ['Lost', 'Matrix'] },
    { id: 15, url: '15.jpg', keywords: ['One', 'Simply', 'LOTR'] },
    { id: 16, url: '16.jpg', keywords: ['Funny', 'Villan', 'Star-Trek'] },
    { id: 17, url: '17.jpg', keywords: ['Puttin', 'Angry', 'Villan'] },
    { id: 18, url: '18.jpg', keywords: ['Toy', 'Toy Story', 'Baz', 'Woody'] },
]

let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 40,
            strokeSize: 2,
            align: 'center',
            color: 'white',
            font: 'Imapct',
            isDraged: false
        },
    ],
}

function getMemeLine() {
    let line = { ...gMeme.lines[0] }
    return line
}
function getMeme() {
    return { gMeme }
}

function saveImgsToStorage() {
    saveToStorage(IMGS_STORAGE_KEY, gImgs)
}

function _saveMemeToStorage() {
    saveToStorage(MEME_STORAGE_KEY, gMeme)
    gMemes.push(gMeme)
    console.log('MEMES:', gMemes)
}

function _saveMemesToStorage() {
    saveToStorage(MEMES_STORAGE_KEY, gMemes);
}

function _saveMeme() {
    gMemes.push(gMeme)
    _saveMemeToStorage()
}

function getMemes() {
    return gMemes
}

function getLineInfo(selectedLineIdx) {
    if (!gMeme.lines.length) return
    const { txt, size, align, color } = gMeme.lines[selectedLineIdx];
    return { txt, size, align, color }
}

function setLineTxt(value) {
    gMeme.lines[gMeme.selectedLineIdx].txt = value
}

function getMemeImg() {
    const memeImg = gImgs.find((img) => img.id === gMeme.selectedImgId)
    return { memeImg }
}

function getImgs() {
    return gImgs
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setMemeColor(userColor) {
    gMeme.lines[gMeme.selectedLineIdx].color = userColor
    gCtx.fillStyle = userColor
}

function changeFont() {
    let fontSelector = document.getElementById('font-style')
    let selectedFont = fontSelector.options[fontSelector.selectedIndex].value
    gMeme.lines[gMeme.selectedLineIdx].font = selectedFont
}

function switchLine() {
    if (gMeme.lines.length === 1) return
    gMeme.selectedLineIdx === 0 ? gMeme.selectedLineIdx++ : gMeme.selectedLineIdx--

    if (gMeme.selectedLineIdx === 0) {
        gMeme.lines[0].strokeSize = 4
        gMeme.lines[1].strokeSize = 2
    } else {
        gMeme.lines[0].strokeSize = 2
        gMeme.lines[1].strokeSize = 4
    }
}

function getSelectedLineIdx() {
    return (gMeme.selectedLineIdx)
}

function getImgById(imgId) {
    let imgs = getImgs()
    let image = imgs.find(img => `${img.id}` === `${imgId}`)
    return image
}


function deleteLine() {
    gMeme.lines[gMeme.selectedLineIdx].txt = ''
}

function setCoords(idx) {
    switch (idx) {
        case 0:
            return { x: 200, y: 50 }
        case 1:
            return { x: 200, y: 360 }
        default:
            return { x: 200, y: 200 }
    }
}

function alignText(num) {
    switch (num) {
        case 0:
            gMeme.lines[gMeme.selectedLineIdx].align = 'right'
            break
        case 1:
            gMeme.lines[gMeme.selectedLineIdx].align = 'center'
            break
        case 2:
            gMeme.lines[gMeme.selectedLineIdx].align = 'left'
            break
    }
}

function addNewLine() {
    const newLine = getMemeLine()
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

// DRAG AND DROP-NOT WORKING

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].y += dy
    gMeme.lines[gMeme.selectedLineIdx].x += dx

}

function upLine() {
    if (gMeme.lines[gMeme.selectedLineIdx].y <= 30) return
    gMeme.lines[gMeme.selectedLineIdx].y -= 10
}

function unselectLines() {
    gMeme.selectedLineIdx = -1
    let gElLineInput = document.querySelector('.txt')
    gElLineInput.value = 'Please Select Line'
    renderMeme()
}

function canvasClicked(ev) {
    const { offsetX, offsetY } = ev
    const meme = getMeme()
    const clickedText = gMeme.lines.find(line => {
        const { x, y, size } = line
        return offsetX >= x - 250 && offsetX <= x + 250 &&
            offsetY >= y - 20 && offsetY <= y + 20
    })
    if (clickedText) {
        setSelectedLineIdx(clickedText.idx)
    }
}
function isLineClicked(ev) {
    const { offsetX, offsetY } = ev
    const clickedTextIdx = gMeme.lines.findIndex(line => {
        const { x, y } = line
        return offsetX >= x - 250 && offsetX <= x + 250 && offsetY >= y - 20 && offsetY <= y + 20
    })
    return clickedTextIdx
}

function setLineDrag(value) {
    if (gMeme.selectedLineIdx === -1) return
    gMeme.lines[gMeme.selectedLineIdx].isDragged = value
}