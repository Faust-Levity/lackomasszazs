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

function initVideoPlaceholder() {
  const placeholder = document.getElementById("video-placeholder");
  if (!placeholder) return;

  function loadVideo() {
    const iframe = document.createElement("iframe");
    iframe.width = "560";
    iframe.height = "315";
    iframe.src = placeholder.dataset.videoSrc;
    iframe.title = "YouTube video player";
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; web-share";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allowFullscreen = true;

    placeholder.replaceWith(iframe);
  }

  placeholder.addEventListener("click", loadVideo);
  placeholder.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      loadVideo();
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  showSlides();
  initVideoPlaceholder();
});
