import { componentSelectors, url, token } from "../utils/initials.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { FormValidator } from "../components/FormValidation.js";
import { Api } from "../components/APi.js";
import '../../pages/index.css'; // добавьте импорт главного файла стилей

// ---------------------- Page buttons
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editAvatarButton = document.querySelector('.profile__avatar-edit-button');

// ------------------------API
const api = new Api({
  baseUrl: url,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
});

const initialCards = api.getInitialCards()
const userData = api.getUserData()

// ----------------------- Image Popup 
const imgPopup = new PopupWithImage('.popup_type_img', 'popup_opened', '.popup__close-button', '.img-container__img', '.img-container__caption')
const handleCardClick = imgPopup.open.bind(imgPopup)

// ------------------------Place Form Validation
const placeForm = document.querySelector('#place')
const placeValidator = new FormValidator(componentSelectors, placeForm)
placeValidator.enableValidation()

// ------------------------Profile Form Validation
const profileForm = document.querySelector('#name-job')
const profileValidator = new FormValidator(componentSelectors, profileForm)
profileValidator.enableValidation()

// ------------------------Avatar Form Validation
const avatarForm = document.querySelector('#avatar')
const avatarValidator = new FormValidator(componentSelectors, avatarForm)
avatarValidator.enableValidation()

// ------------------------Button state "Loading"
const setSubmitButtonCommon = (formValidatior) => {
  formValidatior.submitButton.textContent = 'Сохраненить'
  formValidatior.enableButton()
}

const setSubmitButtonLoading = (formValidatior) => {
  formValidatior.submitButton.textContent = 'Сохранение...'
  formValidatior.disableButton()
}

//-------------------------Approve Popup
const approvePopup = new PopupWithForm(
  '.popup_type_approve',
  'popup_opened',
  '.popup__close-button',
  componentSelectors,
  () => { },
  (handleSubmit) => {
    approvePopup.handleSubmit = handleSubmit
  }
)

// ----------------------CARD
const createCard = (cardData, templateSelector, handleCardClick, userId) => {
  const card = new Card(
    templateSelector,
    cardData,
    handleCardClick,
    async () => {
      try {
        card.setCardData(await api.likeCard(card.getCardId()))
        card.checkUsersRelation(userId)
      }
      catch {
        console.log('Не удалось поставить лайк')
      }
    },
    async () => {
      try {
        card.setCardData(await api.dislikeCard(card.getCardId()))
        card.checkUsersRelation(userId)
      }
      catch {
        console.log('Не удалось убрать лайк')
      }
    },
    () => {
      approvePopup.open(async () => {
        try {
          if ((await api.deleteCard(card.getCardId())).message === 'Пост удалён') {
            card._remove()
          }
        }
        catch {
          console.log('Не удалось удалить карточку')
        }finally{
          approvePopup.close()
        }
      })
    },
  )
  card.checkUsersRelation(userId)
  return card.createCardElement()
}



// -------------------- RENDER PAGE WITH SERVER DATA
Promise.all([initialCards, userData]).then(([initialCards, userData]) => {
  console.log('userData', userData)
  console.log('initialCards', initialCards)
  // ---------Профиль (заполнение данных юзера)
  const userInfo = new UserInfo('.profile__name', '.profile__job', '.profile__avatar', userData)
  // ---------Карточки и попап картинки (рендер)

  // -----------------------Profile popup
  const profileFormPopup = new PopupWithForm(
    '.popup_type_profile',
    'popup_opened',
    '.popup__close-button',
    componentSelectors,
    async () => {
      setSubmitButtonLoading(profileValidator)
      try {
        userInfo.setUserInfo(await api.patchUserData(profileFormPopup.getInputValues()))
        profileFormPopup.close()
      }
      catch {
        console.log('Не удалось изменить данные профиля')
      }
      setSubmitButtonCommon(profileValidator)
    },
    () => {
      profileFormPopup.inputList.forEach((inputElement, id) => {
        inputElement.value = userInfo.getUserInfo()[id]
        profileValidator.checkInputValidity(inputElement)
        profileValidator.toggleButtonState()
      })
    })
  editButton.addEventListener('click', () => profileFormPopup.open())

  // ------------------------ Avatar Change Popup
  const avatarFormPopup = new PopupWithForm(
    '.popup_type_avatar',
    'popup_opened',
    '.popup__close-button',
    componentSelectors,
    async () => {
      setSubmitButtonLoading(avatarValidator)
      try {
        userInfo.setUserAvatar(await api.updateAvatar(avatarFormPopup.getInputValues()))
        avatarFormPopup.close()
      }
      catch {
        console.log('Не удалось изменить аватар профиля')
      }
      setSubmitButtonCommon(avatarValidator)
    },
  )
  editAvatarButton.addEventListener('click', () => avatarFormPopup.open())

  // --------------------------CARD

  const cardList = new Section(
    {
      items: initialCards,
      renderer: (item) => {
        cardList.addItem(createCard(item, '#element', handleCardClick, userInfo.getUserId()));
      }
    },
    '.elements')
  cardList.renderItems()

  // ------------------------ Card popup
  const placeFormPopup = new PopupWithForm(
    '.popup_type_card',
    'popup_opened',
    '.popup__close-button',
    componentSelectors,
    async () => {
      setSubmitButtonLoading(placeValidator)
      try {
        cardList.addItem(createCard(await api.postCard(placeFormPopup.getInputValues()), '#element', handleCardClick));
        placeFormPopup.close()
      }
      catch {
        console.log('Не удалось загрузить картинку')
      }
      setSubmitButtonCommon(placeValidator)
    },
    () => {
      placeValidator.disableButton()
    })

  addButton.addEventListener('click', () => placeFormPopup.open())
})






