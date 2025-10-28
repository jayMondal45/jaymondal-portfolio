// Custom Cursor
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");

// Only enable custom cursor on non-touch devices
if (!("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    cursor.classList.add("active");

    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px";
      cursorFollower.style.top = e.clientY + "px";
      cursorFollower.classList.add("active");
    }, 100);
  });

  // Add hover effects for desktop
  const interactiveElements = document.querySelectorAll(
    "a, button, .btn, .window-dot, .app-icon, .minimized-app-icon"
  );
  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1.2)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1)";
    });
  });
} else {
  // Hide custom cursor on touch devices
  cursor.style.display = "none";
  cursorFollower.style.display = "none";
}

// Theme Toggle
const themeButtons = document.querySelectorAll(".theme-btn");
const body = document.body;

// Set initial theme
const savedTheme = localStorage.getItem("theme") || "dark";
body.setAttribute("data-theme", savedTheme);
updateThemeButtons(savedTheme);

themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const theme = btn.getAttribute("data-theme");
    body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    updateThemeButtons(theme);
  });
});

function updateThemeButtons(theme) {
  themeButtons.forEach((btn) => {
    if (btn.getAttribute("data-theme") === theme) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

// Navigation
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    document.body.classList.remove("no-scroll");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!nav.contains(e.target) && navLinks.classList.contains("active")) {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }
});

// Nav scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }

  // Update active nav link
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });

  // Show/hide back to top button
  const backToTop = document.getElementById("backToTop");
  if (window.scrollY > 500) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Back to Top functionality
document.getElementById("backToTop").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(".skill-card, .project-card, .testimonial-card")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
  });

// MacBook Window Controls
const macbookWindow = document.getElementById("macbookWindow");
const closeWindow = document.getElementById("closeWindow");
const minimizeWindow = document.getElementById("minimizeWindow");
const maximizeWindow = document.getElementById("maximizeWindow");
const refreshWindow = document.getElementById("refreshWindow");
const appIcon = document.getElementById("appIcon");
const minimizedAppIcon = document.getElementById("minimizedAppIcon");

let isMinimized = false;
let isClosed = false;
let isMaximized = false;

// Close window functionality
closeWindow.addEventListener("click", () => {
  if (!isClosed) {
    macbookWindow.classList.add("closed");
    isClosed = true;

    // Show app icon after window closes
    setTimeout(() => {
      appIcon.classList.add("visible");
    }, 400);
  }
});

// Minimize window functionality
minimizeWindow.addEventListener("click", () => {
  if (!isMinimized) {
    macbookWindow.classList.add("minimized");
    isMinimized = true;

    // Show minimized app icon with white dot
    setTimeout(() => {
      minimizedAppIcon.classList.add("visible");
    }, 400);
  }
});

// Maximize window functionality
maximizeWindow.addEventListener("click", () => {
  if (!isMaximized) {
    macbookWindow.classList.add("maximized");
    isMaximized = true;
  } else {
    macbookWindow.classList.remove("maximized");
    isMaximized = false;
  }
});

// Refresh window functionality
refreshWindow.addEventListener("click", () => {
  macbookWindow.style.opacity = "0.7";
  setTimeout(() => {
    macbookWindow.style.opacity = "1";
  }, 300);
});

// Open window from app icon
appIcon.addEventListener("click", () => {
  appIcon.classList.remove("visible");
  setTimeout(() => {
    macbookWindow.classList.remove("closed");
    isClosed = false;
  }, 100);
});

// Open window from minimized app icon
minimizedAppIcon.addEventListener("click", () => {
  minimizedAppIcon.classList.remove("visible");
  setTimeout(() => {
    macbookWindow.classList.remove("minimized");
    isMinimized = false;
  }, 100);
});

// Testimonials Scroll Functionality
const testimonialsScroll = document.getElementById("testimonialsScroll");
const testimonialNavBtns = document.querySelectorAll(".testimonial-nav-btn");

testimonialNavBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const index = parseInt(btn.getAttribute("data-index"));

    // Update active button
    testimonialNavBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Scroll to the selected testimonial
    const cardWidth =
      document.querySelector(".testimonial-card").offsetWidth + 32; // width + gap
    testimonialsScroll.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
  });
});

// Auto-scroll testimonials
let testimonialIndex = 0;
const testimonialInterval = setInterval(() => {
  testimonialIndex = (testimonialIndex + 1) % testimonialNavBtns.length;

  // Update active button
  testimonialNavBtns.forEach((b) => b.classList.remove("active"));
  testimonialNavBtns[testimonialIndex].classList.add("active");

  // Scroll to the selected testimonial
  const cardWidth =
    document.querySelector(".testimonial-card").offsetWidth + 32; // width + gap
  testimonialsScroll.scrollTo({
    left: testimonialIndex * cardWidth,
    behavior: "smooth",
  });
}, 5000);

// Pause auto-scroll on hover
testimonialsScroll.addEventListener("mouseenter", () => {
  clearInterval(testimonialInterval);
});

testimonialsScroll.addEventListener("mouseleave", () => {
  testimonialIndex = (testimonialIndex + 1) % testimonialNavBtns.length;
});

// Contact Form Submission
const contactForm = document.getElementById("contactForm");
const sweetAlert = document.getElementById("sweetAlert");
const sweetAlertBtn = document.getElementById("sweetAlertBtn");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Show sweet alert
  sweetAlert.classList.add("active");

  // Reset form
  contactForm.reset();
});

// Close sweet alert
sweetAlertBtn.addEventListener("click", () => {
  sweetAlert.classList.remove("active");
});

// Close sweet alert when clicking outside
sweetAlert.addEventListener("click", (e) => {
  if (e.target === sweetAlert) {
    sweetAlert.classList.remove("active");
  }
});

// Create floating particles
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = window.innerWidth < 768 ? 20 : 30; // Fewer particles on mobile

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Random size between 2px and 6px
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;

    // Random animation delay
    particle.style.animationDelay = `${Math.random() * 15}s`;

    particlesContainer.appendChild(particle);
  }
}

// Initialize particles
createParticles();

// Handle window resize
window.addEventListener("resize", () => {
  // Reinitialize particles on resize
  const particlesContainer = document.getElementById("particles");
  particlesContainer.innerHTML = "";
  createParticles();

  // Close mobile menu if open when resizing to desktop
  if (window.innerWidth > 968 && navLinks.classList.contains("active")) {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }
});
