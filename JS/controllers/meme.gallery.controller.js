'use strict'

function showMemesGallery() {
  elH2.style.display = 'default'
  hideImgGallery()
  renderMemesGallery()
  const elMemesGallery = document.querySelector('.memes-gallery-container')
  elMemesGallery.classList.remove('.hide')
}

function renderMemesGallery() {
  console.log('render memes')
  const memes = getMemes()
  let elMemes = document.querySelector('.memes-gallery-container')
  
  let strHtml = memes.map((meme, idx) => `<div class="saved-meme-${idx}"> 
  <img src="${getImgById(meme.selectedImgId).url}" onclick="onSelectMeme(${idx})">
  ${meme.lines.map((line) => `<p>${line.txt}</p>`).join(',')}
  </div>`)
  
  elMemes.innerHTML = strHtml.join('')
}

