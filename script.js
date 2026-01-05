const spaceBackground = document.getElementById("spaceBackground");
let stars = [];
let meteors = [];
let asteroids = [];
let galaxies = [];

function createStars() {
  for (let i = 0; i < 250; i++) {
    const star = document.createElement("div");
    star.className = "star";

    const x = Math.random() * 100;
    const y = Math.random() * 100;

    const size = Math.random() * 3 + 1;
    const brightness = Math.random() * 0.8 + 0.2;
    const twinkleSpeed = Math.random() * 5 + 3;

    star.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            background-color: white;
            border-radius: 50%;
            opacity: ${brightness};
            box-shadow: 0 0 ${size * 2}px white;
            animation: twinkle ${twinkleSpeed}s infinite alternate;
        `;

    spaceBackground.appendChild(star);
    stars.push(star);
  }

  const style = document.createElement("style");
  style.textContent = `
        @keyframes twinkle {
            0% { opacity: 0.2; transform: scale(1); }
            100% { opacity: 1; transform: scale(1.1); }
        }
        
        @keyframes shootingStar {
            0% { 
                opacity: 0;
                transform: translateX(-100px) translateY(-100px) rotate(45deg);
            }
            10% { opacity: 1; }
            100% { 
                opacity: 0;
                transform: translateX(2000px) translateY(2000px) rotate(45deg);
            }
        }
        
@keyframes meteor {
    0% {
        opacity: 0;
        transform: translate(-200px, -200px) rotate(35deg);
    }
    10% { opacity: 1; }
    100% {
        opacity: 0;
        transform: translate(1600px, 1600px) rotate(35deg);
    }
}

        
        @keyframes asteroid {
            0% { 
                opacity: 0;
                transform: translateX(-200px) translateY(100px) rotate(0deg);
            }
            10% { opacity: 1; }
            100% { 
                opacity: 0;
                transform: translateX(2000px) translateY(100px) rotate(360deg);
            }
        }
        
        @keyframes galaxyPulse {
            0%, 100% { opacity: 0.1; transform: scale(1); }
            50% { opacity: 0.2; transform: scale(1.05); }
        }
    `;
  document.head.appendChild(style);
}

function createShootingStar() {
  if (Math.random() > 0.9) {
    const shootingStar = document.createElement("div");
    const x = Math.random() * 50;
    const y = Math.random() * 50;

    shootingStar.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: 100px;
            height: 2px;
            background: linear-gradient(90deg, transparent, white);
            border-radius: 1px;
            box-shadow: 0 0 20px white;
            animation: shootingStar 2s linear forwards;
            z-index: 1;
        `;

    spaceBackground.appendChild(shootingStar);
    meteors.push(shootingStar);

    setTimeout(() => {
      shootingStar.remove();
      meteors = meteors.filter((m) => m !== shootingStar);
    }, 2000);
  }
}

function createMeteor() {
  if (Math.random() > 0.997) return;

  const meteor = document.createElement("div");
  const size = Math.random() * 12 + 10;

  const startX = Math.random() * window.innerWidth;
  const startY = Math.random() * window.innerHeight;
  const angle = Math.random() * 360;
  const distance = 1600;
  const duration = Math.random() * 1.5 + 2;
  const rotate = Math.random() * 360;

  meteor.style.cssText = `
    position: absolute;
    left: ${startX}px;
    top: ${startY}px;
    width: ${size}px;
    height: ${size}px;
    background: radial-gradient(circle at 30% 30%, #cfcfcf, #7a7a7a 45%, #2b2b2b 75%);
    border-radius: 45% 60% 50% 55%;
    clip-path: polygon(12% 6%, 35% 0%, 68% 10%, 92% 38%, 82% 72%, 58% 94%, 22% 88%, 4% 52%);
    box-shadow: inset -4px -4px 6px rgba(0,0,0,.4), inset 4px 4px 6px rgba(255,255,255,.15), 0 0 12px rgba(255,140,60,.3);
    animation: meteorRock ${duration}s linear forwards;
    transform: rotate(${rotate}deg);
    z-index: 2;
    pointer-events: none;
  `;

  meteor.style.setProperty(
    "--dx",
    `${Math.cos((angle * Math.PI) / 180) * distance}px`
  );
  meteor.style.setProperty(
    "--dy",
    `${Math.sin((angle * Math.PI) / 180) * distance}px`
  );
  meteor.style.setProperty("--rotate", `${rotate}deg`);

  const tail = document.createElement("div");
  tail.style.cssText = `
    position: absolute;
    right: 100%;
    top: 50%;
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, transparent, rgba(255,180,100,.8), rgba(255,80,0,.9));
    filter: blur(2px);
    transform: translateY(-50%);
  `;

  meteor.appendChild(tail);
  spaceBackground.appendChild(meteor);

  setTimeout(() => meteor.remove(), duration * 1000);
}

function createAsteroid() {
  if (Math.random() > 0.7) {
    const asteroid = document.createElement("div");
    const x = -50;
    const y = Math.random() * 100;
    const size = Math.random() * 15 + 10;
    const speed = Math.random() * 15 + 10;

    asteroid.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}%;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle at 30% 30%, #555, #222 70%, #111);
      border-radius: 50%; /* bulat */
      box-shadow:
        inset -2px -2px 2px rgba(0,0,0,0.6),
        inset 2px 2px 3px rgba(255,255,255,0.05),
        -1px -1px 1px rgba(0,0,0,0.4),
        1px 1px 2px rgba(255,255,255,0.1);
      animation: asteroid ${speed}s linear forwards;
      z-index: 1;
    `;

    for (let i = 0; i < Math.floor(Math.random() * 3 + 2); i++) {
      const bump = document.createElement("div");
      const bumpSize = Math.random() * size * 0.3;
      bump.style.cssText = `
        position: absolute;
        left: ${Math.random() * (size - bumpSize)}px;
        top: ${Math.random() * (size - bumpSize)}px;
        width: ${bumpSize}px;
        height: ${bumpSize}px;
        background: #333;
        border-radius: 50%;
        box-shadow: inset -1px -1px 1px rgba(0,0,0,0.5);
      `;
      asteroid.appendChild(bump);
    }

    spaceBackground.appendChild(asteroid);
    asteroids.push(asteroid);

    setTimeout(() => {
      asteroid.remove();
      asteroids = asteroids.filter((a) => a !== asteroid);
    }, speed * 1000);
  }
}

function createGalaxy() {
  if (galaxies.length >= 2) return;

  const galaxy = document.createElement("div");
  const size = Math.random() * 300 + 200;

  galaxy.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle,
            rgba(120,150,255,0.15),
            rgba(120,150,255,0.05),
            transparent 70%);
        border-radius: 50%;
        filter: blur(${window.innerWidth < 768 ? size / 5 : size / 3}px);
        animation: galaxyPulse 20s ease-in-out infinite;
        z-index: 0;
        pointer-events: none;
    `;

  spaceBackground.appendChild(galaxy);
  galaxies.push(galaxy);
}

function initSpaceEffects() {
  createStars();

  for (let i = 0; i < 3; i++) {
    setTimeout(createGalaxy, i * 1000);
  }

  const isMobile = window.innerWidth < 768;

  setInterval(createShootingStar, isMobile ? 900 : 400);
  setInterval(createMeteor, isMobile ? 1600 : 700);
  setInterval(createAsteroid, isMobile ? 2400 : 1200);
}

const header = document.getElementById("header");
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

const fadeElements = document.querySelectorAll(".fade-in");

const fadeInOnScroll = function () {
  fadeElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("visible");
    }
  });
};

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs
    .sendForm("service_07", "template_xw8io53", this)
    .then(() => {
      alert("Pesan berhasil dikirim 🚀 Terima kasih sudah menghubungi saya.");
      contactForm.reset();
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      alert("Gagal mengirim pesan. Silakan coba lagi.");
    });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

window.addEventListener("load", function () {
  initSpaceEffects();

  fadeInOnScroll();

  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        fadeInOnScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
});

window.addEventListener("resize", function () {
  stars.forEach((star) => star.remove());
  stars = [];
  createStars();
});

document.addEventListener("click", (e) => {
  if (!langDropdown.contains(e.target)) {
    langDropdown.classList.remove("open");
  }
});

const texts = ["Web Designer", "UI Engineer", "Front-End Developer"];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingSpeed = 90;
const deletingSpeed = 50;
const delayAfterType = 1500;

const typingElement = document.getElementById("typing-text");

function typeEffect() {
  const currentText = texts[textIndex];

  if (!isDeleting) {
    typingElement.textContent = currentText.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentText.length) {
      setTimeout(() => (isDeleting = true), delayAfterType);
    }
  } else {
    typingElement.textContent = currentText.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
}

typeEffect();
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".skill-tab");
  const categories = document.querySelectorAll(".skill-category");
  const section = document.querySelector("#focus-skills");

  let current = "ui-ux";
  let started = false;
  const DURATION = 1600;

  function reset(cat) {
    cat.querySelectorAll(".skill-progress").forEach((bar) => {
      bar.style.width = "0%";
    });
    cat.querySelectorAll(".skill-percentage").forEach((p) => {
      p.textContent = "0%";
    });
  }

  function animate(cat) {
    cat.querySelectorAll(".skill-detail-item").forEach((item, i) => {
      const bar = item.querySelector(".skill-progress");
      const percent = item.querySelector(".skill-percentage");
      const target = Number(percent.dataset.percent);

      let startTime = null;

      function run(time) {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / DURATION, 1);
        const value = Math.round(progress * target);

        bar.style.width = value + "%";
        percent.textContent = value + "%";

        if (progress < 1) requestAnimationFrame(run);
      }

      setTimeout(() => {
        requestAnimationFrame(run);
      }, i * 200);
    });
  }

  function show(id) {
    current = id;

    tabs.forEach((t) => t.classList.remove("active"));
    categories.forEach((c) => {
      c.classList.remove("active");
      c.style.display = "none";
    });

    const tab = document.querySelector(`[data-category="${id}"]`);
    const cat = document.getElementById(id);

    tab.classList.add("active");
    cat.style.display = "block";

    reset(cat);
    cat.offsetHeight;

    cat.classList.add("active");
    animate(cat);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      show(tab.dataset.category);
    });
  });

  document.getElementById("ui-ux").style.display = "block";
});

document.addEventListener("DOMContentLoaded", function () {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const filter = this.getAttribute("data-filter");

      portfolioItems.forEach((item) => {
        const category = item.getAttribute("data-category").split(" ");

        if (filter === "all" || category.includes(filter)) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }, 10);
        } else {
          item.style.opacity = "0";
          item.style.transform = "translateY(20px)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });

  const viewBtns = document.querySelectorAll(".portfolio-view-btn");
  const loadingOverlay = document.getElementById("spaceLoading");
  const loadingProgress = document.getElementById("spaceLoadingProgress");
  const loadingPercentage = document.getElementById("loadingPercentage");
  const loadingMessage = document.getElementById("loadingMessage");
  const loadingCancelBtn = document.getElementById("loadingCancelBtn");

  const projectURLs = {
    "moodai-tracker": "#",
    "nulief-property":
      "https://mohroghilaffanramadani.github.io/nulief-property/",
    "renta-x": "https://mohroghilaffanramadani.github.io/renta-x/",
  };

  let loadingInterval;
  let currentProgress = 0;
  let targetUrl = "#";

  function startLoadingAnimation(url) {
    currentProgress = 0;
    targetUrl = url;
    loadingProgress.style.width = "0%";
    loadingPercentage.textContent = "0%";

    loadingOverlay.classList.add("active");
    document.body.style.overflow = "hidden";

    createLoadingStars();

    const messages = [
      "Initializing cosmic connection...",
      "Warp drive charging...",
      "Orbiting target planet...",
      "Establishing data link...",
      "Downloading project files...",
      "Rendering space interface...",
      "Almost there...",
    ];

    let messageIndex = 0;
    loadingMessage.textContent = messages[0];

    clearInterval(loadingInterval);
    loadingInterval = setInterval(() => {
      currentProgress += Math.random() * 3 + 1;
      if (currentProgress > 100) currentProgress = 100;

      loadingProgress.style.width = currentProgress + "%";
      loadingPercentage.textContent = Math.floor(currentProgress) + "%";

      if (
        currentProgress > messageIndex * 15 &&
        messageIndex < messages.length - 1
      ) {
        messageIndex++;
        loadingMessage.textContent = messages[messageIndex];
      }

      if (currentProgress >= 100) {
        clearInterval(loadingInterval);
        loadingMessage.textContent = "Launch sequence complete!";

        setTimeout(() => {
          if (targetUrl && targetUrl !== "#") {
            window.open(targetUrl, "_blank");
          }
          hideLoading();
        }, 800);
      }
    }, 50);
  }

  function hideLoading() {
    loadingOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
    clearInterval(loadingInterval);
    currentProgress = 0;
    targetUrl = "#";
  }

  viewBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      if (this.tagName === "A") {
        e.preventDefault();
        const url = this.getAttribute("href");
        startLoadingAnimation(url);
      } else {
        const projectId = this.getAttribute("data-project");
        const url = projectURLs[projectId] || "#";
        startLoadingAnimation(url);
      }
    });
  });

  loadingCancelBtn.addEventListener("click", hideLoading);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && loadingOverlay.classList.contains("active")) {
      hideLoading();
    }
  });

  function createLoadingStars() {
    const starsContainer = document.querySelector(".loading-stars");
    if (!starsContainer) return;

    starsContainer.innerHTML = "";

    for (let i = 0; i < 100; i++) {
      const star = document.createElement("div");
      star.className = "star";

      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const size = 1 + Math.random();
      const opacity = 0.2 + Math.random() * 0.3;
      const delay = Math.random() * 5;

      star.style.cssText = `
      left: ${left}%;
      top: ${top}%;
      width: ${size}px;
      height: ${size}px;
      opacity: ${opacity};
      animation-delay: ${delay}s;
    `;

      starsContainer.appendChild(star);
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
  const navOverlay = document.getElementById("navOverlay");
  const mobileNavDropdowns = document.querySelectorAll(".mobile-nav-dropdown");

  console.log("Mobile menu button:", mobileMenuBtn);
  console.log("Mobile menu overlay:", mobileMenuOverlay);
  console.log("Mobile nav dropdowns:", mobileNavDropdowns);

  if (!mobileMenuBtn) {
    console.error("Mobile menu button not found!");
    return;
  }
  if (!mobileMenuOverlay) {
    console.error("Mobile menu overlay not found!");
    return;
  }

  function openMobileMenu() {
    mobileMenuOverlay.classList.add("active");
    if (navOverlay) navOverlay.classList.add("active");
    mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
  }

  function closeMobileMenu() {
    mobileMenuOverlay.classList.remove("active");
    if (navOverlay) navOverlay.classList.remove("active");
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';

    mobileNavDropdowns.forEach((dropdown) =>
      dropdown.classList.remove("active")
    );
  }

  mobileMenuBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (mobileMenuOverlay.classList.contains("active")) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
    console.log(
      "Overlay toggled:",
      mobileMenuOverlay.classList.contains("active")
    );
  });

  mobileNavDropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(".mobile-dropdown-trigger");
    console.log("Trigger found:", trigger);
    if (trigger) {
      trigger.addEventListener("click", function (e) {
        e.stopPropagation();
        dropdown.classList.toggle("active");
        console.log("Dropdown toggled:", dropdown.classList.contains("active"));
      });
    }
  });

  document.addEventListener("click", function (e) {
    if (
      !mobileMenuOverlay.contains(e.target) &&
      !mobileMenuBtn.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });

  document.querySelectorAll(".mobile-nav-links a").forEach((link) => {
    link.addEventListener("click", function () {
      closeMobileMenu();
    });
  });

  document.querySelectorAll(".mobile-dropdown-menu a").forEach((link) => {
    link.addEventListener("click", function () {
      closeMobileMenu();
    });
  });

  mobileMenuOverlay.addEventListener("click", (e) => {
    if (e.target === mobileMenuOverlay) {
      closeMobileMenu();
    }
  });
});
