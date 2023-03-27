const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened')
}


export {openPopup,closePopup}