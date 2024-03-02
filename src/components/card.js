function createCard(cardData, userData, removeCard, likeCard, openPopupImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImg = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  const counter = cardElement.querySelector(".card__like-counter");
  counter.textContent = cardData.likes.length;

  const removeButton = cardElement.querySelector(".card__delete-button");
  if (cardData.owner._id === userData) {
    removeButton.classList.add("card__delete-button_is-active");
    removeButton.addEventListener("click", (evt) => {
      removeCard(cardData._id, removeButton);
    });
  }

  const likeButton = cardElement.querySelector(".card__like-button");
  if (cardData.likes.find((el) => el._id === userData)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeButton.addEventListener("click", (evt) => {
    likeCard(cardData._id, likeButton, counter);
  });

  cardImg.addEventListener("click", (evt) => {
    openPopupImage(cardImg);
  });

  return cardElement;
}

export { createCard };
