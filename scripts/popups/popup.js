const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', evt => evt.key==='Escape'? closePopup(popup):false, { once: true })
}


export {openPopup, closePopup }