import {openWidePic} from "./popup_type/imgPopup.js";

const elements = document.querySelector('.elements')
const templateElement = document.querySelector('#element').content; 

const createCard = (placeName, sourceLink)=>{
    const card = templateElement.querySelector('.element').cloneNode(true);
    const elementImg = card.querySelector('.element__img')
    elementImg.src = sourceLink
    elementImg.alt = placeName
    card.querySelector('.element__name').textContent = placeName
    
    const likeButton = card.querySelector('.element__like-button')
    const removeButton = card.querySelector('.element__remove-button')

    elementImg.addEventListener('click', ()=>openWidePic(placeName,sourceLink))
    likeButton.addEventListener('click', ()=>likeButton.classList.toggle('element__like-button_checked'))
    removeButton.addEventListener('click', ()=>card.remove())

    return card
}
const addCard = (placeName, sourceLink)=>{
    elements.prepend(createCard(placeName, sourceLink))
}

export {addCard}