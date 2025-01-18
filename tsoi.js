// Знаходимо бургер-іконку та меню
const burgerIcon = document.querySelector(".burger-icon");
const sideMenu = document.querySelector(".side-menu");

// Додаємо слухач подій на іконку
burgerIcon.addEventListener("click", function () {
  burgerIcon.classList.toggle("active");
  sideMenu.classList.toggle("open");
});

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel-inner");
  const items = document.querySelectorAll(".carousel-item");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  let currentIndex = 0;
  const totalItems = items.length;
  const intervalTime = 1500;

  // Оновлення стану каруселі
  const updateCarousel = () => {
    items.forEach((item, index) => {
      item.classList.toggle("active", index === currentIndex);
    });
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
  };

  const autoScroll = () => {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
  };

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
  });

  let autoScrollInterval = setInterval(autoScroll, intervalTime);

  const stopAutoScroll = () => clearInterval(autoScrollInterval);
  const startAutoScroll = () => {
    clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(autoScroll, intervalTime);
  };

  carousel.addEventListener("mouseover", stopAutoScroll);
  carousel.addEventListener("mouseout", startAutoScroll);

  updateCarousel();
});

// Скрол до початку сторінки
document.getElementById("scrollToTop").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const authButtons = document.getElementById("authButtons");
  const profileContainer = document.getElementById("profileContainer");
  const profilePic = document.getElementById("profilePic");
  const profileName = document.getElementById("profileName");
  const logoutButton = document.getElementById("logoutButton");

  // Завантаження списку зареєстрованих користувачів
  const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

  // Завантаження поточного користувача
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Функція для оновлення стану UI
  const updateUI = () => {
    if (currentUser) {
      authButtons.style.display = "none";
      profileContainer.classList.remove("hidden");
      profilePic.src = currentUser.profilePic || "default-avatar.png"; // Додати URL за замовчуванням
      profileName.textContent = currentUser.username;
    } else {
      authButtons.style.display = "flex";
      profileContainer.classList.add("hidden");
    }
  };

  // Початкова перевірка
  updateUI();

  // Функція реєстрації
  const registerUser = (username, profilePic) => {
    const userExists = registeredUsers.some((user) => user.username === username);

    if (userExists) {
      alert("Користувач з таким ім'ям вже існує!");
      return;
    }

    const newUser = { username, profilePic };
    registeredUsers.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

    alert("Реєстрація успішна! Тепер ви можете увійти.");
  };

  // Функція входу
  const loginUser = (username) => {
    const user = registeredUsers.find((user) => user.username === username);

    if (!user) {
      alert("Користувач не знайдений! Спочатку зареєструйтесь.");
      return;
    }

    currentUser = user;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    updateUI();
  };

  // Обробка кнопки "Вийти"
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    currentUser = null;
    updateUI();
  });

  // Симуляція тестових дій:
  // Виклик цих функцій замість кнопок "Увійти" та "Зареєструватися"
  // Для реєстрації: registerUser("TestUser", "test-avatar.jpg");
  // Для входу: loginUser("TestUser");
});
[
  { "username": "TestUser", "profilePic": "test-avatar.jpg" }
]