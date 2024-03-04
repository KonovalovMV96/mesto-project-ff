import "./pages/index.css";
import { createCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getInitialCardsApi,
  getInfoUserApi,
  updateInfoUserApi,
  createCardApi,
  deleteCardApi,
  likeCardApi,
  unlikeCardApi,
  updateAvatarUserApi,
} from "./components/api.js";

//Попапы для открытия
const popupEdit = document.querySelector(".popup_type_edit"); //попап редактирования профиля
const popupAdd = document.querySelector(".popup_type_new-card"); //попап добавления новой карточки
const popupImg = document.querySelector(".popup_type_image"); //попап большой картинки
const popupAvatar = document.querySelector(".popup_type_edit-avatar"); //попап аватарки
const popupDeliteCard = document.querySelector('.popup_type_delite-card'); //попап подтверждения удаления карточки

//Кнопки
const popupProfileEditButton = document.querySelector(".profile__edit-button"); // кнопка редактирования профиля
const popupProfileAddButton = document.querySelector(".profile__add-button"); //кнопка добавления новой карточки
const popupCloseButtons = document.querySelectorAll(".popup__close"); //все крестики закрытия
const avatarProfile = document.querySelector(".profile__image"); // редактирование аватара

//Поиск элементов (Находим в DOM)
const placesList = document.querySelector(".places__list"); //список карточек
const titleProfile = document.querySelector(".profile__title"); //Заголовок (имя профиля) на странице
const descriptionProfile = document.querySelector(".profile__description"); //Описание (информации о себе) на странице
const formElement = document.forms["edit-profile"]; //форма редактирования профиля
const nameInput = formElement.elements.name; // Поле "Имя" формы
const jobInput = formElement.elements.description; // Поле "информации о себе" формы
const profileButtonSave = formElement.querySelector(".popup__button"); //Кнопка "Сохранить" в форме редактирования профиля
const formNewPlace = document.forms["new-place"]; //форма добавления новой карточки
const formPlaceName = formNewPlace.elements["place-name"]; //Поле "название места" формы
const formPlaceLink = formNewPlace.elements.link; //Поле "ссылка на картинку" формы
const newPlaceButtonSave = formNewPlace.querySelector(".popup__button"); //Кнопка "Сохранить" в форме добавления новой карточки
const popupImageOpen = popupImg.querySelector(".popup__image"); //Объект img (для src&alt) попапа большой картинки
const popupCaptionOpen = popupImg.querySelector(".popup__caption"); //Подпись попап большой картинки
const formAvatar = document.forms["edit-avatar"]; //форма редактирования аватара
const urlAvatarInput = formAvatar.elements.avatar; // Поле url формы
const avatarButtonSave = formAvatar.querySelector(".popup__button"); //Кнопка "Сохранить" в форме редактирования аватара
const deliteCardButton = popupDeliteCard.querySelector('.popup__button'); //Кнопка в попапе подтверждения удаления карточки

//Ф-я удадения карточки
function removeCard(cardId, removeButton) {
  openPopup(popupDeliteCard);
  deliteCardButton.addEventListener('click', function() {
    deleteCardApi(cardId)
    .then(() => {
      removeButton.closest(".card").remove();
      closePopup(popupDeliteCard)
    })
    .catch((err) => {
      console.log(err);
    });
  })  
}

//Ф-я лайк-карточки
function likeCard(cardData, likeButton, counter) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    unlikeCardApi(cardData)
      .then((data) => {
        counter.textContent = data.likes.length;
        likeButton.classList.remove("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    likeCardApi(cardData)
      .then((data) => {
        counter.textContent = data.likes.length;
        likeButton.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

//Ф-я улучения форм (сохранить/сохранение...)
const loading = ({ buttonElement, isLoading }) => {
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
  } else {
    buttonElement.textContent = "Сохранить";
  }
};

Promise.all([getInitialCardsApi(), getInfoUserApi()])
  .then(([cardsData, userData]) => {
    cardsData.forEach((cardData) => {
      placesList.append(
        createCard(cardData, userData._id, removeCard, likeCard, openPopupImage)
      );
    });
    titleProfile.textContent = userData.name;
    descriptionProfile.textContent = userData.about;
    avatarProfile.style.backgroundImage = `url(${userData.avatar})`;
  })
  .catch((err) => {
    console.log(err);
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
  clearValidation(formElement, validationConfig);
  openPopup(popupEdit);
});

// Обработчик «отправки» формы профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  loading({
    isLoading: true,
    buttonElement: profileButtonSave,
  });
  const name = nameInput.value;
  const job = jobInput.value;

  updateInfoUserApi({ name, job })
    .then((data) => {
      titleProfile.textContent = data.name;
      descriptionProfile.textContent = data.about;
      closePopup(popupEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading({
        isLoading: false,
        buttonElement: profileButtonSave,
      });
    });
}

// Прикрепляем обработчик к форме профиля: он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

//Открытие по клику попапа обновления аватарки
avatarProfile.addEventListener("click", () => {
  formAvatar.reset();
  clearValidation(formAvatar, validationConfig);
  openPopup(popupAvatar);
});

// Обработчик «отправки» формы обновления аватарки
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  loading({
    isLoading: true,
    buttonElement: avatarButtonSave,
  });
  const urlAvatar = urlAvatarInput.value;
  updateAvatarUserApi(urlAvatar)
    .then((userData) => {
      avatarProfile.style.backgroundImage = `url(${userData.avatar})`;
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading({
        isLoading: false,
        buttonElement: avatarButtonSave,
      });
    });
}

// Прикрепляем обработчик к форме обновления аватарки: он будет следить за событием “submit” - «отправка»
formAvatar.addEventListener("submit", handleAvatarFormSubmit);

//Открытие по клику попапа добавления новой карточки
popupProfileAddButton.addEventListener("click", () => {
  formNewPlace.reset();
  clearValidation(formNewPlace, validationConfig);
  openPopup(popupAdd);
});

// Обработчик «отправки» формы новой карточки
function addNewCard(evt) {
  evt.preventDefault();
  loading({
    isLoading: true,
    buttonElement: newPlaceButtonSave,
  });

  createCardApi({ name: formPlaceName.value, link: formPlaceLink.value })
    .then((newCard) => {
      placesList.prepend(
        createCard(
          newCard,
          newCard.owner._id,
          removeCard,
          likeCard,
          openPopupImage
        )
      );
      closePopup(popupAdd);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading({
        isLoading: false,
        buttonElement: newPlaceButtonSave,
      });
    });
}

// Прикрепляем обработчик к форме добавления новой карточки: он будет следить за событием “submit” - «отправка»
formNewPlace.addEventListener("submit", addNewCard);

//Закрытие по "крестику"
popupCloseButtons.forEach((button) => {
  button.addEventListener("click", (evt) => {
    closePopup(evt.target.closest(".popup"));
  });
});

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Вызовем функцию добавления обработчиков всем формам
enableValidation(validationConfig);
