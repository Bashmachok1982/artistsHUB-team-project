import 'raty-js';

export function initFeedbackRaty() {
  const stars = document.querySelectorAll('.stars-rating-feedback');

  stars.forEach(el => {
    const rating = Number(el.dataset.rating);

    $(el).raty({
      score: rating,
      readOnly: true,
      half: false,
      starType: 'i',
    });
  });
}
