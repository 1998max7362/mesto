const errorElementList = Array.from(document.querySelectorAll('.form__input-error'))

const clearErrors = () => errorElementList.forEach(errorElement => errorElement.textContent='')

const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
  clearErrors()
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', evt => evt.key==='Escape'? closePopup(popup):false, { once: true })
}

const inputEvent = new Event('input')

export {openPopup,closePopup, inputEvent}