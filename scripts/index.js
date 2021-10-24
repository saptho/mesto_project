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
  document.addEventListener('keydown', closePopupbyEcs);
  document.addEventListener('click', closePopupbyOverlayClick);
}
//закрытие попап
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupbyEcs);
  document.removeEventListener('click', closePopupbyOverlayClick);
}
//закрытие попап по кнопке ESC
function closePopupbyEcs (evt) {
  if (evt.key === "Escape") {
      const popupOpened = document.querySelector('.popup_opened');
      closePopup(popupOpened);
  }
}
//закрытие попап по клику на оверлей
function closePopupbyOverlayClick (evt) {
  if (evt.target.classList.contains('popup')) {
      closePopup(evt.target);
  }
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
  const imageElement = popupImage.querySelector('.popup__image');
  const imageElementDescription = popupImage.querySelector('.popup__caption')
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
  //открытие изображения по клику
  cardLink.addEventListener('click', (event) => {
    //получили изображение из ресурса элемента на который тыкнули
    imageElement.src = event.target.src;
    imageElement.alt = event.target.alt;
    imageElementDescription.textContent = cardCaption.textContent;
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
  formCard.reset();
  openPopup(popupCardForm)
});
formCard.addEventListener('submit', createCard);
