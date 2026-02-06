import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function initFeedbackSwiper() {
  return new Swiper('.feedback-swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: false,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    pagination: {
      el: '.feedback-pagination',
      clickable: true,
      renderBullet(index, className) {
        if (index === 0) {
          return `<span class="${className} pagination-start"></span>`;
        }
        if (index === 9) {
          return `<span class="${className} pagination-end"></span>`;
        }
        return `<span class="${className} pagination-middle"></span>`;
      },
    },
  });
}
