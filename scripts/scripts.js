let slideIndex = 0;

function loadAnalytics() {
  if (window.analyticsLoaded) return;
  window.analyticsLoaded = true;

  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-3ERDPHQFRP";
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag("js", new Date());
  gtag("config", "G-3ERDPHQFRP");

  document.getElementById("cookie-banner").style.display = "none";
}

function loadAnalyticsAfterInteraction() {
  const interactionEvents = ["click", "keydown", "scroll", "touchstart"];
  const startAnalytics = function () {
    interactionEvents.forEach(function (eventName) {
      window.removeEventListener(eventName, startAnalytics);
    });
    loadAnalytics();
  };

  interactionEvents.forEach(function (eventName) {
    window.addEventListener(eventName, startAnalytics, { once: true, passive: true });
  });
}

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

  const cookieBanner = document.getElementById("cookie-banner");
  const acceptCookiesButton = document.getElementById("accept-cookies");

  window.addEventListener("load", function () {
    if (localStorage.getItem("cookieConsent") === "true") {
      cookieBanner.style.display = "none";
      loadAnalyticsAfterInteraction();
    } else {
      cookieBanner.style.display = "block";
    }
  });

  acceptCookiesButton.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "true");
    loadAnalytics();
  });
});
