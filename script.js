const presentation = document.getElementById('presentation');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progress');

let currentSlideIndex = 0;

function updatePresentation() {
  // Update slides visibility
  slides.forEach((slide, index) => {
    if (index === currentSlideIndex) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });

  // Calculate transformation with slide width
  const translateX = -(currentSlideIndex * 100);
  presentation.style.transform = `translateX(${translateX}vw)`;

  // Update progress bar
  const progressPercent = ((currentSlideIndex + 1) / slides.length) * 100;
  progressBar.style.width = `${progressPercent}%`;

  // Update button visibility
  prevBtn.style.opacity = currentSlideIndex === 0 ? '0.3' : '1';
  prevBtn.style.cursor = currentSlideIndex === 0 ? 'default' : 'pointer';
  nextBtn.style.opacity = currentSlideIndex === slides.length - 1 ? '0.3' : '1';
  nextBtn.style.cursor = currentSlideIndex === slides.length - 1 ? 'default' : 'pointer';
}

function nextSlide() {
  if (currentSlideIndex < slides.length - 1) {
    currentSlideIndex++;
    updatePresentation();
  }
}

function prevSlide() {
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
    updatePresentation();
  }
}

// Event Listeners
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Optimized for Targus and common presenters
window.addEventListener('keydown', (e) => {
  // Debug log to help identify the key sent by the Targus clicker
  console.log('Key pressed:', e.key, 'Code:', e.code);

  const nextKeys = ['ArrowRight', 'ArrowDown', ' ', 'Enter', 'PageDown', 'Next', 'n', 'N'];
  const prevKeys = ['ArrowLeft', 'ArrowUp', 'PageUp', 'Previous', 'p', 'P', 'Backspace'];

  if (nextKeys.includes(e.key) || nextKeys.includes(e.code)) {
    nextSlide();
  } else if (prevKeys.includes(e.key) || prevKeys.includes(e.code)) {
    prevSlide();
  }
});

// Ensure the window has focus to capture key events from the start
window.focus();

// Initialize
updatePresentation();
console.log('Presentation initialized with', slides.length, 'slides.');
