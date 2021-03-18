"use strict";

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

if (isMobile.any()) {
   document.body.classList.add("_touch");

   let menuArrows = document.querySelectorAll(".menu__arrow");

   menuArrows.forEach((arrow) => {
      arrow.addEventListener("click", () => {
         arrow.parentElement.classList.toggle("_active");
      });
   });
} else {
   document.body.classList.add("_pc");
}

//Прокрутка при клике
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');

if (menuLinks.length > 0) {
   menuLinks.forEach((link) => {
      link.addEventListener("click", onMenuLinkClick);
   })
   
   function onMenuLinkClick(e) {
      const menuLink = e.target;
      console.log()
      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) { //Проверка существует ли объект по которому кликаем
         const gotoBlock = document.querySelector(menuLink.dataset.goto);
         const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight; //Высчитываем расстояние от верха с учетом шапки
   
         if (iconMenu.classList.contains('_active')) {
            document.body.classList.remove('_lock');
            iconMenu.classList.remove('_active');
            menuBody.classList.remove('_active');
         }

         //Прокрутка при клике
         window.scrollTo({
            top: gotoBlockValue,
            behavior: 'smooth'
         })
   
         //Сброс стандартных настроек ссылки, чтобы не мешала прокрутке
         e.preventDefault();
      }
   }
}
 

//Меню бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');

if (iconMenu) {
   iconMenu.addEventListener('click', () => {
      document.body.classList.toggle('_lock');
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
   })
}

