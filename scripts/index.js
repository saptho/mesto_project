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
//секцию с профилем
const profileInfoSection = document.querySelector('.profile');
const profileName = profileInfoSection.querySelector('.info__name');
const profileInfoAbout = profileInfoSection.querySelector('.info__about');
const editProfileInfoBtn = profileInfoSection.querySelector('.info__button-edit');
const cardAddBtn = profileInfoSection.querySelector('.profile__button-add');
//форма редактирования профиля
const formProfile = document.querySelector('.form_subject_profile');
const formInputName = formProfile.querySelector('.form__input_value_name');
const formInputAbout = formProfile.querySelector('.form__input_value_about');
//форма добавления карточки
const formCard = document.querySelector('.form_subject_card');
const formInputPlace = formCard.querySelector('.form__input_value_place');
const formInputLink = formCard.querySelector('.form__input_value_link');
//шаблон
const cardTemplate = document.querySelector('#element-item-template').content;
const cardContainer = document.querySelector('.elements');
//попапы редактирования профиля и добавления карточки
const popupCardForm = document.querySelector('.popup_subject_card');
const popupCardCloseBtn = document.querySelector('.popup__button-close_subject_card');
const popupProfileForm = document.querySelector('.popup_subject_profile');
const popupProfileCloseBtn = document.querySelector('.popup__button-close_subject_profile');
const popupImage = document.querySelector('.popup_subject_image');
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
//добавление карточки
function addNewCard(evt) {
  evt.preventDefault();
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.element__card').src = formInputLink.value;
  cardElement.querySelector('.element__title').textContent = formInputPlace.value;
  cardContainer.prepend(cardElement);
  closePopup(popupCardForm);
}
//отображение карточек
const renderCard = (card) => {
  const cardItem = cardTemplate.cloneNode(true);
  const cardCaption = cardItem.querySelector('.element__title');
  const cardLink = cardItem.querySelector('.element__card');
  cardCaption.textContent = card.name;
  cardLink.src = card.link;
  cardLink.alt = 'Картинка ' + card.name;
  //лайк карточки
  cardItem.querySelector('.element__button-like').addEventListener('click', (event) => {
    event.target.classList.toggle('element__button-like_active');
  });
  //удаление карточки
  cardItem.querySelector('.element__button-delete').addEventListener('click', (event) => {
    event.target.closest('.element').remove();
  });
  cardContainer.append(cardItem);
  //открытие изображения
  cardLink.addEventListener('click', (event) => {
    //получили изображение из ресурса элемента на который тыкнули
    popupImage.querySelector('.popup__image').src = event.target.src;
    popupImage.querySelector('.popup__image').alt = event.target.alt;
    popupImage.querySelector('.popup__caption').textContent = cardCaption.textContent;
    openPopup(popupImage);
    popupImage.querySelector('.popup__button-close_subject_image').addEventListener('click', () => {
      closePopup(popupImage)
    });
  });
};
initialCards.forEach(renderCard);
//слушатели событий
popupCardCloseBtn.addEventListener('click', () => {
  closePopup(popupCardForm)
});
popupProfileCloseBtn.addEventListener('click', () => {
  closePopup(popupProfileForm)
});
formProfile.addEventListener ('submit', saveProfileInfo);
formCard.addEventListener('submit', addNewCard);
editProfileInfoBtn.addEventListener('click', writeinInputs);
cardAddBtn.addEventListener('click', () => {
  openPopup(popupCardForm)
});
