'use strict'
let gIsModal = false

function toggleModal() {
    document.body.classList.toggle('modal-open');
}
function onleModal() {
    if(gIsModal) return
    gIsModal = true
    document.body.classList.add('modal-open');
}

function offleModal() {
    if(!gIsModal) return
    gIsModal = false
    document.body.classList.remove('modal-open');
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function renderGallery() {
    const imgs = getImgs()
    const strHTMLs = imgs.map((img) => {
        return `
    <article>
    <img onclick="onImgSelect(${img.id})"
    src="imgs/meme-imgs (square)/${img.url}" />
    </article>`
    })
    const elGalleryContainer = document.querySelector('.gallery-container')
    elGalleryContainer.innerHTML = strHTMLs.join('')
}

function onImgSelect(imgId) {
    setImg(imgId)
    renderMeme()
}