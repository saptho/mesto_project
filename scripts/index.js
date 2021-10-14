const modalWindow = document.querySelector('.popup'); //нохожу попап в DOM
const modalWindowCloseBtn = modalWindow.querySelector('.popup__button-close'); //нахожу кнопку закрытия попапа
const profileInfoSection = document.querySelector('.profile'); //нахожу секцию с профилем
const profileName = profileInfoSection.querySelector('.info__name');
const profileInfoAbout = profileInfoSection.querySelector('.info__about');
const editProfileInfoBtn = profileInfoSection.querySelector('.info__button-edit'); //нахожу кнопку редактирования инфы
const formProfile = modalWindow.querySelector('.form'); //нахожу форму
const formInputName = formProfile.querySelector('.form__input_value_name'); //нахожу поля
const formInputAbout = formProfile.querySelector('.form__input_value_about');
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
const cardTemplate = document.querySelector('#element-item-template').content;
const cardContainer = document.querySelector('.elements');
const cardAddBtn = profileInfoSection.querySelector('.profile__button-add');
//открытие формы
function openForm() {
  modalWindow.classList.add('popup_opened');
}
 //закрытие формы
function closeForm() {
  modalWindow.classList.remove('popup_opened');
}
//закрытие попапа при нажатии на область вокруг него
function onOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeForm();
  }
}
//заполнение полей значениями из страницы
function writeinInputs() {
  formInputName.value = profileName.textContent;
  formInputAbout.value = profileInfoAbout.textContent;
  openForm();
}
//сохранение инфы
function saveProfileInfo(evt) {
  evt.preventDefault();
  profileName.textContent = formInputName.value;
  profileInfoAbout.textContent = formInputAbout.value;
  closeForm();
}
//отображение карточек
const renderCard = (card) => {
  const cardItem = cardTemplate.cloneNode(true);
  const cardCaption = cardItem.querySelector('.element__title');
  const cardLink = cardItem.querySelector('.element__card');
  cardCaption.textContent = card.name;
  cardLink.src = card.link;
  //лайк карточки
  cardItem.querySelector('.element__button-like').addEventListener('click', (event) => {
    event.target.classList.toggle('element__button-like_active');
  });
  cardItem.querySelector('.element__button-delete').addEventListener('click', (event) => {
    event.target.closest('.element').remove();
  });
  cardContainer.append(cardItem);
};
initialCards.forEach(renderCard);
//слушатели событий
modalWindow.addEventListener('click', onOverlayClick);
modalWindowCloseBtn.addEventListener('click', closeForm);
formProfile.addEventListener ('submit', saveProfileInfo);
editProfileInfoBtn.addEventListener('click', writeinInputs);

