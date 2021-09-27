const modalWindow = document.querySelector('.popup'); //нохожу попап в DOM
const modalWindowCloseBtn = modalWindow.querySelector('.popup__button-close'); //нахожу кнопку закрытия попапа
const profileInfoSection = document.querySelector('.profile'); //нахожу секцию с профилем
const profileName = profileInfoSection.querySelector('.name');
const profileInfoAbout = profileInfoSection.querySelector('.info__about');
const editProfileInfoBtn = profileInfoSection.querySelector('.info__button-edit'); //нахожу кнопку редактирования инфы
const formProfile = modalWindow.querySelector('.popup__content'); //нахожу форму
const formFieldName = formProfile.querySelector('.popup__field-name'); //нахожу поля
const formFieldAbout = formProfile.querySelector('.popup__field-about');

//функция добавления модификатора класса
function toggleModalWindow() {
  modalWindow.classList.toggle('popup_opened')
  formFieldName.value = profileName.textContent;
  formFieldAbout.value = profileInfoAbout.textContent;
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
  profileName.textContent = formFieldName.value;
  profileInfoAbout.textContent = formFieldAbout.value;
}

formProfile.addEventListener ('submit', formSubmitHandler);
