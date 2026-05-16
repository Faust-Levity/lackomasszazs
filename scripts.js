let slideIndex = 0;

function showSlides() {
  const slides = document.getElementsByClassName("slide");
  if (slides.length === 0) return;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].style.display = "block";

  setTimeout(showSlides, 4000);
}

document.addEventListener("DOMContentLoaded", function () {
  showSlides();
});
