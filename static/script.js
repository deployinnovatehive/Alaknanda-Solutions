// Simple contact form handler
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Thank you for contacting Alaknanda Solutions! We'll get back to you soon.");
    this.reset();
  });
}

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Animation on scroll
function animateOnScroll(selector) {
  const elements = document.querySelectorAll(selector);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => {
    el.style.animationPlayState = "paused";
    observer.observe(el);
  });
}

animateOnScroll(".hero-text h1, .hero-text p, .primary-btn");
animateOnScroll(".hero-img img");
animateOnScroll(".about-card");
animateOnScroll(".card");
animateOnScroll(".service-card");

// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", function() {
    const nav = document.querySelector(".navbar nav");
    if (nav) {
      nav.classList.toggle("active");
    }
  });
}

// Close mobile menu when clicking a link
document.querySelectorAll(".navbar nav a").forEach(link => {
  link.addEventListener("click", function() {
    const nav = document.querySelector(".navbar nav");
    if (nav) {
      nav.classList.remove("active");
    }
  });
});

// Auto-sliding carousel for Mission & Vision on mobile
function initMissionVisionCarousel() {
  const cardsContainer = document.querySelector('.cards');
  if (!cardsContainer) return;

  const cards = cardsContainer.querySelectorAll('.card');
  if (cards.length < 2) return;

  // Only run carousel on mobile (when cards are horizontally scrollable)
  const containerStyle = getComputedStyle(cardsContainer);
  if (containerStyle.overflowX !== 'auto') return;

  let currentIndex = 0;
  const cardWidth = 280 + 16; // card width + gap

  function slideTo(index) {
    const scrollLeft = index * cardWidth;
    cardsContainer.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
    currentIndex = index;
  }

  function nextSlide() {
    const nextIndex = (currentIndex + 1) % cards.length;
    slideTo(nextIndex);
  }

  // Auto slide every 5 seconds
  setInterval(nextSlide, 5000);

  // Enhanced touch/swipe support with snap points
  let startX = 0;
  let scrollLeft = 0;
  let isDragging = false;

  cardsContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - cardsContainer.offsetLeft;
    scrollLeft = cardsContainer.scrollLeft;
    isDragging = true;
  });

  cardsContainer.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - cardsContainer.offsetLeft;
    const walk = (x - startX) * 2;
    cardsContainer.scrollLeft = scrollLeft - walk;
  });

  cardsContainer.addEventListener('touchend', () => {
    isDragging = false;
    // Snap to nearest card after swipe
    const cardWidth = 280 + 16; // card width + gap
    const currentScroll = cardsContainer.scrollLeft;
    const nearestIndex = Math.round(currentScroll / cardWidth);
    const snapPosition = nearestIndex * cardWidth;

    cardsContainer.scrollTo({
      left: snapPosition,
      behavior: 'smooth'
    });

    currentIndex = nearestIndex % cards.length;
  });

  // Prevent default touch behavior on cards
  cards.forEach(card => {
    card.addEventListener('touchstart', (e) => {
      e.stopPropagation();
    });
  });
}

// Initialize carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initMissionVisionCarousel();
});