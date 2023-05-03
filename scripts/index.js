import { initialCards, componentSelectors } from "./initials.js";
import { Card } from "./Card.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";


const imgPopup = new PopupWithImage('.popup_type_img', 'popup_opened', '.popup__close-button','.img-container__img', '.img-container__caption')
const handleCardClick = imgPopup.open.bind(imgPopup)

const defaultCardList = new Section(
    {
        items: initialCards,
        renderer: (item) => {
            const card = new Card(item.name, item.link, '#element', handleCardClick)
            const cardElement = card.createCardElement();
            defaultCardList.addItem(cardElement);
        }
    },
    '.elements')

defaultCardList.renderItems()