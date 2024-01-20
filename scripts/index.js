// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector(".places__list");

function createCard(card, removeCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImg = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardImg.src = card.link;
  cardImg.alt = card.name;
  cardTitle.textContent = card.name;

  const removeButton = cardElement.querySelector(".card__delete-button");
  removeButton.addEventListener("click", (evt) => {
    removeCard(evt.target.closest(".card"));
  });

  return cardElement;
}

function removeCard(cardNode) {
  cardNode.remove();
}

initialCards.forEach((card) => {
  placesList.append(createCard(card, removeCard));
});
