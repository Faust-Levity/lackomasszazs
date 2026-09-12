let slideIndex = 0;

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

const hasConsent = localStorage.getItem("cookieConsent") === "true";

gtag("consent", "default", {
  analytics_storage: hasConsent ? "granted" : "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  wait_for_update: 500
});

function loadAnalytics() {
  if (window.analyticsLoaded) return;
  window.analyticsLoaded = true;

  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-3ERDPHQFRP";
  script.async = true;
  document.head.appendChild(script);

  gtag("js", new Date());
  gtag("config", "G-3ERDPHQFRP", {
    anonymize_ip: true
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

  loadAnalytics();

  const cookieBanner = document.getElementById("cookie-banner");
  const acceptCookiesButton = document.getElementById("accept-cookies");

  if (cookieBanner) {
    cookieBanner.style.display = hasConsent ? "none" : "block";
  }

  if (acceptCookiesButton) {
    acceptCookiesButton.addEventListener("click", function () {
      localStorage.setItem("cookieConsent", "true");
      
      gtag("consent", "update", {
        analytics_storage: "granted"
      });

      if (cookieBanner) {
        cookieBanner.style.display = "none";
      }
    });
  }
});