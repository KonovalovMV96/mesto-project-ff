import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, removeCard, likeCard } from "./components/card.js";
import { popupOpen, popupClose } from "./components/modal.js";

//Попапы для открытия
const popupEdit = document.querySelector(".popup_type_edit"); //попап редактирования профиля
const popupAdd = document.querySelector(".popup_type_new-card"); //попап добавления новой карточки
const popupImg = document.querySelector(".popup_type_image"); //попап большой картинки

//Кнопки
const popupProfileEditButton = document.querySelector(".profile__edit-button"); // кнопка редактирования профиля
const popupProfileAddButton = document.querySelector(".profile__add-button"); //кнопка добавления новой карточки
const popupCloseButton = document.querySelectorAll(".popup__close"); //все крестики закрытия

//Поиск элементов (Находим в DOM)
const placesList = document.querySelector(".places__list"); //список карточек
const formElement = document.forms["edit-profile"]; //форма редактирования профиля
const nameInput = formElement.elements.name; // Поле "Имя" формы
const jobInput = formElement.elements.description; // Поле "информации о себе" формы
const formNewPlace = document.forms["new-place"]; //форма добавления новой карточки
const formPlaceName = formNewPlace.elements["place-name"]; //Поле "название места" формы
const formPlaceLink = formNewPlace.elements.link; //Поле "ссылка на картинку" формы

initialCards.forEach((card) => {
  placesList.append(createCard(card, removeCard, likeCard, popupOpenImage));
});

//Ф-я открытия попапа карточки
function popupOpenImage(cardImg) {
  popupImg.querySelector(".popup__image").src = cardImg.src;
  popupImg.querySelector(".popup__image").alt = cardImg.alt;
  popupImg.querySelector(".popup__caption").textContent = cardImg.alt;
  popupOpen(popupImg);
}

//Открытие по клику попапа информация профиля
popupProfileEditButton.addEventListener("click", () => {
  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;
  popupOpen(popupEdit);
});

// Обработчик «отправки» формы профидя
function handleFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  document.querySelector(".profile__title").textContent = name;
  document.querySelector(".profile__description").textContent = job;
  popupClose(popupEdit);
}

// Прикрепляем обработчик к форме профиля: он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

//Открытие по клику попапа добавления новой карточки
popupProfileAddButton.addEventListener("click", () => {
  popupOpen(popupAdd);
});

// Обработчик «отправки» формы новой карточки
function addNewCard(evt) {
  evt.preventDefault();
  const placeName = formPlaceName.value;
  const placeLink = formPlaceLink.value;
  const newCard = { name: placeName, link: placeLink };
  placesList.prepend(createCard(newCard, removeCard, likeCard, popupOpenImage));
  popupClose(popupAdd);
  formNewPlace.reset();
}
// Прикрепляем обработчик к форме добавления новой карточки: он будет следить за событием “submit” - «отправка»
formNewPlace.addEventListener("submit", addNewCard);

//Закрытие по "крестику"
popupCloseButton.forEach((button) => {
  button.addEventListener("click", (evt) => {
    popupClose(evt.target.closest(".popup"));
  });
});
