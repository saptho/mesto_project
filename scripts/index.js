const modalWindow = document.querySelector('.popup'); //нохожу попап в DOM
const modalWindowCloseBtn = modalWindow.querySelector('.popup__button-close'); //нахожу кнопку закрытия попапа
const profileInfoSection = document.querySelector('.profile'); //нахожу секцию с профилем
const profileName = profileInfoSection.querySelector('.info__name');
const profileInfoAbout = profileInfoSection.querySelector('.info__about');
const editProfileInfoBtn = profileInfoSection.querySelector('.info__button-edit'); //нахожу кнопку редактирования инфы
const formProfile = modalWindow.querySelector('.form'); //нахожу форму
const formInputName = formProfile.querySelector('.form__input_value_name'); //нахожу поля
const formInputAbout = formProfile.querySelector('.form__input_value_about');
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
//сохранение инфы
function saveProfileInfo(evt) {
  evt.preventDefault();
  profileName.textContent = formInputName.value;
  profileInfoAbout.textContent = formInputAbout.value;
  closeForm();
}
//слушатели событий
modalWindow.addEventListener('click', onOverlayClick);
modalWindowCloseBtn.addEventListener('click', closeForm);
formProfile.addEventListener ('submit', saveProfileInfo);
//тут я нагуглила стрелочную функцию
editProfileInfoBtn.addEventListener('click', () => {
  formInputName.value = profileName.textContent;
  formInputAbout.value = profileInfoAbout.textContent;
  openForm();
})
