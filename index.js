const swiper = new Swiper('.swiper', {
  loop: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  spaceBetween: 30,
  navigation: {
    nextEl: '.swiper-button-next button',
    prevEl: '.swiper-button-prev button',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
