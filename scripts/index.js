const modalWindow = document.querySelector('.popup'); //нохожу попап в DOM
const modalWindowCloseBtn = modalWindow.querySelector('.popup__button-close'); //нахожу кнопку закрытия попапа
const profileInfoSection = document.querySelector('.profile'); //нахожу секцию с профилем
const profileName = profileInfoSection.querySelector('.info__name');
const profileInfoAbout = profileInfoSection.querySelector('.info__about');
const editProfileInfoBtn = profileInfoSection.querySelector('.info__button-edit'); //нахожу кнопку редактирования инфы
const formProfile = modalWindow.querySelector('.form'); //нахожу форму
const formInputName = formProfile.querySelector('.form__input_value_name'); //нахожу поля
const formInputAbout = formProfile.querySelector('.form__input_value_about');

//функция добавления модификатора класса
function toggleModalWindow() {
  modalWindow.classList.toggle('popup_opened')
  formInputName.value = profileName.textContent;
  formInputAbout.value = profileInfoAbout.textContent;
}
//при нажатии на кнопки класс добавляется/убирается
editProfileInfoBtn.addEventListener('click', toggleModalWindow);
modalWindowCloseBtn.addEventListener('click', toggleModalWindow);
//функция закрытия попапа при нажатии на область вокруг него
function onOverlayClick(event) {
  if (event.target === event.currentTarget) {
    toggleModalWindow();
  }
}

modalWindow.addEventListener('click', onOverlayClick)

function formSubmitHandler(evt) {
  evt.preventDefault();

  let profileNameNew = formFieldName.value;
  let profileInfoAboutNew = formFieldAbout.value;
  profileName.textContent = profileNameNew;
  profileInfoAbout.textContent = profileInfoAboutNew;
  toggleModalWindow();
}

formProfile.addEventListener ('submit', formSubmitHandler);
