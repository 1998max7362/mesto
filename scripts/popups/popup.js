
const closePopupByKey = (key, popup) => key === 'Escape'? closePopup(popup):false

const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', evt => closePopupByKey(evt.key, popup))
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown',  evt => closePopupByKey(evt.key, popup))
}


export {openPopup, closePopup }