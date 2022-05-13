var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');
var orderButtons = document.querySelectorAll('.order-button');
var orderModal = document.querySelector('.modal-container');
var modalClose = document.querySelector(".modal__close");

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});

orderButtons.forEach(function (button) {
  button.addEventListener('click', function() {
    orderModal.classList.remove('modal-container--closed');
  });
})

modalClose.addEventListener('click', function() {
  orderModal.classList.add('modal-container--closed');
});
