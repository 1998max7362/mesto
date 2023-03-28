//Приходится каждый раз искать открытый попап... кажется, что можно упростить это. Но я не придумал, как
const closePopupByKey = (evt) => evt.key === 'Escape'? closePopup(document.querySelector('.popup_opened')):false 

const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupByKey)
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown',  closePopupByKey)
}

export {openPopup, closePopup }