function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", () => {
  // ======================
  // LISTA DE JUEGOS
  // ======================
  const games = [
    { title: "Minecraft", price: "$7000", img: "img/minecraftfoto.webp", file: "minecraft.html" },
    { title: "Valorant", price: "$5000", img: "img/valorantfoto.jpg", file: "valorant.html" },
    { title: "Far Cry 5", price: "$9500", img: "img/farcryfoto.jpg", file: "far cry.html" },
    { title: "Assassin's Creed", price: "$12000", img: "img/assasincreadfoto.jpg", file: "assasin creed.html" },
    { title: "Vampire Survivors", price: "$8500", img: "img/vampiresfoto.jpg", file: "vampire survive.html" },
    { title: "The Binding of Isaac", price: "$800", img: "img/isaacfoto.jpg", file: "isacc.html" },
    { title: "The Walking Dead", price: "$3500", img: "img/walkingdeadfoto.jpg", file: "walkingdead.html" },
    { title: "PUBG", price: "Gratis", img: "img/pubgfoto.jpg", file: "pubg.html" }
  ];

  // ======================
  // CARRUSEL DE JUEGOS
  // ======================
  const gameCarousel = document.querySelector(".game-carousel");
  if (gameCarousel) {
    gameCarousel.innerHTML = "";

    games.forEach(g => {
      const card = document.createElement("div");
      card.classList.add("game-card");

      card.innerHTML = `
        <img src="${g.img}" alt="${g.title}">
        <h3>${g.title}</h3>
        <p>${g.price}</p>
        <a href="./${g.file}" class="btn" target="_self" rel="noopener">Comprar</a>
      `;

      gameCarousel.appendChild(card);
    });
  }

  // ======================
  // BOTONES SCROLL DEL CARRUSEL HORIZONTAL
  // ======================
  const prevScrollBtn = document.querySelector(".scroll-btn.prev");
  const nextScrollBtn = document.querySelector(".scroll-btn.next");

  if (gameCarousel && prevScrollBtn && nextScrollBtn) {
    prevScrollBtn.addEventListener("click", () => {
      gameCarousel.scrollBy({ left: -300, behavior: "smooth" });
    });
    nextScrollBtn.addEventListener("click", () => {
      gameCarousel.scrollBy({ left: 300, behavior: "smooth" });
    });
  }

  // ======================
  // CARRUSEL PRINCIPAL (IMÁGENES GRANDES)
  // ======================
  const slides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  if (slides.length > 0 && prevBtn && nextBtn) {
    let currentSlide = 0;
    let autoSlideInterval = null;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });
    }

    function moveSlide(direction) {
      currentSlide += direction;
      if (currentSlide < 0) currentSlide = slides.length - 1;
      if (currentSlide >= slides.length) currentSlide = 0;
      showSlide(currentSlide);
    }

    prevBtn.addEventListener("click", () => {
      moveSlide(-1);
      restartAutoSlide();
    });
    nextBtn.addEventListener("click", () => {
      moveSlide(1);
      restartAutoSlide();
    });

    function startAutoSlide() {
      autoSlideInterval = setInterval(() => moveSlide(1), 6000);
    }
    function stopAutoSlide() {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
      }
    }
    function restartAutoSlide() {
      stopAutoSlide();
      startAutoSlide();
    }

    showSlide(currentSlide);
    startAutoSlide();

    slides.forEach(slide => {
      slide.addEventListener("mouseenter", stopAutoSlide);
      slide.addEventListener("mouseleave", startAutoSlide);
    });
  }
});

