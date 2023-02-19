'use strict'

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL('image/jpeg')
    elLink.href = data
    elLink.download = 'my-img.jpg'
}