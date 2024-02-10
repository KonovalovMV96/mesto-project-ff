//Ф-я открытия попавов
function popupOpen(popup){
  popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEsc);
  document.addEventListener('click', closeOverlay);  
}

//Ф-я закрытия попавов
function popupClose(popup){
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEsc);
  document.removeEventListener('click', closeOverlay);  
}

//Закрытие по ESC
function closeEsc (evt){
  if (evt.key === 'Escape'){
    popupClose(document.querySelector('.popup_is-opened'));
  }
}

//Закрытие по клику на оверлей
function closeOverlay (evt){
  if (evt.target.classList.contains('popup')){
    popupClose(evt.target);
  }
}

export {popupOpen, popupClose}