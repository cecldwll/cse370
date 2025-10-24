const wrapper = document.querySelector('.swiper-wrapper');
const slides = document.querySelectorAll('.swiper-slide');
const prevBtn = document.querySelector('.swiper-button-prev');
const nextBtn = document.querySelector('.swiper-button-next');

let isAnimating = false;
const slideWidth = slides[0].offsetWidth + 40; // includes gap

function updateCarousel(direction) {
  if (isAnimating) return; // prevent spamming
  isAnimating = true;

  const outgoing =
    direction === 'next' ? wrapper.firstElementChild : wrapper.lastElementChild;

  outgoing.classList.add('shrinking');

  wrapper.style.transition = 'transform 0.5s ease';
  wrapper.style.transform = `translateX(${direction === 'next' ? -slideWidth : slideWidth}px)`;

  setTimeout(() => {
    wrapper.style.transition = 'none';
    outgoing.classList.remove('shrinking');

    if (direction === 'next') {
      wrapper.appendChild(outgoing);
    } else {
      wrapper.insertBefore(outgoing, wrapper.firstElementChild);
    }

    wrapper.querySelectorAll('.swiper-slide').forEach(slide => slide.classList.remove('growing'));
    wrapper.children[direction === 'next' ? 1 : 0].classList.add('growing');

    wrapper.style.transform = 'translateX(0)';

    setTimeout(() => {
      wrapper.querySelectorAll('.swiper-slide').forEach(slide => slide.classList.remove('growing'));
      isAnimating = false;
    }, 300);
  }, 500);
}

nextBtn.addEventListener('click', () => updateCarousel('next'));
prevBtn.addEventListener('click', () => updateCarousel('prev'));

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') updateCarousel('next');
  if (e.key === 'ArrowLeft') updateCarousel('prev');
});
