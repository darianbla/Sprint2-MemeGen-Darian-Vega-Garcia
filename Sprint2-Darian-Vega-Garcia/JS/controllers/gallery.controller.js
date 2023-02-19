'use strict'
let gIsModal = false

function toggleModal() {
    document.body.classList.toggle('thank-modal-open');
}
function onleModal() {
    if (gIsModal) return
    gIsModal = true
    document.body.classList.add('modal-open');
}

function offleModal() {
    if (!gIsModal) return
    gIsModal = false
    document.body.classList.remove('modal-open');
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function renderGallery() {
    let elH2 = document.querySelector('h2')
    elH2.style.display = 'none'
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

function showMemesGallery() {
    hideImgGallery()
    renderMemesGallery()
}

function hideImgGallery() {
    const elHomePage = document.querySelector('.gallery-container')
    elHomePage.style.display = 'none'
    // elHomePage.hidden = true
}