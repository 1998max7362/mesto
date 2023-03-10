const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  popup.querySelector('.popup__close-button').addEventListener('click', ()=>closePopup(popup))
}


export {openPopup,closePopup}