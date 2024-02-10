function createCard(card, removeCard, likeCard, popupOpenImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImg = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardImg.src = card.link;
  cardImg.alt = card.name;
  cardTitle.textContent = card.name;

  const removeButton = cardElement.querySelector(".card__delete-button");
  removeButton.addEventListener("click", (evt) => {
  removeCard(cardElement);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click",  (evt) => {
  likeCard(likeButton);
  });

  cardImg.addEventListener("click",  (evt) => {
    popupOpenImage(cardImg);
    });
 
  return cardElement;
};

//Ф-я удадения карточки
function removeCard(cardNode) {
  cardNode.remove();
}
//Ф-я лайк-карточки
function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

export {createCard, removeCard, likeCard};