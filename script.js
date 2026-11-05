const menuToggle = document.querySelector("#menu-toggle");
const navPanel = document.querySelector("#nav-panel");
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const navLinks = document.querySelectorAll(".nav-link");

// Mobile menu
function closeMenu() {
  navPanel.classList.remove("is-open");
  menuToggle.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", () => {
  const isOpen = navPanel.classList.toggle("is-open");
  menuToggle.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
    closeMenu();
  });
});

// Close the mobile menu when clicking outside it
document.addEventListener("click", (event) => {
  const clickedInsideMenu = navPanel.contains(event.target);
  const clickedToggle = menuToggle.contains(event.target);

  if (!clickedInsideMenu && !clickedToggle) closeMenu();
});

// Light / dark theme
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const isDark = theme === "dark";
  themeIcon.textContent = isDark ? "☀" : "☾";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
  document.querySelector('meta[name="theme-color"]').content =
    isDark ? "#211d1a" : "#f5efe5";
  localStorage.setItem("mori-theme", theme);
}

const savedTheme = localStorage.getItem("mori-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";
setTheme(savedTheme || preferredTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme;
  setTheme(currentTheme === "dark" ? "light" : "dark");
});

// If the screen grows back to desktop size, reset the mobile menu
window.addEventListener("resize", () => {
  if (window.innerWidth > 760) closeMenu();
});
