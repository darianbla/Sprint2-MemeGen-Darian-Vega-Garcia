'use strict'
var gMemeCurTxt
var gMemeCurTxtPos
var gMemeNxtTxt
var gMemeNxtTxtPos

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
        },
    ],
}

function getMeme() {
    //*Get Meme Img by ID
    const memeImg = gImgs.find((img) => img.id === gMeme.selectedImgId)
    //*Get Meme text and pos
    // if (!gMeme.selectedLineIdx) {
    //     gMemeCurTxt = gMeme.lines[0]
    //     console.log('gMemeCurTxt', gMemeCurTxt)
    //     if (!gMeme.lines.length) {
    //         gMemeNxtTxt = gMeme.lines[1]
    //     }

    // } else {
    //     gMemeCurTxt = gMeme.lines[1]
    //     gMemeNxtTxt = gMeme.lines[0]
    // }
    return { gMeme, memeImg }
}

function setLineTxt(value) {
    gMeme.lines[gMeme.selectedLineIdx].txt = value
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

function addNewLine() {
    //* Push a new Line
    gMeme.lines.push({
        txt: 'New Line',
        size: 40,
        strokeSize: 4,
        align: 'center',
        color: 'white',
    })

    //* Select the new Line
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function switchLine() {
    // let selectedIdx=gMeme.selectedLineIdx
    gMeme.selectedLineIdx === 0 ? gMeme.selectedLineIdx++ : gMeme.selectedLineIdx--

    if (gMeme.selectedLineIdx === 0) {
        gMeme.lines[0].strokeSize = 4
        gMeme.lines[1].strokeSize = 2
    } else {
        gMeme.lines[0].strokeSize = 2
        gMeme.lines[1].strokeSize = 4
    }
    console.log('gMeme.selectedLineIdx', gMeme.selectedLineIdx)
}

function getSelectedLineIdx() {
    return (gMeme.selectedLineIdx)
}

function getLinesLength() {
    return gMeme.lines.length
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
// function setStroke(selectedLineIdx) {
//     let line1 = lines[0].strokeSize
//     switch (selectedLineIdx) {
//         case 0:
//             return {line1: 2,}
//         case 1:
//             return { x: 200, y: 360 }
//         default:
//             return { x: 200, y: 200 }
//     }
// }