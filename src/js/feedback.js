import { getData, url } from './feedback-api';
import { createMarkup } from './feedback-markup';
import { initFeedbackSwiper } from './feedback-swiper';
import { initFeedbackRaty } from './feedback-raty';

getData(url)
  .then(response => {
    const reviews = response.data;

    if (!reviews || reviews.length === 0) return;

    createMarkup(reviews);
    initFeedbackRaty();
    initFeedbackSwiper();
  })
  .catch(err => console.log(err));
