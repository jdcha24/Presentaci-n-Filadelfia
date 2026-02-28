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

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
    nextSlide();
  } else if (e.key === 'ArrowLeft') {
    prevSlide();
  }
});

// Initialize
updatePresentation();
console.log('Presentation initialized with', slides.length, 'slides.');
