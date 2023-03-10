import {openWidePic} from "./popup.js";

const elements = document.querySelector('.elements')
const templateElement = document.querySelector('#element').content; 

const addCard = (placeName, sourceLink)=>{
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

    elements.prepend(card)
}

export {addCard}