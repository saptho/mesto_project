const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
//секция с профилем
const profileInfoSection = document.querySelector('.profile');
const profileName = profileInfoSection.querySelector('.info__name');
const profileInfoAbout = profileInfoSection.querySelector('.info__about');
const editProfileInfoBtn = profileInfoSection.querySelector('.info__button-edit');
const cardAddBtn = profileInfoSection.querySelector('.profile__button-add');
//форма редактирования профиля
const formProfile = document.forms.edit_profile_form;
const formInputName = formProfile.elements.user;
const formInputAbout = formProfile.elements.about;
//форма добавления карточки
const formCard = document.forms.add_card_form;
const formInputPlace = formCard.elements.place;
const formInputLink = formCard.elements.link;
//шаблон
const cardTemplate = document.querySelector('#element-item-template').content;
const cardContainer = document.querySelector('.elements');
//попапы редактирования профиля и добавления карточки
const popupCardForm = document.querySelector('.popup_subject_card');
const popupProfileForm = document.querySelector('.popup_subject_profile');
const popupImage = document.querySelector('.popup_subject_image');
const closeBtns = document.querySelectorAll('.popup__button-close')
//открытие попап
function openPopup (popup) {
  popup.classList.add('popup_opened');
}
//закрытие попап
function closePopup (popup) {
  popup.classList.remove('popup_opened');
}
//заполнение полей значениями из страницы
function writeinInputs() {
  formInputName.value = profileName.textContent;
  formInputAbout.value = profileInfoAbout.textContent;
  openPopup(popupProfileForm);
}
//сохранение инфы
function saveProfileInfo(evt) {
  evt.preventDefault();
  profileName.textContent = formInputName.value;
  profileInfoAbout.textContent = formInputAbout.value;
  closePopup(popupProfileForm);
}
//создание новой карточки
function createCard(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardCaption = cardElement.querySelector('.element__title');
  const cardLink = cardElement.querySelector('.element__card');
  cardCaption.textContent = name;
  cardLink.src = link;
  cardLink.alt = 'Картинка ' + name;
  //лайк карточки
  cardElement.querySelector('.element__button-like').addEventListener('click', (event) => {
    event.target.classList.toggle('element__button-like_active');
  });
  //удаление карточки
  cardElement.querySelector('.element__button-delete').addEventListener('click', (event) => {
    event.target.closest('.element').remove();
  });
  cardLink.addEventListener('click', (event) => {
    //получили изображение из ресурса элемента на который тыкнули
    popupImage.querySelector('.popup__image').src = event.target.src;
    popupImage.querySelector('.popup__image').alt = event.target.alt;
    popupImage.querySelector('.popup__caption').textContent = cardCaption.textContent;
    openPopup(popupImage);
  });
  return cardElement;
}
//добавление карточек
function renderCard(container, cardItem) {
  container.prepend(cardItem);
}
//добавление данных для карточки
function addDataCard(evt) {
  evt.preventDefault();
  renderCard(cardContainer, createCard(formInputPlace.value, formInputLink.value));
  formCard.reset();
  closePopup(popupCardForm);
}
//отображение карточек
initialCards.map(card => {
  renderCard(cardContainer, createCard(card.name, card.link));
});
//добавление класса с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_value_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
}
//удаление класса с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_value_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
}
//валидация поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}
//проверка полей на наличие невалидных полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
//включение/отключение кнопки submit
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit_disabled');
  } else {
    buttonElement.classList.remove('popup__submit_disabled');
  }
}
//назначение слушателя полю
const setEventListener = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  console.log(inputList);
  const buttonElement = formElement.querySelector('.popup__submit');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}
//включение валидации для формы
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListener(formElement);
  });
}

//слушатели событий
//слушатель на крестики
closeBtns.forEach((item) => {
  item.addEventListener('click', () => {
    closePopup(item.closest('.popup'))
  });
});
formProfile.addEventListener ('submit', saveProfileInfo);
formCard.addEventListener('submit', addDataCard);
editProfileInfoBtn.addEventListener('click', writeinInputs);
cardAddBtn.addEventListener('click', () => {
  openPopup(popupCardForm)
});
formCard.addEventListener('submit', createCard);
enableValidation();
