//Ф-я открытия попавов
function openPopup(popup) {
  popup.classList.add("popup_is-animated");
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEsc);
  document.addEventListener("click", closeOverlay);
}

//Ф-я закрытия попавов
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEsc);
  document.removeEventListener("click", closeOverlay);
}

//Закрытие по ESC
function closeEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}

//Закрытие по клику на оверлей
function closeOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

export { openPopup, closePopup };
