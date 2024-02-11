import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, removeCard, likeCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

//Попапы для открытия
const popupEdit = document.querySelector(".popup_type_edit"); //попап редактирования профиля
const popupAdd = document.querySelector(".popup_type_new-card"); //попап добавления новой карточки
const popupImg = document.querySelector(".popup_type_image"); //попап большой картинки

//Кнопки
const popupProfileEditButton = document.querySelector(".profile__edit-button"); // кнопка редактирования профиля
const popupProfileAddButton = document.querySelector(".profile__add-button"); //кнопка добавления новой карточки
const popupCloseButtons = document.querySelectorAll(".popup__close"); //все крестики закрытия

//Поиск элементов (Находим в DOM)
const placesList = document.querySelector(".places__list"); //список карточек
const titleProfile = document.querySelector(".profile__title"); //Заголовок (имя профиля) на странице
const descriptionProfile = document.querySelector(".profile__description"); //Описание (информации о себе) на странице
const formElement = document.forms["edit-profile"]; //форма редактирования профиля
const nameInput = formElement.elements.name; // Поле "Имя" формы
const jobInput = formElement.elements.description; // Поле "информации о себе" формы
const formNewPlace = document.forms["new-place"]; //форма добавления новой карточки
const formPlaceName = formNewPlace.elements["place-name"]; //Поле "название места" формы
const formPlaceLink = formNewPlace.elements.link; //Поле "ссылка на картинку" формы
const popupImageOpen = popupImg.querySelector(".popup__image"); //Объект img (для src&alt) попапа большой картинки
const popupCaptionOpen = popupImg.querySelector(".popup__caption"); //Подпись попап большой картинки

initialCards.forEach((card) => {
  placesList.append(createCard(card, removeCard, likeCard, openPopupImage));
});

//Ф-я открытия попапа карточки
function openPopupImage(cardImg) {
  popupImageOpen.src = cardImg.src;
  popupImageOpen.alt = cardImg.alt;
  popupCaptionOpen.textContent = cardImg.alt;
  openPopup(popupImg);
}

//Открытие по клику попапа информация профиля
popupProfileEditButton.addEventListener("click", () => {
  nameInput.value = titleProfile.textContent;
  jobInput.value = descriptionProfile.textContent;
  openPopup(popupEdit);
});

// Обработчик «отправки» формы профидя
function handleFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  titleProfile.textContent = name;
  descriptionProfile.textContent = job;
  closePopup(popupEdit);
}

// Прикрепляем обработчик к форме профиля: он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

//Открытие по клику попапа добавления новой карточки
popupProfileAddButton.addEventListener("click", () => {
  openPopup(popupAdd);
});

// Обработчик «отправки» формы новой карточки
function addNewCard(evt) {
  evt.preventDefault();
  const placeName = formPlaceName.value;
  const placeLink = formPlaceLink.value;
  const newCard = { name: placeName, link: placeLink };
  placesList.prepend(createCard(newCard, removeCard, likeCard, openPopupImage));
  closePopup(popupAdd);
  formNewPlace.reset();
}
// Прикрепляем обработчик к форме добавления новой карточки: он будет следить за событием “submit” - «отправка»
formNewPlace.addEventListener("submit", addNewCard);

//Закрытие по "крестику"
popupCloseButtons.forEach((button) => {
  button.addEventListener("click", (evt) => {
    closePopup(evt.target.closest(".popup"));
  });
});
