import { openPopup } from "../popup.js"

const imgPopup = document.querySelector('.popup__img');
const wideImg =  imgPopup.querySelector('.img-container__img')
const captionImg =  imgPopup.querySelector('.img-container__caption')


const openWidePic = (placeName, sourceLink)=>{
  openPopup(imgPopup)
  wideImg.src = sourceLink
  wideImg.alt = placeName
  captionImg.textContent = placeName
}

export { openWidePic }